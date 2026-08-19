const cacheName = "S6Team-Dnd4e-1.0";
const contentToCache = [
    "Build/7dfc236025c796766e6032f37acb644c.loader.js",
    "Build/66061c6da569ddeec3c93dff6cd9ea63.framework.js.unityweb",
    "Build/8fa3999090ee338715784329898861b7.data.unityweb",
    "Build/758914434de1801b49963b58af519b0f.wasm.unityweb",
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
