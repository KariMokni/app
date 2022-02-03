this.addEventListener("install", function (event) {
  console.log("[Service Worker] Installation de v1");
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      console.log("[Service Worker] Mise en cache");
      return cache.addAll([
        "index.html",
        "index.css",
        "index.js",
        "assets/icon-192x192.png",
        "assets/icon-256x256.png",
        "assets/icon-384x384.png",
        "assets/icon-512x512.png",
        "bootstrap-5.1.3-dist/css/bootstrap.min.css",
        "icons-1.7.2/font/bootstrap-icons.css",
        "bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js",
        "img/architecture.jpg",
        "img/djerbahood.jpg",
        "img/djerbalogo.jpg",
        "img/plage.jpg",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();

          caches.open("v1").then(function (cache) {
            cache.put(event.request, responseClone);
          });

          return response;
        });
      }
    })
  );
});

this.addEventListener("activate", (e) => {
  console.log("sw actif");
});
