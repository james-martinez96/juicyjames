import {createElement} from "../utils/domUtils.js";

const githubLink = createElement('a', {
    href: 'https://github.com/james-martinez96',
    target: '_blank',
}, 'Visit my GitHub');

const neovimLink = createElement('a', {
    href:  'https://github.com/james-martinez96/nvim',
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

function renderMarkdown(markdown) {
    // Convert headings (#)
    let html = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Convert bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Convert italics (*text*)
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Convert links ([text](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Convert new lines to <br>
    html = html.replace(/\n/gim, '<br>');

    // Convert file structure (code block format with - )
    html = html.replace(/^-\s(.*$)/gim, '<li>$1</li>');

    // Convert warning callouts
    html = html.replace(/>\s\[!WARNING\](.*$)/gim, '<div class="warning"><strong>Warning:</strong>$1</div>');

    // Convert blockquotes
    html = html.replace(/^>\s(.*$)/gim, '<blockquote>$1</blockquote>');

    return html.trim();
};

async function fetchReadme() {
    var markdownText = '';
    try {
        const response = await fetch('https://raw.githubusercontent.com/james-martinez96/nvim/refs/heads/dev/README.md');
        if (!response.ok) {
            throw new Error('response was not ok.');
        }
        markdownText = await response.text();
    } catch (error) {
        console.error('Error fetching README:', error);
    }
    localStorage.setItem('README', markdownText);
    return markdownText;
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
    const htmlMarkdown = renderMarkdown(readme);
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
