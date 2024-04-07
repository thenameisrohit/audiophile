let recognition;
try {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
} catch (error) {
    recognition.stop();
    console.log(error);
}
let temp_SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let temp_recognition = new temp_SpeechRecognition();
temp_recognition.lang = 'en-IN';

let handlessmode_data = [];
let allhandlessmode_data = localStorage.getItem("allhandlessmode_data");
handlessmode_checker();
if (handlessmode_data[0].handless_mode == "true") {
    recognition.continuous = true;
    setTimeout(async () => {
        recognition.start();
    }, 2000);
}

function handlessmode_checker() {
    allhandlessmode_data = localStorage.getItem("allhandlessmode_data");

    if (allhandlessmode_data == null) {
        handlessmode_data = [{ handless_mode: "false" }];
        handlessmode_data = JSON.stringify(handlessmode_data);
        localStorage.setItem("allhandlessmode_data", handlessmode_data);
    }
    else {
        handlessmode_data = JSON.parse(allhandlessmode_data);
    }
}




recognition.onstart = function () {
    handlessmode_checker();
    if (handlessmode_data[0].handless_mode == "true") {
        console.log('Listnig Started! Speak...');
    }
    else {
        console.log('Listnig Started! Speak...');
        play_audio('listening')
    }
}


recognition.onerror = function (event) {
    handlessmode_checker();
    if (handlessmode_data[0].handless_mode == "true") {
        console.log('Sorry, Try Again');
    }
    else {
        console.log('Sorry, Try Again');
        play_audio('Please, Try again');
    }

}


recognition.onspeechend = function () {
    handlessmode_checker();
    if (handlessmode_data[0].handless_mode == "true") {
        console.log('Listing Stoped!');
    }
    else {
        console.log('Listing Stoped!');
        play_audio('listening stoped');
    }
}

recognition.onresult = (event) => {
    handlessmode_checker();

    let transcript = event.results[event.results.length - 1][0].transcript;
    transcript = transcript.replace(".", "").toLowerCase().replace("listening ", "").replace("handless mode enabled","");
    console.log(transcript);
    if ((transcript.includes("enable") && transcript.includes("hand")) || (transcript.includes("enable") && transcript.includes("headless")) || (transcript.includes("open") && transcript.includes("hand")) || (transcript.includes("enable") && transcript.includes("end"))) {
        if (handlessmode_data[0].handless_mode == "false") {
            handlessmode_data[0].handless_mode = "true";
            handlessmode_data = JSON.stringify(handlessmode_data);
            localStorage.setItem("allhandlessmode_data", handlessmode_data);
            recognition.stop();
            play_audio('handless mode enabled')
            setTimeout(async () => {
                recognition.start();
                console.log(handlessmode_data[0].handless_mode);
            }, 2000);
        } else {
            play_audio('handless mode already enabled')
        }
        recognition.continuous = true;
    }
    if ((transcript.includes("disable") && transcript.includes("hand")) || (transcript.includes("disable") && transcript.includes("headless")) || (transcript.includes("close") && transcript.includes("hand")) || (transcript.includes("disable") && transcript.includes("end"))) {
        if (handlessmode_data[0].handless_mode == "true") {
            handlessmode_data[0].handless_mode = "false";
            handlessmode_data = JSON.stringify(handlessmode_data);
            localStorage.setItem("allhandlessmode_data", handlessmode_data);
            recognition.stop();
            play_audio('handless mode disabled')
        } else {
            play_audio('handless mode is already disabled')
        }
        recognition.continuous = false;
    }
    if (transcript.includes("home") || transcript.includes("home")) {
        recognition.stop();
        play_audio('Opening HomePage!')
        document.location.href = '/../../../';
    }
    if (transcript.includes("headphone") || transcript.includes("headphones")) {
        recognition.stop();
        play_audio('Opening Headphones!')
        document.location.href = '/../../../../html/headphones.html'
    }
    if (transcript.includes("speaker")) {
        recognition.stop();
            play_audio('Opening Speakers!')
            document.location.href = '/../../../../html/speakers.html'
    }
    if (transcript.includes("earphone")) {
        recognition.stop();
            play_audio('Opening Earthphones!')
            document.location.href = '/../../../../html/earthphones.html'
    }
    if ((transcript.includes("9") && transcript.includes("2")) || (transcript.includes("9") && transcript.includes("two"))|| (transcript.includes("9") && transcript.includes("too"))) {
        recognition.stop();
        play_audio('Opening XX99 MARK II HEADPHONES!')
        document.location.href = '/../../../../html/products/headphones/XX99_MARK_II_HEADPHONES.html'
    }
    if ((transcript.includes("9") && transcript.includes("1")) || (transcript.includes("9") && transcript.includes("one"))|| (transcript.includes("9") && transcript.includes("on"))) {
        recognition.stop();
            play_audio('Opening XX99 MARK 1 HEADPHONES!')
            document.location.href = '/../../../../html/products/headphones/XX99_MARK_I_HEADPHONES.html'
    }
    if ((transcript.includes("59") && transcript.includes("**")) || (transcript.includes("**") && transcript.includes("59"))|| (transcript.includes("xx") && transcript.includes("59"))) {
        recognition.stop();
            play_audio('Opening XX59!')
            document.location.href = '/../../../../html/products/headphones/XX59_HEADPHONES.html'
    }
    if ((transcript.includes("zx") && transcript.includes("9")) || (transcript.includes("z*") && transcript.includes("9"))|| (transcript.includes("z *") && transcript.includes("9"))) {
        recognition.stop();
            play_audio('opening zx9 speaker!')
            document.location.href = '/../../../../html/products/speakers/zx9_speaker.html'
    }
    if ((transcript.includes("zx") && transcript.includes("7")) || (transcript.includes("z*") && transcript.includes("7"))|| (transcript.includes("z *") && transcript.includes("7"))) {
        recognition.stop();
        play_audio('opening zx7 speaker!')
        document.location.href = '/../../../../html/products/speakers/zx7_speaker.html'
    }
    if ((transcript.includes("yx") && transcript.includes("1")) || (transcript.includes("y*") && transcript.includes("1"))|| (transcript.includes("y *") && transcript.includes("1"))) {
        recognition.stop();
        play_audio('opening yx1 earphones!')
            document.location.href = '/../../../../html/products/earthphones/YX1_WIRELESS_EARPHONES.html'
    }
    if ((transcript.includes("open") && transcript.includes("blind"))) {
        if (!is_sidemenu_open) {
            sidemenu.style.left = "-10px";
            sidemenu.style.transition = "0.1s";
            is_sidemenu_open = true;
        }
        else {
            play_audio("blind mode setting already opened")
        }
    }
    if ((transcript.includes("close") && transcript.includes("blind"))) {
        if (!is_sidemenu_open) {
            play_audio("blind mode setting already closed")
        }
        else {
            sidemenu.style.left = "-179px";
            sidemenu.style.transition = "0.1s";
            is_sidemenu_open = false;
        }
    }
    if ((transcript.includes("enable") && transcript.includes("blind")) || (transcript.includes("on") && transcript.includes("blind"))) {
        blindmode.checked = true;
            blindmode_data = [{ blind_mode: "true" }];
            blindmode_data = JSON.stringify(blindmode_data)
            localStorage.setItem("allblindmode_data", blindmode_data);
    }
    if ((transcript.includes("disable") && transcript.includes("blind")) || (transcript.includes("off") && transcript.includes("blind"))) {
        blindmode.checked = false;
            blindmode_data = [{ blind_mode: "false" }];
            blindmode_data = JSON.stringify(blindmode_data)
            localStorage.setItem("allblindmode_data", blindmode_data);
    }
    if ((transcript.includes("facebook"))) {
        recognition.stop();
                    play_audio('opening facebook link!')
                    document.location.href = 'facebook.com'
    }
    if ((transcript.includes("insta"))) {
        recognition.stop();
                    play_audio('opening instagram link!')
                    document.location.href = 'https://instagram.com/audiophileoffical?utm_medium=copy_link'
    }
    if ((transcript.includes("twitter"))) {
        recognition.stop();
        play_audio('opening twitter link')
        document.location.href = 'https://twitter.com/real_audiophile?t=fibt0aoYFB3mZDvz0vn9Q&s=09'
    }
    if ((transcript.includes("scroll") && transcript.includes("down") )) {
        window.scrollBy(0, 500);
    }
    if ((transcript.includes("scroll") && transcript.includes("up") )) {
        window.scrollBy(0, -500);
    }
    if ((transcript.includes("blind") && transcript.includes("speed") )) {
        if (!is_sidemenu_open) {
            sidemenu.style.left = "-10px";
            sidemenu.style.transition = "0.1s";
            is_sidemenu_open = true;
        }
        document.getElementById("blindmode_speed").click()
        recognition.stop();
        temp_recognition.start();
        temp_recognition.onstart = () => {
            play_audio('Enter blind mode speed');
            console.log('Enter Blind mode');
        }
        temp_recognition.onerror = () => {
            console.log('sorry, not understand!');
            play_audio('sorry, not understand!');
            setTimeout(() => {
                temp_recognition.start();
            }, 500);
        }
        temp_recognition.onspeechend = function () {
            console.log('Listing Stoped!');
        }
        temp_recognition.onresult = (e) => {
            let temp_transcript = e.results[e.results.length - 1][0].transcript;
            temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter blind mode speed ","");
            temp_transcript = parseFloat(temp_transcript)
            console.log(temp_transcript);
            blindmode_speed.value = temp_transcript;
            play_audio('blind mode speed set sucessfully');
            blind_mode_cheaker();
            if (handlessmode_data[0].handless_mode == "true") {
                recognition.start();
            } else {
                recognition.stop();
            }
        }
    }
    if ((transcript.includes("increase") && transcript.includes("quantity") )) {
        quantity.innerText = parseInt(quantity.innerText)+1;
    }
    if ((transcript.includes("decrease") && transcript.includes("quantity") )) {
        quantity.innerText = parseInt(quantity.innerText)-1;
    }
    if ((transcript.includes("set") && transcript.includes("quantity") ) || (transcript.includes("enter") && transcript.includes("quantity"))) {
        recognition.stop();
            temp_recognition.start();
            if (header_cart_is_open) {
                temp_recognition.onstart = () => {
                    play_audio('Enter quantity & name of product');
                    console.log('Enter quantity & name of product');
                }
                temp_recognition.onerror = () => {
                    console.log('sorry, not understand!');
                    play_audio('sorry, not understand!');
                    setTimeout(() => {
                        temp_recognition.start();
                    }, 500);
                }
                temp_recognition.onspeechend = function () {
                    console.log('Listing Stoped!');
                    play_audio('listening stoped');
                }
                temp_recognition.onresult = (e) => {
                    let temp_transcript = e.results[e.results.length - 1][0].transcript;
                    temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter quantity & name of product ","");
                    let product_quantity = parseInt(temp_transcript.substring(0, temp_transcript.indexOf(' ')));
                    let product = temp_transcript.substring(temp_transcript.indexOf(' ') + 1);
                    console.log(product_quantity);
                    console.log(product);
                    create_setup()
                    switch (product) {
                        case "** 59":
                            var id = 3;
                            for (var e of items_cart) {
                                if (e.id == id) {
                                    e.quantity = parseInt(product_quantity);
                                    localStorage.setItem("all_items", JSON.stringify(items_cart))
                                    break;
                                }
                            }
                            break;
                        case "** 99 mark 2":
                            id = 1;
                            for (var e of items_cart) {
                                if (e.id == id) {
                                    e.quantity = parseInt(product_quantity);
                                    localStorage.setItem("all_items", JSON.stringify(items_cart))
                                    break;
                                }
                            }
                            break;
                        case "** 99 mark one":
                            id = 2;
                            for (var e of items_cart) {
                                if (e.id == id) {
                                    e.quantity = parseInt(product_quantity);
                                    localStorage.setItem("all_items", JSON.stringify(items_cart))
                                    break;
                                }
                            }
                            break;

                        default:
                            play_audio("sorry product not found or not understand")
                            break;
                    }
                    add_html()
                    header_cart_loader()
                    play_audio('quantity set sucessfully');
                    if (handlessmode_data[0].handless_mode == "true") {
                        recognition.start();
                    } else {
                        recognition.stop();
                    }
                }
            } else {
                temp_recognition.onstart = () => {
                    play_audio('Enter quantity');
                    console.log('Enter quantity');
                }
                temp_recognition.onerror = () => {
                    console.log('sorry, not understand!');
                    play_audio('sorry, not understand!');
                    setTimeout(() => {
                        temp_recognition.start();
                    }, 500)
                }
                temp_recognition.onspeechend = function () {
                    console.log('Listing Stoped!');
                    play_audio('listening stoped');
                }
                temp_recognition.onresult = (e) => {
                    let temp_transcript = e.results[e.results.length - 1][0].transcript;
                    temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter quantity ","");
                    temp_transcript = parseInt(temp_transcript)
                    console.log(temp_transcript);
                    quantity.innerText = temp_transcript;
                    play_audio('quantity set sucessfully');
                    if (handlessmode_data[0].handless_mode == "true") {
                        recognition.start();
                    } else {
                        recognition.stop();
                    }
                }
            }
    }

    switch (transcript) {
        
            // case "facebook link":
            //     case "open facebook link":
            //         recognition.stop();
            //         play_audio('opening facebook link!')
            //         document.location.href = 'facebook.com'
            //         break;
        
            //     case "instagram link":
            //     case "insta link":
            //     case "open instagram link":
            //     case "open insta link":
            //         recognition.stop();
            //         play_audio('opening instagram link!')
            //         document.location.href = 'https://instagram.com/audiophileoffical?utm_medium=copy_link'
            //         break;
        
            //     case "twitter link":
            //     case "open twitter link":
            //         recognition.stop();
            //         play_audio('opening twitter link')
            //         document.location.href = 'https://twitter.com/real_audiophile?t=fibt0aoYFB3mZDvz0vn9Q&s=09'
            //         break;            

        
        case "scroll down auto":
        case "down auto":
            setInterval(() => {
                window.scrollBy(0, 10);
            }, 25);
            break;

        case "scroll up auto":
        case "up auto":
            setInterval(() => {
                window.scrollBy(0, -10);
            }, 25);
            break;

        // case "scroll down":
        // case "scroll down.":
        // case "down":
        //     window.scrollBy(0, 500);
        //     break;

        // case "scroll up":
        // case "scroll up.":
        // case "up":
        //     window.scrollBy(0, -500);
        //     break;

        case "scroll bottom":
        case "bottom":
        case "footer":
            window.scrollBy(0, 500000);
            break;

        case "scroll top":
        case "top":
        case "header":
            window.scrollBy(0, -500000);
            break;

        case "back":
        case "go back":
            recognition.stop();
            window.history.back();
            setTimeout(() => {
                recognition.start();
            }, 500);
            break;

        case "forward":
        case "go forward":
            recognition.stop();
            window.history.forward();
            setTimeout(() => {
                recognition.start();
            }, 500);
            break;

        // case "set blind mode speed":
        // case "blind mode speed":
        //     if (!is_sidemenu_open) {
        //         sidemenu.style.left = "-10px";
        //         sidemenu.style.transition = "0.1s";
        //         is_sidemenu_open = true;
        //     }
        //     document.getElementById("blindmode_speed").click()
        //     recognition.stop();
        //     temp_recognition.start();
        //     temp_recognition.onstart = () => {
        //         play_audio('Enter blind mode speed');
        //         console.log('Enter Blind mode');
        //     }
        //     temp_recognition.onerror = () => {
        //         console.log('sorry, not understand!');
        //         play_audio('sorry, not understand!');
        //         setTimeout(() => {
        //             temp_recognition.start();
        //         }, 500);
        //     }
        //     temp_recognition.onspeechend = function () {
        //         console.log('Listing Stoped!');
        //     }
        //     temp_recognition.onresult = (e) => {
        //         let temp_transcript = e.results[e.results.length - 1][0].transcript;
        //         temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter blind mode speed ","");
        //         temp_transcript = parseFloat(temp_transcript)
        //         console.log(temp_transcript);
        //         blindmode_speed.value = temp_transcript;
        //         play_audio('blind mode speed set sucessfully');
        //         blind_mode_cheaker();
        //         if (handlessmode_data[0].handless_mode == "true") {
        //             recognition.start();
        //         } else {
        //             recognition.stop();
        //         }
        //     }
        //     break;

        
        // case "increase":
        // case "increase quantity":
        // case "increase quantity":
        //     // recognition.stop();
        //     quantity.innerText = parseInt(quantity.innerText)+1;
        //     // if (handlessmode_data[0].handless_mode == "true") {
        //     //     setTimeout(() => {
        //     //         recognition.start();
        //     //     }, 500);
        //     // } else {
        //     //     recognition.stop();
        //     // }
        //     break;

        
        // case "decrease":
        // case "decrease quantity":
        // case "decrease quantity":
        //     // recognition.stop();
        //     quantity.innerText = parseInt(quantity.innerText)-1;
        //     // if (handlessmode_data[0].handless_mode == "true") {
        //     //     setTimeout(() => {
        //     //         recognition.start();
        //     //     }, 500);
        //     // } else {
        //     //     recognition.stop();
        //     // }
        //     break;



        // case "set quantity":
        // case "quantity":
        // case "enter quantity":
        //     recognition.stop();
        //     temp_recognition.start();
        //     if (header_cart_is_open) {
        //         temp_recognition.onstart = () => {
        //             play_audio('Enter quantity & name of product');
        //             console.log('Enter quantity & name of product');
        //         }
        //         temp_recognition.onerror = () => {
        //             console.log('sorry, not understand!');
        //             play_audio('sorry, not understand!');
        //             setTimeout(() => {
        //                 temp_recognition.start();
        //             }, 500);
        //         }
        //         temp_recognition.onspeechend = function () {
        //             console.log('Listing Stoped!');
        //             play_audio('listening stoped');
        //         }
        //         temp_recognition.onresult = (e) => {
        //             let temp_transcript = e.results[e.results.length - 1][0].transcript;
        //             temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter quantity & name of product ","");
        //             let product_quantity = parseInt(temp_transcript.substring(0, temp_transcript.indexOf(' ')));
        //             let product = temp_transcript.substring(temp_transcript.indexOf(' ') + 1);
        //             console.log(product_quantity);
        //             console.log(product);
        //             create_setup()
        //             switch (product) {
        //                 case "** 59":
        //                     var id = 3;
        //                     for (var e of items_cart) {
        //                         if (e.id == id) {
        //                             e.quantity = parseInt(product_quantity);
        //                             localStorage.setItem("all_items", JSON.stringify(items_cart))
        //                             break;
        //                         }
        //                     }
        //                     break;
        //                 case "** 99 mark 2":
        //                     id = 1;
        //                     for (var e of items_cart) {
        //                         if (e.id == id) {
        //                             e.quantity = parseInt(product_quantity);
        //                             localStorage.setItem("all_items", JSON.stringify(items_cart))
        //                             break;
        //                         }
        //                     }
        //                     break;
        //                 case "** 99 mark one":
        //                     id = 2;
        //                     for (var e of items_cart) {
        //                         if (e.id == id) {
        //                             e.quantity = parseInt(product_quantity);
        //                             localStorage.setItem("all_items", JSON.stringify(items_cart))
        //                             break;
        //                         }
        //                     }
        //                     break;

        //                 default:
        //                     play_audio("sorry product not found or not understand")
        //                     break;
        //             }
        //             add_html()
        //             header_cart_loader()
        //             play_audio('quantity set sucessfully');
        //             if (handlessmode_data[0].handless_mode == "true") {
        //                 recognition.start();
        //             } else {
        //                 recognition.stop();
        //             }
        //         }
        //     } else {
        //         temp_recognition.onstart = () => {
        //             play_audio('Enter quantity');
        //             console.log('Enter quantity');
        //         }
        //         temp_recognition.onerror = () => {
        //             console.log('sorry, not understand!');
        //             play_audio('sorry, not understand!');
        //             setTimeout(() => {
        //                 temp_recognition.start();
        //             }, 500)
        //         }
        //         temp_recognition.onspeechend = function () {
        //             console.log('Listing Stoped!');
        //             play_audio('listening stoped');
        //         }
        //         temp_recognition.onresult = (e) => {
        //             let temp_transcript = e.results[e.results.length - 1][0].transcript;
        //             temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("Enter quantity ","");
        //             temp_transcript = parseInt(temp_transcript)
        //             console.log(temp_transcript);
        //             quantity.innerText = temp_transcript;
        //             play_audio('quantity set sucessfully');
        //             if (handlessmode_data[0].handless_mode == "true") {
        //                 recognition.start();
        //             } else {
        //                 recognition.stop();
        //             }
        //         }
        //     }
        //     break;

        case "add to cart":
        case "add to car":
        case "add to cant":
        case "add to can't":
        case "add to current":
        case "add to cult":
        case "add to cut":
            document.getElementById("add_to_cart").click();
            if (handlessmode_data[0].handless_mode == "true") {
                setTimeout(() => {
                    recognition.start();
                }, 500);
            } else {
                recognition.stop();
            }
            break;

        case "open cart":
        case "open car":
        case "open cant":
        case "open can't":
        case "open current":
        case "open cult":
        case "open cut":
        case "cart":
        case "car":
        case "cant":
        case "can't":
        case "current":
        case "cult":
        case "cut":
            add_html()
            header_cart_loader()
            break;

        case "close cart":
        case "close car":
        case "close cant":
        case "close can't":
        case "close current":
        case "close cult":
        case "close cut":
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
            break;

        case "remove all":
        case "remove all item":
        case "remove all items":
            if (header_cart_is_open) {
                remove_all()
            } else {
                play_audio("please open cart first")
            }
            break;

        case "checkout":
        case "check out":
            if (header_cart_is_open) {
                create_setup();
                if (all_items != null) {
                    recognition.stop();
                    play_audio('Opening checkout!')
                    document.location.href = 'http://127.0.0.1:5500/html/checkout.html'
                } else {
                    play_audio("sorry cart is empty")
                }
            } else {
                play_audio("please open cart first")
            }
            break;

        case "enter the name":
        case "enter name":
        case "name":
        case "add name":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter Name');
                console.log('Enter Name');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter Name","").replace("Enter Name ","").replace("Enter name","");
                console.log(temp_transcript);
                checkout_name.value = temp_transcript;
                play_audio('Name added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the email":
        case "enter email":
        case "email":
        case "add email":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter email');
                console.log('Enter email');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").toLowerCase().replace("com.", ".com").replace("enter the mail","").replace("enter email","").replace("enter","").replace("enter email","").replace("enter female","").replaceAll(" ","").replaceAll(",","");
                console.log(temp_transcript);
                checkout_email.value = temp_transcript;
                play_audio('email added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the phone":
        case "enter phone":
        case "phone":
        case "add phone":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter phone');
                console.log('Enter phone');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter phone ","").replace("Enter Phone ","").replace("Enter phone","").replace("Enter","").replace("enter","").replace("phone","")
                console.log(temp_transcript);
                checkout_phone.value = temp_transcript;
                play_audio('phone added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the address":
        case "enter address":
        case "address":
        case "add address":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter address');
                console.log('Enter address');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter address ","").replace("Enter address","").replace("Enter Address","")
                console.log(temp_transcript);
                checkout_address.value = temp_transcript;
                play_audio('address added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the zip":
        case "enter zip":
        case "zip":
        case "add zip":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter zip');
                console.log('Enter zip');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = parseInt(temp_transcript.replace(".", "").replace("Enters in","").replace("Enter zip","").replace("Enter Zip ","").replace("Enter Zip","").replace("zip","").replace("Enter","").replaceAll(" ",""))
                console.log(temp_transcript);
                checkout_zip.value = temp_transcript;
                play_audio('zip added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the city":
        case "enter city":
        case "city":
        case "add city":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter city');
                console.log('Enter city');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter city ","").replace("Enter city","").replace("Enter City","")
                checkout_city.value = temp_transcript;
                play_audio('city added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the country":
        case "enter country":
        case "country":
        case "add country":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter country');
                console.log('Enter country');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter country ","").replace("Enter country","").replace("Enter Country","")
                console.log(temp_transcript);
                checkout_country.value = temp_transcript;
                play_audio('country added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;
        case "upi":
        case "UPI":
            upi.click()
            play_audio("Payment method UPI seted sucessfully")
            setTimeout(() => {
                recognition.start();
            }, 500);
            break;

        case "cod":
        case "COD":
        case "cash on delivery":
            cod.click()
            play_audio("Payment method cash on delivery seted sucessfully")
            setTimeout(() => {
                recognition.start();
            }, 500);
            break;

        case "enter the upi number":
        case "enter the upi":
        case "enter upi":
        case "add upi":
        case "add upi number":
        case "upi number":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter UPI number');
                console.log('Enter UPI number');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter UPI number ","")
                console.log(temp_transcript);
                checkout_upi.value = temp_transcript;
                play_audio('UPI number added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "enter the upi pin":
        case "enter upi pin":
        case "add upi pin":
        case "upi pin":
            recognition.stop();
            temp_recognition.start();
            temp_recognition.onstart = () => {
                play_audio('Enter UPI PIN');
                console.log('Enter UPI PIN');
            }
            temp_recognition.onerror = () => {
                console.log('sorry, not understand!');
                play_audio('sorry, not understand!');
                setTimeout(() => {
                    temp_recognition.start();
                }, 500)
            }
            temp_recognition.onspeechend = function () {
                console.log('Listing Stoped!');
                play_audio('listening stoped');
            }
            temp_recognition.onresult = (e) => {
                let temp_transcript = e.results[e.results.length - 1][0].transcript;
                temp_transcript = temp_transcript.replace(".", "").replace("Enter UPI PIN ","")
                console.log(temp_transcript);
                checkout_upi_pin.value = temp_transcript;
                play_audio('UPI PIN added sucessfully');
                blind_mode_cheaker();
                if (handlessmode_data[0].handless_mode == "true") {
                    recognition.start();
                } else {
                    recognition.stop();
                }
            }
            break;

        case "continue":
        case "continue & pay":
        case "continue and pay":
        case "pay":
            form_summer_btn.click()
            play_audio("form submitted sucessfully")
            setTimeout(() => {
                recognition.start();
            }, 500);
            break;

        // default:
        //     console.log('Sorry Page Not Found!')
        //     break;
    }
}
if (innerWidth>=768) {
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        try {
            recognition.start();
    
        } catch (error) {
            recognition.stop();
            console.log(error);
        }
    });
} else {
    document.addEventListener("dblclick", (e) => {
        e.preventDefault();
        try {
            recognition.start();
    
        } catch (error) {
            recognition.stop();
            console.log(error);
        }
    });
}

document.addEventListener("click", (e) => {
    recognition.stop();
});


    // case "home":
        // case "home menu":
        // case "open home":
        // case "back to home":
        // case "back home":
            // recognition.stop();
            // play_audio('Opening HomePage!')
            // document.location.href = '/../../../';
           

        // case "headphones":
        // case "headphones menu":
        // case "headphone":
        // case "headphone menu":
        // case "open headphones":
        // case "open headphone":
        //     recognition.stop();
        //     play_audio('Opening Headphones!')
        //     document.location.href = 'http://127.0.0.1:5500/html/headphones.html'
        //     break;

        // case "speakers":
        // case "speakers menu":
        // case "speaker":
        // case "speaker menu":
        // case "open speakers":
        // case "open speaker":
        //     recognition.stop();
        //     play_audio('Opening Speakers!')
        //     document.location.href = 'http://127.0.0.1:5500/html/speakers.html'
        //     break;

        // case "earphones":
        // case "earphones menu":
        // case "earphone":
        // case "earphone menu":
        // case "open earphones":
        // case "open earphone":
        //     recognition.stop();
        //     play_audio('Opening Earthphones!')
        //     document.location.href = 'http://127.0.0.1:5500/html/earthphones.html'
        //     break;

        // case "** 99 mark 2":
        // case "** 99 mark two":
        // case "open ** 99 mark 2":
        // case "open ** 99 mark two":
        //     recognition.stop();
        //     play_audio('Opening XX99 MARK II HEADPHONES!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/headphones/XX99_MARK_II_HEADPHONES.html'
        //     break;

        // case "** 99 mark 1":
        // case "** 99 mark one":
        // case "open ** 99 mark 1":
        // case "open ** 99 mark one":
        //     recognition.stop();
        //     play_audio('Opening XX99 MARK 1 HEADPHONES!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/headphones/XX99_MARK_I_HEADPHONES.html'
        //     break;

        // case "** 59":
        // case "open ** 59":
        //     recognition.stop();
        //     play_audio('Opening XX59!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/headphones/XX59_HEADPHONES.html'
        //     break;

        // case "zx 9 speaker":
        // case "zx 9 speakers":
        // case "zx 9":
        // case "open zx 9 speaker":
        // case "open zx 9":
        //     recognition.stop();
        //     play_audio('opening zx9 speaker!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/speakers/zx9_speaker.html'
        //     break;

        // case "zx 7 speaker":
        // case "zx 7 speakers":
        // case "zx 7":
        // case "open zx 7 speaker":
        // case "open zx 7":
        //     recognition.stop();
        //     play_audio('opening zx7 speaker!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/speakers/zx7_speaker.html'
        //     break;

        // case "yx 1 earphones":
        // case "yx one earphones":
        // case "yx 1 earphone":
        // case "yx one earphone":
        // case "yx 1":
        // case "open yx 1 earphone":
        // case "open yx 1":
        //     recognition.stop();
        //     play_audio('opening yx1 earphones!')
        //     document.location.href = 'http://127.0.0.1:5500/html/products/earthphones/YX1_WIRELESS_EARPHONES.html'
        //     break;

        // case "open blind mode setting":
        // case "open blind mode settings":
        // case "blind mode setting":
        // case "blind mode settings":
        // case "blind mode":
        // case "blind":
        // case "open blind mode settings":
        // case "open blind mode setting":
        //     if (!is_sidemenu_open) {
        //         sidemenu.style.left = "-10px";
        //         sidemenu.style.transition = "0.1s";
        //         is_sidemenu_open = true;
        //     }
        //     else {
        //         play_audio("blind mode setting already opened")
        //     }
        //     break;

        // case "close blind mode setting":
        // case "close blind mode settings":
        // case "close blind mode settings":
        // case "close blind mode setting":
        // case "close blind":
        //     if (!is_sidemenu_open) {
        //         play_audio("blind mode setting already closed")
        //     }
        //     else {
        //         sidemenu.style.left = "-179px";
        //         sidemenu.style.transition = "0.1s";
        //         is_sidemenu_open = false;
        //     }
        //     break;

        // case "enable blind mode":
        // case "blind mode enable":
        // case "enable blind":
        // case "on blind":
        // case "blind on":
        // case "blind mode on":
        //     blindmode.checked = true;
        //     blindmode_data = [{ blind_mode: "true" }];
        //     blindmode_data = JSON.stringify(blindmode_data)
        //     localStorage.setItem("allblindmode_data", blindmode_data);
        //     break;

        // case "disable blind mode":
        // case "blind mode disable":
        // case "disable blind":
        // case "off blind":
        // case "blind off":
        // case "blind mode off":
        //     blindmode.checked = false;
        //     blindmode_data = [{ blind_mode: "false" }];
        //     blindmode_data = JSON.stringify(blindmode_data)
        //     localStorage.setItem("allblindmode_data", blindmode_data);
        //     break;

        // case "enable handless mode":
        // case "enable handless mod":
        // case "handless mode on":
        // case "on handless mode":
        // case "on handless":
        // case "handless on":
        // case "handless mode enable":
        // case "handless enable":
        // case "handless mode":
        // case "handless":
        // case "enable headless mode":
        // case "enable endless mode":
        // case "handsfree":
        // case "hands free":
        // case "enable handsfree":
        // case "enable hands free":
        // case "handfree":
        // case "hand free":
        // case "enable handfree":
        // case "enable hand free":
        //     if (handlessmode_data[0].handless_mode == "false") {
        //         handlessmode_data[0].handless_mode = "true";
        //         handlessmode_data = JSON.stringify(handlessmode_data);
        //         localStorage.setItem("allhandlessmode_data", handlessmode_data);
        //         recognition.stop();
        //         play_audio('handless mode enabled')
        //         setTimeout(async () => {
        //             recognition.start();
        //             console.log(handlessmode_data[0].handless_mode);
        //         }, 500);
        //     } else {
        //         play_audio('handless mode already enabled')
        //     }
        //     recognition.continuous = true;
        //     break;

        // case "disable handless mode":
        // case "handless mode off":
        // case "off handless mode":
        // case "off handless":
        // case "handless off":
        // case "handless mode disable":
        // case "handless disable":
        // case "handless mode":
        // case "handless":
        // case "disable headless mode":
        // case "disable endless mode":
        // case "handsfree":
        // case "disable handsfree":
        // case "handfree":
        // case "disable handfree":
        //     if (handlessmode_data[0].handless_mode == "true") {
        //         handlessmode_data[0].handless_mode = "false";
        //         handlessmode_data = JSON.stringify(handlessmode_data);
        //         localStorage.setItem("allhandlessmode_data", handlessmode_data);
        //         recognition.stop();
        //         play_audio('handless mode disabled')
        //     } else {
        //         play_audio('handless mode is already disabled')
        //     }
        //     recognition.continuous = false;
        //     break;


