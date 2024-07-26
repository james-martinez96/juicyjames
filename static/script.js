document.addEventListener('DOMContentLoaded', function() {
    // Create and append a header
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'My Dynamic Webpage';
    header.appendChild(h1);
    document.body.appendChild(header);

    // Create and append a navigation bar
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const navItems = ['Home', 'About', 'Contact'];
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.toLowerCase()}`;
        a.textContent = item;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    document.body.appendChild(nav);

    // Create and append main content sections
    const main = document.createElement('main');

    const sections = [
        { id: 'home', title: 'Home', content: 'Welcome to the home page!' },
        { id: 'about', title: 'About', content: 'Learn more about us on this page.' },
        { id: 'contact', title: 'Contact', content: 'Get in touch with us.' }
    ];

    sections.forEach(sectionInfo => {
        const section = document.createElement('section');
        section.id = sectionInfo.id;

        const h2 = document.createElement('h2');
        h2.textContent = sectionInfo.title;
        section.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = sectionInfo.content;
        section.appendChild(p);

        main.appendChild(section);
    });

    document.body.appendChild(main);

    // Create and append a footer
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.textContent = '© 2024 My Dynamic Webpage';
    footer.appendChild(p);
    document.body.appendChild(footer);
});
