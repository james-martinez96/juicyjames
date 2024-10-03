import {createElement} from "../utils/domUtils.js";
const stuff = {
    title: 'Stuff',
    content: 'This is more stuff',
};

export function renderStuff() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = createElement('section', {class: 'stuff'});

    const h2 = createElement('h2', {class: 'stuff-header'}, stuff.title);

    const p = createElement('p', {}, stuff.content);

    section.appendChild(h2);
    section.appendChild(p);
    main.appendChild(section);
    return main;
}
