import {createElement} from "./utils/domUtils.js";
import {contentLoader} from "./contentLoader.js";

// Load content based on the hash
function navigateTo(page) {
    window.location.hash = page;
    contentLoader(page);
}

// Create and append a navigation bar
export function createNav() {
    const nav = createElement('nav', {class: 'nav'});
    const ul = createElement('ul', {role: 'navigation'});

    const navItems = ['Home', 'About', 'Stuff', 'GitHub'];
    navItems.forEach(item => {
        const li = createElement('li', {});
        const a = createElement('a', {
            href: `#${item.toLowerCase()}`,
            role: 'menuitem',
        }, item);
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
