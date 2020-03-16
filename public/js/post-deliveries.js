(function(){
    const addItem = document.querySelector('#add-item');
    const foodDetails = addItem.dataset.ids.split('-');
    console.log(foodDetails);

    const foods = foodDetails.map(details => {
        if (details !== "") {
            return {
                id: details.split(',')[0],
                title: details.split(',')[1],
                price: details.split(',')[2]
            }
        }
    }).filter(food => food.price !== undefined);
    console.log(foods);

    let numberItems = 0;
    addItem.addEventListener('click', event => {
        event.preventDefault();
        $("#order-items").append($.parseHTML(`<div class="card mt-2">
                <div class="card-body">
                    <h4 class="card-title">Order Item</h4>
                    <div class="form-group">
                      <label for="id">Food</label>
                      <select name="_id" class="form-control" id=${`select${numberItems}`}>
                        ${foods.map(food => `<option value="${food.id}">${food.title}</option>`)}
                      </select>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-primary text-white">MAD</span>
                        </div>
                        <input disabled id=${`price${numberItems}`} value=${foods[0].price} name="price" type="text" class="form-control" aria-label="Price (to the nearest dollar)">
                        <div class="input-group-append">
                          <span class="input-group-text">.00</span>
                        </div>
                      </div>
                    </div> 
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-primary text-white">Items</span>
                        </div>
                        <input id=${`quantity${numberItems}`} value="1" name="quantity" type="number" min="0" class="form-control" aria-label="Quantity of items">
                        <div class="input-group-append">
                          <span class="input-group-text">Items</span>
                        </div>
                      </div>
                    </div> 
                </div>
            </div>`));
        const priceInput = document.querySelector(`#price${numberItems}`);
        const select = document.querySelector(`#select${numberItems}`);
        select.addEventListener('change', event => {
            event.preventDefault();
            food = foods.filter(food => food.id === select.value)[0];
            priceInput.value = food.price;
        })
        numberItems++;
    });

    const form = document.querySelector('#form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const restaurant = document.querySelector('#restaurant').value;
        const firstName = document.querySelector('#first_name').value;
        const lastName = document.querySelector('#last_name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
        const phone = document.querySelector('#phone').value;
        const status = document.querySelector('#status').value;
        const orderDetails = document.querySelector('#order_details').value;

        if(firstName !== '' && lastName !== '' && email !== '' && address !== '' &&
            phone !== '' && order_details !== '') {
            orderItems = [];
            for (let i = 0; i < numberItems; i++) {
                orderItems.push({
                    _id: document.querySelector(`#select${i}`).value,
                    title: foods.filter(food => food.id === document.querySelector(`#select${i}`).value)[0].title,
                    price: document.querySelector(`#price${i}`).value,
                    quantity: document.querySelector(`#quantity${i}`).value
                })
            }
            const totalPrice = document.querySelector('#total_price');
            totalPrice.value = orderItems.length !== 0 ? orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
            const data = {
                restaurant: restaurant,
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phone: phone,
                total_price: totalPrice.value,
                status: status,
                order_details: orderDetails,
                order_items: orderItems
            };
            $.ajax({
                method: 'POST',
                url: '/api/deliveries/',
                data: data,
                success: data => {
                    console.log(data);
                    window.location.href = "/admin/deliveries/";
                },
                error: error => {
                    console.log(error);
                }
            })
        } else {
            console.log("Error");
        }
    })
})();