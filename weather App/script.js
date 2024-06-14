
async function checkWeather(city){
	cityName.innerHTML = city
	const apiKey = "b28e76df0a75acc26f4021ed821b2e65";
	const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+city;
	const response = await fetch(url + `&appid=${apiKey}`);
	var data = await response.json();
	console.log(data);
humidity.innerHTML = data.main.humidity
pressure.innerHTML = data.main.pressure
temp.innerHTML = data.main.temp
temp_max.innerHTML = data.main.temp_max
temp_min.innerHTML = data.main.temp_min
wind_speed.innerHTML = data.wind.speed
wind_deg.innerHTML = data.wind.deg
sunrise_time.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
sunset_time.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
countryName.innerHTML = data.sys.country
}
submit.addEventListener("click",(e)=>{
	e.preventDefault();
	checkWeather(city.value);
});
// checkWeather("Delhi");

async function checkWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = "b28e76df0a75acc26f4021ed821b2e65"; // Replace 'API_KEY' with your actual API key
            const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            // Update UI with weather data
            cityName.innerHTML = data.name;
            humidity.innerHTML = data.main.humidity;
            pressure.innerHTML = data.main.pressure;
            temp.innerHTML = data.main.temp;
            temp_max.innerHTML = data.main.temp_max;
            temp_min.innerHTML = data.main.temp_min;
            wind_speed.innerHTML = data.wind.speed;
            wind_deg.innerHTML = data.wind.deg;
            sunrise_time.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset_time.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            countryName.innerHTML = data.sys.country;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// submit.addEventListener("click", (e) => {
//     e.preventDefault();
//     checkWeatherByLocation();
// });

checkWeatherByLocation(); // Call this function to display weather based on user's location when the page loads
