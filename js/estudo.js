'use strict';

/**
 * ESTUDO.JS — Controller genérico da tela de estudos.
 * Carrega dinamicamente o arquivo de questões da aula via URL: ?aula=N
 * Para criar uma nova aula, basta criar js/data/questoes/aula-N.js
 */

const LETRAS = ['A', 'B', 'C', 'D'];
const params   = new URLSearchParams(window.location.search);
const aulaId   = params.get('aula') || '1';
const modoErros = params.get('modo') === 'erros';

// ── ESTADO ───────────────────────────────────────────────────
const estado = {
  atual:     0,
  respostas: [],   // preenchido após carregar as questões
  origIdx:   [],   // mapeia índice exibido -> índice original em aula.questoes (modo caderno de erros)
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
const questaoTitulo    = document.getElementById('questaoTitulo');
const questaoSubtitulo = document.getElementById('questaoSubtitulo');
const opcoesEl         = document.getElementById('opcoes');
const feedbackBar      = document.getElementById('feedbackBar');
const feedbackIcon     = document.getElementById('feedbackIcon');
const feedbackTexto    = document.getElementById('feedbackTexto');
const btnAnterior      = document.getElementById('btnAnterior');
const btnProxima       = document.getElementById('btnProxima');
const questaoArea      = document.getElementById('questaoArea');
const scrollFade       = document.getElementById('scrollFade');

function atualizarScrollFade() {
  if (!questaoArea || !scrollFade) return;
  const atBottom = questaoArea.scrollHeight - questaoArea.scrollTop <= questaoArea.clientHeight + 8;
  scrollFade.classList.toggle('oculto', atBottom);
}
questaoArea.addEventListener('scroll', atualizarScrollFade);

// ── TELAS DE INTRODUÇÃO ─────────────────────────────────────
let introTotal = 0;

function renderIntroSegs(step) {
  progressSegs.innerHTML = '';
  for (let i = 0; i < introTotal; i++) {
    const seg = document.createElement('div');
    seg.className = i <= step ? 'seg respondida' : 'seg';
    progressSegs.appendChild(seg);
  }
}

function mostrarIntro(aula, introIdx = 0) {
  // Oculta elementos das questões
  feedbackBar.style.display = 'none';
  btnAnterior.style.display = introIdx > 0 ? '' : 'none';

  // Atualiza header
  questaoInfo.textContent = aula.titulo;
  if (introIdx === 0) {
    progressSegs.innerHTML = '';
  } else {
    renderIntroSegs(introIdx - 1);
  }

  // Monta conteúdo da intro
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';

  const ac = aula.antesComecar || {};
  opcoesEl.innerHTML = `
    <div class="intro-card">
      <span class="intro-label">Antes de começar</span>
      <h2 class="intro-titulo">${ac.titulo || aula.titulo}</h2>
      <p class="intro-desc">${ac.descricao || ''}</p>
      <div class="intro-info">
        <div class="intro-info-item">
          <div class="intro-info-icone-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4A80F0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div class="intro-info-texto">
            <h3>O que você vai aprender</h3>
            <p>${ac.aprender || ''}</p>
          </div>
        </div>
        <div class="intro-info-item">
          <div class="intro-info-icone-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4A80F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </div>
          <div class="intro-info-texto">
            <h3>Por que isso é importante</h3>
            <p>${ac.importancia || ''}</p>
          </div>
        </div>
      </div>
    </div>`;

  // Botão "Começar"
  btnProxima.innerHTML  = 'Começar <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled   = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

function sairIntro() {
  feedbackBar.style.display = '';
  btnAnterior.style.display = '';
  questaoTitulo.innerHTML   = '';
}

function mostrarDefinicao(aula, introIdx) {
  const def = aula.definicao || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="definicao-card">
      <div class="definicao-icone-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="#4A80F0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="40" height="40">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
      <p class="definicao-texto">${def.texto || ''}</p>
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

function mostrarContexto(aula, introIdx) {
  const ctx = aula.contexto || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = introIdx > 0 ? '' : 'none';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="contexto-card">
      <div class="contexto-icone-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="#4A80F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="36" height="36">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <p class="contexto-texto">${ctx.texto || ''}</p>
      ${ctx.nota ? `
      <div class="contexto-nota">
        <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="#4A80F0"/><rect x="11" y="11" width="2" height="6" rx="1" fill="white"/><rect x="11" y="8" width="2" height="2" rx="1" fill="white"/></svg>
        <span>${ctx.nota}</span>
      </div>` : ''}
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

// Tela de exemplo do fenômeno da natureza usa um nascer do sol
// (em vez da chuva do resumo), para casar com a palavra "Amanheceu".
const EXEMPLO_ICONE_FENOMENO = `
  <path fill="none" stroke="#4A80F0" stroke-width="1.8" stroke-linecap="round" d="M13 2v2M8.5 4.9l1 1M17.5 4.9l-1 1"/>
  <path fill="#4A80F0" d="M8 12a5 5 0 0 1 10 0z"/>
  <line x1="6" y1="12" x2="20" y2="12" stroke="#4A80F0" stroke-width="1.8" stroke-linecap="round"/>
  <path fill="none" stroke="#4A80F0" stroke-width="1.8" stroke-linecap="round" d="M8 16h4M15 16h3M10 19h3"/>`;

function mostrarExemplo(aula, introIdx, i) {
  const ex = (aula.exemplo || [])[i] || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  const icone = ex.tipo === 'fenomeno'
    ? EXEMPLO_ICONE_FENOMENO
    : (RESUMO_ICONES[ex.tipo] ? RESUMO_ICONES[ex.tipo]('#4A80F0') : RESUMO_ICONES.acao('#4A80F0'));
  opcoesEl.innerHTML = `
    <div class="exemplo-card">
      <div class="exemplo-icone-wrap">
        <svg viewBox="-6 0 30 24" fill="none" width="60" height="48">
          <line x1="-5" y1="8"  x2="0" y2="8"  stroke="#b8ccf4" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="-5" y1="12" x2="1" y2="12" stroke="#b8ccf4" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="-5" y1="16" x2="0" y2="16" stroke="#b8ccf4" stroke-width="2.2" stroke-linecap="round"/>
          ${icone}
        </svg>
      </div>
      <p class="exemplo-texto">${ex.texto || ''}</p>
      ${ex.conclusao ? `<p class="exemplo-conclusao">${ex.conclusao}</p>` : ''}
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

// ── ÍCONES DO RESUMO ─────────────────────────────────────────
const RESUMO_ICONES = {
  acao:     cor => `<path fill="${cor}" d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>`,
  estado:   cor => `<circle cx="12" cy="5" r="2.5" fill="${cor}"/><path fill="${cor}" d="M12 9c-3 0-5 2-5 4.5V17h3v4h4v-4h3v-3.5C17 11 15 9 12 9z"/>`,
  mudanca:  cor => `<path fill="none" stroke="${cor}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
  fenomeno: cor => `<path fill="${cor}" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/><line x1="8" y1="20" x2="8" y2="23" stroke="${cor}" stroke-width="2.2" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="23" stroke="${cor}" stroke-width="2.2" stroke-linecap="round"/><line x1="16" y1="20" x2="16" y2="23" stroke="${cor}" stroke-width="2.2" stroke-linecap="round"/>`,
};

function mostrarInfinitivo(aula, introIdx) {
  const inf = aula.infinitivo || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="infinitivo-card">
      <div class="infinitivo-icone-wrap">
        <span class="infinitivo-icone-simbolo">∞</span>
      </div>
      <p class="infinitivo-descricao">${inf.descricao || ''}</p>
      ${inf.nota ? `<p class="infinitivo-nota">${inf.nota}</p>` : ''}
      <p class="infinitivo-conj-titulo">Normalmente, os infinitivos terminam em:</p>
      <div class="infinitivo-conjs">
        ${(inf.conjugacoes || []).map(c => `
        <div class="infinitivo-conj-card">
          <span class="infinitivo-conj-sufixo">${c.sufixo}</span>
          <span class="infinitivo-conj-label">${c.label}</span>
        </div>`).join('')}
      </div>
      ${inf.extra ? `<p class="infinitivo-extra">${inf.extra}</p>` : ''}
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

function mostrarResumo(aula, introIdx) {
  const res = aula.resumo || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="resumo-card">
      <p class="resumo-titulo">${res.titulo || ''}</p>
      ${(res.itens || []).map(item => `
      <div class="resumo-item">
        <div class="resumo-icone" style="background:${item.corFundo}">
          <svg viewBox="0 0 24 24" width="26" height="26">
            ${RESUMO_ICONES[item.tipo] ? RESUMO_ICONES[item.tipo](item.cor) : ''}
          </svg>
        </div>
        <div class="resumo-item-info">
          <span class="resumo-item-titulo" style="color:${item.cor}">${item.titulo}</span>
          <span class="resumo-item-exemplos">${item.exemplos}</span>
        </div>
      </div>`).join('')}
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

function mostrarIdentificacao(aula, introIdx) {
  const idf = aula.identificacao || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="idf-card">
      <div class="idf-header">
        <div class="idf-icone-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="30" height="30">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <p class="idf-titulo">${idf.titulo || ''}</p>
      </div>
      <p class="idf-intro">${idf.intro || ''}</p>
      <div class="idf-exemplos">
        ${(idf.exemplos || []).map(e => `
        <div class="idf-exemplo-card">
          <span class="idf-palavra">${e.palavra}</span>
          <span class="idf-linha">${e.infinitivo} → terminação <strong>${e.terminacao}</strong></span>
          <span class="idf-linha">→ ${e.conjugacao}</span>
        </div>`).join('')}
      </div>
      ${idf.rodape ? `<p class="idf-rodape">${idf.rodape}</p>` : ''}
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

function mostrarSentido(aula, introIdx) {
  const s = aula.sentido || {};
  questaoInfo.textContent      = aula.titulo;
  btnAnterior.style.display    = '';
  renderIntroSegs(introIdx - 1);
  questaoTitulo.innerHTML      = '';
  questaoSubtitulo.textContent = '';
  opcoesEl.innerHTML = `
    <div class="sentido-card">
      <div class="sentido-dica">
        <span class="sentido-dica-icone">💡</span>
        <p>${s.dica || ''}</p>
      </div>
      ${(s.textos || []).map(t => `<p class="sentido-texto">${t}</p>`).join('')}
      <p class="sentido-exemplos-titulo">${s.exemplos?.titulo || ''}</p>
      <div class="sentido-exemplos">
        ${(s.exemplos?.itens || []).map(item => `
        <div class="sentido-item">
          <div class="resumo-icone" style="background:${item.corFundo}">
            <svg viewBox="0 0 24 24" width="26" height="26">
              ${RESUMO_ICONES[item.tipo] ? RESUMO_ICONES[item.tipo](item.cor) : ''}
            </svg>
          </div>
          <div class="sentido-item-texto">
            <p class="sentido-item-frase">${item.frase}</p>
            <p class="sentido-item-cadeia">${item.cadeia}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  btnProxima.innerHTML = 'Próximo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  btnProxima.disabled  = false;
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

// ── RENDERIZAR QUESTÃO ───────────────────────────────────────
function renderQuestao(aula) {
  const questoes = aula.questoes;
  const q        = questoes[estado.atual];
  const idx      = estado.atual;
  const total    = questoes.length;

  // Header
  questaoInfo.textContent = `Questão ${idx + 1} de ${total} • ${aula.titulo}`;

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
  questaoArea.scrollTop = 0;
  atualizarScrollFade();
}

// ── RESPONDER ────────────────────────────────────────────────
function responder(opcaoIdx, aula) {
  if (estado.respostas[estado.atual] !== null) return;
  estado.respostas[estado.atual] = opcaoIdx;

  // Errou → vai para o caderno de erros e não sai mais de lá, mesmo se acertar depois.
  const q = aula.questoes[estado.atual];
  if (opcaoIdx !== q.correta) {
    addErro(aulaId, estado.origIdx[estado.atual]);
  }

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
  const questoes = aula.questoes;
  const acertos  = estado.respostas.filter((r, i) => r === questoes[i].correta).length;

  if (modoErros) {
    document.getElementById('resultadoEmoji').textContent   = '📓';
    document.getElementById('resultadoTitulo').textContent  = 'Prática concluída!';
    document.getElementById('resultadoDesc').textContent    = `Você acertou ${acertos} de ${questoes.length} questões revisadas. As questões erradas continuam no caderno de erros para você revisar de novo.`;
    document.getElementById('resultadoEstrelas').textContent = '';
    document.getElementById('resultadoOverlay').classList.add('show');
    return;
  }

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
Promise.all([carregarAula(aulaId), modoErros ? getErrorNotebook() : Promise.resolve(null)]).then(([aulaOriginal, notebook]) => {
  let aula = aulaOriginal;

  if (modoErros) {
    const errIdxs = (notebook[String(aulaId)] || []).slice().sort((a, b) => a - b);
    if (errIdxs.length === 0) {
      window.location.href = 'index.html?view=erros';
      return;
    }
    aula = { ...aulaOriginal, titulo: `Caderno de Erros — ${aulaOriginal.titulo}`, questoes: errIdxs.map(i => aulaOriginal.questoes[i]) };
    estado.origIdx = errIdxs;
  } else {
    estado.origIdx = aula.questoes.map((_, i) => i);
  }

  // Inicializa estado com o número correto de questões
  estado.respostas = new Array(aula.questoes.length).fill(null);

  // Telas de intro em ordem (dinâmico, baseado nos campos da aula) — puladas no modo caderno de erros
  const introScreens = ['justificativa'];
  const introFns = { justificativa: mostrarIntro, definicao: mostrarDefinicao, contexto: mostrarContexto, infinitivo: mostrarInfinitivo, resumo: mostrarResumo, identificacao: mostrarIdentificacao, sentido: mostrarSentido };
  if (aula.definicao)     introScreens.push('definicao');
  if (aula.contexto)      introScreens.push('contexto');
  (aula.exemplo || []).forEach((_, i) => {
    const chave = `exemplo${i}`;
    introScreens.push(chave);
    introFns[chave] = (a, idx) => mostrarExemplo(a, idx, i);
  });
  // Tela de resumo desativada por enquanto (dado da aula mantido para uso futuro)
  // if (aula.resumo)     introScreens.push('resumo');
  if (aula.infinitivo)    introScreens.push('infinitivo');
  if (aula.identificacao) introScreens.push('identificacao');
  if (aula.sentido)        introScreens.push('sentido');
  introTotal = introScreens.length - 1;
  let introIdx = 0;
  let introAtiva = !modoErros;
  if (introAtiva) {
    introFns[introScreens[0]](aula, 0);
  } else {
    sairIntro();
    renderQuestao(aula);
  }

  // Navegação
  btnAnterior.addEventListener('click', () => {
    if (introAtiva) {
      if (introIdx > 0) {
        introIdx--;
        introFns[introScreens[introIdx]](aula, introIdx);
      }
      return;
    }
    if (estado.atual > 0) { estado.atual--; renderQuestao(aula); }
  });

  btnProxima.addEventListener('click', () => {
    if (introAtiva) {
      introIdx++;
      if (introIdx < introScreens.length) {
        introFns[introScreens[introIdx]](aula, introIdx);
      } else {
        introAtiva = false;
        sairIntro();
        renderQuestao(aula);
      }
      return;
    }
    if (estado.atual < aula.questoes.length - 1) {
      estado.atual++;
      renderQuestao(aula);
    } else {
      mostrarResultado(aula);
    }
  });

  // Fechar lição
  document.getElementById('licaoFechar').addEventListener('click',    () => document.getElementById('licaoOverlay').classList.remove('show'));
  document.getElementById('licaoBtnFechar').addEventListener('click', () => document.getElementById('licaoOverlay').classList.remove('show'));

  // Fechar / voltar
  const destinoVoltar = modoErros ? 'index.html?view=erros' : 'index.html';
  document.getElementById('btnFechar').addEventListener('click', () => {
    window.location.href = destinoVoltar;
  });

  // Voltar ao início após resultado
  document.getElementById('resultadoBtnContinuar').addEventListener('click', () => {
    window.location.href = destinoVoltar;
  });

}).catch(err => {
  console.error(err);
  document.getElementById('questaoTitulo').textContent = 'Aula não encontrada.';
});
