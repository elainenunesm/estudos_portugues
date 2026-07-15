'use strict';

/**
 * AULA-6.JS — Aula 6: Verbo haver
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     6,
  modulo: 'Etapa 4: Orações sem sujeito',
  titulo: 'Aula 6: Verbo haver',

  antesComecar: {
    titulo:      'Verbo haver',
    descricao:   'Nesta aula você vai aprender os vários sentidos do verbo haver que deixam a oração sem sujeito — e o caso parecido com o verbo fazer.',
    aprender:    'Nesta aula você aprenderá a identificar o verbo haver no sentido de existir, ocorrer e tempo decorrido — e o verbo fazer indicando tempo.',
    importancia: 'Reconhecer esses casos evita erros comuns de concordância, como flexionar "haver" ou "fazer" no plural quando eles devem ficar sempre no singular.',
  },

  exemplo: [
    {
      tipo:  'fala',
      texto: 'O verbo <strong class="destaque">haver</strong> costuma ter sujeito quando indica "ter" (ex: "Eles haviam terminado") — mas em alguns sentidos específicos, fica <strong class="destaque">sem sujeito</strong>.',
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: o verbo <strong class="destaque">haver</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Havia', 'muitas', 'pessoas', 'na', 'festa'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: o verbo <strong class="destaque">haver</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> significa <strong class="destaque">"existir"</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Havia', 'muitas', 'pessoas', 'na', 'festa'], verbo: 0, sujeito: [], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Primeiro caso: o verbo <strong class="destaque">haver</strong>.',
      passo: {
        numero:    '3º',
        instrucao: 'Confirme substituindo por <strong class="destaque">"existir"</strong>.',
      },
      caixa: {
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Existir</strong>?',
          { nota: '<strong class="destaque">Havia</strong> muitas pessoas na festa → <strong class="destaque">Existem</strong> muitas pessoas na festa.' },
          'Se o sentido não mudou, é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Haver</strong> no sentido de <strong class="destaque">Ocorrer</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Houve', 'uma', 'reunião', 'ontem'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Haver</strong> no sentido de <strong class="destaque">Ocorrer</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> significa <strong class="destaque">"ocorrer"</strong> ou <strong class="destaque">"acontecer"</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Houve', 'uma', 'reunião', 'ontem'], verbo: 0, sujeito: [], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo caso: Verbo <strong class="destaque">Haver</strong> no sentido de <strong class="destaque">Ocorrer</strong>.',
      passo: {
        numero:    '3º',
        instrucao: 'Confirme substituindo por <strong class="destaque">"ocorrer"</strong>.',
      },
      caixa: {
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Ocorrer</strong>?',
          { nota: '<strong class="destaque">Houve</strong> uma reunião ontem → <strong class="destaque">Ocorreu</strong> uma reunião ontem.' },
          'Se o sentido não mudou, é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Terceiro caso: Verbo <strong class="destaque">Haver</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Há', 'duas', 'semanas', 'não', 'chove'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Terceiro caso: Verbo <strong class="destaque">Haver</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> indica <strong class="destaque">tempo decorrido</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Há', 'duas', 'semanas', 'não', 'chove'], verbo: 0, sujeito: [], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Terceiro caso: Verbo <strong class="destaque">Haver</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '3º',
        instrucao: 'Confirme substituindo por <strong class="destaque">"fazer"</strong> (tempo).',
      },
      caixa: {
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Fazer</strong> (tempo)?',
          { nota: '<strong class="destaque">Há</strong> duas semanas não chove → <strong class="destaque">Faz</strong> duas semanas que não chove.' },
          'O sentido continua relacionado a tempo, então o verbo é <strong class="destaque">impessoal</strong>.',
        ],
      },
    },
    {
      tipo:  'dica',
      texto: '<strong class="destaque">Observação:</strong> ao substituir "haver" por um sinônimo, a nova frase pode ganhar sujeito — isso não significa que a frase original também tinha.',
      pontos: [
        {
          tipo:  'dica',
          texto: '<strong class="destaque">Existem</strong> muitas pessoas na festa. — tem sujeito: "muitas pessoas".',
        },
        {
          tipo:  'dica',
          texto: '<strong class="destaque">Ocorreu</strong> uma reunião ontem. — tem sujeito: "uma reunião".',
        },
      ],
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'Quando o verbo haver fica sem sujeito?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'Sempre que ele aparece numa frase.',
        'Quando significa existir, ocorrer/acontecer, ou indica tempo decorrido.',
        'Só quando está no futuro.',
        'Nunca — haver sempre tem sujeito.',
      ],
      correta:  1,
      feedback: 'O verbo haver fica sem sujeito nesses três sentidos — existir, ocorrer/acontecer e tempo decorrido — ficando sempre na 3ª pessoa do singular.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Há', 'muitos', 'livros', 'nesta', 'estante', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3, 4],
      feedback:  '"Há" no sentido de existir não tem sujeito — "muitos livros nesta estante" é tudo predicado.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Faz', 'três', 'dias', 'que', 'não', 'chove', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3, 4, 5],
      feedback:  '"Faz" indicando tempo decorrido não tem sujeito — a oração inteira é predicado.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Os', 'problemas', 'existem', 'em', 'todo', 'lugar', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4, 5],
      feedback:  '"Existem" é verbo pessoal e concorda com "os problemas" — aqui há sujeito.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['O', 'acidente', 'ocorreu', 'na', 'rodovia', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4],
      feedback:  '"Ocorreu" concorda com "o acidente" — verbo pessoal, com sujeito.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Muitas', 'dificuldades', 'ocorrem', 'no', 'caminho', '.'],
      verbo:     2,
      sujeito:   [0, 1],
      predicado: [2, 3, 4],
      feedback:  '"Ocorrem" concorda com "muitas dificuldades" — verbo pessoal, com sujeito.',
    },
  ],

  resumo: {
    titulo: 'O verbo haver fica sem sujeito quando indica:',
    itens: [
      { tipo: 'dica',      cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Existir',           exemplos: 'havia, há, houve' },
      { tipo: 'sujeito',   cor: '#16a34a', corFundo: '#dcfce7', titulo: 'Ocorrer/Acontecer', exemplos: 'houve uma reunião' },
      { tipo: 'gota',      cor: '#0891b2', corFundo: '#cffafe', titulo: 'Tempo decorrido',   exemplos: 'há duas semanas, faz um mês' },
    ],
  },

  licao: {
    titulo: '📖 Lição: O Verbo Haver',
    html: `
      <p>O <strong>verbo haver</strong> fica sem sujeito (impessoal) em três sentidos — e sempre na 3ª pessoa do singular:</p>
      <ul>
        <li><strong>Existir</strong>:<br>
            <em>"Havia poucos lugares vagos."</em> (nunca "haviam poucos lugares")</li>
        <li><strong>Ocorrer / acontecer</strong>:<br>
            <em>"Houve um acidente na avenida."</em></li>
        <li><strong>Tempo decorrido</strong> (equivalente a "fazer"):<br>
            <em>"Há dois anos que ele se mudou."</em></li>
      </ul>
      <p>O verbo <strong>fazer</strong> também fica sem sujeito indicando tempo decorrido ou fenômeno climático:<br>
      <em>"Faz dois anos que ele se mudou."</em> / <em>"Faz frio hoje."</em></p>
      <p>Como não há sujeito, esses verbos <strong>nunca concordam com um substantivo no plural</strong> — ficam sempre na 3ª pessoa do singular.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual frase é uma oração sem sujeito?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Havia muitos convidados na festa.',
        'Os convidados chegaram cedo.',
        'Ela recebeu os convidados.',
        'Os convidados trouxeram presentes.',
      ],
      correta:  0,
      feedback: '"Havia" no sentido de "existir" não tem sujeito — "muitos convidados" é objeto direto.',
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
      titulo:      'Complete corretamente:',
      subtitulo:   '"____ vários candidatos inscritos para a vaga."',
      opcoes:      ['Haviam', 'Havia', 'Houveram', 'Houve-se'],
      correta:     1,
      feedback:    '"Haver" no sentido de "existir" não tem sujeito e fica sempre no singular: "Havia vários candidatos".',
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
        'Havia poucas vagas disponíveis.',
        'Haviam poucas vagas disponíveis.',
        'Fazia muito calor naquele dia.',
        'Houve um acidente ontem à noite.',
      ],
      correta:  1,
      feedback: '"Haviam poucas vagas" está errado — "haver" no sentido de existir não tem sujeito e não pode ir para o plural. O certo é "Havia poucas vagas".',
    },
  ],
};
