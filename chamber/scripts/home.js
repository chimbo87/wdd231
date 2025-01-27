document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
         
            menuButton.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

      
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuButton.textContent = '☰';
            }
        });

        const navLinks = navMenu.getElementsByTagName('a');
        Array.from(navLinks).forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuButton.textContent = '☰';
            });
        });
    }
});



// OpenWeatherMap API configuration
const API_KEY = "b65f7af26a21786566f6dca7c303a4dd";
const CITY = "Timbuktu"; // Changed to match your Chamber's location
const COUNTRY = "ML";

// Function to fetch current weather
async function getCurrentWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=imperial&appid=${API_KEY}`
    );
    const data = await response.json();

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.querySelector(".weather-card-weathericon").innerHTML = `
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather-icon" />
        `;

    // Update weather data
    document.getElementById("weather-data").innerHTML = `
            <p>${Math.round(data.main.temp)}°F</p>
            <p>${data.weather[0].description}</p>
            <p>High: ${Math.round(data.main.temp_max)}°</p>
            <p>Low: ${Math.round(data.main.temp_min)}°</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Sunrise: ${new Date(
              data.sys.sunrise * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
            <p>Sunset: ${new Date(
              data.sys.sunset * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
        `;
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}

// Function to fetch weather forecast
async function getWeatherForecast() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=imperial&appid=${API_KEY}`
    );
    const data = await response.json();

    // Get next three days forecast
    const forecasts = data.list
      .filter((item) => new Date(item.dt_txt).getHours() === 12)
      .slice(0, 3);

    // Update forecast data
    const forecastHTML = forecasts
      .map(
        (day) => `
            <div class="forecast-day">
                <p>${new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}</p>
                <p>${Math.round(day.main.temp)}°F</p>
            </div>
        `
      )
      .join("");

    document.getElementById("forecast-data").innerHTML = forecastHTML;
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

// Add some CSS to your existing styles
const styles = `
    .forecast-day {
        padding: 10px;
        text-align: center;
    }
    
    .weather-card-weathericon img {
        width: 50px;
        height: 50px;
    }
    
    #weather-data p {
        margin: 5px 0;
    }
`;

// Create and append style element
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize weather data on page load
document.addEventListener("DOMContentLoaded", () => {
  getCurrentWeather();
  getWeatherForecast();

  // Update weather data every 30 minutes
  setInterval(() => {
    getCurrentWeather();
    getWeatherForecast();
  }, 1800000);
});

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Update last modified date
document.getElementById('lastModified').textContent = document.lastModified;