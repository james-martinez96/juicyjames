import {createElement} from "./utils/domUtils.js";

// Create and append a footer
export function createFooter() {
    const footer = createElement('footer', {class: 'footer'});
    const p = createElement('p', {}, '© 2024 My Dynamic Webpage');
    footer.appendChild(p);
    return footer;
}
