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

  licao: {
    titulo: '📖 Lição: O Sujeito',
    html: `
      <p>O <strong>sujeito</strong> é o termo sobre o qual o predicado faz uma afirmação.</p>
      <ul>
        <li><strong>Sujeito simples</strong> — tem um único núcleo:<br>
            <em>"O menino correu."</em> → sujeito: <strong>O menino</strong></li>
        <li><strong>Sujeito composto</strong> — tem mais de um núcleo:<br>
            <em>"Pedro e Ana estudaram."</em> → sujeito: <strong>Pedro e Ana</strong></li>
        <li><strong>Sujeito oculto</strong> — identificado pela desinência verbal:<br>
            <em>"Estudamos muito."</em> → sujeito oculto: <strong>nós</strong></li>
      </ul>
      <p>O <strong>núcleo</strong> do sujeito é o substantivo (ou pronome) principal.</p>
    `,
  },

  questoes: [
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o sujeito da frase?',
      subtitulo:   '"Os alunos estudaram a lição."',
      opcoes:      ['a lição', 'estudaram', 'Os alunos', 'Os'],
      correta:     2,
      feedback:    'O sujeito é "Os alunos" — é sobre eles que o verbo faz a afirmação. Núcleo: alunos.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o núcleo do sujeito?',
      subtitulo:   '"A professora de matemática chegou tarde."',
      opcoes:      ['matemática', 'professora', 'chegou', 'tarde'],
      correta:     1,
      feedback:    'O núcleo do sujeito é "professora". "De matemática" é adjunto adnominal (complemento do núcleo).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual frase tem sujeito simples?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'João e Maria chegaram cedo.',
        'O cachorro late muito.',
        'Ela e eu estudamos juntos.',
        'Pedro, Ana e Carlos viajaram.',
      ],
      correta:  1,
      feedback: '"O cachorro" é sujeito simples — tem apenas um núcleo (cachorro). As demais têm sujeito composto.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Identifique o sujeito:',
      subtitulo:   '"Chegaram as encomendas esperadas."',
      opcoes: [
        'Chegaram',
        'as encomendas esperadas',
        'esperadas',
        'as encomendas',
      ],
      correta:  1,
      feedback: 'O sujeito é "as encomendas esperadas" — está posposto ao verbo. Sujeito posposto é comum com verbos intransitivos.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'Qual frase tem sujeito oculto (desinencial)?',
      subtitulo:   'Escolha a alternativa correta.',
      opcoes: [
        'O vento balançou as árvores.',
        'Estudamos muito para a prova.',
        'As crianças brincaram no parque.',
        'Minha mãe fez um bolo.',
      ],
      correta:  1,
      feedback: '"Estudamos" indica sujeito oculto "nós" — identificado pela desinência verbal "-mos". Não há sujeito expresso na frase.',
    },
  ],
};
