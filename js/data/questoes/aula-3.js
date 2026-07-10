'use strict';

/**
 * AULA-3.JS — Aula 3: Aprenda o que é o sujeito
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     3,
  modulo: 'Etapa 2: Fundamentos do Sujeito',
  titulo: 'Aula 3: Aprenda o que é o sujeito',

  antesComecar: {
    titulo:      'Sujeito simples, composto e oculto',
    descricao:   'Nesta aula você vai aprender a encontrar o sujeito das orações e entender sua relação com o verbo.',
    aprender:    'Nesta aula você aprenderá a identificar o sujeito simples, composto e oculto em frases.',
    importancia: 'Reconhecer o sujeito é essencial para a interpretação de textos e para a concordância verbal.',
  },

  exemplo: [
    {
      tipo: 'sujeito',
      pontos: [
        {
          tipo:  'acao',
          texto: 'O sujeito é quem <strong class="destaque">pratica a ação</strong>, <strong class="destaque">sofre</strong> a ação.',
        },
        {
          tipo:  'fala',
          texto: 'O termo sujeito é <strong class="destaque">sobre quem se fala</strong> na frase.',
        },
      ],
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">sujeito</strong>:',
      passo: {
        numero:    '1º',
        instrucao: 'Encontre o <strong class="destaque">verbo</strong> da frase',
      },
      caixa: {
        tipo:   'tarefa',
        inline: true,
        exemplo: 'Maria <strong class="destaque">estudou</strong> ontem',
      },
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">sujeito</strong>:',
      passo: {
        numero:    '2º',
        instrucao: 'Faça a pergunta: <strong class="destaque">Quem + verbo</strong>? Ou <strong class="destaque">o quê + verbo</strong>?',
      },
      caixa: {
        tipo:    'pergunta',
        exemplo: 'Maria <strong class="destaque">estudou</strong> ontem.',
        perguntas: [
          '<strong class="destaque">Quem estudou</strong>? Ou...',
          '<strong class="destaque">O que estudou</strong>?',
        ],
      },
    },
    {
      tipo:  'busca',
      texto: 'Para encontrar o <strong class="destaque">sujeito</strong>:',
      passo: {
        numero:    '3º',
        instrucao: 'A resposta da pergunta anterior será o <strong class="destaque">sujeito</strong>.',
      },
      caixa: {
        tipo:    'dica',
        exemplo: 'Maria <strong class="destaque">estudou</strong> ontem.',
        perguntas: [
          '<strong class="destaque">Quem estudou</strong>? Ou...',
          '<strong class="destaque">O que estudou</strong>?',
        ],
        resposta: 'Maria',
      },
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
