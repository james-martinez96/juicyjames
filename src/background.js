export function background() {
    const background = document.createElement('div');
    background.classList.add('background');

    const circlesUl = document.createElement('ul');
    circlesUl.classList.add('circles');

    for (let i = 0; i < 10; i++) {
        const circlesLi = document.createElement('li');
        circlesUl.appendChild(circlesLi);
    }
    background.appendChild(circlesUl);
    return background;
}
