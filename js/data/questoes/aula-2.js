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

  infinitivo: {
    descricao: 'Os verbos no infinitivo aparecem em sua forma original, sem indicar tempo, pessoa ou número.',
    nota: 'Essa é a forma considerada <span class="destaque">“padrão”</span> da palavra.',
    conjugacoes: [
      { sufixo: '-ar', label: '1ª conjugação' },
      { sufixo: '-er', label: '2ª conjugação' },
      { sufixo: '-ir', label: '3ª conjugação' },
    ],
    extra: 'Existe também o verbo <span class="destaque">pôr</span>, que antigamente era escrito como <span class="destaque">poer</span>. Por isso, ele pertence à <span class="destaque">2ª conjugação</span>.',
  },

  exemplo: [
    {
      tipo:  'infinito',
      texto: 'Uma maneira de transformar a palavra em <strong class="destaque">verbo</strong> é ele no <strong class="destaque">infinitivo</strong>.',
    },
  ],

  identificacao: {
    titulo: 'Como identificar um verbo na oração?',
    intro: 'Uma maneira simples é transformar a palavra em infinitivo:',
    exemplos: [
      { palavra: 'cantou', infinitivo: 'cantar', terminacao: '-ar', conjugacao: '1ª conjugação' },
      { palavra: 'bebeu',  infinitivo: 'beber',  terminacao: '-er', conjugacao: '2ª conjugação' },
      { palavra: 'partiu', infinitivo: 'partir', terminacao: '-ir', conjugacao: '3ª conjugação' },
    ],
    rodape: 'Você pode fazer isso com qualquer palavra que suspeite ser um verbo. Assim, fica mais fácil praticar e reconhecer cada caso.',
  },

  sentido: {
    dica: 'Depois de localizar o verbo, observe o sentido que ele transmite na oração.',
    textos: [
      'Ele pode indicar ação, estado, mudança de estado ou fenômeno da natureza.',
      'Porém, o significado depende do contexto, já que um mesmo verbo pode assumir sentidos diferentes em frases diferentes.',
    ],
    exemplos: {
      titulo: 'Exemplos:',
      itens: [
        { tipo: 'acao',     cor: '#16a34a', corFundo: '#dcfce7', frase: 'João <strong>correu</strong> no parque.',    cadeia: 'correu → correr → <strong>ação</strong>' },
        { tipo: 'estado',   cor: '#7c3aed', corFundo: '#ede9fe', frase: 'Maria <strong>estava</strong> cansada.',     cadeia: 'estava → estar → <strong>estado</strong>' },
        { tipo: 'mudanca',  cor: '#ea580c', corFundo: '#ffedd5', frase: 'O leite <strong>ficou</strong> azedo.',      cadeia: 'ficou → ficar → <strong>mudança de estado</strong>' },
        { tipo: 'fenomeno', cor: '#2563eb', corFundo: '#dbeafe', frase: 'Amanheceu muito cedo hoje.',                 cadeia: 'amanheceu → amanhecer → <strong>fenômeno da natureza</strong>' },
      ],
    },
  },

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
