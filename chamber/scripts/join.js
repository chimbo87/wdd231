document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
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

    // Set Timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal Logic
    const modals = document.querySelectorAll('.modal');
    const links = document.querySelectorAll('.card a');
    const closeButtons = document.querySelectorAll('.close');

    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modals[index].style.display = 'block';
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals[index].style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Display Submitted Data on thankyou.html
    const submittedData = document.getElementById('submittedData');
    if (submittedData) {
        const urlParams = new URLSearchParams(window.location.search);
        submittedData.innerHTML = `
            <p><strong>First Name:</strong> ${urlParams.get('firstName') || 'N/A'}</p>
            <p><strong>Last Name:</strong> ${urlParams.get('lastName') || 'N/A'}</p>
            <p><strong>Email:</strong> ${urlParams.get('email') || 'N/A'}</p>
            <p><strong>Phone:</strong> ${urlParams.get('phone') || 'N/A'}</p>
            <p><strong>Business Name:</strong> ${urlParams.get('orgName') || 'N/A'}</p>
            <p><strong>Timestamp:</strong> ${urlParams.get('timestamp') || 'N/A'}</p>
        `;
    }

    // Update Copyright Year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Update Last Modified Date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
});