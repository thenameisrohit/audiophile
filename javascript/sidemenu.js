let sidemenu_opener = document.getElementById("sidemenu_opener");
let sidemenu = document.getElementById("sidemenu");
let blindmode = document.getElementById("blindmode");
let is_sidemenu_open = false;


blindmode_data = [/*{ blind_mode: "false" }*/];
allblindmode_data = localStorage.getItem("allblindmode_data");
if (allblindmode_data == null) {  /*Not Selected*/ }
else {
    blindmode_data = JSON.parse(allblindmode_data);
    if (blindmode_data[0].blind_mode == "true") {
        blindmode.checked = true;
    }
    else {
        blindmode.checked = false;
    }
}


sidemenu_opener.addEventListener("click", () => {
    if (!is_sidemenu_open) {
        sidemenu.style.left = "-10px";
        sidemenu.style.transition = "0.1s";
        is_sidemenu_open = true;
    }
    else {
        sidemenu.style.left = "-179px";
        sidemenu.style.transition = "0.1s";
        is_sidemenu_open = false;
    }
})

blindmode.addEventListener("change", () => {
    if (blindmode.checked) {
        blindmode_data = [{ blind_mode: "true" }];
    } else {
        blindmode_data = [{ blind_mode: "false" }];
    }
    blindmode_data = JSON.stringify(blindmode_data)
    localStorage.setItem("allblindmode_data", blindmode_data);
})