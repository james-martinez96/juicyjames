import {createElement} from "../utils/domUtils.js";
import {marked} from "marked";

const githubLink = createElement('a', {
    href: 'https://github.com/james-martinez96',
    target: '_blank',
}, 'Visit my GitHub');

const neovimLink = createElement('a', {
    href: 'https://github.com/james-martinez96/nvim/tree/dev',
    target: '_blank',
    textContent: 'Github',
}, 'Github');

const github = {
    title: 'GitHub',
    content: 'this is a link to my github.',
    link: githubLink,
};

const neovim = {
    title: 'Neovim Config.',
    content: 'my neovim config.',
    link: neovimLink,
};

async function fetchReadme() {
    var markdown = '';
    if (!localStorage.getItem('README')) {
        try {
            const response = await fetch('https://raw.githubusercontent.com/james-martinez96/nvim/refs/heads/dev/README.md');
            if (!response.ok) {
                throw new Error('response was not ok.');
            }
            markdown = await response.text();
        } catch (error) {
            console.error('Error fetching README:', error);
        }
        localStorage.setItem('README', markdown);
    }
}

function renderNeovim() {
    const main = document.querySelector('main');

    const section = createElement('section', {class: 'neovim'});

    const h2 = createElement('h2', {class: 'neovim-header'}, neovim.title);

    section.appendChild(h2);

    const p = createElement('p', {}, neovim.content);
    section.appendChild(p);

    section.appendChild(neovimLink);

    const markdown = createElement('p', {class: 'markdown'});
    section.appendChild(markdown);

    fetchReadme();
    const readme = localStorage.getItem('README');
    const htmlMarkdown = marked(readme);
    markdown.innerHTML = htmlMarkdown;

    main.appendChild(section);
}

export function renderGitHub() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = createElement('section', {class: 'github'});

    const h2 = createElement('h2', {class: 'github-Header'}, github.title);
    section.appendChild(h2);

    const p = createElement('p', {}, github.content);

    section.appendChild(p);
    section.appendChild(github.link);
    main.appendChild(section);
    renderNeovim();

    // var iframe = document.createElement('iframe');
    //
    // iframe.src = 'http://localhost:3001/';
    // iframe.title = 'Github Website';
    // iframe.id = 'iframe';
    // main.appendChild(iframe);
}
