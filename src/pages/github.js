const githubLink = document.createElement('a');
githubLink.href = 'https://github.com/james-martinez96';
githubLink.target = '_blank';
githubLink.textContent = 'Visit my GitHub';

const github = {
    title: 'GitHub', content: 'this is a link', link: githubLink
};

export function renderGitHub() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = document.createElement('section');
    section.id = 'github';

    const h2 = document.createElement('h2');
    h2.textContent = github.title;
    section.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = github.content;
    section.appendChild(p);
    section.appendChild(github.link);

    main.appendChild(section);
}
