const apiKey = "419fa8bd2bba6747db5b0891eca6a0cd"; // very important

const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        result.innerHTML = "❌ Please enter a city name";
        return;
    }

    result.innerHTML = "⏳ Fetching weather data...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // 🔑 Handle API key error
            if (data.cod === 401) {
                result.innerHTML = "❌ Invalid API Key (check your key)";
                return;
            }

            // 🔍 Handle city not found
            if (data.cod === "404") {
                result.innerHTML = "❌ City not found";
                return;
            }

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            result.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                <p>☁️ ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error(error);
            result.innerHTML = "⚠️ Network error. Try again later.";
        });
}
