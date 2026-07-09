'use strict';

// IndexedDB (openIDB/idbGet/idbSet) e o caderno de erros baseado em arquivo
// (getErrorNotebook/addErro, gravado em gramix-progresso.json) vêm de js/idb.js

// ── ESTADO ───────────────────────────────────────────────────
const PROGRESS_VERSION = 2; // incrementar para invalidar saves antigos

const DEFAULT_AULAS = () => [
  { id: 1, status: 'active',  progress: 0, stars: 0, favorita: false },
  { id: 2, status: 'locked',  progress: 0, stars: 0, favorita: false },
  { id: 3, status: 'locked',  progress: 0, stars: 0, favorita: false },
];

const state = {
  dirHandle:  null,
  folderName: null,
  aulas: DEFAULT_AULAS(),
  precisaPermissao: false, // handle conhecido, mas o navegador "esqueceu" a permissão (comum após F5)
};

// ── ÍCONES DAS AULAS ─────────────────────────────────────────
// Trocados pelo cadeado enquanto a aula está bloqueada; ao desbloquear,
// mostra o ícone do próprio tema da aula (definido em js/data/modulos.js).
const ICONE_CADEADO = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
const ICONES_AULA = {
  busca:  '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  pessoa: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"></path>',
  balao:  '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"></path>',
};

// ── SALVAR PROGRESSO ─────────────────────────────────────────
async function saveProgress() {
  if (!state.dirHandle) {
    showToast('⚠️ Conecte uma pasta para salvar — sem isso, seu progresso se perde ao fechar a página.', 'warning');
    return;
  }
  try {
    // Preserva o caderno de erros já salvo no arquivo (gravado por
    // estudo.js) — essa tela só conhece/atualiza o progresso das aulas.
    const notebook = await getErrorNotebook();
    const data = { version: PROGRESS_VERSION, aulas: state.aulas, errosNotebook: notebook, savedAt: new Date().toISOString() };
    const fh = await state.dirHandle.getFileHandle('gramix-progresso.json', { create: true });
    const wr = await fh.createWritable();
    await wr.write(JSON.stringify(data, null, 2));
    await wr.close();
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
    if (data.version !== PROGRESS_VERSION) {
      // Save desatualizado — reseta para o estado padrão e salva novamente
      state.aulas = DEFAULT_AULAS();
      renderAulas();
      await saveProgress();
      return;
    }
    if (Array.isArray(data.aulas) && data.aulas.length === state.aulas.length) {
      state.aulas = data.aulas;
      renderAulas();
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
      // nesta sessão (comum após F5/atualizar a página). Guarda o mesmo
      // handle e tenta pedir a permissão de novo na primeira interação do
      // usuário — sem reabrir o seletor de pastas do sistema operacional.
      state.dirHandle        = handle;
      state.folderName       = folderName || handle.name;
      state.precisaPermissao = true;
      updateFolderBadge();
      aguardarGestoParaReconectar();
      return;
    }

    if (folderName) {
      state.folderName = folderName;
      updateFolderBadge();
      return;
    }

    // Primeira visita — mostra modal
    showModal();
  } catch (e) {
    showModal();
  }
}

// Pede a permissão de novo assim que o usuário interagir com a página. O
// navegador exige um gesto do usuário para reconceder acesso, mas como já é
// uma pasta conhecida, isso acontece sem reabrir o seletor do sistema.
function aguardarGestoParaReconectar() {
  const tentar = async () => {
    document.removeEventListener('click', tentar, true);
    if (!state.precisaPermissao || !state.dirHandle) return;
    try {
      const perm = await state.dirHandle.requestPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        state.precisaPermissao = false;
        await loadProgress();
        updateFolderBadge();
      }
    } catch (e) {
      // Usuário negou ou o handle não é mais válido — o badge da pasta
      // continua disponível para reconectar manualmente.
    }
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

  // Rebind dos botões após renderização — não é mais necessário (delegação)
}

// Acende a trilha (linha tracejada) até a aula concluída mais recente,
// igual as estrelas — a linha "enche" de dourado conforme o progresso.
function atualizarTrilha() {
  const container = document.getElementById('pathContainer');
  const lit = document.getElementById('pathLineLit');
  if (!container || !lit) return;

  const circulos = state.aulas
    .map(aula => document.querySelector(`[data-aula="${aula.id}"] .icon-circle`))
    .filter(Boolean);

  let ultimoCompletoIdx = -1;
  for (let i = 0; i < state.aulas.length; i++) {
    if (state.aulas[i].status === 'completed') ultimoCompletoIdx = i;
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

async function renderErrosView() {
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
      window.location.href = `estudo.html?aula=${btn.dataset.aula}&modo=revisao`;
    });
  });
}

// ── ABAS DOS CADERNOS (Erros / Favoritos / Revisão) ────────
let cadernoAtivo    = 'erros';
let subCadernoAtivo = 'telas';

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
  if (subtabs) subtabs.style.display = tab === 'revisao' ? 'flex' : 'none';
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
function showToast(msg, type = 'default') {
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
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
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

  // Colapso do hero card
  const nivelSelector = document.getElementById('nivelSelector');
  const heroCard      = document.getElementById('heroCard');
  const heroContent   = document.getElementById('heroContent');
  const pathContainer = document.getElementById('pathContainer');
  let isCollapsed = false;

  function toggleLevel() {
    isCollapsed = !isCollapsed;
    // heroContent permanece visível — só as aulas recolhem
    [nivelSelector, heroCard, pathContainer].forEach(el => {
      el.classList.toggle('collapsed', isCollapsed);
    });
  }
  nivelSelector.addEventListener('click', e => { e.stopPropagation(); toggleLevel(); });
  heroCard.addEventListener('click', e => {
    if (e.target.closest('.hero-content')) return;
    toggleLevel();
  });

  // Badge de pasta → tenta reconectar à mesma pasta (se conhecida e só
  // faltando permissão); senão reabre a seleção de pasta
  document.getElementById('folderBadge').addEventListener('click', async () => {
    if (state.precisaPermissao && state.dirHandle) {
      try {
        const perm = await state.dirHandle.requestPermission({ mode: 'readwrite' });
        if (perm === 'granted') {
          state.precisaPermissao = false;
          await loadProgress();
          updateFolderBadge();
          return;
        }
      } catch (e) {
        // cai para o modal de seleção de pasta abaixo
      }
    }
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

  // Delegação de eventos (uma única vez)
  setupAulaEvents(pathContainer);

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
      // Desbloqueia a próxima aula, se existir
      if (aulaIdx + 1 < state.aulas.length) {
        state.aulas[aulaIdx + 1] = { ...state.aulas[aulaIdx + 1], status: 'active', progress: 0 };
      }
      acabouDeConcluir = true;
    } else {
      state.aulas[aulaIdx] = { id: aulaId, status: 'active', progress: Math.round((acertos / total) * 100), stars: estrelas };
    }
    renderAulas();
    await saveProgress();
    break;
  }

  // Leva a tela até a aula ativa (a que precisa continuar) — suave se acabou
  // de concluir algo agora, direto se for só abrindo/atualizando a página.
  setTimeout(() => scrollParaAulaAtiva(acabouDeConcluir), acabouDeConcluir ? 400 : 0);
});
