'use strict';

/**
 * AULA-7.JS — Aula 7: Aprenda a identificar os termos em ordem invertida
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     7,
  modulo: 'Etapa 5: Inversão da ordem - Termos essenciais',
  titulo: 'Aula 7: Aprenda a identificar os termos em ordem invertida',

  antesComecar: {
    titulo:      'Ordem invertida',
    descricao:   'Nesta aula você vai aprender a identificar o verbo, o sujeito e o predicado mesmo quando a frase foge da ordem direta.',
    aprender:    'Nesta aula você aprenderá a reconhecer o sujeito em orações com ordem inversa (verbo antes do sujeito), usando a concordância verbal como pista.',
    importancia: 'Reconhecer o sujeito na ordem invertida evita erros de concordância e interpretação — o sujeito nem sempre é a primeira palavra da frase.',
  },

  exemplo: [
    {
      tipo:  'fala',
      texto: 'Nem toda oração segue a ordem direta <strong class="destaque">(sujeito + verbo + predicado)</strong>. Às vezes o verbo vem <strong class="destaque">antes</strong> do sujeito — é a chamada <strong class="destaque">ordem inversa</strong>.',
      caixa: {
        tipo:    'pergunta',
        titulo:  'Exemplo da ordem direta:',
        exemplo: '<em>→ João comprou um livro.</em>',
        sentencaAnotada: { sentenca: ['João', 'comprou', 'um', 'livro'], verbo: 1, sujeito: [0], predicado: [1, 2, 3] },
      },
    },
    {
      tipo:  'dica',
      texto: 'Mesmo com a ordem trocada, o sujeito continua concordando com o verbo.',
      pontos: [
        {
          tipo:  'dica',
          texto: 'Pergunte <strong class="destaque">"quem pratica a ação?"</strong> — não importa se a resposta vem antes ou depois do verbo.',
        },
        {
          tipo:  'dica',
          texto: 'Repare na <strong class="destaque">concordância</strong>: o verbo sempre combina em número e pessoa com o sujeito, esteja ele onde estiver.',
        },
      ],
    },
    {
      tipo:  'busca',
      texto: 'Primeiro exemplo: <strong class="destaque">"Chegou o trem."</strong>',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Chegou', 'o', 'trem'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Primeiro exemplo: <strong class="destaque">"Chegou o trem."</strong>',
      passo: {
        numero:    '2º',
        instrucao: 'Pergunte: quem chegou?',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Chegou', 'o', 'trem'], verbo: 0, sujeito: [1, 2], predicado: [0] },
        perguntas: [
          'Quem chegou? <strong class="destaque">"O trem"</strong>.',
          'O sujeito "o trem" vem <strong class="destaque">depois</strong> do verbo — ordem inversa.',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo exemplo: <strong class="destaque">"Existem várias opções."</strong>',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        interativo: {
          palavras: ['Existem', 'várias', 'opções'],
          correta:  0,
          papel:    'verbo',
        },
      },
    },
    {
      tipo:  'busca',
      texto: 'Segundo exemplo: <strong class="destaque">"Existem várias opções."</strong>',
      passo: {
        numero:    '2º',
        instrucao: 'Repare na concordância: "Existem" está no plural.',
      },
      caixa: {
        tipo:   'pergunta',
        titulo: 'Exemplo',
        sentencaAnotada: { sentenca: ['Existem', 'várias', 'opções'], verbo: 0, sujeito: [1, 2], predicado: [0] },
        perguntas: [
          '"Existem" concorda com <strong class="destaque">"várias opções"</strong> (plural) — esse é o sujeito.',
          'De novo, o sujeito aparece depois do verbo.',
        ],
      },
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'O que é ordem inversa (indireta)?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'Uma oração sem sujeito.',
        'Uma oração em que o verbo vem antes do sujeito.',
        'Uma oração com dois verbos.',
        'Uma oração sem predicado.',
      ],
      correta:  1,
      feedback: 'Ordem inversa (ou indireta) é quando o verbo aparece antes do sujeito, fugindo da ordem direta sujeito + verbo + predicado.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado (ordem invertida).',
      sentenca:  ['Restam', 'poucas', 'vagas', '.'],
      verbo:     0,
      sujeito:   [1, 2],
      predicado: [0],
      feedback:  '"Restam" concorda com "poucas vagas" — esse é o sujeito, mesmo vindo depois do verbo.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado (ordem invertida).',
      sentenca:  ['Sobrou', 'pouco', 'tempo', '.'],
      verbo:     0,
      sujeito:   [1, 2],
      predicado: [0],
      feedback:  '"Sobrou" concorda com "pouco tempo" (singular) — o sujeito vem depois do verbo.',
    },
    {
      titulo:    'Identifique o verbo, o sujeito e o predicado (ordem invertida).',
      sentenca:  ['Aconteceram', 'fatos', 'estranhos', 'naquela', 'noite', '.'],
      verbo:     0,
      sujeito:   [1, 2],
      predicado: [0, 3, 4],
      feedback:  '"Aconteceram" concorda com "fatos estranhos" (plural) — o sujeito vem depois do verbo, e "naquela noite" faz parte do predicado.',
    },
    {
      titulo:    'Qual frase está na ordem direta (sujeito antes do verbo)?',
      subtitulo: 'Escolha a alternativa correta.',
      opcoes: [
        'Chegou o trem.',
        'O trem chegou.',
        'Restam poucas vagas.',
        'Existem várias opções.',
      ],
      correta:  1,
      feedback: '"O trem chegou." segue a ordem direta — sujeito antes do verbo. As outras têm o verbo primeiro (ordem inversa).',
    },
  ],

  resumo: {
    titulo: 'Como encontrar o sujeito na ordem invertida:',
    itens: [
      { tipo: 'busca',  cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Ache o verbo',        exemplos: 'primeira coisa a procurar' },
      { tipo: 'dica',   cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Cheque a concordância', exemplos: 'quem combina em número/pessoa com o verbo' },
      { tipo: 'sujeito', cor: '#16a34a', corFundo: '#dcfce7', titulo: 'Esse é o sujeito',      exemplos: 'mesmo vindo depois do verbo' },
    ],
  },

  licao: {
    titulo: '📖 Lição: Ordem Direta e Inversa',
    html: `
      <p>A <strong>ordem direta</strong> de uma oração é sujeito + verbo + predicado:<br>
      <em>"O trem chegou."</em></p>
      <p>Na <strong>ordem inversa (ou indireta)</strong>, o verbo aparece antes do sujeito:<br>
      <em>"Chegou o trem."</em> — o sujeito continua sendo "o trem", só muda de posição.</p>
      <ul>
        <li><strong>Pista principal:</strong> a concordância verbal. O verbo sempre concorda em número e pessoa com o sujeito, não importa a ordem:<br>
            <em>"Existem várias opções."</em> — "existem" (plural) concorda com "várias opções" (plural).</li>
        <li>É comum a ordem inversa aparecer com verbos de existência, ocorrência ou sobra:<br>
            <em>restar, sobrar, existir, ocorrer, faltar, acontecer</em>.</li>
      </ul>
      <p>Para não errar: primeiro ache o verbo, depois pergunte "quem pratica/concorda com essa ação?" — a resposta é o sujeito, esteja ela antes ou depois do verbo.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o sujeito da frase?',
      subtitulo:   '"Chegou o trem."',
      opcoes:      ['Chegou', 'o trem', 'trem chegou', 'Não tem sujeito'],
      correta:     1,
      feedback:    '"O trem" é o sujeito — quem chegou? O trem. Só está depois do verbo.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o sujeito da frase?',
      subtitulo:   '"Restam poucas vagas."',
      opcoes:      ['Restam', 'poucas vagas', 'vagas', 'Não tem sujeito'],
      correta:     1,
      feedback:    '"Poucas vagas" é o sujeito — "restam" concorda com ele no plural.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Complete corretamente:',
      subtitulo:   '"____ vários candidatos para a vaga." (existir)',
      opcoes:      ['Existe', 'Existem', 'Existiu', 'Existia'],
      correta:     1,
      feedback:    '"Existem" concorda com "vários candidatos" (plural) — mesmo o sujeito vindo depois do verbo.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase está em ordem direta?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Sobrou pouco tempo.',
        'O tempo sobrou.',
        'Existem dúvidas.',
        'Aconteceram imprevistos.',
      ],
      correta:  1,
      feedback: '"O tempo sobrou." tem o sujeito antes do verbo — ordem direta. As demais estão na ordem inversa.',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'Qual é o sujeito da frase? (atenção!)',
      subtitulo:   '"Ocorreram vários problemas durante a viagem."',
      opcoes:      ['Ocorreram', 'vários problemas', 'durante a viagem', 'a viagem'],
      correta:     1,
      feedback:    '"Vários problemas" é o sujeito — concorda com "ocorreram" no plural. "Durante a viagem" é apenas um adjunto, parte do predicado.',
    },
  ],
};
