let utcBody = document.querySelector('.utcBody')

let hourInp = document.querySelector('.inputTime .hour')
let minuteInp = document.querySelector('.inputTime .minute')

let newQuestion = document.querySelector('.inputQsn .newQsn')
let assignReview = document.querySelector('.inputQsn .assignReview')

let paymentPerHourInp = document.querySelector('.paymentPerHourInp')
let paymentPerQuestionInp = document.querySelector('.paymentPerQuestionInp')
let paidPaymentInp = document.querySelector('.paidPaymentInp')

let paymentPerHourOut = document.querySelector('.paymentPerHourOut')
let paymentPerQuestionOut = document.querySelector('.paymentPerQuestionOut')
let paidPaymentPerHourOut = document.querySelector('.paidPaymentPerHourOut')
let paidPaymentPerQuestionOut = document.querySelector('.paidPaymentPerQuestionOut')

let calculate = document.querySelector('.calculation')
let clear = document.querySelector('.clearance')

let totalHour = document.querySelector('.totalHour')
let totalHourDetail_H = document.querySelector('.totalHourDetail_H')
let totalHourDetail_M = document.querySelector('.totalHourDetail_M')
let totalQuestion = document.querySelector('.totalQuestion')
let averageTime = document.querySelector('.averageTime')
let averageTimeDetail_M = document.querySelector('.averageTimeDetail_M')
let averageTimeDetail_S = document.querySelector('.averageTimeDetail_S')

let suggestionTitle = document.querySelector('.suggestionTitle')
let suggestion = document.querySelector('.suggestion')

let output = document.querySelector('.output')
let dataOkay = document.querySelector('.dataOkay')
let dataNotOkay = document.querySelector('.dataNotOkay')

calculate.onclick = function (e) {
    e.preventDefault()
    output.style.display = "block"

    if (hourInp.value === "" ||
        minuteInp.value === "" ||
        newQuestion.value === "" ||
        assignReview.value === "") {

        dataOkay.style.display = "none"
        dataNotOkay.style.display = "block"
        return

    } else {
        dataOkay.style.display = "block"
        dataNotOkay.style.display = "none"


        let hours = Number(hourInp.value)
        let minutes = Number(minuteInp.value)
        let totalMinute = hours * 60 + minutes

        // Output Hour
        let totalHourResult = totalMinute / 60
        totalHour.innerText = totalHourResult.toFixed(2)
        totalHourDetail_H.innerText = hours
        totalHourDetail_M.innerText = minutes

        // Output Total Question
        totalQuestion.innerText =
            Number(newQuestion.value) + Number(assignReview.value)

        // Average Time
        let avg = totalMinute / Number(totalQuestion.innerText)
        let min = Math.floor(avg)
        let sec = Math.round((avg - min) * 60)

        averageTime.innerText = avg.toFixed(2)
        averageTimeDetail_M.innerText = min
        averageTimeDetail_S.innerText = sec

        // Suggestion
        let current_avg_sec = (min * 60) + sec
        let target_avg_sec = (6 * 60) + 55
        let totalQsn = Number(totalQuestion.innerText)
        let due_sec_perQsn = target_avg_sec - current_avg_sec
        let total_due_sec = due_sec_perQsn * totalQsn
        let total_due_min = total_due_sec / 60
        let total_due_hour = total_due_sec / 3600

        if (due_sec_perQsn > 0) {
            suggestion.innerText = `You need extra ${total_due_hour.toFixed(2)} hours (${total_due_min.toFixed(0)} minutes) to reach target average time 6:55`

            suggestionTitle.style = "color: green"
        } else {
            let absSec = Math.abs(total_due_sec)
            let absMin = absSec / 60
            let absHour = absSec / 3600
            suggestion.innerText = `You have taken extra ${absHour.toFixed(2)} hours (${absMin.toFixed(0)} minutes) compared to target average time 6:55`

            suggestionTitle.style = "color: red"
        }

        // payment Section
        if (paymentPerHourInp.value === "") {
            paymentPerHourOut.innerText = "Provide Payment Data."
            paymentPerHourOut.style.fontWeight = "normal";
        } else {
            paymentPerHourOut.innerText =
                `${(totalHourResult * paymentPerHourInp.value).toFixed(0)} BDT`
            paymentPerHourOut.style.fontWeight = "bold";
        }

        if (paymentPerQuestionInp.value === "") {
            paymentPerQuestionOut.innerText = "Provide Payment Data."
            paymentPerQuestionOut.style.fontWeight = "normal";
        } else {
            paymentPerQuestionOut.innerText =
                `${(totalQuestion.innerText * paymentPerQuestionInp.value).toFixed(0)} BDT`
            paymentPerQuestionOut.style.fontWeight = "bold";

        }

        if (paidPaymentInp.value === "") {
            paidPaymentPerHourOut.innerText = "Provide Payment Data."
            paidPaymentPerQuestionOut.innerText = "Provide Payment Data."
            paidPaymentPerHourOut.style.fontWeight = "normal";
            paidPaymentPerQuestionOut.style.fontWeight = "normal";
        } else {
            paidPaymentPerHourOut.innerText = `${(paidPaymentInp.value / totalHourResult).toFixed(2)} BDT`
            paidPaymentPerQuestionOut.innerText = `${(paidPaymentInp.value / totalQsn).toFixed(2)} BDT`
            paidPaymentPerHourOut.style.fontWeight = "bold";
            paidPaymentPerQuestionOut.style.fontWeight = "bold";
        }
    }
}


clear.onclick = function () {
    hourInp.value = ""
    minuteInp.value = ""
    newQuestion.value = ""
    assignReview.value = ""
    paymentPerHourInp.value = ""
    paymentPerQuestionInp.value = ""
}

// darkLight
let darkLightIcon = document.querySelector('.bi-moon-fill');

// load theme on page start
window.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        utcBody.classList.add('darkTheme');
        darkLightIcon.classList.remove('bi-moon-fill');
        darkLightIcon.classList.add('bi-sun-fill');
        darkLightIcon.style.color = "white";
        darkLightIcon.style.fontSize = "24px";
    } else {
        utcBody.classList.remove('darkTheme');
    }
});

darkLightIcon.onclick = function () {
    if (darkLightIcon.classList.contains('bi-moon-fill')) {
        darkLightIcon.classList.remove('bi-moon-fill');
        darkLightIcon.classList.add('bi-sun-fill');
        darkLightIcon.style.color = "white";
        darkLightIcon.style.fontSize = "24px";

        utcBody.classList.add('darkTheme');

        localStorage.setItem('theme', 'dark');

    } else {
        darkLightIcon.classList.remove('bi-sun-fill');
        darkLightIcon.classList.add('bi-moon-fill');
        darkLightIcon.style.color = "black";
        darkLightIcon.style.fontSize = "20px";

        utcBody.classList.remove('darkTheme');

        localStorage.setItem('theme', 'light');
    }
};

