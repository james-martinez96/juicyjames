function renderNotFound() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const section = document.createElement('section');
    section.id = 'not-found';

    const h2 = document.createElement('h2');
    h2.textContent = 'Page Not Found';
    section.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = 'Sorry, the page you are looking for does not exist.';
    section.appendChild(p);

    main.appendChild(section);
}

export async function contentLoader(page) {
    try {
        switch (page) {
        case 'home':
            const {renderHome} = await import('./pages/home.js');
            renderHome();
            break;
        case 'about':
            const {renderAbout} = await import('./pages/about.js');
            renderAbout();
            break;
        case 'stuff':
            const {renderStuff} = await import('./pages/stuff.js');
            renderStuff();
            break;
        case 'github':
            const {renderGitHub} = await import('./pages/github.js');
            renderGitHub();
            break;
        }
    } catch (error) {
        renderNotFound();
    }
}
