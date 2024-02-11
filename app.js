const INPUT_HUOR = document.querySelector("#jam")
const INPUT_MINUTE = document.querySelector("#menit")
const INPUT_SECOND = document.querySelector("#detik")
const INPUT_MILLISECOND = document.querySelector("#miliDetik")

const text1 = document.querySelector('.text1') // hour
const text2 = document.querySelector('.text2') // minute
const text3 = document.querySelector('.text3') // second
const text4 = document.querySelector('.text4') // millisecond
const btnSave = document.querySelector("#save")
const btnStart = document.querySelector('.btn-start');
const btnPause = document.querySelector('.btn-pause');
const btnReset = document.querySelector('.btn-reset');

let TIMER = null
let MILLISECOND = 0
let SECOND = 0
let MINUTE = 0
let HOUR = 0

// function untuk validasi input timer
function validateInputLength(event, type) {
    let input = event.target
    let length = input.value.length

    if (input.value < 0) {
        input.value = ""
    }

    if (input.value == "00") {
        input.value = 0
    }

    if (length > 2) {
        input.value = input.value.slice(0, -1)
    }

    if (type == "hour" && input.value >= 24) {
        input.value = 23
    }

    if (type == "minute" && input.value >= 60) {
        input.value = 59
    }

    if (type == "second" && input.value >= 60) {
        input.value = 59
    }

    if (type == "millisecond" && input.value >= 60) {
        input.value = 59
    }

}

// reset variabel menjadi 0
function resetTimer() {
    MILLISECOND = 0
    SECOND = 0
    MINUTE = 0
    HOUR = 0
}

// function untuk set textcontent timer 
function setTextContentTimer() {
    text4.textContent = MILLISECOND < 10 ? `0${MILLISECOND}` : MILLISECOND
    text3.textContent = SECOND < 10 ? `0${SECOND}` : SECOND
    text2.textContent = MINUTE < 10 ? `0${MINUTE}` : MINUTE
    text1.textContent = HOUR < 10 ? `0${HOUR}` : HOUR
}

// function untuk me reset input timer value menjadi String kosong
function resetInputText() {
    INPUT_HUOR.value = ""
    INPUT_MINUTE.value = ""
    INPUT_SECOND.value = ""
    INPUT_MILLISECOND.value = ""
}

function validateInput(input = [INPUT_HUOR, INPUT_MINUTE, INPUT_SECOND, INPUT_MILLISECOND]) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].value == "") {
            alert("All input must be filled!")
            return false
        }
    }

    return true
}

INPUT_HUOR.addEventListener("keyup", function (e) {
    validateInputLength(e, "hour")
})

INPUT_MINUTE.addEventListener("keyup", function (e) {
    validateInputLength(e, "minute")
})

INPUT_SECOND.addEventListener("keyup", function (e) {
    validateInputLength(e, "second")
})

INPUT_MILLISECOND.addEventListener("keyup", function (e) {
    validateInputLength(e, "millisecond")
})

btnSave.addEventListener('click', function (e, input = [INPUT_HUOR, INPUT_MINUTE, INPUT_SECOND, INPUT_MILLISECOND]) {
    if (!validateInput()) return

    HOUR = input[0].value
    MINUTE = input[1].value
    SECOND = input[2].value
    MILLISECOND = input[3].value
    setTextContentTimer()
});

setTextContentTimer()

btnStart.addEventListener('click', function () {
    if (!validateInput()) return

    TIMER = setInterval(() => {
        MILLISECOND--
        if (MILLISECOND <= 0) {
            SECOND--
            MILLISECOND = 60
        }

        if (SECOND <= 0) {
            MINUTE--
            SECOND = 60
        }

        if (MINUTE <= 0) {
            HOUR--
            MINUTE = 60
        }

        setTextContentTimer()
    }, 10);
});


btnPause.addEventListener('click', function () {
    clearInterval(TIMER);
    TIMER = null
});

btnReset.addEventListener('click', function () {
    clearInterval(TIMER);
    TIMER = null
    resetTimer()
    setTextContentTimer()
    resetInputText()
});