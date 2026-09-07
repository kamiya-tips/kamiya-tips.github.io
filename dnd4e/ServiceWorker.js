const cacheName = "S6Team-Dnd4e-1.0";
const contentToCache = [
    "Build/c5ac895c9f47f6fb0ce835f0d6b41057.loader.js",
    "Build/66061c6da569ddeec3c93dff6cd9ea63.framework.js.unityweb",
    "Build/7e26b742a5981c1973b06d741c087baf.data.unityweb",
    "Build/ec2ecf94e26c835ded2be8366e9e73c3.wasm.unityweb",
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
