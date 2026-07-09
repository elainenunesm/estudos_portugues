'use strict';

/**
 * AULA-1.JS — Aula 1: Aprenda o que é o verbo
 * Para adicionar/editar questões, edite apenas este arquivo.
 */
window.AULA_DATA = {
  id:     1,
  modulo: 'Etapa 1: Fundamentos',
  titulo: 'Aula 1: Aprenda o que é o verbo',

  antesComecar: {
    titulo:      'Aprenda o que é o verbo',
    descricao:   'Nesta aula você vai dar o primeiro passo para entender a estrutura das frases.',
    aprender:    'Nesta aula você aprenderá a identificar o verbo em frases simples.',
    importancia: 'Saber identificar o verbo ajuda a compreender a frase e facilita encontrar o sujeito.',
  },

  definicao: {
    texto: 'Verbo é a palavra que expressa <span class="destaque">ação</span>, <span class="destaque">estado</span>, <span class="destaque">mudança de estado</span> ou <span class="destaque">fenômeno da natureza</span>.',
  },

  contexto: {
    texto: 'Ao ler uma frase ou texto, uma das primeiras coisas que devemos procurar é o <strong>verbo</strong>, pois é ele quem dá movimento e sentido à oração.',
    nota: 'Oração é toda frase que possui um verbo.',
  },

  exemplo: [
    {
      tipo:      'acao',
      texto:     'Por exemplo, ao ouvir a palavra <strong class="destaque">correr</strong>, imaginamos alguém se movimentando rapidamente de um lugar para outro.',
      conclusao: 'Isso representa uma <span class="destaque">ação</span>.',
    },
    {
      tipo:      'estado',
      texto:     'Ao ouvir a palavra <strong class="destaque">estou</strong>, imaginamos alguém que permanece de uma determinada forma e <strong class="destaque">não ouve mudança</strong>.',
      conclusao: 'Isso representa um <span class="destaque">estado</span>.',
    },
    {
      tipo:      'mudanca',
      texto:     'Ao ouvir a palavra <strong class="destaque">ficou</strong>, imaginamos alguém que alterou o seu estado original.',
      conclusao: 'Isso representa uma <span class="destaque">mudança de estado</span>.',
    },
    {
      tipo:      'fenomeno',
      texto:     'Ao ouvir a palavra <strong class="destaque">amanheceu</strong>, imaginamos um fenômeno que independe de ação humana, simplesmente acontece.',
      conclusao: 'Isso representa um <span class="destaque">fenômeno da natureza</span>.',
    },
  ],

  checagem: [
    {
      invertido: true,
      titulo:    'O que é um verbo?',
      subtitulo: 'Escolha a definição correta.',
      opcoes: [
        'A palavra que dá nome a pessoas, lugares ou coisas.',
        'A palavra que expressa ação, estado, mudança de estado ou fenômeno da natureza.',
        'A palavra que qualifica o substantivo, indicando uma característica.',
        'A palavra que substitui o substantivo na frase.',
      ],
      correta:  1,
      feedback: 'Verbo é a palavra que expressa ação, estado, mudança de estado ou fenômeno da natureza — como vimos em "correr", "Estou", "Ficou" e "Amanheceu".',
    },
    {
      titulo:    'O verbo em destaque indica:',
      subtitulo: '"O cachorro <strong>correu</strong> pelo jardim."',
      opcoes:    ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:   0,
      feedback:  '"Correu" indica uma ação — um movimento realizado pelo cachorro.',
    },
    {
      titulo:    'O verbo em destaque indica:',
      subtitulo: '"Ana <strong>está</strong> muito animada com a viagem."',
      opcoes:    ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:   1,
      feedback:  '"Está" indica um estado — uma forma em que Ana permanece, sem mudança.',
    },
    {
      titulo:    'O verbo em destaque indica:',
      subtitulo: '"O garoto <strong>cresceu</strong> cinco centímetros em seis meses."',
      opcoes:    ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:   2,
      feedback:  '"Cresceu" indica uma mudança de estado — o garoto alterou sua altura original.',
    },
    {
      titulo:    'O verbo em destaque indica:',
      subtitulo: '"<strong>Amanheceu</strong> com neblina hoje."',
      opcoes:    ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:   3,
      feedback:  '"Amanheceu" indica um fenômeno da natureza — acontece independente de ação humana.',
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

    // ── SEÇÃO A — Identificar o verbo ────────────────────────
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"A Maria cantou no coral."',
      opcoes:      ['Maria', 'cantou', 'coral', 'no'],
      correta:     1,
      feedback:    '"Cantou" é o verbo — indica a ação de Maria. Infinitivo: cantar (-ar).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O gato dormiu na cama."',
      opcoes:      ['gato', 'dormiu', 'cama', 'na'],
      correta:     1,
      feedback:    '"Dormiu" é o verbo — indica a ação do gato. Infinitivo: dormir (-ir).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O Pedro comeu o bolo."',
      opcoes:      ['Pedro', 'bolo', 'comeu', 'o'],
      correta:     2,
      feedback:    '"Comeu" é o verbo — indica a ação de Pedro. Infinitivo: comer (-er).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"A professora pôs o livro na mesa."',
      opcoes:      ['professora', 'livro', 'mesa', 'pôs'],
      correta:     3,
      feedback:    '"Pôs" é o verbo — forma do verbo pôr, que pertence à 2ª conjugação (antigamente "poer").',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O menino sorriu feliz."',
      opcoes:      ['menino', 'sorriu', 'feliz', 'o'],
      correta:     1,
      feedback:    '"Sorriu" é o verbo — indica a ação do menino. Infinitivo: sorrir (-ir).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O João estudou a lição."',
      opcoes:      ['João', 'estudou', 'lição', 'a'],
      correta:     1,
      feedback:    '"Estudou" é o verbo — indica a ação de João. Infinitivo: estudar (-ar).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O sol forte brilhou hoje."',
      opcoes:      ['sol', 'forte', 'brilhou', 'hoje'],
      correta:     2,
      feedback:    '"Brilhou" é o verbo — indica a ação do sol. Infinitivo: brilhar (-ar).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O vento frio soprou forte."',
      opcoes:      ['vento', 'frio', 'soprou', 'forte'],
      correta:     2,
      feedback:    '"Soprou" é o verbo — indica a ação do vento. Infinitivo: soprar (-ar).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"O pequeno pássaro voou alto."',
      opcoes:      ['pequeno', 'pássaro', 'voou', 'alto'],
      correta:     2,
      feedback:    '"Voou" é o verbo — indica a ação do pássaro. Infinitivo: voar (-ar).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'Qual é o verbo na frase?',
      subtitulo:   '"A vovó propôs uma brincadeira."',
      opcoes:      ['vovó', 'propôs', 'brincadeira', 'uma'],
      correta:     1,
      feedback:    '"Propôs" é o verbo — derivado de "propor", que é derivado de "pôr" (2ª conjugação).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O que é um verbo?',
      subtitulo:   'Escolha a definição correta.',
      opcoes: [
        'Palavra que nomeia um ser, objeto ou lugar.',
        'Palavra que indica ação, estado, mudança de estado ou fenômeno da natureza.',
        'Palavra que descreve uma qualidade ou característica.',
        'Palavra que indica circunstância de tempo ou lugar.',
      ],
      correta:  1,
      feedback: 'O verbo é a palavra que expressa ação (correr), estado (ser), mudança de estado (ficar) ou fenômeno da natureza (chover).',
    },

    // ── SEÇÃO B — Classificar o verbo ────────────────────────
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"O cachorro correu pelo jardim."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     0,
      feedback:    '"Correu" indica ação — o cachorro realizou um movimento. Infinitivo: correr.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"Ana está muito animada com a viagem."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     1,
      feedback:    '"Está" indica estado — expressa como Ana se encontra naquele momento.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"Amanheceu com neblina hoje."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     3,
      feedback:    '"Amanheceu" indica fenômeno da natureza — descreve algo que ocorre na natureza sem sujeito determinado.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"O garoto cresceu cinco centímetros em seis meses."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     2,
      feedback:    '"Cresceu" indica mudança de estado — o garoto passou de um estado (menor) para outro (maior).',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"O doente ficou com febre alta."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     2,
      feedback:    '"Ficou" indica mudança de estado — o doente passou a ter febre, mudando de condição.',
    },
    {
      dificuldade: 'Fácil',
      titulo:      'O verbo em destaque indica:',
      subtitulo:   '"O professor permaneceu de pé durante toda a aula."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     1,
      feedback:    '"Permaneceu" indica estado — expressa a continuidade de uma situação, sem mudança.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'O verbo em destaque indica: (atenção!)',
      subtitulo:   '"Pedro anda preocupado ultimamente."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     1,
      feedback:    '"Anda" aqui indica estado, não ação! Neste contexto significa "está" — Pedro está preocupado. O mesmo verbo pode ter sentidos diferentes.',
    },
    {
      dificuldade: 'Médio',
      titulo:      'O verbo em destaque indica: (atenção!)',
      subtitulo:   '"A criança caiu da bicicleta."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     0,
      feedback:    '"Caiu" aqui indica ação — a criança realizou o movimento de cair. Cuidado: "cair" pode ser fenômeno da natureza em "A chuva caiu".',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'O verbo em destaque indica: (atenção!)',
      subtitulo:   '"O soldado morreu no campo de batalha."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     2,
      feedback:    '"Morreu" indica mudança de estado — o soldado passou do estado de vivo para morto. Verbos que indicam transformação irreversível são de mudança de estado.',
    },
    {
      dificuldade: 'Difícil',
      titulo:      'O verbo em destaque indica: (atenção!)',
      subtitulo:   '"Ele amanheceu doente na segunda-feira."',
      opcoes:      ['Ação', 'Estado', 'Mudança de estado', 'Fenômeno da natureza'],
      correta:     2,
      feedback:    '"Amanheceu" aqui indica mudança de estado — ele acordou já estando doente (mudou de condição). Diferente de "Amanheceu cedo hoje", que é fenômeno da natureza.',
    },
  ],
};
