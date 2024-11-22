import {createElement} from "../utils/domUtils.js";

const home = {
    title: 'Hi im James',
    content: 'I\'m a fullstask developer.\n'
};

export function renderHome() {
    const main = document.querySelector('main');
    if (!main) return;  // Safety check if 'main' is not present
    main.innerHTML = '';  // Clear the existing content

    const section = createElement('section', {class: 'home'});

    const h2 = createElement('h2', {class: 'home-header'}, home.title);
    const p = createElement('p', {}, home.content);

    section.appendChild(h2);
    section.appendChild(p);
    main.appendChild(section);
}
