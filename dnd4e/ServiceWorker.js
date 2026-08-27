const cacheName = "S6Team-Dnd4e-1.0";
const contentToCache = [
    "Build/69e80961823acabd1072a0fa833add3e.loader.js",
    "Build/66061c6da569ddeec3c93dff6cd9ea63.framework.js.unityweb",
    "Build/eeaa1d4175e9c6bb59c33b0f3937fb4a.data.unityweb",
    "Build/6df500852be07762607b99e59957c967.wasm.unityweb",
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
