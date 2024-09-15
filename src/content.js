const githubLink = document.createElement('a');
githubLink.href = 'https://github.com/james-martinez96';
githubLink.target = '_blank';
githubLink.textContent = 'Visit my GitHub';  // Add visible text

export function contentLoader(page) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing content

    const sections = {
        home: {title: 'Home', content: 'Welcome to the home page!'},
        about: {title: 'About', content: 'Learn more about us on this page.'},
        stuff: {title: 'Stuff', content: 'This is more stuff'},
        github: {title: 'GitHub', content: 'this is a link', link: githubLink},
    };

    if (sections[page]) {
        const sectionInfo = sections[page];

        const section = document.createElement('section');
        section.id = page;

        const h2 = document.createElement('h2');
        h2.textContent = sectionInfo.title;
        section.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = sectionInfo.content;
        section.appendChild(p);

        if (sectionInfo.link) {
            section.appendChild(sectionInfo.link);
        }

        main.appendChild(section);
    } else {
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
}
