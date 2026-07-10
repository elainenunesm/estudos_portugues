'use strict';

/**
 * AULA-2.JS — Aula 2: Como reconhecer o verbo na oração?
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     2,
  modulo: 'Etapa 1: Fundamentos',
  titulo: 'Aula 2: Como reconhecer o verbo na oração?',

  antesComecar: {
    titulo:      'Como reconhecer o verbo na oração?',
    descricao:   'Nesta aula você vai aprender técnicas simples para encontrar o verbo em qualquer frase.',
    aprender:    'Nesta aula você aprenderá a reconhecer o verbo colocando a palavra no infinitivo e observando o sentido que ela transmite na oração.',
    importancia: 'Encontrar o verbo é o primeiro passo para entender a estrutura da frase e identificar sujeito e predicado.',
  },

  exemplo: [
    {
      tipo:  'infinito',
      texto: 'Uma maneira de identificar o  <strong class="destaque">verbo</strong> é transformar ele no <strong class="destaque">infinitivo</strong>.',
    },
    {
      tipo:      'conjugar',
      texto:     'Exemplo: a palavra <strong class="destaque">cantou</strong>.',
      conclusao: '<strong class="destaque">Cantou</strong> --&gt; Cant + <strong class="destaque">ar</strong> (Terminação <strong class="destaque">ar</strong> indica infinitivo) <strong class="destaque">1º conjugação.</strong>',
    },
    {
      tipo:      'gota',
      texto:     'Exemplo: a palavra <strong class="destaque">bebeu</strong>.',
      conclusao: '<strong class="destaque">Bebeu</strong> --&gt; Beb + <strong class="destaque">er</strong> (Terminação <strong class="destaque">er</strong> indica infinitivo) <strong class="destaque">2º conjugação.</strong>',
    },
    {
      tipo:      'foguete',
      texto:     'Exemplo: a palavra <strong class="destaque">partiu</strong>.',
      conclusao: '<strong class="destaque">Partiu</strong> --&gt; Part + <strong class="destaque">ir</strong> (Terminação <strong class="destaque">ir</strong> indica infinitivo) <strong class="destaque">3º conjugação.</strong>',
    },
    {
      tipo:      'peca',
      texto:     'Exemplo: a palavra <strong class="destaque">propôs</strong>.',
      conclusao: '<strong class="destaque">Propôs</strong> --&gt; P + <strong class="destaque">or</strong> (Terminação <strong class="destaque">or</strong> indica infinitivo) <strong class="destaque">2º conjugação.</strong>',
      obs:       '<strong class="destaque">Obs:</strong> Apesar de ter terminação <strong class="destaque">or</strong>, ele faz parte da segunda conjugação porque a palavra sofreu alteração ao longo da história, anteriormente a palavra se escrevia com <strong class="destaque">poer</strong>, terminação <strong class="destaque">er</strong>.',
    },
  ],

  // Checagens do tipo "clique na palavra" — clicar no verbo da frase.
  checagem: [
    {
      titulo:   'Clique no verbo da frase:',
      sentenca: ['A', 'Maria', 'cantou', 'no', 'coral', '.'],
      correta:  2,
      classes: [
        { classe: 'Artigo definido' },
        { classe: 'Substantivo próprio' },
        { classe: 'Verbo — pretérito perfeito de cantar (-ar)' },
        { classe: 'Preposição + Artigo (em + o)' },
        { classe: 'Substantivo' },
      ],
      feedback: '"Cantou" é o verbo — vem de cantar, infinitivo terminado em -ar (1ª conjugação).',
    },
    {
      titulo:   'Clique no verbo da frase:',
      sentenca: ['O', 'gato', 'dormiu', 'na', 'cama', '.'],
      correta:  2,
      classes: [
        { classe: 'Artigo definido' },
        { classe: 'Substantivo' },
        { classe: 'Verbo — pretérito perfeito de dormir (-ir)' },
        { classe: 'Preposição + Artigo (em + a)' },
        { classe: 'Substantivo' },
      ],
      feedback: '"Dormiu" é o verbo — vem de dormir, infinitivo terminado em -ir (3ª conjugação).',
    },
    {
      titulo:   'Clique no verbo da frase:',
      sentenca: ['O', 'Pedro', 'comeu', 'o', 'bolo', '.'],
      correta:  2,
      classes: [
        { classe: 'Artigo definido' },
        { classe: 'Substantivo próprio' },
        { classe: 'Verbo — pretérito perfeito de comer (-er)' },
        { classe: 'Artigo definido' },
        { classe: 'Substantivo' },
      ],
      feedback: '"Comeu" é o verbo — vem de comer, infinitivo terminado em -er (2ª conjugação).',
    },
    {
      titulo:   'Clique no verbo da frase:',
      sentenca: ['O', 'menino', 'sorriu', 'feliz', '.'],
      correta:  2,
      classes: [
        { classe: 'Artigo definido' },
        { classe: 'Substantivo' },
        { classe: 'Verbo — pretérito perfeito de sorrir (-ir)' },
        { classe: 'Adjetivo' },
      ],
      feedback: '"Sorriu" é o verbo — vem de sorrir, infinitivo terminado em -ir (3ª conjugação).',
    },
    {
      titulo:   'Clique no verbo da frase:',
      sentenca: ['A', 'professora', 'pôs', 'o', 'livro', 'na', 'mesa', '.'],
      correta:  2,
      classes: [
        { classe: 'Artigo definido' },
        { classe: 'Substantivo' },
        { classe: 'Verbo — pretérito perfeito de pôr (irregular)' },
        { classe: 'Artigo definido' },
        { classe: 'Substantivo' },
        { classe: 'Preposição + Artigo (em + a)' },
        { classe: 'Substantivo' },
      ],
      feedback: '"Pôs" é o verbo — vem de pôr, um verbo irregular (antigamente escrito "poer", por isso é da 2ª conjugação).',
    },
  ],

};
