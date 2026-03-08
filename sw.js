/* Worker maroto pra enganar o PWABuilder e deixar o app offline basicão */
const CACHE_NAME = 'barbearia-v9';
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
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
