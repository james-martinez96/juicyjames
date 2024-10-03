import {createElement} from "./utils/domUtils.js";

// Create and append a header
export function createHeader() {
    const header = createElement('header', {class: 'header'});
    const h1 = createElement('h1', {}, 'My Dynamic Webpage');
    header.appendChild(h1);
    return header;
}
