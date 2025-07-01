self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('texbet-cache').then(cache => {
      return cache.addAll([
        '/fav/',
        '/fav/index.html',
        '/fav/styles.css',
        '/fav/script.js',
        '/fav/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});