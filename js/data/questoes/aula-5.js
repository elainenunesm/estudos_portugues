'use strict';

/**
 * AULA-5.JS — Aula 5: Verbos fenômeno da natureza
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     5,
  modulo: 'Etapa 4: Orações sem sujeito',
  titulo: 'Aula 5: Verbos fenômeno da natureza',

  antesComecar: {
    titulo:      'Orações sem sujeito',
    descricao:   'Nesta aula você vai aprender que nem toda oração tem sujeito — e como reconhecer os verbos de fenômeno da natureza, que ficam sem sujeito.',
    aprender:    'Nesta aula você aprenderá a identificar orações sem sujeito com verbos de fenômeno da natureza, como chover, nevar, ventar e amanhecer.',
    importancia: 'Reconhecer a oração sem sujeito evita erros de interpretação — nem todo verbo tem alguém praticando ou sofrendo a ação.',
  },

  exemplo: [
    {
      tipo:  'semSujeito',
      texto: 'Em algumas ocasiões as orações podem <strong class="destaque">não ter sujeito</strong>, nesse caso eles são chamados de <strong class="destaque">verbos impessoais</strong>.',
    },
    {
      tipo:  'fala',
      texto: 'Nesse caso ninguém <strong class="destaque">pratica</strong> nem <strong class="destaque">sofre</strong> a ação do verbo.',
    },
    {
      tipo:  'dica',
      texto: 'Dica para resolver questões de verbos impessoais.',
      pontos: [
        {
          tipo:  'dica',
          texto: '<strong class="destaque">1ª</strong> Decorar os verbos que indicam verbo impessoal.',
        },
        {
          tipo:  'dica',
          texto: '<strong class="destaque">2ª</strong> Substituir o verbo pelo sentido dele e verificar se a frase continua coerente.',
        },
      ],
    },
    {
      tipo:  'busca',
      texto: 'Verbos de <strong class="destaque">fenômeno da natureza</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Choveu', 'muito', 'ontem'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Verbos de <strong class="destaque">fenômeno da natureza</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Usados no sentido literal (fenômeno da natureza), esses verbos não têm sujeito.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Choveu', 'muito', 'ontem'], verbo: 0, sujeito: [], predicado: [] },
        perguntas: [
          'Faça a pergunta: <strong class="destaque">é um fenômeno da natureza?</strong>',
          'Se sim, ninguém pratica ou sofre a ação — <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'dica',
      texto: '<strong class="destaque">Observação:</strong> nem toda frase com verbo parecido é sem sujeito — compare com o mesmo verbo usado em sentido figurado.',
      pontos: [
        {
          tipo:  'dica',
          texto: '<strong class="destaque">Choveu</strong> muito ontem. — sem sujeito (fenômeno da natureza).',
        },
        {
          tipo:  'dica',
          texto: '<strong class="destaque">A chuva</strong> caiu de manhã. — tem sujeito: "a chuva".',
        },
      ],
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'O que é uma oração sem sujeito?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'Uma oração em que o sujeito está oculto, mas existe.',
        'Uma oração em que ninguém pratica nem sofre a ação do verbo.',
        'Uma oração sem verbo.',
        'Uma oração com mais de um sujeito.',
      ],
      correta:  1,
      feedback: 'Oração sem sujeito é aquela em que não existe um ser que pratique ou sofra a ação — o sujeito é inexistente.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Choveu', 'muito', 'esta', 'semana', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3],
      feedback:  '"Choveu" indica fenômeno da natureza — não tem sujeito, a oração toda é predicado.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['A', 'chuva', 'caiu', 'de', 'manhã', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4],
      feedback:  '"Caiu" tem sujeito aqui ("a chuva") — diferente de "Choveu", que é impessoal.',
    },
  ],

  resumo: {
    titulo: 'A oração fica sem sujeito quando o verbo indica:',
    itens: [
      { tipo: 'fenomeno', cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Fenômeno da natureza', exemplos: 'chover, nevar, ventar, amanhecer' },
    ],
  },

  licao: {
    titulo: '📖 Lição: Verbos de Fenômeno da Natureza',
    html: `
      <p>A <strong>oração sem sujeito</strong> é aquela em que não existe um ser (pessoa, animal ou coisa) que pratique ou sofra a ação do verbo — o sujeito é <strong>inexistente</strong>.</p>
      <p><strong>Fenômenos da natureza</strong> — chover, nevar, ventar, trovejar, amanhecer, anoitecer — não têm sujeito quando usados no sentido literal:<br>
      <em>"Nevou a noite toda."</em></p>
      <p>Cuidado: alguns desses verbos também podem ser usados em sentido figurado, com sujeito próprio:<br>
      <em>"Choveram elogios sobre o time."</em> — aqui "elogios" é o sujeito (concorda no plural com "choveram").</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual frase é uma oração sem sujeito?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'O menino correu no parque.',
        'Choveu bastante na semana passada.',
        'As crianças brincaram juntas.',
        'Maria e João viajaram ontem.',
      ],
      correta:  1,
      feedback: '"Choveu" indica fenômeno da natureza — a oração não tem sujeito.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase TEM sujeito?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Trovejou a noite inteira.',
        'Nevou em toda a região.',
        'Os alunos estudaram para a prova.',
        'Anoiteceu cedo hoje.',
      ],
      correta:  2,
      feedback: '"Os alunos" é o sujeito — eles praticam a ação de estudar. As demais são orações sem sujeito (fenômenos da natureza).',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Qual é o sujeito da frase? (atenção!)',
      subtitulo:   '"Choveram críticas duras sobre a decisão."',
      opcoes:      ['Choveram', 'críticas duras', 'a decisão', 'Não tem sujeito'],
      correta:     1,
      feedback:    'Em sentido figurado, "chover" concorda com um sujeito — aqui, "críticas duras" (por isso "choveram", no plural).',
    },
  ],
};
