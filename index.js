if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (reg) {
      console.log("Scope" + reg.scope);
    })
    .catch(function (error) {
      console.log("Error" + error);
    });
}

// Initialise la variable
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // pas de barre si installé
  e.preventDefault();
  // Réserve evenement
  deferredPrompt = e;
  // installer pwa fenêtre avertissement
  installApp();

  console.log(`'beforeinstallprompt' fired.`);

  // bouton installer
 // appButton.addEventListener("click", function () {
   // deferredPrompt.prompt();
 // })
});

// informer l'utilisateur de la possibilité d'installer pwa

function installApp() {
  console.log("fonctionne");
  const fenetre = document.getElementById("mytoast");
  const toast = new bootstrap.Toast(fenetre, {
    delay: 5000
  }); //affichée 5 secondes
  toast.show();
};

// Demande la permission d'afficher des notifications en cliquant sur le boutton
function meNotifier() {
  Notification.requestPermission().then(function (result) {
    console.log("permission accordée");
  });
}

// Déclenche l’enregistrement d’un background sync
if ("serviceWorker" in navigator && "SyncManager" in window) {
  navigator.serviceWorker.ready.then(function (reg) {
    return reg.sync.register("sit");
  });
}
