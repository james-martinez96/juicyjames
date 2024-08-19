import {contentLoader} from "./content.js";

// Load content based on the hash
function navigateTo(page) {
    window.location.hash = page;
    contentLoader(page);
}

// Create and append a navigation bar
export function createNav() {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.setAttribute('role', 'navigation');

    const navItems = ['Home', 'About', 'Stuff'];
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.toLowerCase()}`;
        a.textContent = item;
        a.setAttribute('role', 'menuitem');
        a.addEventListener('click', function(event) {
            event.preventDefault();
            navigateTo(item.toLowerCase());
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
}
