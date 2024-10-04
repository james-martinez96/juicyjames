// function renderMarkdown(markdown) {
//     // Convert headings (#)
//     let html = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
//     html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
//     html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
//
//     // Convert bold (**text**)
//     html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
//
//     // Convert italics (*text*)
//     html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
//
//     // Convert links ([text](url))
//     html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
//
//     // Convert new lines to <br>
//     html = html.replace(/\n/gim, '<br>');
//
//     // Convert file structure (code block format with - )
//     html = html.replace(/^-\s(.*$)/gim, '<li>$1</li>');
//
//     // Convert warning callouts
//     html = html.replace(/>\s\[!WARNING\](.*$)/gim, '<div class="warning"><strong>Warning:</strong>$1</div>');
//
//     // Convert blockquotes
//     html = html.replace(/^>\s(.*$)/gim, '<blockquote>$1</blockquote>');
//
//     return html.trim();
// };

export function markdownToHtml(markdown) {
    // Convert headers (H1-H6)
    markdown = markdown.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    markdown = markdown.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    markdown = markdown.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold and italic
    markdown = markdown.replace(/\*\*\*(.*)\*\*\*/gim, '<b><i>$1</i></b>'); // Bold + italic
    markdown = markdown.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>'); // Bold
    markdown = markdown.replace(/\*(.*)\*/gim, '<i>$1</i>'); // Italic

    // Convert strikethrough
    markdown = markdown.replace(/~~(.*)~~/gim, '<del>$1</del>');

    // Convert blockquotes
    markdown = markdown.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Convert inline code
    markdown = markdown.replace(/`(.*?)`/gim, '<code>$1</code>');

    // Convert code blocks (triple backticks)
    markdown = markdown.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    // Convert images ![alt text](image url)
    markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />");

    // Convert links [text](link)
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>");

    // Convert unordered lists (* or -)
    markdown = markdown.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');
    markdown = markdown.replace(/<\/li>\n<li>/gim, '</li><li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

    // Convert ordered lists (numbers followed by dot)
    markdown = markdown.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
    markdown = markdown.replace(/<\/li>\n<li>/gim, '</li><li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/gim, '<ol>$1</ol>');

    // Convert horizontal rules
    markdown = markdown.replace(/^\s*[-]{3,}\s*$/gim, '<hr />');

    // Convert newlines into <br> (optional)
    markdown = markdown.replace(/\n/gim, '<br />');

    return markdown.trim(); // Return the converted HTML
}
