(function(){
    const selects = [...document.getElementsByClassName('select-delivery')];
    selects.forEach(select => {
        select.addEventListener('change', event => {
            event.preventDefault();
            const delivery = {
                status: select.value
            };
            $.ajax({
                method: 'PATCH',
                url: `/api/deliveries/${select.dataset.id}`,
                data: delivery,
                success: data => {
                    console.log(data);
                    window.location.reload();
                },
                error: err => {
                    console.log(err);
                }
            })
        })
    })
})();