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

// Confere a permissão da pasta e, se o navegador "esqueceu" (comum após F5
// ou ao abrir uma aba/página nova — ex: estudo.html sem passar por
// index.html antes), tenta pedir de novo na mesma pasta já conhecida. Como
// essa função só é chamada a partir de uma ação do usuário (marcar um
// cartão, responder uma questão), ainda conta como gesto pra requestPermission
// não precisar reabrir o seletor de pastas do sistema.
async function garantirPermissao(handle) {
  const perm = await handle.queryPermission({ mode: 'readwrite' });
  if (perm === 'granted') return true;
  try {
    const pedido = await handle.requestPermission({ mode: 'readwrite' });
    return pedido === 'granted';
  } catch (e) {
    return false;
  }
}

// Lê o arquivo salvo na pasta escolhida. Retorna null se não há pasta
// selecionada, sem permissão de leitura, ou o arquivo ainda não existe.
async function lerArquivoProgresso() {
  try {
    const handle = await idbGet('dirHandle');
    if (!handle) return null;
    if (!(await garantirPermissao(handle))) return null;
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
    if (!(await garantirPermissao(handle))) return false;

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

  // Mantém uma lista separada com o horário de cada erro, só pra dar pra
  // ordenar do mais recente pro mais antigo na aba "Geral" do Caderno de
  // Erros — a lista por aula acima não muda (ordenada por índice, como já era).
  const recentes = await getErrosRecentes();
  const jaExiste  = recentes.findIndex(r => r.aulaId === key && r.chave === qIdx);
  if (jaExiste !== -1) recentes.splice(jaExiste, 1);
  recentes.push({ aulaId: key, chave: qIdx, quando: new Date().toISOString() });

  await gravarArquivoProgresso({ errosNotebook: notebook, errosRecentes: recentes });
  return notebook;
}

// Lista plana de erros com horário, pra aba "Geral" (mais recente primeiro).
// Erros gravados antes dessa funcionalidade existir não têm horário — sem
// isso "Geral" não tem como saber qual é mais recente. Na primeira vez que
// detecta um desses, preenche retroativamente usando a data do último save
// como referência (escalonando 1s por item, só pra manter uma ordem
// estável entre eles) e salva, pra não recalcular toda vez. Erros novos
// continuam ganhando o horário real de quando aconteceram, em addErro().
async function getErrosRecentes() {
  const dados    = await lerArquivoProgresso();
  const notebook = dados?.errosNotebook || {};
  const recentes = dados?.errosRecentes || [];
  const existentes = new Set(recentes.map(r => `${r.aulaId}:${r.chave}`));

  const faltando = [];
  Object.keys(notebook).forEach(aulaId => {
    (notebook[aulaId] || []).forEach(chave => {
      if (!existentes.has(`${aulaId}:${chave}`)) faltando.push({ aulaId, chave });
    });
  });
  if (faltando.length === 0) return recentes;

  const base = dados?.savedAt ? new Date(dados.savedAt).getTime() : Date.now();
  const completos = [
    ...recentes,
    ...faltando.map((item, i) => ({ ...item, quando: new Date(base - (faltando.length - i) * 1000).toISOString() })),
  ];
  await gravarArquivoProgresso({ errosRecentes: completos });
  return completos;
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
  const salvou = await gravarArquivoProgresso({ cartoesMarcados: marcados });
  return { marcando, salvou };
}

// ── INSÍGNIAS (persistido no arquivo de progresso) ───────────
// Formato: ["nivel1", ...] — ids de insígnias já conquistadas (ver
// NIVEIS em js/data/modulos.js). Uma vez conquistada, nunca é removida.
async function getInsignias() {
  const dados = await lerArquivoProgresso();
  return dados?.insignias || [];
}

async function conquistarInsignia(insigniaId) {
  const atuais = await getInsignias();
  if (atuais.includes(insigniaId)) return { nova: false, insignias: atuais };
  const insignias = [...atuais, insigniaId];
  await gravarArquivoProgresso({ insignias });
  return { nova: true, insignias };
}

// ── SEMENTE DO SIMULADO (persistido no arquivo de progresso) ──
// O Simulado (ver montarSimulado em js/estudo.js) sorteia 25 questões dos
// módulos 1-5 — mas precisa sortear sempre o MESMO conjunto/ordem enquanto o
// usuário ainda está revisando erros dessa tentativa, senão o índice salvo
// no caderno de erros ("checagemN") passaria a apontar pra uma pergunta
// diferente a cada recarregamento. A semente é limpa só quando a tentativa
// termina (100% de acerto), pra próxima vez sortear um conjunto novo.
async function getSimuladoSeed() {
  const dados = await lerArquivoProgresso();
  return dados?.simuladoSeed ?? null;
}

async function definirSimuladoSeed(seed) {
  await gravarArquivoProgresso({ simuladoSeed: seed });
}

async function limparSimuladoSeed() {
  await gravarArquivoProgresso({ simuladoSeed: null });
}
