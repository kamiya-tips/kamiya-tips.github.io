const cacheName = "S6Team-Dnd4e-1.0";
const contentToCache = [
    "Build/99bfcb68b3aac098260fca4a48e6e254.loader.js",
    "Build/66061c6da569ddeec3c93dff6cd9ea63.framework.js.unityweb",
    "Build/2e2236101bfcac05cde9ad85222914f3.data.unityweb",
    "Build/187954e45babafc78856fb1d978d9434.wasm.unityweb",
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
