'use strict';

/**
 * ESTUDO.JS — Controller genérico da tela de estudos.
 * Carrega dinamicamente o arquivo de questões da aula via URL: ?aula=N
 * Para criar uma nova aula, basta criar js/data/questoes/aula-N.js
 */

const LETRAS = ['A', 'B', 'C', 'D'];
const aulaId = new URLSearchParams(window.location.search).get('aula') || '1';

// ── ESTADO ───────────────────────────────────────────────────
const estado = {
  atual:     0,
  respostas: [],   // preenchido após carregar as questões
};

// ── CARREGAR QUESTÕES DINAMICAMENTE ─────────────────────────
function carregarAula(id) {
  return new Promise((resolve, reject) => {
    const script  = document.createElement('script');
    script.src    = `js/data/questoes/aula-${id}.js`;
    script.onload = () => resolve(window.AULA_DATA);
    script.onerror = () => reject(new Error(`Aula ${id} não encontrada.`));
    document.head.appendChild(script);
  });
}

// ── ELEMENTOS ────────────────────────────────────────────────
const questaoInfo      = document.getElementById('questaoInfo');
const progressSegs     = document.getElementById('progressSegmentos');
const tagDificuldade   = document.getElementById('tagDificuldade');
const questaoTitulo    = document.getElementById('questaoTitulo');
const questaoSubtitulo = document.getElementById('questaoSubtitulo');
const opcoesEl         = document.getElementById('opcoes');
const feedbackBar      = document.getElementById('feedbackBar');
const feedbackIcon     = document.getElementById('feedbackIcon');
const feedbackTexto    = document.getElementById('feedbackTexto');
const btnAnterior      = document.getElementById('btnAnterior');
const btnProxima       = document.getElementById('btnProxima');
const tagsRow          = document.getElementById('tagsRow');

// ── TELA DE INTRODUÇÃO ───────────────────────────────────────
function mostrarIntro(aula) {
  // Oculta elementos das questões
  tagsRow.style.display    = 'none';
  feedbackBar.style.display = 'none';
  btnAnterior.style.display = 'none';

  // Atualiza header
  questaoInfo.textContent = aula.titulo;
  progressSegs.innerHTML  = '';

  // Monta conteúdo da intro
  questaoTitulo.innerHTML = `
    <span class="intro-label">Justificativa da lição</span>
    ${aula.titulo}`;

  questaoSubtitulo.textContent = '';

  opcoesEl.innerHTML = `
    <div class="intro-card">
      ${(aula.justificativa || []).map(p => `<p>${p}</p>`).join('')}
    </div>`;

  // Botão "Começar"
  btnProxima.innerHTML  = 'Começar <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled   = false;
}

function sairIntro() {
  tagsRow.style.display     = '';
  feedbackBar.style.display = '';
  btnAnterior.style.display = '';
  questaoTitulo.innerHTML   = '';
}

// ── RENDERIZAR QUESTÃO ───────────────────────────────────────
function renderQuestao(aula) {
  const questoes = aula.questoes;
  const q        = questoes[estado.atual];
  const idx      = estado.atual;
  const total    = questoes.length;

  // Header
  questaoInfo.textContent = `Questão ${idx + 1} de ${total} • ${aula.titulo}`;
  tagDificuldade.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
      <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
    </svg> ${q.dificuldade}`;

  // Segmentos de progresso
  progressSegs.innerHTML = '';
  questoes.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'seg';
    if (estado.respostas[i] !== null) seg.classList.add('respondida');
    else if (i === idx)               seg.classList.add('atual');
    progressSegs.appendChild(seg);
  });

  // Enunciado
  questaoTitulo.textContent    = q.titulo;
  questaoSubtitulo.textContent = q.subtitulo;

  // Opções
  opcoesEl.innerHTML = '';
  const respostaDada = estado.respostas[idx];

  q.opcoes.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className = 'opcao';

    if (respostaDada !== null) {
      btn.disabled = true;
      if (i === q.correta)                              btn.classList.add('correta');
      else if (i === respostaDada && i !== q.correta)   btn.classList.add('errada');
    }

    btn.innerHTML = `<span class="letra">${LETRAS[i]}</span><span class="opcao-texto">${texto}</span>`;

    if (respostaDada === null) {
      btn.addEventListener('click', () => {
        responder(i, aula);
      });
    }
    opcoesEl.appendChild(btn);
  });

  // Feedback
  if (respostaDada !== null) {
    const acertou = respostaDada === q.correta;
    feedbackBar.className     = `feedback-bar show ${acertou ? 'acerto' : 'erro'}`;
    feedbackIcon.textContent  = acertou ? '✅' : '❌';
    feedbackTexto.textContent = acertou ? `Correto! ${q.feedback}` : `Incorreto. ${q.feedback}`;
  } else {
    feedbackBar.className = 'feedback-bar';
  }

  // Botões de navegação
  btnAnterior.disabled = idx === 0;

  const todasRespondidas = estado.respostas.every(r => r !== null);
  if (idx === total - 1) {
    btnProxima.innerHTML  = 'Concluir ✓';
    btnProxima.disabled   = !todasRespondidas;
  } else {
    btnProxima.innerHTML  = `Próxima <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    btnProxima.disabled   = respostaDada === null;
  }
}

// ── RESPONDER ────────────────────────────────────────────────
function responder(opcaoIdx, aula) {
  if (estado.respostas[estado.atual] !== null) return;
  estado.respostas[estado.atual] = opcaoIdx;
  renderQuestao(aula);
}

// ── RESULTADO ────────────────────────────────────────────────
function calcularEstrelas(aula) {
  const questoes = aula.questoes;
  const acertos  = estado.respostas.filter((r, i) => r === questoes[i].correta).length;
  const pct      = acertos / questoes.length;

  if (pct >= 0.8) return { estrelas: 3, emoji: '🎉', titulo: 'Excelente!',        desc: `Você acertou ${acertos} de ${questoes.length} questões. Parabéns!` };
  if (pct >= 0.5) return { estrelas: 2, emoji: '👍', titulo: 'Bom trabalho!',      desc: `Você acertou ${acertos} de ${questoes.length} questões. Continue praticando!` };
  return           { estrelas: 1, emoji: '💪', titulo: 'Continue tentando!', desc: `Você acertou ${acertos} de ${questoes.length} questões. Revise a lição e tente novamente.` };
}

function mostrarResultado(aula) {
  const questoes         = aula.questoes;
  const acertos          = estado.respostas.filter((r, i) => r === questoes[i].correta).length;
  const { estrelas, emoji, titulo, desc } = calcularEstrelas(aula);

  document.getElementById('resultadoEmoji').textContent   = emoji;
  document.getElementById('resultadoTitulo').textContent  = titulo;
  document.getElementById('resultadoDesc').textContent    = desc;
  document.getElementById('resultadoEstrelas').textContent = '★'.repeat(estrelas) + '☆'.repeat(3 - estrelas);
  document.getElementById('resultadoOverlay').classList.add('show');

  // Passa resultado para index.html via sessionStorage
  sessionStorage.setItem(`aula${aulaId}_resultado`, JSON.stringify({
    aulaId:  parseInt(aulaId),
    estrelas,
    acertos,
    total: questoes.length,
  }));
}

// ── LIÇÃO (modal) ────────────────────────────────────────────
function abrirLicao(aula) {
  const el = document.getElementById('licaoHeader');
  if (el) el.textContent = aula.licao.titulo;
  const corpo = document.getElementById('licaoCorpo');
  if (corpo) corpo.innerHTML = aula.licao.html;
  document.getElementById('licaoOverlay').classList.add('show');
}

// ── INIT ─────────────────────────────────────────────────────
carregarAula(aulaId).then(aula => {
  // Inicializa estado com o número correto de questões
  estado.respostas = new Array(aula.questoes.length).fill(null);

  // Mostra tela de introdução antes das questões
  let introVisivel = true;
  mostrarIntro(aula);

  // Navegação
  btnAnterior.addEventListener('click', () => {
    if (estado.atual > 0) { estado.atual--; renderQuestao(aula); }
  });

  btnProxima.addEventListener('click', () => {
    if (introVisivel) {
      introVisivel = false;
      sairIntro();
      renderQuestao(aula);
      return;
    }
    if (estado.atual < aula.questoes.length - 1) {
      estado.atual++;
      renderQuestao(aula);
    } else {
      mostrarResultado(aula);
    }
  });

  // Consultar lição
  document.getElementById('btnConsultar').addEventListener('click', () => abrirLicao(aula));

  // Fechar lição
  document.getElementById('licaoFechar').addEventListener('click',    () => document.getElementById('licaoOverlay').classList.remove('show'));
  document.getElementById('licaoBtnFechar').addEventListener('click', () => document.getElementById('licaoOverlay').classList.remove('show'));

  // Fechar / voltar
  document.getElementById('btnFechar').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Voltar ao início após resultado
  document.getElementById('resultadoBtnContinuar').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

}).catch(err => {
  console.error(err);
  document.getElementById('questaoTitulo').textContent = 'Aula não encontrada.';
});
