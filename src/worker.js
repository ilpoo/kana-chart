const cacheName = "app-cache-v1.5.2";
const filesToCache = [
  "./", 
  "./main.js",
  "./media/Kyoukasho.subset.kana.woff2",
  "./media/hiragana.min.svg",
  "./media/katakana.min.svg",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
    .then(() => self.skipWaiting())
    .catch(error => {
      console.log("Installation failed: ", error);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
    .then(keyList => 
      Promise.all(keyList.map(key => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }))
    ).catch(console.log)
  );
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request).then(response => 
      caches.open(cacheName).then(cache => {
        cache.put(event.request, response.clone());
        return response;
      })
    ))
  );
});
