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
