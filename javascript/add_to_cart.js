all_items = null;
items_cart = [];
let fi = true;

function create_setup() {
    items_cart = [];
    all_items = localStorage.getItem("all_items");

    if (all_items == null) {
        // empty
    } else { items_cart = JSON.parse(all_items); }
}

function switch_item(id, quantity) {
    switch (id) {
        case 1:
            items_cart.push({
                id: id,
                title: "XX99 MARK II",
                price: "$ 99",
                quantity: quantity,
                img : "/images/cart/image-xx99-mark-two-headphones.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break
        case 2:
            items_cart.push({
                id: id,
                title: "XX99 MARK I",
                price: "$ 85",
                quantity: quantity,
                img : "/images/cart/image-xx99-mark-one-headphones.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break
        case 3:
            items_cart.push({
                id: id,
                title: "XX59",
                price: "$ 89",
                quantity: quantity,
                img : "/images/cart/image-xx59-headphones.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break;
        case 4:
            items_cart.push({
                id: id,
                title: "ZX9",
                price: "$ 199",
                quantity: quantity,
                img : "/images/cart/image-zx9-speaker.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break;
        case 5:
            items_cart.push({
                id: id,
                title: "ZX7",
                price: "$ 156",
                quantity: quantity,
                img : "/images/cart/image-zx7-speaker.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break;
        case 6:
            items_cart.push({
                id: id,
                title: "YX1",
                price: "$ 50",
                quantity: quantity,
                img : "/images/cart/image-yx1-earphones.jpg"
            });

            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break;
        default:
            break;
    }
    header_cart_loader();
}


function add_to_cart(id, quantity) {
    data_for_id(id, quantity);
    header_cart_loader()
}


function data_for_id(id, quantity) {
    create_setup();

    if (all_items == null) {
        switch_item(id, quantity)
        console.log(1);
        fi = false
    }
    else if (all_items != null) {
        let i = 1;
        console.log(items_cart.length);
        for (const e of items_cart) {
            console.log(e);
            console.log(i);
            if (e.id == id) {
                e.quantity = e.quantity + quantity;
                localStorage.setItem("all_items", JSON.stringify(items_cart))
                fi = false
            }
            else if (fi && items_cart.length == i) {
                switch_item(id, quantity)
                break;
            }
            i++;
        }
    }
}