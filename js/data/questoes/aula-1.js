'use strict';

/**
 * AULA-1.JS — Aula 1: Identifique o verbo
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     1,
  modulo: 'Etapa 1: Fundamentos',
  titulo: 'Aula 1: Identifique o verbo',

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
