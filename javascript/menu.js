let header_hamburger_is_open = false
let header_hamburger = document.getElementById("header_hamburger");
let mobile_menu = document.getElementById("mobile_menu");


header_hamburger.addEventListener("click", () => {
    if (header_hamburger_is_open) {
        header_hamburger.innerHTML = `<img src="/images/icon-hamburger.svg" alt="">`;
        header_hamburger_is_open = false;
        mobile_menu.style.opacity = -1;
        mobile_menu.style.zIndex = -1;
        mobile_menu.style.top = "-900px";

    } else {
        var body = document.body,html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight);
        console.log(height);
        header_hamburger.innerHTML = `<img src="/images/icon-hamburger-close.svg" alt="">`;
        header_hamburger_is_open = true;
        mobile_menu.style.opacity = 1;
        mobile_menu.style.zIndex = 1;
        mobile_menu.style.top = "60px";    
        mobile_menu.style.height = height+"px";
    }
})