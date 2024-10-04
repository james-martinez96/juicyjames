export function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    // console.log(Object.entries(attributes));
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    element.textContent = textContent;
    return element;
}