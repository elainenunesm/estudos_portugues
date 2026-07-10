'use strict';

// Incrementar sempre que algum arquivo do app-shell mudar, pra forçar os
// clientes a buscar a versão nova em vez de continuar usando o cache antigo.
const CACHE_NAME = 'gramix-v26';

const APP_SHELL = [
  'index.html',
  'estudo.html',
  'manifest.json',
  'favicon.ico',
  'css/style.css',
  'css/estudo.css',
  'js/idb.js',
  'js/script.js',
  'js/estudo.js',
  'js/data/modulos.js',
  'js/data/questoes/aula-1.js',
  'js/data/questoes/aula-2.js',
  'js/data/questoes/aula-3.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'icons/favicon-16.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(
        nomes.filter(nome => nome !== CACHE_NAME).map(nome => caches.delete(nome))
      ))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde rápido com o que já está em cache (ou
// espera a rede na primeira visita) e atualiza o cache em segundo plano, pra
// o app abrir offline mas ainda pegar mudanças novas quando há conexão.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      // ignoreSearch: estudo.html?aula=1, ?modo=erros etc. são o mesmo
      // arquivo cacheado como "estudo.html" (sem query string).
      const emCache = await cache.match(req, { ignoreSearch: true });
      const buscaRede = fetch(req)
        .then(resp => {
          if (resp && resp.status === 200) cache.put(req, resp.clone());
          return resp;
        })
        .catch(() => null);

      if (emCache) return emCache;
      const daRede = await buscaRede;
      if (daRede) return daRede;
      // Offline e sem cache — para navegação, cai no shell principal.
      if (req.mode === 'navigate') return cache.match('index.html');
      return Response.error();
    })
  );
});
