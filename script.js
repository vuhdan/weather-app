const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const city = document.getElementById('city');
const currentTemp = document.getElementById('current-temp');
const feelsLike = document.getElementById('feels-like');
const currentDesc = document.getElementById('current-description');
const currentHumidity = document.getElementById('current-humidity');
const currentWind = document.getElementById('current-wind');
const currentIcon = document.getElementById('current-icon');
const days = document.getElementsByClassName('day');
const forecast = document.getElementsByClassName("forecast");
const description = document.getElementsByClassName("description");
const humidity = document.getElementsByClassName("humidity");
const windspeed = document.getElementsByClassName("windspeed");
const icons = document.getElementsByClassName("icon");
const cards = document.getElementsByClassName("forecast-cards");

searchBar.value = '';

function getWeather(searchTerm){
    Promise.all([
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=03672cbc4249a82b3ca7e09fc900bdce&units=imperial`, {mode: 'cors'}).then(resp => resp.json()),
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&APPID=03672cbc4249a82b3ca7e09fc900bdce&units=imperial`, {mode: 'cors'}).then(resp => resp.json())
    ])
    .then(function(response) {
        console.log(response[0]);
        console.log(response[1]);

        city.innerHTML = response[0].name;
        currentTemp.innerHTML = "Current temp: " + response[0].main.temp + " degrees F";
        feelsLike.innerHTML = "Feels like: " + response[0].main.feels_like + " degrees F";
        currentDesc.innerHTML = response[0].weather[0].description;
        currentHumidity.innerHTML = response[0].main.humidity + "% humidity";
        currentWind.innerHTML = response[0].wind.speed + " mph winds";

        if(response[0].wind.speed > 15){
            currentIcon.src = "icons/windy.png";
        }
        else if(response[0].weather[0].description.includes("scattered clouds")){
            currentIcon.src = "icons/partly_cloudy.png";
        }
        else if(response[0].weather[0].description.includes("cloud")){
            currentIcon.src = "icons/cloudy.png";
        }
        else if(response[0].weather[0].description.includes("clear")){
            currentIcon.src = "icons/sunny.png";
        }
        else if(response[0].weather[0].description.includes("rain")){
            currentIcon.src = "icons/rain.png";
        }
        else if(response[0].weather[0].description.includes("snow")){
            currentIcon.src = "icons/snow.png";
        }

        listOfDays = response[1].list;
        fiveDays = [];
        for(let i = 0; i < listOfDays.length; i++){
            if(listOfDays[i].dt_txt.includes("12:00:00")){
                fiveDays.push(i);
            }
        }

        for(let j = 0; j < fiveDays.length; j++){
            let jsonDesc = listOfDays[fiveDays[j]].weather[0].description;
            let dayOfWeek = new Date(listOfDays[fiveDays[j]].dt_txt);

            days[j].innerHTML = dayOfWeek.toDateString();
            forecast[j].innerHTML = listOfDays[fiveDays[j]].main.temp + " degrees F";
            description[j].innerHTML = jsonDesc;
            humidity[j].innerHTML = listOfDays[fiveDays[j]].main.humidity + "% humidity";
            windspeed[j].innerHTML = listOfDays[fiveDays[j]].wind.speed + " mph winds";
            
            if(listOfDays[fiveDays[j]].wind.speed > 15){
                icons[j].src = "icons/windy.png";
            }
            else if(jsonDesc.includes("scattered clouds")){
                icons[j].src = "icons/partly_cloudy.png";
            }
            else if(jsonDesc.includes("cloud")){
                icons[j].src = "icons/cloudy.png";
            }
            else if(jsonDesc.includes("clear")){
                icons[j].src = "icons/sunny.png";
            }
            else if(jsonDesc.includes("rain")){
                icons[j].src = "icons/rain.png";
            }
            else if(jsonDesc.includes("snow")){
                icons[j].src = "icons/snow.png";
            }
        }

        console.log(new Date(response[1].list[0].dt_txt));
    })
    .catch(function(err){
        console.log(err);
    });
};

searchBtn.addEventListener('click', () => {
    getWeather(searchBar.value)
});

getWeather('tokyo');