document.addEventListener('DOMContentLoaded', () => {
    // Menu button logic
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
  
    // Load JSON data and generate cards
    const jsonData = [
      {
        "title": "Desert Oasis Hotel",
        "image": "images/hotel.jpeg",
        "address": "123 Main St, City, State",
        "description": "Luxury accommodation in the heart of Timbuktu"
      },
      {
        "title": "Sahara Trading Co.",
        "image": "images/imports.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Import/Export specialists for local artisan goods"
      },
      {
        "title": "Timbuktu Tours",
        "image": "images/tours.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Expert guided tours of historical sites"
      },
      {
        "title": "Desert Rose Café",
        "image": "images/cafe.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Traditional Malian cuisine and coffee"
      },
      {
        "title": "Manuscripts & More",
        "image": "images/manuscripts.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Historical manuscript preservation and tours"
      },
      {
        "title": "Sahel Solar Solutions",
        "image": "images/solars.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Renewable energy solutions for businesses"
      },
      {
        "title": "Timbuktu Textiles",
        "image": "images/textiles.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Traditional Mali fabrics and modern designs"
      },
      {
        "title": "Desert Rose Café",
        "image": "images/cafe.jpeg",
        "address": "456 Elm St, City, State",
        "description": "Traditional Malian cuisine and coffee"
      },
    ];
  
    const gallery = document.querySelector('.gallery');
    if (gallery) {
      jsonData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        gallery.appendChild(card);
      });
    }
  
    // Last visit message logic
    const visitMessage = document.getElementById('visit-message');
    if (visitMessage) {
      let lastVisit = localStorage.getItem('lastVisit');
      const currentDate = Date.now();
  
      if (!lastVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
      } else {
        const timeDifference = currentDate - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
        if (daysDifference < 1) {
          visitMessage.textContent = 'Back so soon! Awesome!';
        } else {
          visitMessage.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago.`;
        }
      }
  
      localStorage.setItem('lastVisit', currentDate);
    }
  
    // Update copyright year and last modified date
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');
  
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  
    if (lastModified) {
      lastModified.textContent = document.lastModified;
    }
  });