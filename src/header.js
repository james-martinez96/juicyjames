// Create and append a header
export function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'My Dynamic Webpage';
    header.appendChild(h1);
    return header;
}
