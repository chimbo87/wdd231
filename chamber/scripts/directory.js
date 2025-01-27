// Directory view controls
const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');
const directoryContainer = document.getElementById('directory-container');

gridButton.addEventListener('click', () => {
    directoryContainer.classList.remove('list');
    directoryContainer.classList.add('grid');
});

listButton.addEventListener('click', () => {
    directoryContainer.classList.remove('grid');
    directoryContainer.classList.add('list');
});


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

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
       
        let membershipBadge = '';
        switch(member.membershipLevel) {
            case 3:
                membershipBadge = '🌟 Gold Member';
                break;
            case 2:
                membershipBadge = '⭐ Silver Member';
                break;
            case 1:
                membershipBadge = 'Member';
                break;
        }
        
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h2>${member.name}</h2>
            <p class="membership-badge">${membershipBadge}</p>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        
        directoryContainer.appendChild(memberCard);
    });
}




// Load members when page loads
getMembers();

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Update last modified date
document.getElementById('lastModified').textContent = document.lastModified;