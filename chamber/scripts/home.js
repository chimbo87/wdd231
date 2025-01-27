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


// Business Data
const businessData = {
  "members": [
      {
          "name": "Desert Oasis Hotel",
          "address": "15 Avenue du Commerce, Timbuktu",
          "phone": "(223) 555-0123",
          "website": "https://desertoasishotel.com",
          "image": "hotel.jpeg",
          "membershipLevel": 3,
          "description": "Luxury accommodation in the heart of Timbuktu"
      },
      {
          "name": "Sahara Trading Co.",
          "address": "45 Rue du Marché, Timbuktu",
          "phone": "(223) 555-0124",
          "website": "https://saharatrading.com",
          "image": "imports.jpeg",
          "membershipLevel": 3,
          "description": "Import/Export specialists for local artisan goods"
      },
      {
          "name": "Timbuktu Tours",
          "address": "78 Boulevard des Guides, Timbuktu",
          "phone": "(223) 555-0125",
          "website": "https://timbuktutours.com",
          "image": "tours.jpeg",
          "membershipLevel": 2,
          "description": "Expert guided tours of historical sites"
      },
      {
          "name": "Desert Rose Café",
          "address": "23 Place de la Paix, Timbuktu",
          "phone": "(223) 555-0126",
          "website": "https://desertrosecafe.com",
          "image": "cafe.jpeg",
          "membershipLevel": 1,
          "description": "Traditional Malian cuisine and coffee"
      },
      {
          "name": "Manuscripts & More",
          "address": "56 Rue des Savants, Timbuktu",
          "phone": "(223) 555-0127",
          "website": "https://manuscriptsmore.com",
          "image": "manuscripts.jpeg",
          "membershipLevel": 2,
          "description": "Historical manuscript preservation and tours"
      },
      {
          "name": "Sahel Solar Solutions",
          "address": "89 Avenue de l'Energie, Timbuktu",
          "phone": "(223) 555-0128",
          "website": "https://sahelsolar.com",
          "image": "solars.jpeg",
          "membershipLevel": 3,
          "description": "Renewable energy solutions for businesses"
      },
      {
          "name": "Timbuktu Textiles",
          "address": "34 Rue des Artisans, Timbuktu",
          "phone": "(223) 555-0129",
          "website": "https://timbuktutextiles.com",
          "image": "textiles.jpeg",
          "membershipLevel": 2,
          "description": "Traditional Mali fabrics and modern designs"
      }
  ]
};

// Weather API configuration
const API_KEY = "b65f7af26a21786566f6dca7c303a4dd";
const CITY = "Timbuktu";
const COUNTRY = "ML";

// Weather Functions
async function getCurrentWeather() {
  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=imperial&appid=${API_KEY}`
      );
      
      if (!response.ok) {
          throw new Error('Weather data fetch failed');
      }

      const data = await response.json();
      
      const iconCode = data.weather[0].icon;
      document.querySelector(".weather-card-weathericon").innerHTML = `
          <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather-icon" />
      `;
      
      document.getElementById("weather-data").innerHTML = `
          <p>${Math.round(data.main.temp)}°F</p>
          <p>${data.weather[0].description}</p>
          <p>High: ${Math.round(data.main.temp_max)}°</p>
          <p>Low: ${Math.round(data.main.temp_min)}°</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
          })}</p>
          <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
          })}</p>
      `;
  } catch (error) {
      console.error("Error fetching current weather:", error);
      document.getElementById("weather-data").innerHTML = `
          <p>Weather data temporarily unavailable</p>
      `;
  }
}

async function getWeatherForecast() {
  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=imperial&appid=${API_KEY}`
      );
      
      if (!response.ok) {
          throw new Error('Forecast data fetch failed');
      }

      const data = await response.json();
      
      const forecasts = data.list
          .filter((item) => new Date(item.dt_txt).getHours() === 12)
          .slice(0, 3);
          
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
      document.getElementById("forecast-data").innerHTML = `
          <p>Forecast data temporarily unavailable</p>
      `;
  }
}

// Business Spotlight Functions
function getEligibleMembers() {
  return businessData.members.filter(member => member.membershipLevel >= 2);
}

function getRandomSpotlightMembers() {
  const eligibleMembers = getEligibleMembers();
  const spotlightCount = Math.random() < 0.5 ? 2 : 3;
  return eligibleMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, spotlightCount);
}

function createSpotlightCards() {
  const spotlightMembers = getRandomSpotlightMembers();
  const container = document.querySelector('.spotlight-container');
  container.innerHTML = '';
  
  spotlightMembers.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      
      card.innerHTML = `
          <div class="spotlight-header">
              <img src="images/${member.image}" alt="${member.name}" 
                   onerror="this.src='images/placeholder.png'">
              <h3>${member.name}</h3>
          </div>
          <div class="spotlight-content">
              <p>${member.description}</p>
              <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
              <p><i class="fas fa-phone"></i> ${member.phone}</p>
              <p><i class="fas fa-globe"></i> 
                  <a href="${member.website}" target="_blank">Visit Website</a>
              </p>
          </div>
      `;
      
      container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
 
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  
  
  document.getElementById("lastModified").textContent = document.lastModified;
  

  getCurrentWeather();
  getWeatherForecast();
  
  // Create spotlight cards
  createSpotlightCards();
  
  // Update weather data every 30 minutes
  setInterval(() => {
      getCurrentWeather();
      getWeatherForecast();
  }, 1800000);
});