// Create and append a header
function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'My Dynamic Webpage';
    header.appendChild(h1);
    return header;
}

// Create and append a navigation bar
function createNav() {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.setAttribute('role', 'navigation');

    const navItems = ['Home', 'About', 'Contact'];
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

// Load content based on the hash
function navigateTo(page) {
    window.location.hash = page;
    loadContent(page);
}

function loadContent(page) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing content

    const sections = {
        home: { title: 'Home', content: 'Welcome to the home page!' },
        about: { title: 'About', content: 'Learn more about us on this page.' },
        contact: { title: 'Contact', content: 'Get in touch with us.' }
    };

    if (sections[page]) {
        const sectionInfo = sections[page];

        const section = document.createElement('section');
        section.id = page;

        const h2 = document.createElement('h2');
        h2.textContent = sectionInfo.title;
        section.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = sectionInfo.content;
        section.appendChild(p);

        main.appendChild(section);
    } else {
        const section = document.createElement('section');
        section.id = 'not-found';

        const h2 = document.createElement('h2');
        h2.textContent = 'Page Not Found';
        section.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = 'Sorry, the page you are looking for does not exist.';
        section.appendChild(p);

        main.appendChild(section);
    }
}

// Handle initial load and hash change events
window.addEventListener('hashchange', function() {
    const page = window.location.hash.substring(1);
    loadContent(page);
});

// Create and append a footer
function createFooter() {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.textContent = '© 2024 My Dynamic Webpage';
    footer.appendChild(p);
    return footer;
}

// Append all sections to the document
function initializePage() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createHeader());
    fragment.appendChild(createNav());
    const main = document.createElement('main');
    fragment.appendChild(main);
    fragment.appendChild(createFooter());
    document.body.appendChild(fragment);

    // Load the initial content
    const initialPage = window.location.hash.substring(1) || 'home';
    loadContent(initialPage);
}

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

