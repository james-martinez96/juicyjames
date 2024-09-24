const about = {
    title: 'About',
    content: 'Learn more about us on this page.'
};

export function renderAbout() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = document.createElement('section');
    section.id = 'about';

    const h2 = document.createElement('h2');
    h2.textContent = about.title;
    section.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = about.content;
    section.appendChild(p);

    main.appendChild(section);
}
