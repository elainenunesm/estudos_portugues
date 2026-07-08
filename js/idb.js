'use strict';

/**
 * IDB.JS — Acesso compartilhado ao IndexedDB (index.html e estudo.html).
 * Guarda a configuração da pasta salva (dirHandle/folderName). O progresso
 * das aulas e o caderno de erros vivem no arquivo gramix-progresso.json,
 * dentro da pasta escolhida pelo usuário — não no IndexedDB.
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

// ── ARQUIVO DE PROGRESSO (gramix-progresso.json) ─────────────
const PROGRESS_FILE = 'gramix-progresso.json';

// Lê o arquivo salvo na pasta escolhida. Retorna null se não há pasta
// selecionada, sem permissão de leitura, ou o arquivo ainda não existe.
async function lerArquivoProgresso() {
  try {
    const handle = await idbGet('dirHandle');
    if (!handle) return null;
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') return null;
    const fh   = await handle.getFileHandle(PROGRESS_FILE);
    const file = await fh.getFile();
    return JSON.parse(await file.text());
  } catch (e) {
    return null;
  }
}

// Grava mudanças no arquivo de progresso, mesclando com o que já existe em
// disco (para não apagar campos gravados por outra tela). Retorna false se
// não há pasta/permissão — o chamador decide se avisa o usuário ou ignora.
async function gravarArquivoProgresso(mudancas) {
  try {
    const handle = await idbGet('dirHandle');
    if (!handle) return false;
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') return false;

    let atual = {};
    try {
      const fh   = await handle.getFileHandle(PROGRESS_FILE);
      const file = await fh.getFile();
      atual = JSON.parse(await file.text());
    } catch (e) {
      // Arquivo ainda não existe — começa do zero
    }

    const dados = { ...atual, ...mudancas, savedAt: new Date().toISOString() };
    const fh = await handle.getFileHandle(PROGRESS_FILE, { create: true });
    const wr = await fh.createWritable();
    await wr.write(JSON.stringify(dados, null, 2));
    await wr.close();
    return true;
  } catch (e) {
    console.warn('Erro ao gravar arquivo de progresso:', e);
    return false;
  }
}

// ── CADERNO DE ERROS (persistido no arquivo de progresso) ────
// Formato: { "1": [2, 5], "2": [0] }  →  aulaId -> índices de questões erradas.
// Uma questão adicionada aqui nunca é removida, mesmo se acertada depois.
// Sem pasta escolhida/arquivo salvo, o caderno é sempre vazio.
async function getErrorNotebook() {
  const dados = await lerArquivoProgresso();
  return dados?.errosNotebook || {};
}

async function addErro(aulaId, qIdx) {
  const notebook = await getErrorNotebook();
  const key = String(aulaId);
  const set = new Set(notebook[key] || []);
  set.add(qIdx);
  notebook[key] = Array.from(set).sort((a, b) => a - b);
  await gravarArquivoProgresso({ errosNotebook: notebook });
  return notebook;
}

// ── CARTÕES MARCADOS PARA REVISÃO (persistido no arquivo de progresso) ──
// Formato: { "1": ["definicao", "contexto", "exemplo0"] }  →
// aulaId -> chaves das telas de conteúdo marcadas pelo usuário.
async function getCartoesMarcados() {
  const dados = await lerArquivoProgresso();
  return dados?.cartoesMarcados || {};
}

async function alternarCartaoMarcado(aulaId, chave) {
  const marcados = await getCartoesMarcados();
  const key = String(aulaId);
  const set = new Set(marcados[key] || []);
  const marcando = !set.has(chave);
  if (marcando) set.add(chave); else set.delete(chave);
  marcados[key] = Array.from(set);
  await gravarArquivoProgresso({ cartoesMarcados: marcados });
  return marcando;
}
