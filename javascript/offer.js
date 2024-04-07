const getDiscountBtn = document.querySelector(".get-discount-btn");
const couponContainer = document.querySelector(".coupon-container");
const closeBtn = document.querySelector(".coupon-container .close");
let coupon_data = [/*{ coupon: "false" }*/];
let allcoupon_data = localStorage.getItem("allcoupon_data");

if (allcoupon_data == null) {
    setTimeout(() => {
        couponContainer.classList.add("active");
    }, 2000);
}
// else {
//     coupon_data = JSON.parse(allcoupon_data);
//     if (coupon_data[0].coupon == "false") {
//         setTimeout(() => {
//             couponContainer.classList.add("active");
//         }, 5000);
//     }
// }



closeBtn.addEventListener("click", () => {
    couponContainer.classList.remove("active");
});
btn.addEventListener("click", () => {
    coupon_data = [{ coupon: "true" }];
    localStorage.setItem("allcoupon_data", JSON.stringify(coupon_data))


    couponContainer.innerHTML = `
    <img class="bg" src="https://raw.githubusercontent.com/livebloggerofficial/Coupon-Popup/main/images/bg.svg" alt="" />
    <img class="gift" src="https://raw.githubusercontent.com/livebloggerofficial/Coupon-Popup/main/images/gift.svg" alt="" />
    <h2>Congratulations!</h2>
    <p>Coupen Redeemed Sucessfully</p>
    `
    setTimeout(() => {
        couponContainer.classList.remove("active");
    }, 1000);
})

