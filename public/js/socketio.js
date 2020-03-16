let socket = io.connect('https://luxureally-backend.herokuapp.com');

socket.on('new_delivery', delivery => {
    const body = document.querySelector('#body-delivery');
    if(body) {
        $("#body-delivery").prepend($.parseHTML(`<tr>
          <td>${delivery.firstName}</td>
          <td>${delivery.lastName}</td>
          <td>${delivery.address}</td>
          <td class="text-success">${delivery.total_price} MAD</td>
          <td>
            <select data-id="${delivery._id}" class="form-control select-delivery">
              <option value="${delivery.status}" class="${delivery.status === 'TREATING' ? 'text-danger' : 'text-success'}">${delivery.status}</option>
              ${delivery.status === "TREATING" ? '<option class="text-success" value="READY">READY</option>' : '<option class="text-danger" value="TREATING">TREATING</option>'}
            </select>
          </td>
          <td>${delivery.restaurant.name}</td>
          <td>
            <a href="/admin/deliveries/${delivery._id}" class="btn btn-dark btn-rounded btn-fw">
              <i class="mdi mdi-file-check btn-icon-append"></i>
              Edit
            </a>
            <button data-url="/api/deliveries/${delivery._id}" type="button" class="btn btn-danger btn-rounded btn-fw del">
              <i class="icon-trash btn-icon-append"></i>
              Delete
            </button>
          </td>
        </tr>`))
    }
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } 
    else if (Notification.permission === "granted") {
        let options = {
            body: `New delivery ${delivery.firstName} ${delivery.lastName} ${delivery.total_price}`,
            dir: 'ltr'
        };

        let audio = new Audio('/notification/audio.mp3');
        audio.play();

        let notification = new Notification('New delivery', options);
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(permission => {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            if (permission === "granted") {
                let options = {
                    body: `New delivery ${delivery.firstName} ${delivery.lastName} ${delivery.total_price}`,
                    dir: "ltr"
                };
                let audio = new Audio('/notification/audio.mp3');
                audio.play();
                let notification = new Notification('New Delivery', options);
            }
        })
    }
});

socket.on('new_order', order => {
  console.log(order);
  const body = document.querySelector('#body-order');
  if(body) {
      $("#body-order").prepend($.parseHTML(`<tr>
        <td>${order._id}</td>
        <td class="text-success">${order.total_price} MAD</td>
        <td>${order.table._id}</td>
        <td>
          <select data-id="${order._id}" class="form-control select-delivery">
              <option value="${order.status}" class="${order.status === 'TREATING' ? 'text-danger' : 'text-success'}">${order.status}</option>
              ${order.status === "TREATING" ? '<option class="text-success" value="READY">READY</option>' : '<option class="text-danger" value="TREATING">TREATING</option>'}
          </select>
        </td>
        <td>
          <a href="/admin/orders/${order._id}" class="btn btn-dark btn-rounded btn-fw">
            <i class="mdi mdi-file-check btn-icon-append"></i>
            Edit
          </a>
          <button data-url="/api/orders/${order._id}" type="button" class="btn btn-danger btn-rounded btn-fw del">
            <i class="icon-trash btn-icon-append"></i>
            Delete
          </button>
        </td>
      </tr>`))
    }
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } 
    else if (Notification.permission === "granted") {
        let options = {
            body: `Price: ${order.total_price}`,
            dir: 'ltr'
        };

        let audio = new Audio('/notification/audio.mp3');
        audio.play();

        let notification = new Notification('New Order', options);
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(permission => {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            if (permission === "granted") {
                let options = {
                    body: `Price: ${order.total_price}`,
                    dir: "ltr"
                };
                let audio = new Audio('/notification/audio.mp3');
                audio.play();
                let notification = new Notification('New Order', options);
            }
        })
    }
});