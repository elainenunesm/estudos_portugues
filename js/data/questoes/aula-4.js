'use strict';

/**
 * AULA-4.JS — Aula 4: Aprenda o que é o predicado
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     4,
  modulo: 'Etapa 3: Fundamentos do Predicado',
  titulo: 'Aula 4: Aprenda o que é o predicado',

  antesComecar: {
    titulo:      'O que é o predicado',
    descricao:   'Nesta aula você vai aprender o que é o predicado e como ele se relaciona com o sujeito na oração.',
    aprender:    'Nesta aula você aprenderá a identificar o predicado e reconhecer seus três tipos: verbal, nominal e verbo-nominal.',
    importancia: 'Reconhecer o predicado é essencial para entender o sentido completo da oração e para a concordância verbal e nominal.',
  },

  exemplo: [
    {
      tipo:  'fala',
      texto: 'Predicado é tudo aquilo que se <strong class="destaque">declara</strong> sobre o sujeito.',
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">predicado</strong>:',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Maria', 'estudou', 'ontem'],
          correta:  1,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">predicado</strong>:',
      passo: {
        numero:    '2º',
        instrucao: 'Encontre o <strong class="destaque">sujeito</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        rotulo: 'Selecione o sujeito abaixo:',
        interativo: {
          palavras:    ['Maria', 'estudou', 'ontem'],
          correta:     0,
          papel:       'sujeito',
          marcarAntes: [{ idx: 1, papel: 'verbo' }],
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">predicado</strong>:',
      passo: {
        numero:    '3º',
        instrucao: 'Encontre o <strong class="destaque">predicado</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        rotulo: 'Selecione o predicado abaixo:',
        interativo: {
          palavras:        ['Maria', 'estudou', 'ontem'],
          corretas:        [1, 2],
          papel:           'predicado',
          papeisIniciais:  { 1: 'verbo' },
          preSelecionadas: [1],
          marcarAntes: [
            { idx: 0, papel: 'sujeito' },
          ],
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">predicado</strong>:',
      passo: {
        numero:    '4º',
        instrucao: 'Tudo o que não for o sujeito é o <strong class="destaque">predicado</strong>.',
        nota:      'Nesse caso, o sujeito é <strong class="destaque">Maria</strong>, então o predicado é <strong class="destaque">estudou ontem</strong>.',
      },
      caixa: {
        anotado: {
          sentenca:  ['Maria', 'estudou', 'ontem'],
          verbo:     1,
          sujeito:   [0],
          predicado: [1, 2],
        },
      },
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'O que é o predicado?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'A palavra que pratica ou sofre a ação da oração.',
        'Tudo o que se declara sobre o sujeito, contendo o verbo.',
        'A palavra que qualifica o substantivo.',
        'O termo que substitui o nome do sujeito.',
      ],
      correta:  1,
      feedback: 'O predicado é tudo o que se declara sobre o sujeito — é a parte da oração que contém o verbo.',
    },
    {
      titulo:    'Clique no verbo, no sujeito e no predicado da frase:',
      sentenca:  ['O', 'cachorro', 'correu', 'no', 'parque', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4],
      feedback:  '"Correu" é o verbo. "O cachorro" é o sujeito. "Correu no parque" é o predicado — tudo o que se declara sobre o sujeito.',
    },
    {
      titulo:    'Clique no verbo, no sujeito e no predicado da frase:',
      sentenca:  ['A', 'menina', 'estuda', 'inglês', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3],
      feedback:  '"Estuda" é o verbo. "A menina" é o sujeito. "Estuda inglês" é o predicado.',
    },
    {
      titulo:    'Clique no verbo, no sujeito e no predicado da frase:',
      sentenca:  ['Os', 'alunos', 'leram', 'o', 'livro', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4],
      feedback:  '"Leram" é o verbo. "Os alunos" é o sujeito. "Leram o livro" é o predicado.',
    },
  ],

  resumo: {
    titulo: 'O predicado pode ser:',
    itens: [
      { tipo: 'predVerbal',       cor: '#16a34a', corFundo: '#dcfce7', titulo: 'Predicado Verbal',        exemplos: 'núcleo é o verbo — correu, estudou' },
      { tipo: 'predNominal',      cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Predicado Nominal',       exemplos: 'verbo de ligação + predicativo — está feliz' },
      { tipo: 'predVerboNominal', cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Predicado Verbo-Nominal', exemplos: 'dois núcleos — chegou cansado' },
    ],
  },

  licao: {
    titulo: '📖 Lição: O Predicado',
    html: `
      <p>O <strong>predicado</strong> é tudo o que se declara sobre o sujeito — é a parte da oração que contém o verbo.</p>
      <ul>
        <li><strong>Predicado verbal</strong> — núcleo é o verbo, indica ação:<br>
            <em>"O menino correu no parque."</em> → predicado: <strong>correu no parque</strong></li>
        <li><strong>Predicado nominal</strong> — núcleo é um nome, ligado ao sujeito por um verbo de ligação:<br>
            <em>"A menina está feliz."</em> → predicado: <strong>está feliz</strong> (feliz = predicativo do sujeito)</li>
        <li><strong>Predicado verbo-nominal</strong> — tem dois núcleos, um verbo e um nome:<br>
            <em>"O menino chegou cansado."</em> → predicado: <strong>chegou cansado</strong></li>
      </ul>
      <p>Os principais <strong>verbos de ligação</strong> são: ser, estar, ficar, permanecer, parecer, continuar, tornar-se.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o predicado da frase?',
      subtitulo:   '"O menino estudou a lição."',
      opcoes:      ['O menino', 'estudou a lição', 'a lição', 'estudou'],
      correta:     1,
      feedback:    '"Estudou a lição" é o predicado — tudo o que se declara sobre "o menino".',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o predicado da frase?',
      subtitulo:   '"As crianças brincam no parque."',
      opcoes:      ['As crianças', 'brincam no parque', 'no parque', 'brincam'],
      correta:     1,
      feedback:    '"Brincam no parque" é o predicado — tudo o que se declara sobre "as crianças".',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Que tipo de predicado aparece na frase?',
      subtitulo:   '"Maria é professora."',
      opcoes:      ['Predicado verbal', 'Predicado nominal', 'Predicado verbo-nominal', 'Não há predicado'],
      correta:     1,
      feedback:    '"É professora" é predicado nominal — "é" é verbo de ligação e "professora" é o predicativo do sujeito.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Que tipo de predicado aparece na frase?',
      subtitulo:   '"O menino correu."',
      opcoes:      ['Predicado verbal', 'Predicado nominal', 'Predicado verbo-nominal', 'Não há predicado'],
      correta:     0,
      feedback:    '"Correu" é predicado verbal — o núcleo é o verbo, que expressa uma ação.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Que tipo de predicado aparece na frase?',
      subtitulo:   '"Os alunos ficaram cansados."',
      opcoes:      ['Predicado verbal', 'Predicado nominal', 'Predicado verbo-nominal', 'Não há predicado'],
      correta:     1,
      feedback:    '"Ficaram cansados" é predicado nominal — "ficaram" é verbo de ligação (indica mudança de estado, sem ação) e "cansados" é o predicativo do sujeito.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Que tipo de predicado aparece na frase?',
      subtitulo:   '"Os jogadores voltaram exaustos ao vestiário."',
      opcoes:      ['Predicado verbal', 'Predicado nominal', 'Predicado verbo-nominal', 'Não há predicado'],
      correta:     2,
      feedback:    '"Voltaram exaustos" é predicado verbo-nominal — tem dois núcleos: o verbo "voltaram" (ação) e o nome "exaustos" (característica dos jogadores).',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual é o predicativo do sujeito na frase?',
      subtitulo:   '"O dia está lindo."',
      opcoes:      ['O dia', 'está', 'lindo', 'está lindo'],
      correta:     2,
      feedback:    '"Lindo" é o predicativo do sujeito — é o nome que atribui uma característica a "o dia", ligado a ele pelo verbo de ligação "está".',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Que tipo de predicado aparece na frase? (atenção!)',
      subtitulo:   '"O aluno permanece atento durante toda a aula."',
      opcoes:      ['Predicado verbal', 'Predicado nominal', 'Predicado verbo-nominal', 'Não há predicado'],
      correta:     1,
      feedback:    '"Permanece atento" é predicado nominal — "permanecer" é verbo de ligação (indica continuidade de um estado, sem ação real) e "atento" é o predicativo do sujeito.',
    },
  ],
};
