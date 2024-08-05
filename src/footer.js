// Create and append a footer
export function createFooter() {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.textContent = '© 2024 My Dynamic Webpage';
    footer.appendChild(p);
    return footer;
}
