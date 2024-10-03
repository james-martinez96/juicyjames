import {createElement} from "./utils/domUtils.js";

export function background() {
    const background = createElement('div', {class: 'background'});
    // background.classList.add('background');

    const circlesUl = createElement('ul', {class: 'circles'});
    circlesUl.classList.add('circles');

    for (let i = 0; i < 10; i++) {
        const circlesLi = createElement('li', {class: 'circlesLi'});
        circlesUl.appendChild(circlesLi);
    }
    background.appendChild(circlesUl);
    return background;
}
