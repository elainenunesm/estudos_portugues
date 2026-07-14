'use strict';

/**
 * AULA-5.JS — Aula 5: Aprenda a identificar verbos sem sujeito
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     5,
  modulo: 'Etapa 4: Orações sem sujeito',
  titulo: 'Aula 5: Aprenda a identificar verbos sem sujeito',

  antesComecar: {
    titulo:      'Orações sem sujeito',
    descricao:   'Nesta aula você vai aprender que nem toda oração tem sujeito — e como reconhecer os verbos que ficam sem sujeito.',
    aprender:    'Nesta aula você aprenderá a identificar orações sem sujeito: verbos de fenômeno da natureza e os vários sentidos do verbo haver (existir, ocorrer e tempo decorrido).',
    importancia: 'Reconhecer a oração sem sujeito evita erros comuns de concordância, como flexionar "haver" no plural quando ele deve ficar sempre no singular.',
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
      texto: 'Primeiro caso: verbos de <strong class="destaque">fenômeno da natureza</strong>.',
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
      texto: 'Primeiro caso: verbos de <strong class="destaque">fenômeno da natureza</strong>.',
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
      tipo:  'busca',
      texto: 'Segundo caso: o verbo <strong class="destaque">haver</strong>.',
      passo: {
        numero:    '1ª',
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
      texto: 'Segundo caso: o verbo <strong class="destaque">haver</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> significa <strong class="destaque">"existir"</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Havia', 'muitas', 'pessoas', 'na', 'festa'], verbo: 0, sujeito: [], predicado: [] },
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Existir</strong>?',
          { nota: '<strong class="destaque">Havia</strong> muitas pessoas na festa → <strong class="destaque">Existem</strong> muitas pessoas na festa.' },
          'Se o sentido não mudou, é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Terceiro caso: Verbo <strong class="destaque">Haver</strong> no sentido de <strong class="destaque">Ocorrer</strong>.',
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
      texto: 'Terceiro caso: Verbo <strong class="destaque">Haver</strong> no sentido de <strong class="destaque">Ocorrer</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> significa <strong class="destaque">"ocorrer"</strong> ou <strong class="destaque">"acontecer"</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Houve', 'uma', 'reunião', 'ontem'], verbo: 0, sujeito: [], predicado: [] },
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Ocorrer</strong>?',
          { nota: '<strong class="destaque">Houve</strong> uma reunião ontem → <strong class="destaque">Ocorreu</strong> uma reunião ontem.' },
          'Se o sentido não mudou, é <strong class="destaque">oração sem sujeito</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Quarto caso: Verbo <strong class="destaque">Haver</strong> indicando <strong class="destaque">tempo</strong>.',
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
      texto: 'Quarto caso: Verbo <strong class="destaque">Haver</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"haver"</strong> indica <strong class="destaque">tempo decorrido</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Há', 'duas', 'semanas', 'não', 'chove'], verbo: 0, sujeito: [], predicado: [] },
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Haver</strong> pode ser substituído por <strong class="destaque">Fazer</strong> (tempo)?',
          { nota: '<strong class="destaque">Há</strong> duas semanas não chove → <strong class="destaque">Faz</strong> duas semanas que não chove.' },
          'O sentido continua relacionado a tempo, então o verbo é <strong class="destaque">impessoal</strong>.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Quinto caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">tempo</strong>.',
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
      texto: 'Quinto caso: Verbo <strong class="destaque">Fazer</strong> indicando <strong class="destaque">tempo</strong>.',
      passo: {
        numero:    '2º',
        instrucao: 'Quando <strong class="destaque">"fazer"</strong> indica <strong class="destaque">tempo decorrido</strong>.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Faz', 'muito', 'tempo', 'que', 'não', 'viajamos'], verbo: 0, sujeito: [], predicado: [] },
        perguntas: [
          'Faça a pergunta: o verbo <strong class="destaque">Fazer</strong> pode ser substituído por <strong class="destaque">Ter</strong> (tempo)?',
          { nota: '<strong class="destaque">Faz</strong> muito tempo que não viajamos → <strong class="destaque">Tem</strong> muito tempo que não viajamos.' },
          'A ideia foi mantida, então não existe <strong class="destaque">sujeito</strong>.',
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
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Choveu', 'muito', 'esta', 'semana', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2, 3],
      feedback:  '"Choveu" indica fenômeno da natureza — não tem sujeito, a oração toda é predicado.',
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
      { tipo: 'dica',     cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Haver (existir)',       exemplos: 'havia, há, houve' },
      { tipo: 'gota',     cor: '#0891b2', corFundo: '#cffafe', titulo: 'Fazer / Ser (tempo)',    exemplos: 'faz frio, é tarde, são duas horas' },
    ],
  },

  licao: {
    titulo: '📖 Lição: Orações sem sujeito',
    html: `
      <p>A <strong>oração sem sujeito</strong> é aquela em que não existe um ser (pessoa, animal ou coisa) que pratique ou sofra a ação do verbo — o sujeito é <strong>inexistente</strong>.</p>
      <ul>
        <li><strong>Fenômenos da natureza</strong> — chover, nevar, ventar, trovejar, amanhecer, anoitecer, usados no sentido literal:<br>
            <em>"Nevou a noite toda."</em></li>
        <li><strong>Haver</strong> no sentido de "existir" — fica sempre na 3ª pessoa do singular:<br>
            <em>"Havia poucos lugares vagos."</em> (nunca "haviam poucos lugares")</li>
        <li><strong>Fazer</strong> indicando tempo decorrido ou fenômeno climático:<br>
            <em>"Faz dois anos que ele se mudou."</em> / <em>"Faz frio hoje."</em></li>
        <li><strong>Ser</strong> indicando horas ou distância:<br>
            <em>"É uma hora."</em> / <em>"Daqui até lá é uns dez quilômetros."</em></li>
      </ul>
      <p>Como não há sujeito, esses verbos <strong>nunca concordam com um substantivo no plural</strong> — ficam sempre na 3ª pessoa do singular.</p>
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
        'Choveu bastante ontem à noite.',
      ],
      correta:  1,
      feedback: '"Haviam poucas vagas" está errado — "haver" no sentido de existir não tem sujeito e não pode ir para o plural. O certo é "Havia poucas vagas".',
    },
  ],
};
