'use strict';

/**
 * AULA-3.JS — Aula 3: Predicado
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     3,
  modulo: 'Etapa 1: Fundamentos',
  titulo: 'Aula 3: Predicado',

  licao: {
    titulo: '📖 Lição: O Predicado',
    html: `
      <p>O <strong>predicado</strong> é tudo o que se diz sobre o sujeito na oração.</p>
      <ul>
        <li><strong>Predicado verbal</strong> — verbo de ação ou fenômeno:<br>
            <em>"O menino correu."</em> → predicado: <strong>correu</strong></li>
        <li><strong>Predicado nominal</strong> — verbo de ligação + predicativo:<br>
            <em>"Ana está feliz."</em> → predicado: <strong>está feliz</strong></li>
        <li><strong>Predicado verbo-nominal</strong> — verbo de ação + predicativo:<br>
            <em>"Ela chegou cansada."</em> → predicado: <strong>chegou cansada</strong></li>
      </ul>
      <p><strong>Verbos de ligação:</strong> ser, estar, parecer, ficar, tornar-se, permanecer.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o predicado da frase?',
      subtitulo:   '"O gato dormiu na cama."',
      opcoes:      ['O gato', 'dormiu na cama', 'na cama', 'dormiu'],
      correta:     1,
      feedback:    'O predicado é "dormiu na cama" — tudo que se diz sobre o sujeito "O gato".',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual tipo de predicado está na frase?',
      subtitulo:   '"Pedro está cansado."',
      opcoes: [
        'Predicado verbal',
        'Predicado nominal',
        'Predicado verbo-nominal',
        'Não tem predicado',
      ],
      correta:  1,
      feedback: '"Está" é verbo de ligação e "cansado" é predicativo do sujeito. Isso caracteriza o predicado nominal.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual frase tem predicado verbal?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'Ana parece triste.',
        'O bebê é lindo.',
        'O atleta correu 10 km.',
        'Ela ficou nervosa.',
      ],
      correta:  2,
      feedback: '"Correu" é um verbo de ação, formando predicado verbal. As demais usam verbos de ligação (parece, é, ficou).',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase tem predicado verbo-nominal?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'O sol brilha forte.',
        'Maria é inteligente.',
        'Ela chegou cansada do trabalho.',
        'Os alunos estudaram muito.',
      ],
      correta:  2,
      feedback: '"Chegou cansada" — "chegou" é verbo de ação e "cansada" é predicativo do sujeito. Isso é predicado verbo-nominal.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Identifique o predicativo do sujeito:',
      subtitulo:   '"Os jogadores ficaram animados com a vitória."',
      opcoes:      ['Os jogadores', 'ficaram', 'animados', 'com a vitória'],
      correta:     2,
      feedback:    '"Animados" é o predicativo do sujeito — qualifica "Os jogadores" por meio do verbo de ligação "ficaram".',
    },
  ],
};
