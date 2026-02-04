const cacheName = 'trainer-app-v20';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Инсталиране на Service Worker и кеширане на файловете
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Активиране и изтриване на стари кешове
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Обслужване на заявки (зареждане от кеша, ако сме офлайн)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
