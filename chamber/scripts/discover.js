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
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
  });