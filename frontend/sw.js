const CACHE_NAME = 'ecopoint-v1';

// Rutas ajustadas al nombre exacto de tu archivo HTML y assets
const ASSETS_TO_CACHE = [
  './',
  './proyecto%20ecopoint.html',
  './manifest.json',
  './css/style.css',
  './assets/img/reciclaje_logo.png',
  './js/config.js',
  './js/api.js',
  './js/auth.js',
  './js/points.js',
  './js/rewards.js',
  './js/movil.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.error(`Error al precachear el archivo: ${url}`, err);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }).catch(() => caches.match('./proyecto%20ecopoint.html'))
  );
});