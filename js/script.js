'use strict';

// IndexedDB (openIDB/idbGet/idbSet) e o caderno de erros baseado em arquivo
// (getErrorNotebook/addErro, gravado em gramix-progresso.json) vêm de js/idb.js

// ── ESTADO ───────────────────────────────────────────────────
const PROGRESS_VERSION = 2; // incrementar para invalidar saves antigos

const DEFAULT_AULAS = () => [
  { id: 1, status: 'active',  progress: 0, stars: 0 },
  { id: 2, status: 'locked',  progress: 0, stars: 0 },
  { id: 3, status: 'locked',  progress: 0, stars: 0 },
];

const state = {
  dirHandle:  null,
  folderName: null,
  aulas: DEFAULT_AULAS(),
};

// ── SALVAR PROGRESSO ─────────────────────────────────────────
async function saveProgress() {
  if (!state.dirHandle) return;
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
      // Pasta conhecida mas precisa de permissão (solicitada ao clicar)
      if (folderName) {
        state.dirHandle  = handle;   // guarda handle para pedir permissão depois
        state.folderName = folderName;
        updateFolderBadge();
        return;
      }
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

// ── BADGE DA PASTA ───────────────────────────────────────────
function updateFolderBadge() {
  const badge = document.getElementById('folderBadge');
  const name  = document.getElementById('folderName');
  if (!badge || !name) return;

  if (state.folderName) {
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

    const iconCircle = node.querySelector('.icon-circle');
    const card       = node.querySelector('.aula-card');
    const statusEl   = node.querySelector('.status');
    const barFill    = node.querySelector('.progress-bar-fill');
    const btn        = node.querySelector('button');
    const stars      = node.querySelectorAll('.star');

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
  });

  // Rebind dos botões após renderização — não é mais necessário (delegação)
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

// ── TROCA DE VIEW (Início / Caderno de erros) ────────────────
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

  if (isErros) renderErrosView();
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
  toast.style.background = type === 'success' ? '#16a34a' : '#1a1a2e';
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

  // Botão Continuar do header
  document.getElementById('btnContinuar').addEventListener('click', async function () {
    // Pede permissão se necessário
    if (state.dirHandle && !state.dirHandle._permissionGranted) {
      try {
        const perm = await state.dirHandle.requestPermission({ mode: 'readwrite' });
        if (perm === 'granted') {
          state.dirHandle._permissionGranted = true;
          await loadProgress();
          updateFolderBadge();
        }
      } catch (e) {}
    }

    // Salva progresso
    await saveProgress();

    // Rola até a aula ativa
    const aulaAtiva = state.aulas.find(a => a.status === 'active');
    const target = aulaAtiva
      ? document.querySelector(`[data-aula="${aulaAtiva.id}"]`)
      : document.querySelector('.aula-node');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Badge de pasta → clique reabre seleção
  document.getElementById('folderBadge').addEventListener('click', () => showModal());

  // Modal — Escolher pasta
  document.getElementById('btnEscolherPasta').addEventListener('click', selectFolder);

  // Modal — Agora não
  document.getElementById('btnSemPasta').addEventListener('click', hideModal);

  // Navegação inferior
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      const view = this.dataset.view;
      if (!view) { showToast('🚧 Em breve'); return; }
      showView(view);
    });
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
    } else {
      state.aulas[aulaIdx] = { id: aulaId, status: 'active', progress: Math.round((acertos / total) * 100), stars: estrelas };
    }
    renderAulas();
    await saveProgress();
    break;
  }
});
