'use strict';

/**
 * AULA-7.JS — Aula 7: Verbo fazer
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     7,
  modulo: 'Etapa 4: Orações sem sujeito',
  titulo: 'Aula 7: Verbo fazer',

  antesComecar: {
    titulo:      'Verbo fazer',
    descricao:   'Nesta aula você vai aprender os sentidos do verbo fazer que deixam a oração sem sujeito.',
    aprender:    'Nesta aula você aprenderá a identificar o verbo fazer no sentido de tempo decorrido e de fenômeno climático.',
    importancia: 'Reconhecer esses casos evita erros comuns de concordância, como flexionar "fazer" no plural quando ele deve ficar sempre no singular.',
  },

  exemplo: [
    {
      tipo:  'fala',
      texto: 'O verbo <strong class="destaque">fazer</strong> costuma ter sujeito (ex: "Ela fez o trabalho") — mas em dois sentidos específicos, fica <strong class="destaque">sem sujeito</strong>.',
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Faz', 'muito', 'tempo', 'que', 'não', 'viajamos'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"fazer"</strong> indica <strong class="destaque">tempo decorrido</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Faz', 'muito', 'tempo', 'que', 'não', 'viajamos'], verbo: 0, sujeito: [], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '3º',
        instrucao: 'Confirme substituindo por <strong class="destaque">"haver"</strong> (tempo).',
      },
      caixa: {
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Fazer</strong> pode ser substituído por <strong class="destaque">Haver</strong> (tempo)?',
          { nota: '<strong class="destaque">Faz</strong> muito tempo que não viajamos → <strong class="destaque">Há</strong> muito tempo que não viajamos.' },
          'Se o sentido não mudou, é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">fenômeno climático</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Faz', 'muito', 'frio', 'hoje'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">fenômeno climático</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"fazer"</strong> indica <strong class="destaque">clima</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Faz', 'muito', 'frio', 'hoje'], verbo: 0, sujeito: [], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">fenômeno climático</strong>.',
      passo: {
        numero:    '3º',
        instrucao: 'Repare que ninguém pratica a ação.',
      },
      caixa: {
        perguntas: [
          'Faça a pergunta: <strong class="destaque">quem faz o frio?</strong>',
          { nota: 'Ninguém — <strong class="destaque">"faz frio"</strong> não tem um agente praticando a ação.' },
          'Assim como "chove" e "neva", é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'dica',
      texto: '<strong class="destaque">Observação:</strong> quando "fazer" tem sentido de "realizar", ele volta a ter sujeito normalmente.',
      pontos: [
        {
          tipo:  'dica',
          texto: '<strong class="destaque">Ela fez</strong> o trabalho. — tem sujeito: "ela".',
        },
        {
          tipo:  'dica',
          texto: '<strong class="destaque">Os alunos fizeram</strong> a prova. — tem sujeito: "os alunos".',
        },
      ],
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'Quando o verbo fazer fica sem sujeito?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'Sempre que ele aparece numa frase.',
        'Quando indica tempo decorrido ou fenômeno climático.',
        'Só quando está no futuro.',
        'Nunca — fazer sempre tem sujeito.',
      ],
      correta:  1,
      feedback: 'O verbo fazer fica sem sujeito nesses dois sentidos — tempo decorrido e fenômeno climático — ficando sempre na 3ª pessoa do singular.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Faz', 'dois', 'anos', 'que', 'ele', 'se', 'mudou', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3, 4, 5, 6],
      feedback:  '"Faz" indicando tempo decorrido não tem sujeito — a oração inteira é predicado.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Faz', 'muito', 'calor', 'nesta', 'cidade', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3, 4],
      feedback:  '"Faz" indicando clima não tem sujeito — ninguém pratica a ação de "fazer calor".',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Ela', 'fez', 'um', 'bolo', 'delicioso', '.'],
      verbo:     1,
      sujeito:   [0],
      predicado: [1, 2, 3, 4],
      feedback:  '"Fez" no sentido de "realizar/preparar" é verbo pessoal e concorda com "ela" — aqui há sujeito.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Os', 'alunos', 'fizeram', 'a', 'prova', 'ontem', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4, 5],
      feedback:  '"Fizeram" concorda com "os alunos" — verbo pessoal, com sujeito.',
    },
  ],

  resumo: {
    titulo: 'O verbo fazer fica sem sujeito quando indica:',
    itens: [
      { tipo: 'gota',     cor: '#0891b2', corFundo: '#cffafe', titulo: 'Tempo decorrido',    exemplos: 'faz um mês, faz dois anos' },
      { tipo: 'fenomeno', cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Fenômeno climático', exemplos: 'faz frio, faz calor, faz sol' },
    ],
  },

  licao: {
    titulo: '📖 Lição: O Verbo Fazer',
    html: `
      <p>O <strong>verbo fazer</strong> fica sem sujeito (impessoal) em dois sentidos — e sempre na 3ª pessoa do singular:</p>
      <ul>
        <li><strong>Tempo decorrido</strong> (equivalente a "haver"):<br>
            <em>"Faz dois anos que ele se mudou."</em> (nunca "fazem dois anos")</li>
        <li><strong>Fenômeno climático</strong>:<br>
            <em>"Faz frio hoje."</em> / <em>"Faz muito calor nesta cidade."</em></li>
      </ul>
      <p>Quando "fazer" tem o sentido de "realizar", ele volta a ter sujeito normalmente:<br>
      <em>"Ela fez o trabalho."</em> — sujeito: "ela".</p>
      <p>Como não há sujeito nos sentidos impessoais, o verbo <strong>nunca concorda com um substantivo no plural</strong> — fica sempre na 3ª pessoa do singular.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual frase é uma oração sem sujeito?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Ela fez um bolo delicioso.',
        'Faz muito frio hoje.',
        'Os alunos fizeram a prova.',
        'Nós fizemos as malas.',
      ],
      correta:  1,
      feedback: '"Faz" indicando clima não tem sujeito — ninguém pratica a ação de "fazer frio".',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Complete corretamente:',
      subtitulo:   '"____ dois meses que não chove por aqui."',
      opcoes:      ['Fazem', 'Faz', 'Fez', 'Faziam'],
      correta:     1,
      feedback:    '"Fazer" indicando tempo decorrido não tem sujeito, então fica sempre no singular: "Faz dois meses".',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase TEM sujeito?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Faz muito calor no verão.',
        'Faz dez anos que ele se formou.',
        'Os alunos fizeram a prova ontem.',
        'Faz sol hoje.',
      ],
      correta:  2,
      feedback: '"Os alunos" é o sujeito — eles praticam a ação de fazer a prova. As demais são orações sem sujeito (fazer impessoal).',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Por que a frase "Fazia dois anos que ele morava lá" está correta? (atenção!)',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Porque "dois anos" é o sujeito, no plural.',
        'Porque "fazer" concorda com "ele".',
        'Porque "fazer" indicando tempo não tem sujeito, ficando sempre no singular.',
        'Porque a frase está errada e deveria ser "faziam".',
      ],
      correta:  2,
      feedback: '"Fazer" indicando tempo decorrido é impessoal — não tem sujeito, então nunca vai para o plural, mesmo com uma expressão de tempo no plural ao lado.',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Qual frase está gramaticalmente ERRADA?',
      subtitulo:   'Escolha a alternativa incorreta.',
      opcoes: [
        'Faz três anos que ele viajou.',
        'Fazem três anos que ele viajou.',
        'Faz muito frio nesta região.',
        'Ela fez o trabalho sozinha.',
      ],
      correta:  1,
      feedback: '"Fazem três anos" está errado — "fazer" indicando tempo decorrido não tem sujeito e não pode ir para o plural. O certo é "Faz três anos".',
    },
  ],
};
