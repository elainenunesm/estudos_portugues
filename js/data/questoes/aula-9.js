'use strict';

/**
 * AULA-9.JS — Aula 9: Resumo rápido
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     9,
  modulo: 'Etapa 6: Resumo rápido',
  titulo: 'Aula 9: Resumo rápido',

  antesComecar: {
    titulo:      'Resumo rápido',
    descricao:   'Nesta aula você vai revisar o passo a passo completo pra analisar qualquer oração, juntando tudo que aprendeu até aqui.',
    aprender:    'Nesta aula você aprenderá a aplicar, em ordem, os passos para achar o verbo, identificar se a oração é impessoal, encontrar o sujeito e por fim o predicado — mesmo em frases de ordem inversa.',
    importancia: 'Ter um método passo a passo evita erros e deixa a análise mais rápida, não importa a ordem das palavras na frase.',
  },

  exemplo: [
    {
      tipo:  'fala',
      texto: 'Vamos revisar o método completo pra analisar qualquer oração, juntando os passos que você já aprendeu nas aulas anteriores.',
    },
    {
      tipo:  'busca',
      texto: '<strong class="destaque">Resumo rápido:</strong><br>Veja como aplicar a análise na frase em ordem inversa: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '1º',
        instrucao: 'Ache o verbo',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Ontem', ',', 'dormiu', 'o', 'gato', '.'],
          correta:  2,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Analisando: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '2º',
        instrucao: 'Identifique se é impessoal <em>(verbos impessoais: haver/existir, fazer/tempo, fenômenos da natureza)</em>',
      },
      caixa: {
        perguntasSimNao: [
          { texto: 'O verbo destacado é <strong class="destaque">haver</strong>?', resposta: false },
          { texto: 'O verbo destacado é <strong class="destaque">fazer</strong>?', resposta: false },
          { texto: 'O verbo destacado é um <strong class="destaque">fenômeno da natureza</strong>?', resposta: false },
        ],
        conclusao: '<em class="destaque">Dormir</em> não é impessoal — continue a análise.',
      },
    },
    {
      tipo:  'busca',
      texto: 'Analisando: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '3º',
        instrucao: 'Faça a pergunta: <strong class="destaque">Quem dormiu?</strong>',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        rotulo: 'Selecione o sujeito abaixo:',
        interativo: {
          palavras: ['Ontem', ',', 'dormiu', 'o', 'gato', '.'],
          corretas: [3, 4],
          papel:    'sujeito',
          marcarAntes: [
            { idx: 2, papel: 'verbo' },
          ],
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Analisando: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '4º',
        instrucao: 'A resposta é o sujeito: <strong class="destaque">"o gato"</strong>',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Ontem', ',', 'dormiu', 'o', 'gato', '.'], verbo: 2, sujeito: [3, 4], predicado: [] },
      },
    },
    {
      tipo:  'busca',
      texto: 'Analisando: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '5º',
        instrucao: 'O que não é sujeito é o predicado, <strong class="destaque">incluindo o verbo</strong>',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        rotulo: 'Selecione o predicado abaixo:',
        interativo: {
          palavras:        ['Ontem', ',', 'dormiu', 'o', 'gato', '.'],
          corretas:        [0, 2],
          papel:           'predicado',
          papeisIniciais:  { 2: 'verbo' },
          preSelecionadas: [2],
          marcarAntes: [
            { idx: [3, 4], papel: 'sujeito' },
          ],
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Analisando: <em>"Ontem, dormiu o gato."</em>',
      passo: {
        numero:    '6º',
        instrucao: 'Confirme a análise completa.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Ontem', ',', 'dormiu', 'o', 'gato', '.'], verbo: 2, sujeito: [3, 4], predicado: [0, 2] },
        perguntas: [
          'O predicado é <strong class="destaque">"Ontem"</strong> + <strong class="destaque">"dormiu"</strong> (separados pelo sujeito).',
        ],
      },
    },
    {
      tipo:  'dica',
      texto: '<strong class="destaque">Resumo do método:</strong> use esses passos pra analisar qualquer oração, mesmo em ordem inversa.',
      pontos: [
        {
          tipo:  'busca',
          texto: '<strong class="destaque">1º</strong> Ache o verbo.',
        },
        {
          tipo:  'semSujeito',
          texto: '<strong class="destaque">2º</strong> Verifique se é impessoal (haver/existir, fazer/tempo, fenômeno da natureza) — se for, a oração não tem sujeito.',
        },
        {
          tipo:  'pergunta',
          texto: '<strong class="destaque">3º e 4º</strong> Pergunte "quem/o que" + verbo — a resposta é o sujeito.',
        },
        {
          tipo:  'predVerbal',
          texto: '<strong class="destaque">5º</strong> Tudo o que não é sujeito é o predicado (incluindo o verbo).',
        },
      ],
    },
  ],

  checagem: [
    {
      titulo:    'Aplique o método: identifique o verbo, o sujeito e o predicado.',
      sentenca:  ['Ontem', ',', 'dormiu', 'o', 'gato', '.'],
      verbo:     2,
      sujeito:   [3, 4],
      predicado: [0, 2],
      feedback:  '"Dormiu" é o verbo. Não é impessoal, então perguntamos "quem dormiu?" → "o gato" é o sujeito. O resto ("Ontem" + "dormiu") é o predicado.',
    },
    {
      titulo:    'Identifique o verbo e o predicado. Esta oração possui sujeito?',
      sentenca:  ['Choveu', 'bastante', 'ontem', '.'],
      verbo:     0,
      sujeito:   [],
      predicado: [0, 1, 2],
      feedback:  '"Choveu" indica fenômeno da natureza — verbo impessoal, sem sujeito.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado (ordem invertida).',
      sentenca:  ['Chegaram', 'novos', 'alunos', '.'],
      verbo:     0,
      sujeito:   [1, 2],
      predicado: [0],
      feedback:  '"Chegaram" concorda com "novos alunos" — o sujeito vem depois do verbo.',
    },
    {
      titulo:       'Reescreva a frase na ordem direta (sujeito antes do verbo).',
      referencia:   ['Chegaram', 'novos', 'alunos', '.'],
      banco:        ['chegaram', 'Novos', 'alunos'],
      ordemCorreta: [1, 2, 0],
      feedback:     '"Novos alunos chegaram." — sujeito ("novos alunos") antes do verbo ("chegaram"): ordem direta.',
    },
  ],

  resumo: {
    titulo: 'O passo a passo completo:',
    itens: [
      { tipo: 'busca',      cor: '#2563eb', corFundo: '#dbeafe', titulo: '1º Ache o verbo',        exemplos: 'primeira coisa a procurar' },
      { tipo: 'semSujeito', cor: '#0891b2', corFundo: '#cffafe', titulo: '2º Verifique se é impessoal', exemplos: 'haver/existir, fazer/tempo, fenômeno da natureza' },
      { tipo: 'pergunta',   cor: '#7c3aed', corFundo: '#ede9fe', titulo: '3º e 4º Ache o sujeito',  exemplos: 'pergunte "quem/o que" + verbo' },
      { tipo: 'predVerbal', cor: '#16a34a', corFundo: '#dcfce7', titulo: '5º Ache o predicado',     exemplos: 'tudo que não é sujeito, incluindo o verbo' },
    ],
  },

  licao: {
    titulo: '📖 Lição: Resumo Rápido',
    html: `
      <p>Pra analisar qualquer oração — mesmo em ordem inversa — siga esses passos, em ordem:</p>
      <ul>
        <li><strong>1º — Ache o verbo.</strong> É sempre o primeiro passo.</li>
        <li><strong>2º — Verifique se é impessoal.</strong> Verbos de fenômeno da natureza, "haver"/"existir" e "fazer" indicando tempo não têm sujeito — se for um desses casos, pule direto pro predicado.</li>
        <li><strong>3º e 4º — Ache o sujeito.</strong> Pergunte "quem?" ou "o quê?" + o verbo. A resposta é o sujeito, esteja ele antes ou depois do verbo.</li>
        <li><strong>5º — Ache o predicado.</strong> Tudo o que não for o sujeito é o predicado — incluindo o verbo. Em ordem inversa, o predicado pode ficar "quebrado" em duas partes, uma antes e outra depois do sujeito.</li>
      </ul>
      <p>Exemplo completo: <em>"Ontem, dormiu o gato."</em> — verbo: "dormiu"; não é impessoal; quem dormiu? "o gato" (sujeito); o resto — "Ontem" + "dormiu" — é o predicado.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo da frase?',
      subtitulo:   '"Ontem, dormiu o gato."',
      opcoes:      ['Ontem', 'dormiu', 'o gato', 'Não tem verbo'],
      correta:     1,
      feedback:    '"Dormiu" é o verbo — a ação da frase.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Esta oração tem sujeito?',
      subtitulo:   '"Choveu bastante ontem."',
      opcoes:      ['Sim, "bastante"', 'Sim, "ontem"', 'Não, é impessoal', 'Sim, "choveu"'],
      correta:     2,
      feedback:    '"Choveu" indica fenômeno da natureza — verbo impessoal, sem sujeito.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual é o sujeito da frase?',
      subtitulo:   '"Chegaram novos alunos."',
      opcoes:      ['Chegaram', 'novos alunos', 'novos', 'Não tem sujeito'],
      correta:     1,
      feedback:    '"Novos alunos" é o sujeito — "chegaram" concorda com ele no plural.',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Qual é o predicado da frase? (atenção!)',
      subtitulo:   '"Ontem, dormiu o gato."',
      opcoes:      ['dormiu o gato', 'o gato', 'Ontem + dormiu', 'Ontem'],
      correta:     2,
      feedback:    'O predicado é "Ontem" + "dormiu" — tudo que não é sujeito, incluindo o verbo. Nesse caso, fica separado em duas partes pelo sujeito.',
    },
  ],
};
