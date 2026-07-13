'use strict';

// IndexedDB (openIDB/idbGet/idbSet) e o caderno de erros baseado em arquivo
// (getErrorNotebook/addErro, gravado em gramix-progresso.json) vêm de js/idb.js

// ── ESTADO ───────────────────────────────────────────────────
const PROGRESS_VERSION = 4; // incrementar para invalidar saves antigos

const DEFAULT_AULAS = () => [
  { id: 1, status: 'active',  progress: 0, stars: 0, favorita: false },
  { id: 2, status: 'locked',  progress: 0, stars: 0, favorita: false },
  { id: 3, status: 'locked',  progress: 0, stars: 0, favorita: false },
  { id: 4, status: 'locked',  progress: 0, stars: 0, favorita: false },
];

const state = {
  dirHandle:  null,
  folderName: null,
  aulas: DEFAULT_AULAS(),
  precisaPermissao: false, // handle conhecido, mas o navegador "esqueceu" a permissão (comum após F5)
  progressoNaoSalvo: false, // state.aulas tem mudança que ainda não foi gravada no disco com sucesso
};

// ── ÍCONES DAS AULAS ─────────────────────────────────────────
// Trocados pelo cadeado enquanto a aula está bloqueada; ao desbloquear,
// mostra o ícone do próprio tema da aula (definido em js/data/modulos.js).
const ICONE_CADEADO = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
const ICONES_AULA = {
  busca:     '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  pessoa:    '<circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"></path>',
  balao:     '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"></path>',
  bandeira:  '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
};

// ── SALVAR PROGRESSO ─────────────────────────────────────────
async function saveProgress() {
  if (!state.dirHandle) {
    state.progressoNaoSalvo = true;
    showToast('⚠️ Conecte uma pasta para salvar — sem isso, seu progresso se perde ao fechar a página.', 'warning');
    return;
  }
  state.progressoNaoSalvo = true;
  try {
    // Usa gravarArquivoProgresso() (js/idb.js), que mescla com o que já
    // está no arquivo — escrever direto aqui (como antes) sobrescrevia o
    // arquivo inteiro com só {version, aulas, errosNotebook}, apagando
    // cartoesMarcados e errosRecentes que estudo.js tinha acabado de salvar.
    const salvou = await gravarArquivoProgresso({ version: PROGRESS_VERSION, aulas: state.aulas });
    if (!salvou) throw new Error('gravação falhou');
    state.progressoNaoSalvo = false;
    showToast('💾 Progresso salvo com sucesso!', 'success');
  } catch (e) {
    console.warn('Erro ao salvar progresso:', e);
    showToast('⚠️ Não foi possível salvar — clique na pasta no topo para reconectar.', 'warning');
  }
}

// ── CARREGAR PROGRESSO ───────────────────────────────────────
async function loadProgress() {
  if (!state.dirHandle) return;
  try {
    const fh   = await state.dirHandle.getFileHandle('gramix-progresso.json');
    const file = await fh.getFile();
    const data = JSON.parse(await file.text());

    // Migra pro formato atual SEM perder o que já foi feito: cada aula que
    // ainda existe reaproveita o estado salvo (por id); aulas novas (de um
    // módulo criado depois) entram com o padrão (bloqueadas); aulas antigas
    // que não existem mais são simplesmente ignoradas. Nunca reseta tudo
    // só porque a versão do arquivo mudou.
    const salvas = Array.isArray(data.aulas) ? data.aulas : [];
    state.aulas = DEFAULT_AULAS().map(padrao => {
      const salva = salvas.find(a => a.id === padrao.id);
      return salva ? { ...padrao, ...salva } : padrao;
    });
    renderAulas();

    if (data.version !== PROGRESS_VERSION) {
      // Resalva no formato atual (com o progresso já migrado acima).
      await saveProgress();
    }
  } catch (e) {
    // Arquivo ainda não existe — usa estado padrão
  }
}

// ── SELECIONAR PASTA ─────────────────────────────────────────
async function selectFolder() {
  try {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
    state.dirHandle  = handle;
    state.folderName = handle.name;
    await idbSet('dirHandle',  handle);
    await idbSet('folderName', handle.name);
    await loadProgress();
    await saveProgress();
    updateFolderBadge();
    hideModal();
  } catch (e) {
    // Usuário cancelou
  }
}

// ── RECONECTAR AO ABRIR ──────────────────────────────────────
async function tryReconnect() {
  try {
    const handle     = await idbGet('dirHandle');
    const folderName = await idbGet('folderName');

    if (handle) {
      const perm = await handle.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        state.dirHandle  = handle;
        state.folderName = handle.name;
        await loadProgress();
        updateFolderBadge();
        return;
      }
      // Pasta já escolhida antes, mas o navegador "esqueceu" a permissão
      // nesta sessão (comum após F5/atualizar a página, ou ao abrir o PWA
      // instalado numa janela nova). Guarda o mesmo handle e tenta pedir a
      // permissão de novo na primeira interação do usuário — sem reabrir o
      // seletor de pastas do sistema operacional. Um toast avisa também,
      // já que o texto do badge sozinho passa despercebido.
      state.dirHandle        = handle;
      state.folderName       = folderName || handle.name;
      state.precisaPermissao = true;
      updateFolderBadge();
      showToast(`📂 Toque em qualquer lugar da tela para reconectar a pasta "${state.folderName}"`, 'warning', 5000);
      aguardarGestoParaReconectar();
      return;
    }

    if (folderName) {
      // Só o nome ficou salvo (sem o handle real) — não dá pra ler/gravar
      // nada até o usuário escolher a pasta de novo.
      state.folderName = folderName;
      updateFolderBadge();
      showToast(`⚠️ Reconecte a pasta "${folderName}" para continuar salvando seu progresso.`, 'warning', 5000);
      return;
    }

    // Primeira visita — mostra modal
    showModal();
  } catch (e) {
    console.error('Erro ao reconectar a pasta:', e);
    showModal();
  }
}

// Repede a permissão na mesma pasta já conhecida (sem reabrir o seletor do
// sistema). Se havia uma mudança em memória que não deu para salvar por
// falta de permissão (ex: aula recém concluída ao voltar de estudo.html),
// grava ela agora — em vez de recarregar o disco, que estaria desatualizado
// e faria a tela "voltar" para o estado salvo antes da conclusão.
async function tentarReconectarPermissao() {
  if (!state.precisaPermissao || !state.dirHandle) return false;
  try {
    const perm = await state.dirHandle.requestPermission({ mode: 'readwrite' });
    if (perm !== 'granted') return false;
    state.precisaPermissao = false;
    if (state.progressoNaoSalvo) {
      await saveProgress();
    } else {
      await loadProgress();
      scrollParaAulaAtiva(false);
    }
    updateFolderBadge();
    return true;
  } catch (e) {
    // Usuário negou ou o handle não é mais válido — o badge da pasta
    // continua disponível para reconectar manualmente.
    return false;
  }
}

// Pede a permissão de novo assim que o usuário interagir com a página pela
// primeira vez. O navegador exige um gesto do usuário para reconceder
// acesso a uma pasta já conhecida.
function aguardarGestoParaReconectar() {
  const tentar = async () => {
    document.removeEventListener('click', tentar, true);
    await tentarReconectarPermissao();
  };
  document.addEventListener('click', tentar, true);
}

// ── BADGE DA PASTA ───────────────────────────────────────────
function updateFolderBadge() {
  const badge = document.getElementById('folderBadge');
  const name  = document.getElementById('folderName');
  if (!badge || !name) return;

  if (state.precisaPermissao && state.folderName) {
    name.textContent = `${state.folderName} (reconectar)`;
    badge.classList.remove('connected');
    badge.title = `Clique para reconectar à pasta "${state.folderName}" e voltar a salvar o progresso`;
  } else if (state.folderName) {
    name.textContent = state.folderName;
    badge.classList.add('connected');
    badge.title = `Pasta: ${state.folderName} — clique para alterar`;
  } else {
    name.textContent = 'Sem pasta';
    badge.classList.remove('connected');
    badge.title = 'Clique para escolher uma pasta e salvar o progresso';
  }
}

// ── RENDERIZAR AULAS ─────────────────────────────────────────
function renderAulas() {
  state.aulas.forEach(aula => {
    const node = document.querySelector(`[data-aula="${aula.id}"]`);
    if (!node) return;

    const iconCircle  = node.querySelector('.icon-circle');
    const iconSvg     = iconCircle.querySelector('svg');
    const card        = node.querySelector('.aula-card');
    const statusEl    = node.querySelector('.status');
    const barFill     = node.querySelector('.progress-bar-fill');
    const btn         = node.querySelector('button:not(.btn-favoritar)');
    const stars       = node.querySelectorAll('.star');
    const btnFavoritar = node.querySelector('.btn-favoritar');
    if (btnFavoritar) btnFavoritar.classList.toggle('favorita', !!aula.favorita);

    const infoAula = listaAulas().find(a => a.id === aula.id);
    if (iconSvg) {
      iconSvg.innerHTML = aula.status === 'locked'
        ? ICONE_CADEADO
        : (ICONES_AULA[infoAula?.icone] || ICONE_CADEADO);
    }

    if (aula.status === 'locked') {
      node.classList.add('locked');
      node.style.pointerEvents = 'auto';
      iconCircle.className = 'icon-circle locked';
      card.classList.add('locked');
      statusEl.textContent = 'Bloqueada';
      barFill.style.width  = '0%';
      btn.textContent = '🔒 Bloqueada';
      btn.disabled    = true;
      btn.className   = 'btn-bloqueado';
      stars.forEach(s => { s.style.color = '#e5e7eb'; });

    } else if (aula.status === 'active') {
      node.classList.remove('locked');
      iconCircle.className = 'icon-circle active';
      card.classList.remove('locked');
      statusEl.textContent = aula.progress > 0 ? 'Em andamento' : 'Não iniciada';
      barFill.style.width  = `${aula.progress}%`;
      btn.textContent = aula.progress > 0 ? 'Continuar' : 'Começar';
      btn.disabled    = false;
      btn.className   = 'btn-recomecar';
      stars.forEach((s, i) => { s.style.color = i < aula.stars ? '#FFD700' : '#e5e7eb'; });

    } else if (aula.status === 'completed') {
      node.classList.remove('locked');
      iconCircle.className = 'icon-circle active';
      card.classList.remove('locked');
      statusEl.textContent = 'Concluída';
      barFill.style.width  = '100%';
      btn.textContent = 'Recomeçar';
      btn.disabled    = false;
      btn.className   = 'btn-recomecar';
      stars.forEach((s, i) => { s.style.color = i < aula.stars ? '#FFD700' : '#e5e7eb'; });
    }

    // Garante a opacidade correta mesmo se a animação de entrada (observer)
    // já tiver disparado antes do progresso salvo terminar de carregar —
    // sem isso, um card que estava "bloqueado" no HTML padrão podia ficar
    // preso com opacidade reduzida mesmo depois de desbloqueado/concluído.
    node.style.opacity = aula.status === 'locked' ? '0.6' : '1';
  });

  atualizarTrilha();
  atualizarProgressoEtapas();

  // Rebind dos botões após renderização — não é mais necessário (delegação)
}

// Acende a trilha (linha tracejada) até a aula concluída mais recente,
// igual as estrelas — a linha "enche" de dourado conforme o progresso.
// Roda por etapa (via .etapa-view/.path-container/.path-line-lit, não por
// id fixo), então funciona automaticamente pra qualquer módulo novo também.
function atualizarTrilha() {
  document.querySelectorAll('.etapa-view').forEach(etapaView => {
    const container = etapaView.querySelector('.path-container');
    const lit        = etapaView.querySelector('.path-line-lit');
    const etapaInfo  = (MODULOS || []).find(m => String(m.id) === etapaView.dataset.etapa);
    if (!container || !lit || !etapaInfo) return;

    const aulasDaEtapa = etapaInfo.aulas
      .map(a => state.aulas.find(s => s.id === a.id))
      .filter(Boolean);

    const circulos = aulasDaEtapa
      .map(aula => document.querySelector(`[data-aula="${aula.id}"] .icon-circle`))
      .filter(Boolean);

    let ultimoCompletoIdx = -1;
    for (let i = 0; i < aulasDaEtapa.length; i++) {
      if (aulasDaEtapa[i].status === 'completed') ultimoCompletoIdx = i;
      else break;
    }

    if (ultimoCompletoIdx === -1 || !circulos[ultimoCompletoIdx]) {
      lit.style.height = '0px';
      return;
    }

    const containerTop = container.getBoundingClientRect().top;
    const centro = (el) => el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2;
    const proximoCirculo = circulos[ultimoCompletoIdx + 1];
    const altura = (proximoCirculo ? centro(proximoCirculo) : centro(circulos[ultimoCompletoIdx])) - containerTop;

    lit.style.height = `${Math.max(0, altura)}px`;
  });
}

// Segmentos de progresso do hero card de cada etapa — um segmento por aula
// do módulo, preenchido conforme o real state.aulas (nunca hardcoded no
// HTML, pra não desalinhar quando uma aula é concluída ou um módulo ganha
// aulas novas). Quando todas as aulas da etapa estão concluídas, a barra
// "acende" (.etapa-completa, ver css/style.css) pra comemorar o nível feito.
function atualizarProgressoEtapas() {
  document.querySelectorAll('.etapa-view').forEach(etapaView => {
    const heroCard     = etapaView.querySelector('.hero-card');
    const segmentsWrap = etapaView.querySelector('.progress-segments');
    const etapaInfo    = (MODULOS || []).find(m => String(m.id) === etapaView.dataset.etapa);
    if (!heroCard || !segmentsWrap || !etapaInfo) return;

    const aulasDaEtapa = etapaInfo.aulas
      .map(a => state.aulas.find(s => s.id === a.id))
      .filter(Boolean);
    const concluidas = aulasDaEtapa.filter(a => a.status === 'completed').length;

    segmentsWrap.innerHTML = aulasDaEtapa
      .map((_, i) => `<div class="segment${i < concluidas ? ' filled' : ''}"></div>`)
      .join('');

    const etapaCompleta = aulasDaEtapa.length > 0 && concluidas === aulasDaEtapa.length;
    heroCard.classList.toggle('etapa-completa', etapaCompleta);
  });
}

// Posiciona a tela na aula ativa (a que precisa continuar), pra abrir/atualizar
// a página sempre já mostrando de onde partir, sem precisar rolar procurando.
function scrollParaAulaAtiva(smooth) {
  const aulaAtiva = state.aulas.find(a => a.status === 'active');
  const node = aulaAtiva ? document.querySelector(`[data-aula="${aulaAtiva.id}"]`) : null;
  if (node) node.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
}

// ── CADERNO DE ERROS ─────────────────────────────────────────
function listaAulas() {
  return (MODULOS || []).flatMap(m => m.aulas);
}

async function updateErrosBadge() {
  const badge    = document.getElementById('errosBadge');
  const notebook = await getErrorNotebook();
  const total    = Object.values(notebook).reduce((sum, arr) => sum + arr.length, 0);
  if (!badge) return total;
  badge.textContent  = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
  return total;
}

function renderErrosView() {
  if (subCadernoAtivo === 'geral') return renderErrosGeral();
  return renderErrosPorAula();
}

// "Por aula" — comportamento original, agrupado por aula.
async function renderErrosPorAula() {
  const list     = document.getElementById('errosList');
  if (!list) return;
  const notebook = await getErrorNotebook();

  let html = '';
  listaAulas().forEach(aula => {
    const idxs = notebook[String(aula.id)] || [];
    if (idxs.length === 0) return;
    html += `
      <div class="erro-card">
        <div class="erro-card-info">
          <h3>${aula.titulo}</h3>
          <p>${idxs.length} ${idxs.length !== 1 ? 'questões' : 'questão'} para revisar</p>
        </div>
        <button type="button" class="btn-praticar" data-aula="${aula.id}">Praticar</button>
      </div>`;
  });

  list.innerHTML = html || `
    <div class="erros-empty">
      <p class="erros-empty-emoji">🎉</p>
      <p>Nenhum erro registrado ainda.</p>
      <p class="erros-empty-sub">As questões que você errar aparecem aqui e ficam disponíveis para revisão até você dominá-las.</p>
    </div>`;

  list.querySelectorAll('.btn-praticar').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `estudo.html?aula=${btn.dataset.aula}&modo=erros`;
    });
  });

  updateErrosBadge();
}

// "Geral" — todos os erros juntos, do mais recente pro mais antigo.
function formatarTempoRelativo(iso) {
  const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1)  return 'agora mesmo';
  if (diffMin < 60) return `há ${diffMin} min`;
  const horas = Math.floor(diffMin / 60);
  if (horas < 24) return `há ${horas}h`;
  const dias = Math.floor(horas / 24);
  if (dias < 30) return `há ${dias}d`;
  return new Date(iso).toLocaleDateString('pt-BR');
}

async function renderErrosGeral() {
  const list     = document.getElementById('errosList');
  if (!list) return;
  const [notebook, recentes] = await Promise.all([getErrorNotebook(), getErrosRecentes()]);

  const total = Object.values(notebook).reduce((soma, arr) => soma + (arr || []).length, 0);
  const maisRecente = recentes.reduce((max, r) => (!max || new Date(r.quando) > new Date(max)) ? r.quando : max, null);
  const subtitulo = `${total} ${total !== 1 ? 'perguntas' : 'pergunta'} de todas as aulas, do mais recente ao mais antigo`
    + (maisRecente ? ` — último erro ${formatarTempoRelativo(maisRecente)}` : '');

  const html = total > 0 ? `
    <div class="erro-card">
      <div class="erro-card-info">
        <h3>Todos os erros</h3>
        <p>${subtitulo}</p>
      </div>
      <button type="button" class="btn-praticar" id="btnPraticarGeral">Praticar</button>
    </div>` : '';

  list.innerHTML = html || `
    <div class="erros-empty">
      <p class="erros-empty-emoji">🎉</p>
      <p>Nenhum erro registrado ainda.</p>
      <p class="erros-empty-sub">As questões que você errar aparecem aqui e ficam disponíveis para revisão até você dominá-las.</p>
    </div>`;

  const btnGeral = document.getElementById('btnPraticarGeral');
  if (btnGeral) {
    btnGeral.addEventListener('click', () => {
      window.location.href = 'estudo.html?modo=erros&geral=1';
    });
  }

  updateErrosBadge();
}

// ── CADERNO FAVORITOS ──────────────────────────────────────
function renderFavoritosView() {
  const list = document.getElementById('errosList');
  if (!list) return;

  let html = '';
  listaAulas().forEach(aulaInfo => {
    const aula = state.aulas.find(a => a.id === aulaInfo.id);
    if (!aula || !aula.favorita || aula.status === 'locked') return;
    html += `
      <div class="erro-card">
        <div class="erro-card-info">
          <h3>${aulaInfo.titulo}</h3>
          <p class="cor-favorito">Aula favorita</p>
        </div>
        <button type="button" class="btn-praticar" data-aula="${aulaInfo.id}">Abrir</button>
      </div>`;
  });

  list.innerHTML = html || `
    <div class="erros-empty">
      <p class="erros-empty-emoji">🤍</p>
      <p>Nenhuma aula favoritada ainda.</p>
      <p class="erros-empty-sub">Toque no coraçãozinho no card da aula para marcá-la como favorita.</p>
    </div>`;

  list.querySelectorAll('.btn-praticar').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `estudo.html?aula=${btn.dataset.aula}`;
    });
  });
}

// ── CADERNO DE REVISÃO ─────────────────────────────────────
// "Telas" = definição/contexto/exemplo. "Perguntas" = checagens (e, quando
// reativadas, as questões normais) marcadas com a mesma etiqueta.
function ehPergunta(chave) {
  return chave.startsWith('checagem') || chave.startsWith('questao');
}

async function renderRevisaoView() {
  const list     = document.getElementById('errosList');
  if (!list) return;
  const marcados = await getCartoesMarcados();
  const mostrarPerguntas = subCadernoAtivo === 'perguntas';

  let html = '';
  listaAulas().forEach(aula => {
    const chaves = (marcados[String(aula.id)] || []).filter(c => ehPergunta(c) === mostrarPerguntas);
    if (chaves.length === 0) return;
    const rotulo = mostrarPerguntas ? 'pergunta' : 'tela';
    html += `
      <div class="erro-card">
        <div class="erro-card-info">
          <h3>${aula.titulo}</h3>
          <p class="cor-revisao">${chaves.length} ${rotulo}${chaves.length !== 1 ? 's' : ''} para revisar</p>
        </div>
        <button type="button" class="btn-praticar" data-aula="${aula.id}">Ver</button>
      </div>`;
  });

  list.innerHTML = html || (mostrarPerguntas ? `
    <div class="erros-empty">
      <p class="erros-empty-emoji">🔖</p>
      <p>Nenhuma pergunta marcada ainda.</p>
      <p class="erros-empty-sub">Toque na etiqueta no canto das perguntas da aula para marcá-las.</p>
    </div>` : `
    <div class="erros-empty">
      <p class="erros-empty-emoji">🔖</p>
      <p>Nenhuma tela marcada ainda.</p>
      <p class="erros-empty-sub">Toque na etiqueta no canto das telas de definição, contexto e exemplo para marcá-las.</p>
    </div>`);

  list.querySelectorAll('.btn-praticar').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = mostrarPerguntas ? 'perguntas' : 'telas';
      window.location.href = `estudo.html?aula=${btn.dataset.aula}&modo=revisao&tipo=${tipo}`;
    });
  });
}

// ── ABAS DOS CADERNOS (Erros / Favoritos / Revisão) ────────
let cadernoAtivo    = 'erros';
let subCadernoAtivo = 'aula';

// Erros e Revisão reaproveitam os 2 mesmos botões de sub-aba, só trocando
// o rótulo/valor deles conforme a aba principal ativa.
const SUBTABS_POR_CADERNO = {
  erros:   [{ valor: 'aula',      label: 'Por aula' }, { valor: 'geral',     label: 'Geral' }],
  revisao: [{ valor: 'telas',     label: 'Aulas' },    { valor: 'perguntas', label: 'Perguntas' }],
};

function renderCadernoAtivo() {
  if (cadernoAtivo === 'favoritos')     renderFavoritosView();
  else if (cadernoAtivo === 'revisao')  renderRevisaoView();
  else                                   renderErrosView();
}

function trocarCadernoTab(tab) {
  cadernoAtivo = tab;
  document.querySelectorAll('.caderno-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  const subtabs = document.getElementById('cadernosSubtabs');
  const config  = SUBTABS_POR_CADERNO[tab];
  if (subtabs && config) {
    subtabs.style.display = 'flex';
    const botoes = subtabs.querySelectorAll('.caderno-subtab');
    config.forEach((cfg, i) => {
      if (!botoes[i]) return;
      botoes[i].textContent    = cfg.label;
      botoes[i].dataset.subtab = cfg.valor;
      botoes[i].classList.toggle('active', i === 0);
    });
    subCadernoAtivo = config[0].valor;
  } else if (subtabs) {
    subtabs.style.display = 'none';
  }

  renderCadernoAtivo();
}

function trocarCadernoSubTab(sub) {
  subCadernoAtivo = sub;
  document.querySelectorAll('.caderno-subtab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.subtab === sub);
  });
  renderCadernoAtivo();
}

// ── TROCA DE VIEW (Início / Cadernos) ──────────────────────
function showView(view) {
  const viewInicio = document.getElementById('viewInicio');
  const viewErros  = document.getElementById('viewErros');
  const navInicio  = document.getElementById('navInicio');
  const navErros   = document.getElementById('navErros');
  const isErros    = view === 'erros';

  if (viewInicio) viewInicio.style.display = isErros ? 'none' : '';
  if (viewErros)  viewErros.style.display  = isErros ? '' : 'none';
  if (navInicio)  navInicio.classList.toggle('active', !isErros);
  if (navErros)   navErros.classList.toggle('active', isErros);

  if (isErros) renderCadernoAtivo();
}

// ── TOAST ────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = 'default', duracao = 2500) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'success' ? '#16a34a' : (type === 'warning' ? '#d97706' : '#1a1a2e');
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), duracao);
}

// ── MODAL ────────────────────────────────────────────────────
function showModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('show');
}
function hideModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('show');
}

// ── DELEGAÇÃO DE EVENTOS DAS AULAS ─────────────────────────
// Configurado uma única vez no DOMContentLoaded — não quebra IntersectionObserver
function setupAulaEvents(pathContainer) {
  pathContainer.addEventListener('click', function(e) {
    // Marcar/desmarcar como favorita — bloqueada não pode, pois o caderno
    // de Favoritos abre a aula direto, ignorando o bloqueio.
    const btnFavoritar = e.target.closest('.btn-favoritar');
    if (btnFavoritar) {
      e.stopPropagation();
      const node   = btnFavoritar.closest('[data-aula]');
      const aulaId = node ? parseInt(node.dataset.aula, 10) : null;
      const aula   = state.aulas.find(a => a.id === aulaId);
      if (aula && aula.status === 'locked') {
        showToast('🔒 Conclua a aula anterior para poder favoritar esta.');
        return;
      }
      if (aula) {
        aula.favorita = !aula.favorita;
        renderAulas();
        // Se não há pasta conectada, saveProgress() já avisa que não foi
        // salvo — não sobrescreve esse aviso com o toast de sucesso abaixo.
        if (state.dirHandle) {
          showToast(aula.favorita ? '❤️ Aula marcada como favorita!' : 'Aula removida dos favoritos', 'success');
        }
        saveProgress();
      }
      return;
    }
    // Aula bloqueada
    const lockedNode = e.target.closest('.aula-node.locked');
    if (lockedNode) {
      showToast('🔒 Conclua a aula anterior para desbloquear');
      return;
    }
    // Botão Começar / Continuar / Recomeçar
    const btn = e.target.closest('.btn-recomecar');
    if (btn) {
      e.stopPropagation();
      const node = btn.closest('[data-aula]');
      const aulaId = node ? node.dataset.aula : null;
      // Navega para a tela de estudos
      window.location.href = `estudo.html?aula=${aulaId || 1}`;
    }
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {

  // Colapso do hero card — cada Etapa é um bloco independente na página
  // (sempre visível, um embaixo do outro), com seu próprio recolher/expandir.
  // O título e a barra de progresso (hero-content) continuam visíveis mesmo
  // recolhido — só a lista de aulas (pathContainer) se esconde, pra ainda
  // dar pra saber qual etapa é aquela e quanto já foi feito sem abrir.
  // Expõe setCollapsed() além do toggle por clique, pra poder recolher os
  // níveis que não estão em andamento assim que o progresso real carrega
  // (ver aplicarColapsoInicial, chamada depois do tryReconnect()).
  function configurarColapsoHero(nivelSelector, heroCard, pathContainer) {
    if (!nivelSelector || !heroCard || !pathContainer) return null;
    let isCollapsed = false;
    function aplicar() {
      [nivelSelector, heroCard, pathContainer].forEach(el => {
        el.classList.toggle('collapsed', isCollapsed);
      });
    }
    function toggleLevel() {
      isCollapsed = !isCollapsed;
      aplicar();
    }
    nivelSelector.addEventListener('click', e => { e.stopPropagation(); toggleLevel(); });
    heroCard.addEventListener('click', e => {
      if (e.target.closest('.hero-content')) return;
      toggleLevel();
    });
    return {
      setCollapsed(valor) { isCollapsed = valor; aplicar(); },
    };
  }
  const colapsosPorEtapa = {
    1: configurarColapsoHero(
      document.getElementById('nivelSelector'),
      document.getElementById('heroCard'),
      document.getElementById('pathContainer'),
    ),
    2: configurarColapsoHero(
      document.getElementById('nivelSelector2'),
      document.getElementById('heroCard2'),
      document.getElementById('pathContainer2'),
    ),
    3: configurarColapsoHero(
      document.getElementById('nivelSelector3'),
      document.getElementById('heroCard3'),
      document.getElementById('pathContainer3'),
    ),
  };

  // Recolhe todo nível que não está "em andamento" (nenhuma aula ativa
  // dentro dele) — níveis ainda bloqueados e níveis já 100% concluídos
  // ficam fechados; só o nível que o usuário está cursando agora abre.
  // Se nenhum nível tiver aula ativa (ex.: tudo já concluído), deixa o
  // último aberto em vez de recolher tudo.
  function aplicarColapsoInicial() {
    const etapas = Array.from(document.querySelectorAll('.etapa-view')).map(view => {
      const etapaInfo = (MODULOS || []).find(m => String(m.id) === view.dataset.etapa);
      const aulasDaEtapa = etapaInfo
        ? etapaInfo.aulas.map(a => state.aulas.find(s => s.id === a.id)).filter(Boolean)
        : [];
      return { id: view.dataset.etapa, emAndamento: aulasDaEtapa.some(a => a.status === 'active') };
    });
    const existeEmAndamento = etapas.some(e => e.emAndamento);
    etapas.forEach((etapa, i) => {
      const manterAberta = etapa.emAndamento || (!existeEmAndamento && i === etapas.length - 1);
      const controlador   = colapsosPorEtapa[etapa.id];
      if (controlador && !manterAberta) controlador.setCollapsed(true);
    });
  }
  const pathContainer  = document.getElementById('pathContainer');
  const pathContainer2 = document.getElementById('pathContainer2');
  const pathContainer3 = document.getElementById('pathContainer3');

  // Badge de pasta → tenta reconectar à mesma pasta (se conhecida e só
  // faltando permissão); senão reabre a seleção de pasta
  document.getElementById('folderBadge').addEventListener('click', async () => {
    if (state.precisaPermissao && await tentarReconectarPermissao()) return;
    showModal();
  });

  // Modal — Escolher pasta
  document.getElementById('btnEscolherPasta').addEventListener('click', selectFolder);

  // Modal — Agora não
  document.getElementById('btnSemPasta').addEventListener('click', () => {
    hideModal();
    showToast('⚠️ Sem pasta conectada, seu progresso não será salvo.', 'warning');
  });

  // Clique no nome/logo do app volta para o Início
  document.getElementById('headerLogo').addEventListener('click', () => showView('inicio'));

  // Navegação inferior
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      const view = this.dataset.view;
      if (!view) { showToast('🚧 Em breve'); return; }
      showView(view);
    });
  });

  // Abas dos cadernos (Erros / Favoritos / Revisão)
  document.querySelectorAll('.caderno-tab').forEach(btn => {
    btn.addEventListener('click', () => trocarCadernoTab(btn.dataset.tab));
  });

  // Sub-abas do caderno de Revisão (Telas / Perguntas)
  document.querySelectorAll('.caderno-subtab').forEach(btn => {
    btn.addEventListener('click', () => trocarCadernoSubTab(btn.dataset.subtab));
  });

  // Abre direto no Caderno de Erros se veio de estudo.html?modo=erros
  const viewParam = new URLSearchParams(window.location.search).get('view');
  showView(viewParam === 'erros' ? 'erros' : 'inicio');
  updateErrosBadge();

  // ?view=erros é só um sinal de redirecionamento único — limpa da barra de
  // endereço para que um F5/Ctrl+L depois disso volte para o Início normal,
  // em vez de reabrir os Cadernos toda vez.
  if (viewParam) {
    history.replaceState(null, '', window.location.pathname);
  }

  // Animação de entrada das aulas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const node = entry.target;
        const isLocked = node.classList.contains('locked');
        node.style.opacity   = isLocked ? '0.6' : '1';
        node.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.aula-node').forEach((node, i) => {
    node.style.opacity   = '0';
    node.style.transform = 'translateY(20px)';
    node.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(node);
  });

  // Delegação de eventos (uma única vez) — nos dois containers de etapa
  setupAulaEvents(pathContainer);
  if (pathContainer2) setupAulaEvents(pathContainer2);
  if (pathContainer3) setupAulaEvents(pathContainer3);

  // Também permite clique em aulas bloqueadas (pointer-events é none no CSS)
  document.querySelectorAll('.aula-node.locked').forEach(node => {
    node.style.pointerEvents = 'auto';
  });

  // Tenta reconectar à pasta salva PRIMEIRO — precisa terminar antes de
  // aplicar o resultado da aula recém-concluída, senão o loadProgress()
  // (que lê o arquivo do disco) sobrescreve esse resultado com o estado
  // antigo salvo antes da aula ser concluída.
  await tryReconnect();

  // Verifica resultado ao voltar da tela de estudos (qualquer aula)
  let acabouDeConcluir = false;
  for (let i = 1; i <= 10; i++) {
    const key       = `aula${i}_resultado`;
    const resultRaw = sessionStorage.getItem(key);
    if (!resultRaw) continue;
    sessionStorage.removeItem(key);
    const { aulaId, estrelas, acertos, total } = JSON.parse(resultRaw);
    const aulaIdx  = aulaId - 1;
    const concluida = acertos >= Math.ceil(total * 0.5);
    if (concluida) {
      state.aulas[aulaIdx] = { id: aulaId, status: 'completed', progress: 100, stars: estrelas };
      // Desbloqueia a próxima aula, se ela ainda estiver bloqueada — só isso.
      // Se o usuário refez uma aula anterior e a próxima já estava concluída
      // (ou em andamento) de antes, não pode voltar pra "Começar" e perder
      // as estrelas/progresso que já tinha.
      const proxima = state.aulas[aulaIdx + 1];
      if (proxima && proxima.status === 'locked') {
        state.aulas[aulaIdx + 1] = { ...proxima, status: 'active', progress: 0 };
      }
      acabouDeConcluir = true;
    } else {
      state.aulas[aulaIdx] = { id: aulaId, status: 'active', progress: Math.round((acertos / total) * 100), stars: estrelas };
    }
    renderAulas();
    await saveProgress();
    break;
  }

  // Só agora o progresso real (da pasta, ou o padrão se não há pasta) está
  // definitivo — recolhe os níveis que não estão em andamento.
  aplicarColapsoInicial();

  // Leva a tela até a aula ativa (a que precisa continuar) — suave se acabou
  // de concluir algo agora, direto se for só abrindo/atualizando a página.
  setTimeout(() => scrollParaAulaAtiva(acabouDeConcluir), acabouDeConcluir ? 400 : 0);
});
