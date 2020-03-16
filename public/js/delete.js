(function(){
    const buttons = [...document.getElementsByClassName('del')];
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            $.ajax({
                method: 'DELETE',
                url: `${button.dataset.url}`,
                success: data => {
                    console.log(data);
                    window.location.reload();
                }
            })
        })
    });
})();