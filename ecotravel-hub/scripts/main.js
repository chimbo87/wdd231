// ======================
// Navigation Functionality
// ======================
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }
  }
  
  // ======================
  // Accommodations Functionality
  // ======================
  async function loadAccommodations() {
    const accommodationsContainer = document.getElementById('eco-accommodations');
  
    if (!accommodationsContainer) return;
  
    try {
      const response = await fetch('./data/accommodations.json');
      if (!response.ok) {
        throw new Error('Failed to fetch accommodations data');
      }
  
      const data = await response.json();
      displayAccommodations(data.accommodations);
    } catch (error) {
      console.error('Error loading accommodations:', error);
      accommodationsContainer.innerHTML = `
        <p class="error-message">Sorry, we couldn't load the eco-accommodations at this time. Please try again later.</p>
      `;
    }
  }
  
  function displayAccommodations(accommodations) {
    const accommodationsContainer = document.getElementById('eco-accommodations');
  
    if (accommodations.length === 0) {
      accommodationsContainer.innerHTML = '<p>No eco-accommodations found.</p>';
      return;
    }
  
    let html = '<div class="accommodations-grid">';
    accommodations.forEach(accommodation => {
      html += `
        <div class="accommodation-card" data-id="${accommodation.id}">
          <img src="${accommodation.image}" alt="${accommodation.name}" loading="lazy">
          <div class="accommodation-info">
            <h3>${accommodation.name}</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</p>
            <p class="eco-rating">
              <span class="rating-stars">
                ${getStarRating(accommodation.rating)}
              </span>
              Eco-Rating: ${accommodation.rating}/5
            </p>
            <p class="price">From $${accommodation.price} per night</p>
            <button class="view-details-btn" data-id="${accommodation.id}">View Details</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    accommodationsContainer.innerHTML = html;
  
    // Add event listeners to the "View Details" buttons
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const accommodation = accommodations.find(a => a.id.toString() === id);
        if (accommodation) {
          showAccommodationModal(accommodation);
        }
      });
    });
  }
  
  // ======================
  // Calculator Functionality
  // ======================
  function setupCalculator() {
    const calculatorForm = document.getElementById('carbon-calculator-form');
    const resultsDiv = document.getElementById('calculator-results');
  
    if (calculatorForm) {
      calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        // Get form values
        const transportMode = document.getElementById('transport-mode').value;
        const distance = parseFloat(document.getElementById('distance').value);
        const passengers = parseInt(document.getElementById('passengers').value) || 1;
  
        // Calculate carbon footprint
        let carbonFootprint = calculateCarbonFootprint(transportMode, distance, passengers);
  
        // Display results
        displayResults(carbonFootprint);
  
        // Save to localStorage
        saveCalculation(transportMode, distance, passengers, carbonFootprint);
      });
    }
  }
  
  function calculateCarbonFootprint(mode, distance, passengers) {
    const carbonFactors = {
      'plane': 0.255,
      'car': 0.171,
      'bus': 0.104,
      'train': 0.041,
      'bicycle': 0,
      'walking': 0
    };
  
    let totalEmission = carbonFactors[mode] * distance;
  
    if (mode === 'car' && passengers > 1) {
      totalEmission = totalEmission / passengers;
    }
  
    return totalEmission.toFixed(2);
  }
  
  function displayResults(carbonFootprint) {
    const resultsDiv = document.getElementById('calculator-results');
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <h3>Your Carbon Footprint</h3>
        <p>Your trip will generate approximately <strong>${carbonFootprint} kg</strong> of CO2.</p>
        <p>Here are some ways to offset your carbon footprint:</p>
        <ul>
          <li>Plant ${Math.ceil(carbonFootprint / 22)} trees</li>
          <li>Invest $${(carbonFootprint * 0.1).toFixed(2)} in renewable energy projects</li>
          <li>Reduce your home energy use by ${Math.ceil(carbonFootprint / 10)} kWh</li>
        </ul>
      `;
      resultsDiv.style.display = 'block';
    }
  }
  
  function saveCalculation(mode, distance, passengers, result) {
    let savedCalculations = JSON.parse(localStorage.getItem('carbonCalculations')) || [];
    savedCalculations.push({
      date: new Date().toISOString(),
      mode: mode,
      distance: distance,
      passengers: passengers,
      result: result
    });
  
    if (savedCalculations.length > 10) {
      savedCalculations = savedCalculations.slice(-10);
    }
  
    localStorage.setItem('carbonCalculations', JSON.stringify(savedCalculations));
    displayCalculationHistory();
  }
  
  function displayCalculationHistory() {
    const historyDiv = document.getElementById('calculation-history');
    if (!historyDiv) return;
  
    const savedCalculations = JSON.parse(localStorage.getItem('carbonCalculations')) || [];
  
    if (savedCalculations.length === 0) {
      historyDiv.innerHTML = '<p>No previous calculations found.</p>';
      return;
    }
  
    let historyHTML = '<h3>Previous Calculations</h3><ul>';
    savedCalculations.forEach(calc => {
      const date = new Date(calc.date).toLocaleDateString();
      historyHTML += `
        <li>
          <strong>${date}</strong>: 
          ${calc.distance} km by ${calc.mode} 
          ${calc.mode === 'car' ? `with ${calc.passengers} passengers` : ''} 
          = ${calc.result} kg CO2
        </li>
      `;
    });
    historyHTML += '</ul>';
    historyDiv.innerHTML = historyHTML;
    historyDiv.style.display = 'block';
  }
  
  // ======================
  // Destinations Functionality
  // ======================
  async function loadFeaturedDestinations() {
    const destinationsContainer = document.getElementById('destinations-container');
  
    try {
      const response = await fetch('./data/destinations.json');
      if (!response.ok) {
        throw new Error('Failed to fetch destinations data');
      }
  
      const data = await response.json();
      displayDestinations(data.destinations);
    } catch (error) {
      console.error('Error loading destinations:', error);
      destinationsContainer.innerHTML = `
        <p class="error-message">Sorry, we couldn't load the destinations at this time. Please try again later.</p>
      `;
    }
  }
  
  function displayDestinations(destinations) {
    const destinationsContainer = document.getElementById('destinations-container');
  
    if (destinations.length === 0) {
      destinationsContainer.innerHTML = '<p>No destinations found.</p>';
      return;
    }
  
    let html = '';
    destinations.forEach(destination => {
      html += `
        <div class="destination-card">
          <img src="${destination.image}" alt="${destination.name}" loading="lazy">
          <div class="destination-info">
            <h3>${destination.name}</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
            <p class="rating">
              <span class="rating-stars">
                ${getStarRating(destination.rating)}
              </span>
              Rating: ${destination.rating}/5
            </p>
            <p class="description">${destination.description}</p>
          </div>
        </div>
      `;
    });
  
    destinationsContainer.innerHTML = html;
  }
  
  // ======================
  // Shared Functions
  // ======================
  function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }
  
    return stars;
  }
  
  // ======================
  // Initialize Everything
  // ======================
  document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadAccommodations();
    setupCalculator();
    loadFeaturedDestinations();
  });