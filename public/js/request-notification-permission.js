(function() {

    if (!('serviceWorker' in navigator)) {
      alert("This browser doesn't support push notifcations. You won't be able to use this app correctly");
      return;
    }

    else if (!('PushManager' in window)) {
      alert("This browser doesn't support push notifcations. You won't be able to use this app correctly");
      return;
    }
    else {
        (function registerServiceWorker() {
          return navigator.serviceWorker.register('/js/service-worker.js');
          .then(function(registration) {
            console.log('Service worker successfully registered.');
            return registration;
          })
          .catch(function(err) {
            console.error('Unable to register service worker.', err);
          });
        })();
        if (!('Notification' in window)) {
            alert("This browser doesn't support notifcations. You won't be able to use this app correctly");
        } else if (Notification.permission === denied) {
            Notification.requestPermission(permission => {
                Notification.permission = permission;
            })
        }
    }

})();