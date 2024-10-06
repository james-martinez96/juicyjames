/**
 * Creates an HTML element with the specified tag, attributes, and text content.
 *
 * @param {string} tag - The type of HTML element to create (e.g., 'div', 'span').
 * @param {Object} [attributes={}] - An object containing key-value pairs of attributes to set on the element.
 * @param {string} [textContent=''] - The text content to set for the element.
 * @returns {HTMLElement} The created HTML element.
 */
export function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    // console.log(Object.entries(attributes));
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    element.textContent = textContent;
    return element;
}
