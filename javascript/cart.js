let items_cart = [];
let all_items = localStorage.getItem("all_items");

let header_cart_is_open = false;
let total = 0;

header_cart_loader()



function header_cart_loader() {
    create_setup();
    if (all_items == null) {
        header_cart.innerHTML = `<img src="/images/cart.svg" alt="">`
    }
    else {
        items_cart = JSON.parse(all_items);
        header_cart.innerHTML = `<img src="/images/cart.svg" alt=""><div class="header_cart_size" id="header_cart_size">${items_cart.length}</div>`
    }
}
function count_total() {
    total = 0;
    for (const e of items_cart) {
        total = total + (parseInt(e.price.replace("$", "").replace(",", "")) * e.quantity);
    }
    return total;
}
function remove_all() {
    localStorage.removeItem("all_items")
    items_cart = [];
    add_html();
}


function add_empty_html() {
    header_cart_section_background.innerHTML = `
    <div class="empty_text"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">
        Your cart is empty
    </div>
    <div class="empty_cart_icon"  onmouseover="play_audio('Empty cart icon')" onmouseleave="stop_audio()">
        <img src="/images/empty-cart-icon.svg" alt="">
    </div>`
}
function add_product_html() {
    header_cart_section_background.innerHTML = `
    <div class="header_cart_section_background_details">
        <div class="header_cart_section_background_details_cart_remove">
            <div class="header_cart_section_background_details_cart"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">
                CART (${items_cart.length})
            </div>
            <div class="header_cart_section_background_details_remove" onclick="remove_all()"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">
                Remove all
            </div>
        </div>
        <div class="header_cart_section_background_details_products" id="header_cart_section_background_details_products">
        </div>
        <div class="header_cart_section_background_details_total"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">
            <div class="header_cart_section_background_details_total_text">
                TOTAL
            </div>
            <div class="header_cart_section_background_details_total_num">
                $${count_total()}
            </div>
        </div>
        <a class="header_cart_section_background_details_checkout" href="/html/checkout.html"  onmouseover="play_audio('Checkout')" onmouseleave="stop_audio('Checkout')">
            CHECKOUT
        </a>
    </div>`

    for (const e of items_cart) {
        header_cart_section_background_details_products.innerHTML += `
        <div class="header_cart_section_background_details_products_item" >
            <div class="header_cart_section_background_details_products_item_info"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">
                <div class="header_cart_section_background_details_products_img">
                    <img src="${e.img}" alt="">
                </div>
                <div class="header_cart_section_background_details_products_name_price">
                    <div class="header_cart_section_background_details_products_name">
                        ${e.title}
                    </div>
                    <div class="header_cart_section_background_details_products_price">
                        ${e.price}
                    </div>
                </div>
            </div>
            <div class="products_section2_item_info_quantity header_cart_section_background_details_products_item_quantity">
                <div class="products_section2_item_info_quantity_sub" onclick="cart_quantity(quantity${e.id},1,${e.id})" onmouseover="play_audio('Decrease Quantity')" onmouseleave="stop_audio()">
                    -</div>
                <div class="products_section2_item_info_quantity_num" id="quantity${e.id}"  onmouseover="speaker(this)" onmouseleave="stop_speaker(this)">${e.quantity}</div>
                <div class="products_section2_item_info_quantity_add" onclick="cart_quantity(quantity${e.id},2,${e.id})" onmouseover="play_audio('increase Quantity')" onmouseleave="stop_audio()">
                    +</div>
            </div>
        </div > `
    }
}



function add_html() {
    create_setup()
    header_cart_loader()

    if (all_items == null) {
        add_empty_html()

        if (!header_cart_is_open) {
            header_cart_section_background.style.opacity = 1;
            header_cart_section_background.style.zIndex = 2;
            header_cart_section_background.style.maxHeight = 138+ "px";
            header_cart_section_background.style.overflowY = "hidden"
            header_cart_section2.style.opacity = 1;
            header_cart_section2.style.zIndex = 2;
            document.body.style.overflowY = "hidden";
            header_cart_is_open = true;
        }
    }
    else {
        add_product_html()

        if (!header_cart_is_open) {
            header_cart_section_background.style.opacity = 1;
            header_cart_section_background.style.zIndex = 2;
            header_cart_section_background.style.maxHeight = innerHeight - 300 + "px";
            header_cart_section_background.style.overflowY = "scroll"
            header_cart_section2.style.opacity = 1;
            header_cart_section2.style.zIndex = 2;
            document.body.style.overflowY = "hidden";
            header_cart_is_open = true;
        }
    }



}




header_cart.addEventListener("click", () => {
    add_html()
    header_cart_loader()
})


header_cart_section2.addEventListener("click", () => {
    if (header_cart_is_open) {
        header_cart_section2.style.opacity = -1;
        header_cart_section2.style.zIndex = -2;
        header_cart_section_background.style.maxHeight = "138px";
        header_cart_section_background.style.overflowY = "hidden"
        header_cart_section_background.style.opacity = -1;
        header_cart_section_background.style.zIndex = -2;
        document.body.style.overflowY = "visible";
        header_cart_is_open = false;
    }
})


function delete_item(id) {
    items_cart.forEach(function (e, index) {
        if (e.id == id) {
            if (items_cart.length == 1) {
                remove_all();
                items_cart.splice(index, 1)
            }
            else {
                items_cart.splice(index, 1)
                localStorage.setItem("all_items", JSON.stringify(items_cart))
            }
        }
    });
    add_html()
}

function cart_quantity(htmlid, num, id) {
    create_setup()

    if (num === 1) {
        htmlid.innerText = parseInt(htmlid.innerText) - 1;
        if (parseInt(htmlid.innerText) < 1) {
            delete_item(id)
        }
    }
    else {
        if (parseInt(htmlid.innerText) <= 99) {
            htmlid.innerText = parseInt(htmlid.innerText) + 1;
        }
    }
    for (const e of items_cart) {
        if (e.id == id) {
            e.quantity = parseInt(htmlid.innerText);
            localStorage.setItem("all_items", JSON.stringify(items_cart))
            break;
        }
    }
    add_html()
    checkout_summery_loader()
}