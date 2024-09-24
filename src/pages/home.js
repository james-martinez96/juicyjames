const home = {
    title: 'Home',
    content: 'This is the Home page.'
};

export function renderHome() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = document.createElement('section');
    section.id = 'home';

    const h2 = document.createElement('h2');
    h2.textContent = home.title;
    section.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = home.content;
    section.appendChild(p);

    main.appendChild(section);
}
