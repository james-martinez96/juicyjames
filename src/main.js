import "./index.html";
import './styles.css';
import {createHeader} from './header.js';
import {createNav} from './nav.js';
import {contentLoader} from './contentLoader.js';
import {createFooter} from './footer.js';
import {background} from "./background.js";

// window.addEventListener('hashchange', function() {
//     const page = window.location.hash.substring(1);
//     // contentLoader(page);
// });

function initializePage() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createHeader());
    fragment.appendChild(createNav());
    const main = document.createElement('main');
    fragment.appendChild(main);
    fragment.appendChild(createFooter());
    fragment.appendChild(background());
    document.body.appendChild(fragment);

    const initialPage = window.location.hash.substring(1) || 'home';
    contentLoader(initialPage);
}

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});
