const net = require('net');
const fs = require('fs');
const path = require('path');
const logger = require('./logger')

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html': return 'text/html';
        case '.js': return 'application/javascript';
        case '.css': return 'text/css';
        case '.png': return 'image/png';
        case '.jpg': return 'image/jpg';
        case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        default: return 'application/octet-stream';
    }
}

function sanitizePath(requestPath) {
    return requestPath.replace(/\.\./g, '').replace(/\/+/g, '/');
}

function sendResponse(client, status, contentType, body) {
    client.write(`HTTP/1.1 ${status}\r\n`);
    client.write(`Content-Type: ${contentType}\r\n`);
    client.write('Connection: close\r\n');
    client.write('\r\n');
    client.write(body);
    client.end();
}

function serveFile(client, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            sendResponse(client, '404 Not Found', 'text/plain', '404 Not Found');
            logger.error('File not found: ' + filePath);
        } else {
            const contentType = getContentType(filePath);
            sendResponse(client, '200 OK', contentType, data);
            logger.info('Served file: ' + filePath);
        }
    });
}

function handleRequest(client, request) {
    const requestLine = request.split('\n')[0];
    const [method, requestPath] = requestLine.split(' ');

    logger.info('Received request: ' + requestLine);

    if (method === 'GET') {
        let filePath = requestPath === '/' ? '/index.html' : sanitizePath(requestPath);
        filePath = path.join(__dirname, 'static', filePath);

        serveFile(client, filePath);
    } else {
        sendResponse(client, '400 Bad Request', 'text/plain', '400 Bad Request');
        logger.error('Bad request: ' + requestLine);
    }
}

const server = net.createServer((client) => {
    client.setTimeout(10000); // Set timeout to 10 seconds

    client.on('data', (data) => {
        handleRequest(client, data.toString());
    });

    client.on('error', (err) => {
        logger.error('Client error: ' + err.message);
    });

    client.on('end', () => {
        logger.info('Client disconnected');
    });
});

server.listen(3000, 'localhost', () => {
    const address = server.address();
    console.log(`Please connect to http://${address.address}:${address.port}/`);
});
