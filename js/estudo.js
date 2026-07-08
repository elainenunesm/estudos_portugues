'use strict';

// ── QUESTÕES — AULA 1: IDENTIFIQUE O VERBO ──────────────────
const questoes = [
  {
    dificuldade: 'Fácil',
    titulo: 'Qual é o verbo na frase?',
    subtitulo: '"O menino correu no parque."',
    opcoes: ['menino', 'correu', 'parque', 'no'],
    correta: 1,
    feedback: '"Correu" é o verbo — indica a ação do menino. Infinitivo: correr.',
  },
  {
    dificuldade: 'Fácil',
    titulo: 'Identifique o verbo:',
    subtitulo: '"Maria estuda todos os dias."',
    opcoes: ['Maria', 'todos', 'estuda', 'dias'],
    correta: 2,
    feedback: '"Estuda" é o verbo — indica o que Maria faz. Infinitivo: estudar.',
  },
  {
    dificuldade: 'Fácil',
    titulo: 'Qual palavra é um verbo?',
    subtitulo: 'Escolha a alternativa correta.',
    opcoes: ['casa', 'bonito', 'rapidamente', 'cantar'],
    correta: 3,
    feedback: '"Cantar" é o verbo no infinitivo. As outras palavras são: substantivo, adjetivo e advérbio.',
  },
  {
    dificuldade: 'Médio',
    titulo: 'Qual é o verbo na frase?',
    subtitulo: '"Ela comprou um livro novo na livraria."',
    opcoes: ['livro', 'novo', 'livraria', 'comprou'],
    correta: 3,
    feedback: '"Comprou" é o verbo — indica a ação de Ela. Infinitivo: comprar.',
  },
  {
    dificuldade: 'Médio',
    titulo: 'Qual frase contém um verbo de estado?',
    subtitulo: 'Escolha a alternativa correta.',
    opcoes: [
      'O cachorro latiu alto.',
      'Ana ficou triste com a notícia.',
      'Pedro comprou um carro.',
      'A chuva caiu forte.',
    ],
    correta: 1,
    feedback: '"Ficou" é um verbo de estado — indica mudança de estado de Ana. Os outros são verbos de ação ou fenômeno.',
  },
];

// ── ESTADO ───────────────────────────────────────────────────
const estado = {
  atual:     0,
  respostas: new Array(questoes.length).fill(null), // null = não respondida
};

const LETRAS = ['A', 'B', 'C', 'D'];

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

// ── RENDERIZAR QUESTÃO ───────────────────────────────────────
function renderQuestao() {
  const q   = questoes[estado.atual];
  const idx = estado.atual;
  const total = questoes.length;

  // Header
  questaoInfo.textContent = `Questão ${idx + 1} de ${total} • Aula 1: Identifique o verbo`;
  tagDificuldade.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
    ${q.dificuldade}`;

  // Segmentos de progresso
  progressSegs.innerHTML = '';
  questoes.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'seg';
    if (estado.respostas[i] !== null) seg.classList.add('respondida');
    else if (i === idx)               seg.classList.add('atual');
    progressSegs.appendChild(seg);
  });

  // Questão
  questaoTitulo.textContent   = q.titulo;
  questaoSubtitulo.textContent = q.subtitulo;

  // Opções
  opcoesEl.innerHTML = '';
  q.opcoes.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className = 'opcao';

    const respostaDada = estado.respostas[idx];
    if (respostaDada !== null) {
      btn.disabled = true;
      if (i === q.correta)                         btn.classList.add('correta');
      else if (i === respostaDada && i !== q.correta) btn.classList.add('errada');
    }

    btn.innerHTML = `
      <span class="letra">${LETRAS[i]}</span>
      <span class="opcao-texto">${texto}</span>`;

    if (respostaDada === null) {
      btn.addEventListener('click', () => responder(i));
    }
    opcoesEl.appendChild(btn);
  });

  // Feedback
  const resp = estado.respostas[idx];
  if (resp !== null) {
    const acertou = resp === q.correta;
    feedbackBar.className = `feedback-bar show ${acertou ? 'acerto' : 'erro'}`;
    feedbackIcon.textContent  = acertou ? '✅' : '❌';
    feedbackTexto.textContent = acertou ? `Correto! ${q.feedback}` : `Incorreto. ${q.feedback}`;
  } else {
    feedbackBar.className = 'feedback-bar';
  }

  // Botões de navegação
  btnAnterior.disabled = idx === 0;
  const todasRespondidas = estado.respostas.every(r => r !== null);
  if (idx === total - 1) {
    btnProxima.textContent = 'Concluir';
    btnProxima.innerHTML   = 'Concluir ✓';
    btnProxima.disabled    = !todasRespondidas;
  } else {
    btnProxima.innerHTML = `Próxima <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    btnProxima.disabled  = resp === null;
  }
}

// ── RESPONDER ────────────────────────────────────────────────
function responder(opcaoIdx) {
  if (estado.respostas[estado.atual] !== null) return;
  estado.respostas[estado.atual] = opcaoIdx;
  renderQuestao();
}

// ── CALCULAR RESULTADO ───────────────────────────────────────
function calcularEstrelas() {
  const acertos = estado.respostas.filter((r, i) => r === questoes[i].correta).length;
  const pct = acertos / questoes.length;
  if (pct >= 0.8) return { estrelas: 3, emoji: '🎉', titulo: 'Excelente!', desc: `Você acertou ${acertos} de ${questoes.length} questões. Parabéns!` };
  if (pct >= 0.5) return { estrelas: 2, emoji: '👍', titulo: 'Bom trabalho!', desc: `Você acertou ${acertos} de ${questoes.length} questões. Continue praticando!` };
  return       { estrelas: 1, emoji: '💪', titulo: 'Continue tentando!', desc: `Você acertou ${acertos} de ${questoes.length} questões. Revise a lição e tente novamente.` };
}

function mostrarResultado() {
  const { estrelas, emoji, titulo, desc } = calcularEstrelas();
  document.getElementById('resultadoEmoji').textContent   = emoji;
  document.getElementById('resultadoTitulo').textContent  = titulo;
  document.getElementById('resultadoDesc').textContent    = desc;
  document.getElementById('resultadoEstrelas').textContent = '★'.repeat(estrelas) + '☆'.repeat(3 - estrelas);
  document.getElementById('resultadoOverlay').classList.add('show');

  // Salva estado no sessionStorage para a tela principal atualizar
  const acertos = estado.respostas.filter((r, i) => r === questoes[i].correta).length;
  sessionStorage.setItem('aula1_resultado', JSON.stringify({ estrelas, acertos, total: questoes.length }));
}

// ── EVENTOS ──────────────────────────────────────────────────
btnAnterior.addEventListener('click', () => {
  if (estado.atual > 0) {
    estado.atual--;
    renderQuestao();
  }
});

btnProxima.addEventListener('click', () => {
  if (estado.atual < questoes.length - 1) {
    estado.atual++;
    renderQuestao();
  } else {
    mostrarResultado();
  }
});

document.getElementById('btnFechar').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('btnConsultar').addEventListener('click', () => {
  document.getElementById('licaoOverlay').classList.add('show');
});
document.getElementById('licaoFechar').addEventListener('click', () => {
  document.getElementById('licaoOverlay').classList.remove('show');
});
document.getElementById('licaoBtnFechar').addEventListener('click', () => {
  document.getElementById('licaoOverlay').classList.remove('show');
});

document.getElementById('resultadoBtnContinuar').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// ── INIT ─────────────────────────────────────────────────────
renderQuestao();
