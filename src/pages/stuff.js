const stuff = {
    title: 'Stuff',
    content: 'This is more stuff',
};

export function renderStuff() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = document.createElement('section');
    section.id = 'stuff';

    const h2 = document.createElement('h2');
    h2.id = 'stuff-header';
    h2.textContent = stuff.title;
    section.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = stuff.content;
    section.appendChild(p);

    main.appendChild(section);
    return main;
}
