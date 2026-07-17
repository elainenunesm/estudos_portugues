'use strict';

/**
 * AULA-10.JS — Aula 10: Simulado Nível 1
 * Não edite o array "checagem" abaixo — ele fica vazio de propósito.
 * O controller (js/estudo.js, função montarSimulado) monta a lista de
 * verdade em tempo de execução, sorteando itens de checagem dos módulos
 * 1 a 5 (aulas 1 a 8) conforme "simulado.porModulo" abaixo.
 */
window.AULA_DATA = {
  id:     10,
  modulo: 'Etapa 6: Resumo rápido',
  titulo: 'Aula 10: Simulado Nível 1',

  simulado: {
    etapaId:   6,
    porModulo: 5,
  },

  antesComecar: {
    titulo:      'Simulado Nível 1',
    descricao:   'Este simulado reúne 25 questões escolhidas aleatoriamente dos módulos 1 a 5 (5 por módulo) e apresentadas em ordem misturada. Use para testar seus conhecimentos de forma integrada!',
    aprender:    'Nesta prática você vai revisar, de forma misturada, tudo que aprendeu sobre verbo, sujeito, predicado, orações sem sujeito e ordem invertida.',
    importancia: 'Praticar tudo junto, fora de ordem, é o melhor jeito de saber se você realmente aprendeu — não só decorou a sequência das aulas.',
  },

  exemplo: [
    {
      tipo:  'dica',
      texto: '<strong class="destaque">O que será cobrado:</strong>',
      pontos: [
        {
          tipo:  'busca',
          texto: '<strong class="destaque">M1 — Verbos</strong> (5 questões)<br>Múltipla escolha e seleção de palavra.',
        },
        {
          tipo:  'sujeito',
          texto: '<strong class="destaque">M2 — Sujeito</strong> (5 questões)<br>Identificar verbo e sujeito na frase.',
        },
        {
          tipo:  'predVerbal',
          texto: '<strong class="destaque">M3 — Predicado</strong> (5 questões)<br>Identificar verbo, sujeito e predicado.',
        },
        {
          tipo:  'semSujeito',
          texto: '<strong class="destaque">M4 — Orações sem sujeito</strong> (5 questões)<br>Identificar verbos impessoais.',
        },
        {
          tipo:  'mudanca',
          texto: '<strong class="destaque">M5 — Inversão da ordem</strong> (5 questões)<br>Frases com ordem invertida.',
        },
      ],
    },
  ],

  // Preenchido em tempo de execução — ver comentário no topo do arquivo.
  checagem: [],

  resumo: {
    titulo: 'Simulado — módulos 1 a 5:',
    itens: [
      { tipo: 'busca',      cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Verbos',              exemplos: '5 questões' },
      { tipo: 'sujeito',    cor: '#dc2626', corFundo: '#fee2e2', titulo: 'Sujeito',              exemplos: '5 questões' },
      { tipo: 'predVerbal', cor: '#16a34a', corFundo: '#dcfce7', titulo: 'Predicado',            exemplos: '5 questões' },
      { tipo: 'semSujeito', cor: '#0891b2', corFundo: '#cffafe', titulo: 'Orações sem sujeito',  exemplos: '5 questões' },
      { tipo: 'mudanca',    cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Inversão da ordem',    exemplos: '5 questões' },
    ],
  },

  licao: {
    titulo: '📖 Lição: Como usar o Simulado',
    html: `
      <p>O <strong>Simulado Nível 1</strong> reúne <strong>25 questões</strong>, sorteadas aleatoriamente entre as aulas dos módulos 1 a 5 — <strong>5 de cada módulo</strong> — e apresentadas numa ordem misturada, diferente da ordem em que você aprendeu.</p>
      <p>Isso ajuda a testar se você consegue reconhecer verbo, sujeito e predicado mesmo sem o contexto de "qual aula é essa" — do jeito que vai precisar reconhecer numa prova ou numa leitura de verdade.</p>
      <p>Errou alguma? Ela entra na fila de revisão, igual nas outras aulas, até você acertar todas.</p>
    `,
  },

  questoes: [],
};
