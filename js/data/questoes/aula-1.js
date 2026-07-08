'use strict';

/**
 * AULA-1.JS — Aula 1: Identifique o verbo
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     1,
  modulo: 'Etapa 1: Fundamentos',
  titulo: 'Aula 1: Identifique o verbo',

  justificativa: [
    'Esta etapa tem como objetivo desenvolver a compreensão de textos simples por meio da identificação do verbo.',
    'O reconhecimento do verbo auxilia na interpretação das frases e na identificação do sujeito.',
  ],

  definicao: {
    texto: 'Verbo é a palavra que expressa <span class="destaque">ação</span>, <span class="destaque">estado</span>, <span class="destaque">mudança de estado</span> ou <span class="destaque">fenômeno da natureza</span>.',
  },

  contexto: {
    texto: 'Ao ler uma frase ou texto, uma das primeiras coisas que devemos procurar é o <strong>verbo</strong>, pois ele dá movimento e sentido à oração.',
    nota: 'Oração é toda frase que possui um verbo.',
  },

  exemplo: {
    texto: 'Por exemplo, ao ouvir a palavra <span class="destaque">correr</span>, imaginamos alguém se movimentando rapidamente de um lugar para outro.',
    conclusao: 'Isso representa uma <span class="destaque">ação</span>.',
  },

  infinitivo: {
    descricao: 'Os verbos no infinitivo aparecem em sua forma original, sem indicar tempo, pessoa ou número.',
    nota: 'Essa é a forma considerada <span class="destaque">“padrão”</span> da palavra.',
    conjugacoes: [
      { sufixo: '-ar', label: '1ª conjugação' },
      { sufixo: '-er', label: '2ª conjugação' },
      { sufixo: '-ir', label: '3ª conjugação' },
    ],
  },

  resumo: {
    titulo: 'Os verbos podem indicar:',
    itens: [
      { tipo: 'acao',     cor: '#16a34a', corFundo: '#dcfce7', titulo: 'Ação',                 exemplos: 'correr, cantar' },
      { tipo: 'estado',   cor: '#7c3aed', corFundo: '#ede9fe', titulo: 'Estado',               exemplos: 'ser, estar' },
      { tipo: 'mudanca',  cor: '#ea580c', corFundo: '#ffedd5', titulo: 'Mudança de estado',    exemplos: 'ficar, tornar-se' },
      { tipo: 'fenomeno', cor: '#2563eb', corFundo: '#dbeafe', titulo: 'Fenômeno da natureza', exemplos: 'chover, amanhecer' },
    ],
  },

  licao: {
    titulo: '📖 Lição: O Verbo',
    html: `
      <p>O <strong>verbo</strong> é a palavra que indica:</p>
      <ul>
        <li><strong>Ação</strong> — correu, estudou, cantou</li>
        <li><strong>Estado</strong> — está, permanece, parece</li>
        <li><strong>Fenômeno da natureza</strong> — choveu, amanheceu</li>
        <li><strong>Mudança de estado</strong> — ficou, cresceu, tornou-se</li>
      </ul>
      <p>Os verbos se conjugam em <strong>pessoa</strong>, <strong>número</strong> e <strong>tempo</strong>.</p>
      <p><em>Exemplos: correr, ser, estar, chover, cantar, estudar.</em></p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O menino correu no parque."',
      opcoes:      ['menino', 'correu', 'parque', 'no'],
      correta:     1,
      feedback:    '"Correu" é o verbo — indica a ação do menino. Infinitivo: correr.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Identifique o verbo:',
      subtitulo:   '"Maria estuda todos os dias."',
      opcoes:      ['Maria', 'todos', 'estuda', 'dias'],
      correta:     2,
      feedback:    '"Estuda" é o verbo — indica o que Maria faz. Infinitivo: estudar.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual palavra é um verbo?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes:      ['casa', 'bonito', 'rapidamente', 'cantar'],
      correta:     3,
      feedback:    '"Cantar" é o verbo no infinitivo. As demais são: substantivo, adjetivo e advérbio.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"Ela comprou um livro novo na livraria."',
      opcoes:      ['livro', 'novo', 'livraria', 'comprou'],
      correta:     3,
      feedback:    '"Comprou" é o verbo — indica a ação de Ela. Infinitivo: comprar.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase contém um verbo de estado?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'O cachorro latiu alto.',
        'Ana ficou triste com a notícia.',
        'Pedro comprou um carro.',
        'A chuva caiu forte.',
      ],
      correta:  1,
      feedback: '"Ficou" é um verbo de estado — indica mudança de estado de Ana. Os demais são verbos de ação ou fenômeno.',
    },
  ],
};
