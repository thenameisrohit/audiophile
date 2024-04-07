let speech = new SpeechSynthesisUtterance();

let blindmode_data = [/*{ blind_mode: "false" }*/];
let allblindmode_data = localStorage.getItem("allblindmode_data");
if (allblindmode_data == null) {
    speech.text = "Welcome to audiophila! Press Enter to Enable Blind Mode";
    speech.lang = `en-IN`;
    window.speechSynthesis.speak(speech);
    let want_blind_mode = confirm("Enable Blind Mode");
    console.log(want_blind_mode);
    if (want_blind_mode) {
        blindmode_data = [{ blind_mode: "true" }];
    } else {
        blindmode_data = [{ blind_mode: "false" }];
    }
    blindmode_data = JSON.stringify(blindmode_data)
    localStorage.setItem("allblindmode_data", blindmode_data);
}


function blind_mode_cheaker() {
    allblindmode_data = localStorage.getItem("allblindmode_data");
    if (allblindmode_data == null) { /*confirm("Blind Mode")*/ }
    else {
        blindmode_data = JSON.parse(allblindmode_data);
        if (blindmode_data[0].blind_mode == "true") {
            speech.lang = `en-${blindmode_lang.value}`;
            speech.volume = blindmode_volume.value;
            speech.rate = blindmode_speed.value;
            return 1;
        }
        else {
            return 0;
        }

    }
}



function play_audio(text) {
    blind_mode_cheaker()
    if (blind_mode_cheaker() == 1) {
        speech.text = text;
        window.speechSynthesis.speak(speech);
    }
}
function stop_audio() {
    if (blind_mode_cheaker() == 1) {
        window.speechSynthesis.cancel();
    }
}

function speaker(text) {
    if (blind_mode_cheaker() == 1) {
        speech.text = text.innerText
        window.speechSynthesis.speak(speech);
    }
}
function stop_speaker() {
    if (blind_mode_cheaker() == 1) {
        window.speechSynthesis.cancel();
    }
}
function read_input(text) {
    if (blind_mode_cheaker() == 1) {
        speech.text = text.value;
        window.speechSynthesis.speak(speech);
    }
}