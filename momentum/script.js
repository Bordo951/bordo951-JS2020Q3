// DOM Elements
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    leftArrow = document.getElementById('left-arrow'),
    rightArrow = document.getElementById('right-arrow'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    changeQuote = document.querySelector('.change-quote'),
    quotes = {
        0: {
            'text': 'Liberty, taking the word in its concrete sense, consists in the ability to choose',
            'author': 'Simone Weil'
        },
        1: {
            'text': 'Be less curious about people and more curious about ideas',
            'author': 'Marie Curie'
        },
        2: {
            'text': 'Aim for success, not perfection. Never give up your right to be wrong, because then you will lose the ability to learn new things and move forward with your life',
            'author': 'Dr. David M. Burns'
        },
        3: {
            'text': 'Myths which are believed in tend to become true',
            'author': 'George Orwell'
        },
        4: {
            'text': 'Be kind whenever possible. It is always possible',
            'author': 'Dalai Lama'
        },
        5: {
            'text': 'I am a part of all that I have met',
            'author': 'Alfred Tennyson'
        },
        6: {
            'text': 'However many holy words you read, however many you speak, what good will they do you if you do not act on upon them?',
            'author': 'Buddha'
        },
        7: {
            'text': 'In the end we retain from our studies only that which we practically apply',
            'author': 'Johann Wolfgang von Goethe'
        },
        8: {
            'text': 'Everything is perfect in the universe — even your desire to improve it',
            'author': 'Wayne Dyer'
        },
        9: {
            'text': 'The pain passes, but the beauty remains',
            'author': 'Pierre Auguste Renoir'
        },
        10: {
            'text': 'Problems are only opportunities with thorns on them',
            'author': 'Hugh Miller'
        }
    },
    city = document.querySelector('.city'),
    windSpeed = document.querySelector('.wind-speed'),
    relativeHumidity = document.querySelector('.relative-humidity');

let deltaHours = 0,
    imgSet = generateImageSet(),
    currentQuoteId = getRandomInt(10),
    loadedImages = [];

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
    let today = new Date(),
        hour = today.getHours(),
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
function setBgByHours(hour) {
    let dayTime = getDayTime(hour),
        src = "./assets/images/" + dayTime + "/" + imgSet + "/" + addZero(Math.abs(hour)) + ".jpg";

    if (loadedImages.indexOf(src) === -1) {
        getImage(src)
            .then(function (url) {
                loadedImages.push(url);
                document.body.style.backgroundImage = `url(${url})`;
            })
            .catch(function (error) {
                console.log('Error while loading an image by path ', src);
                console.log(error);
            })
    } else {
        document.body.style.backgroundImage = `url(${src})`;
    }
}

// Loads the image by creating an Image object.
function getImage(url) {
    return new Promise(function (resolve, reject) {
        let img = new Image();

        img.src = url;

        img.onload = function () {
            resolve(url);
        }

        img.onerror = function () {
            reject(url);
        }
    })
}

// Generate Image Set
function generateImageSet() {
    let imageSetLocalStorage = parseInt(localStorage.getItem('imgSet')),
        currentRandomInt = getRandomInt(3);

    if (imageSetLocalStorage === null) {
        localStorage.setItem('imgSet', 0);
        return 0;
    } else {
        while (imageSetLocalStorage === currentRandomInt) {
            currentRandomInt = getRandomInt(3);
        }
        localStorage.setItem('imgSet', currentRandomInt);
    }

    return currentRandomInt;
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
function onFocusName() {
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

// Change delta for hours
function changeHoursDelta() {
    deltaHours += parseInt(this.dataset.value);
}

// Get Max random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Specify the current quote to the page
function setQuote() {
    let newQuoteId = currentQuoteId;

    while(currentQuoteId === newQuoteId){
        newQuoteId = getRandomInt(10);
    }

    currentQuoteId = newQuoteId;

    blockquote.textContent = quotes[currentQuoteId].text;
    figcaption.textContent = quotes[currentQuoteId].author;
}

// Show Weather
async function getWeather(targetCityName) {
    // Bind function event
    if (typeof targetCityName === "object") {
        return ;
    }

    // Call without function parameter
    if (typeof targetCityName === "undefined") {
        targetCityName = getStorageCityName();
    }

    // Check if it is a number
    if (/^\d+$/.test(targetCityName)) {
        notValidWeatherRequest();
        return ;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetCityName}&lang=en&appid=289a494ad9bec8e06b1b253fdaf32991&units=metric`,
        res = await fetch(url),
        data = await res.json();

    if (data.cod === 200) {
        localStorage.setItem('city', targetCityName);
        city.textContent = targetCityName;
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `wind speed ${data.wind.speed} m/s`;
        relativeHumidity.textContent = `humidity ${data.main.humidity} %`;
    } else {
        notValidWeatherRequest();
    }
}

// Not valid weather request
function notValidWeatherRequest()
{
    alert("The city is not correct. Please, check the input value.");
    city.textContent = getStorageCityName();
}

// Get City Name
function getStorageCityName() {
    let cityName;
    if (localStorage.getItem('city') === null) {
        localStorage.setItem('city', 'Minsk');
    }
    cityName = localStorage.getItem('city');

    return cityName;
}

// On Keypress City
function onKeypressCity(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            city.blur();
        }
    }
}

// On Blur City
function onBlurCity(e) {
    let inputValue = e.target.innerText;

    if (inputValue.replace(/\s/g, '') !== '') {
        getWeather(inputValue);
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

// Listeners
name.addEventListener('keypress', onKeypressName);
name.addEventListener('blur', onBlurName);
name.addEventListener('focus', onFocusName);
focus.addEventListener('keypress', onKeypressFocus);
focus.addEventListener('blur', onBlurFocus);
focus.addEventListener('focus', onFocusName);
leftArrow.addEventListener('click', changeHoursDelta);
rightArrow.addEventListener('click', changeHoursDelta);
document.addEventListener('DOMContentLoaded', setQuote);
changeQuote.addEventListener('click', setQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', onKeypressCity);
city.addEventListener('blur', onBlurCity);
city.addEventListener('focus', onFocusName);

// Run
showDate();
showTime();
getName();
getFocus();
getWeather();
