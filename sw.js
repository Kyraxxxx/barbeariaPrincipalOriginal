/* Worker maroto pra enganar o PWABuilder e deixar o app offline basicão */
const CACHE_NAME = 'barbearia-v10';
const urlsToCache = [
  'index.html',
  'meus_agendamentos.html',
  'painel_barbeiro.html',
  'manifest.json',
  'Fundo.png',
  'Fundo2.png',
  'app_icon_barbearia.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Força o novo worker a assumir na hora
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Estratégia: Rede primeiro para páginas HTML, Cache primeiro para o resto
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
