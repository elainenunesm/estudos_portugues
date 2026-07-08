'use strict';

// ── INDEXEDDB ────────────────────────────────────────────────
const IDB_NAME  = 'gramix';
const IDB_STORE = 'config';

function openIDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = e => res(e.target.result);
    req.onerror   = e => rej(e.target.error);
  });
}
async function idbGet(key) {
  const db = await openIDB();
  return new Promise((res, rej) => {
    const req = db.transaction(IDB_STORE, 'readonly').objectStore(IDB_STORE).get(key);
    req.onsuccess = () => res(req.result ?? null);
    req.onerror   = e => rej(e.target.error);
  });
}
async function idbSet(key, value) {
  const db = await openIDB();
  return new Promise((res, rej) => {
    const req = db.transaction(IDB_STORE, 'readwrite').objectStore(IDB_STORE).put(value, key);
    req.onsuccess = () => res();
    req.onerror   = e => rej(e.target.error);
  });
}

// ── ESTADO ───────────────────────────────────────────────────
const state = {
  dirHandle:  null,
  folderName: null,
  aulas: [
    { id: 1, status: 'completed', progress: 100, stars: 3 },
    { id: 2, status: 'active',    progress: 40,  stars: 1 },
    { id: 3, status: 'locked',    progress: 0,   stars: 0 },
  ],
};

// ── SALVAR PROGRESSO ─────────────────────────────────────────
async function saveProgress() {
  if (!state.dirHandle) return;
  try {
    const data = { aulas: state.aulas, savedAt: new Date().toISOString() };
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
      node.style.pointerEvents = '';
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
      node.style.pointerEvents = 'auto';
      iconCircle.className = 'icon-circle active';
      card.classList.remove('locked');
      statusEl.textContent = 'Em andamento';
      barFill.style.width  = `${aula.progress}%`;
      btn.textContent = 'Continuar';
      btn.disabled    = false;
      btn.className   = 'btn-recomecar';
      stars.forEach((s, i) => { s.style.color = i < aula.stars ? '#FFD700' : '#e5e7eb'; });

    } else if (aula.status === 'completed') {
      node.classList.remove('locked');
      node.style.pointerEvents = 'auto';
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

  // Rebind dos botões após renderização
  bindAulaButtons();
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

// ── BIND BOTÕES DE AULA ──────────────────────────────────────
function bindAulaButtons() {
  document.querySelectorAll('.btn-recomecar').forEach(btn => {
    btn.replaceWith(btn.cloneNode(true)); // remove listeners antigos
  });
  document.querySelectorAll('.btn-recomecar').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const originalText = this.textContent.trim();
      const label = originalText === 'Continuar' ? 'Carregando...' : 'Reiniciando...';
      this.textContent = label;
      this.style.background = '#4a22a8';
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '#5B2BCB';
      }, 1200);
    });
  });

  // Clique em aulas bloqueadas
  document.querySelectorAll('.aula-node.locked').forEach(node => {
    node.style.pointerEvents = 'auto';
    node.replaceWith(node.cloneNode(true));
  });
  document.querySelectorAll('.aula-node.locked').forEach(node => {
    node.style.pointerEvents = 'auto';
    node.addEventListener('click', () => showToast('🔒 Conclua a aula anterior para desbloquear'));
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Colapso do hero card
  const nivelSelector = document.getElementById('nivelSelector');
  const heroCard      = document.getElementById('heroCard');
  const heroContent   = document.getElementById('heroContent');
  const pathContainer = document.getElementById('pathContainer');
  let isCollapsed = false;

  function toggleLevel() {
    isCollapsed = !isCollapsed;
    [nivelSelector, heroContent, heroCard, pathContainer].forEach(el => {
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
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Animação de entrada das aulas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.aula-node').forEach((node, i) => {
    node.style.opacity   = '0';
    node.style.transform = 'translateY(20px)';
    node.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(node);
  });

  // Bind inicial dos botões
  bindAulaButtons();

  // Tenta reconectar à pasta salva
  tryReconnect();
});
