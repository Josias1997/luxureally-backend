(function(){
    const selects = [...document.getElementsByClassName('select-order')];
    if (selects) {
        selects.forEach(select => {
            select.addEventListener('change', event => {
                event.preventDefault();
                const order = {
                    status: select.value
                };
                $.ajax({
                    method: 'PATCH',
                    url: `/api/orders/${select.dataset.id}`,
                    data: order,
                    success: data => {
                        console.log(data);
                        window.location.reload();
                    },
                    error: err => {
                        console.log(err);
                    }
                })
            })
        });
    }
    const details = [...document.getElementsByClassName('details')];
    details.forEach(detail => {
        const orderItemDetails = detail.dataset.ids.split('-');
        const orderItems = orderItemDetails.map(details => {
            if (details !== "") {
                return {
                    title: details.split(',')[0],
                    price: details.split(',')[1],
                    quantity: details.split(',')[2]
                }
            }
        }).filter(orderItem => orderItem !== undefined);
        detail.addEventListener('click', event => {
            event.preventDefault();
            
            const modal = document.querySelector('#modal');
            modal.style.display = 'block';
            const span = document.querySelector('#close');
            span.onclick = () => {
                $("#table-body").html(``);
                modal.style.display = 'none';
            };

            window.onclick = event => {
                if(event.target == modal) {
                    $("#table-body").html(``);
                    modal.style.display = "none";
                }
            }

            orderItems.forEach(orderItem => {
                $("#table-body").append($.parseHTML(`<tr>
                        <td>${orderItem.title}</td>
                        <td>${orderItem.price}</td>
                        <td>${orderItem.quantity}</td>
                    </tr>`))
            })
        })
    })
})();