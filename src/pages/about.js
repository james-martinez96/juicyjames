import {createElement} from '../utils/domUtils.js';

const about = {
    title: 'About',
    content: 'Learn more about us on this page.'
};

export function renderAbout() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = createElement('section', {class: 'about'});

    const h2 = createElement('h2', {class: 'about-header'}, about.title);
    const p = createElement('p', {}, about.content);

    section.appendChild(h2);
    section.appendChild(p);
    main.appendChild(section);
}
