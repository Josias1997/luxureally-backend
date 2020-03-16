(function() {
    if(!("Notification" in window)) {
        alert("This browser doesn't support notifcations. You won't be able to use this app correctly");
    } else if (Notification.permission === "denied") {
        Notification.requestPermission(permission => {
            if (!("permission" in Notification)) {
                Notification.permission = permission;
            }
        });
    }

})();