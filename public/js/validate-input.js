(function(){
    const password = document.getElementById('password');
    const password1 = document.getElementById('password1');


    password1.addEventListener('keyup', event => {
        event.preventDefault();
        if (password1.value !== password.value) {
            password1.style.border = "2px solid red";
        } else {
            password1.style.border = "2px solid green";
        }
    });
})();