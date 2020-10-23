// Date.prototype.addHours = function(h) {
//     this.setTime(this.getTime() + (h*60*60*1000));
//     return this;
// }


// DOM Elements
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    leftArrow = document.getElementById('left-arrow'),
    rightArrow = document.getElementById('right-arrow');
let deltaHours = 0;

// Show Date
function showDate() {
    let today = new Date(),
        day = today.getDay(),
        dateMonth = today.getDate(),
        month = today.getMonth(),
        year = today.getFullYear();

    // Output Time
    date.innerHTML = `${getWeekday(day)}<span>, </span>${dateMonth}<span> </span>${getMonth(month)}<span> </span>${year}`;
    setTimeout(showDate, 1000);
}

// Get Weekday 
function getWeekday(day) {
    let weekday = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    return weekday[day];
}

// Get Month
function getMonth(month) {
    let months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    return months[month];
}

// Show Time
function showTime() {
    let today = new Date();
    // today.addHours(1);
    let hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Output Time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setBgByHours(getDeltaHours(hour));
    setGreetingsByHours(hour);

    setTimeout(showTime, 1000);
}

// Gets delta hours
function getDeltaHours(hour) {
    let hours = (hour + deltaHours) % 23;

    if(hours < 0) {
        hours = 24 + hours;
    }

    return hours;
}

//Add Zeros
function addZero(n) {
   return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background by hours
function setBgByHours (hour) {
    let dayTime = getDayTime(hour),
        src = "./assets/images/" + dayTime + "/"+ addZero(Math.abs(hour)) +".jpg";

    document.body.style.backgroundImage = `url(${src})`;
}

// Set Greeting by hours
function setGreetingsByHours (hour) {
    let dayTime = getDayTime(hour);

    greeting.textContent = "Good " + dayTime + ', ';
}

//Get Time of Day
function getDayTime (hour) {
    let dayTime = {
            0: 'night',
            1: 'morning',
            2: 'afternoon',
            3: 'evening'
        },
        dayTimeIndex = Math.trunc(hour / 6);

    return dayTime[dayTimeIndex];
}

// Get Name
function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// On Keypress Name
function onKeypressName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            name.blur();
        }
    }
}

// On Blur Name
function onBlurName(e) {
    let inputValue = e.target.innerText;

    if (inputValue.replace(/\s/g, '') !== '') {
        localStorage.setItem('name', e.target.innerText);
    } else {
        getName();
    }
}

// On Focus Name
function onFocusName(e) {
    this.textContent = '';

}

// Get Focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// On Keypress Focus
function onKeypressFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            focus.blur();
        }
    }
}

// On Blur Focus
function onBlurFocus(e) {
    let inputValue = e.target.innerText;

    if (inputValue.replace(/\s/g, '') !== '') {
        localStorage.setItem('focus', e.target.innerText);
    } else {
        getFocus();
    }
}

function changeHoursDelta() {
    deltaHours += parseInt(this.dataset.value);
}

name.addEventListener('keypress', onKeypressName);
name.addEventListener('blur', onBlurName);
name.addEventListener('focus', onFocusName);
focus.addEventListener('keypress', onKeypressFocus);
focus.addEventListener('blur', onBlurFocus);
focus.addEventListener('focus', onFocusName);
leftArrow.addEventListener('click', changeHoursDelta);
rightArrow.addEventListener('click', changeHoursDelta);

//Run
showDate();
showTime();
getName();
getFocus();