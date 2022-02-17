this.addEventListener("install", function (event) {
  console.log("[Service Worker] Installation de v1");
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      console.log("[Service Worker] Mise en cache");
      return cache.addAll([
        "index.html",
        "index.css",
        "index.js",
        "index2.js",
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
        "page-hors-ligne.html",
      ]);
    })
  );
});

this.addEventListener("activate", (e) => {
  console.log("Sw actif");
});

function cacheOrNetwork(request) {
  return fromCache(request).catch(() => fetch(request));
}

function fromCache(request) {
  return caches.open("v1").then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

this.addEventListener("fetch", function (event) {
  event.respondWith(
    cacheOrNetwork(event.request).catch(() => fallbackVersPageHorsLigne())
  );
});

function fallbackVersPageHorsLigne() {
  return caches.match("page-hors-ligne.html");
}

// sync service worker.
this.addEventListener("sync", function (event) {
  console.log("reçu : " + event);
  if (event.tag == "sit") {
    console.log("Connection réétablie envoie notif si permis");
    event.waitUntil(envoyerNotification());
  }
});

// Connection rétablie. notification: la page est dispo.
function envoyerNotification() {
  console.log("Notification envoyée");
  if (Notification.permission === "granted") {
    var options = {
      body: "Page dispo",
      requireInteraction: true,
    };

    self.registration.showNotification("Connection réétabli", options);
  } else {
    console.log("Pas de notif: non permis");
  }
}
