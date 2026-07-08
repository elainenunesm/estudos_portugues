'use strict';

/**
 * IDB.JS — Acesso compartilhado ao IndexedDB (index.html e estudo.html).
 * Guarda configuração da pasta salva e o caderno de erros.
 */
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

// ── CADERNO DE ERROS ─────────────────────────────────────────
// Formato: { "1": [2, 5], "2": [0] }  →  aulaId -> índices de questões erradas.
// Uma questão adicionada aqui nunca é removida, mesmo se acertada depois.
async function getErrorNotebook() {
  return (await idbGet('errorNotebook')) || {};
}

async function addErro(aulaId, qIdx) {
  const notebook = await getErrorNotebook();
  const key = String(aulaId);
  const set = new Set(notebook[key] || []);
  set.add(qIdx);
  notebook[key] = Array.from(set).sort((a, b) => a - b);
  await idbSet('errorNotebook', notebook);
  return notebook;
}
