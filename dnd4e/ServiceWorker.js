const cacheName = "S6Team-Dnd4e-1.0";
const contentToCache = [
    "Build/24161f25b7ddda67ac733a175b19c887.loader.js",
    "Build/66061c6da569ddeec3c93dff6cd9ea63.framework.js.unityweb",
    "Build/6eed9449f2544177e7ffa2733d474681.data.unityweb",
    "Build/1c7efe3f23ff4c52086efefe9581e24c.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
