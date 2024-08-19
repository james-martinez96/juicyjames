import {createServer} from 'net';
import {readFile} from 'fs';
import {extname, join} from 'path';
import {error, info} from './logger';

function getContentType(filePath) {
    const ext = extname(filePath).toLowerCase();
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
    readFile(filePath, (err, data) => {
        if (err) {
            sendResponse(client, '404 Not Found', 'text/plain', '404 Not Found');
            error('File not found: ' + filePath);
        } else {
            const contentType = getContentType(filePath);
            sendResponse(client, '200 OK', contentType, data);
            info('Served file: ' + filePath);
        }
    });
}

function handleRequest(client, request) {
    const start = process.hrtime(); // Start time
    const requestLine = request.split('\n')[0];
    const [method, requestPath] = requestLine.split(' ');

    const clientIP = client.remoteAddress;
    info(`Received request  from IP: ${clientIP}`);

    info('Received request: ' + requestLine);

    if (method === 'GET') {
        let filePath = requestPath === '/' ? '/index.html' : sanitizePath(requestPath);
        filePath = join(__dirname, 'static', filePath);

        serveFile(client, filePath);
    } else {
        sendResponse(client, '400 Bad Request', 'text/plain', '400 Bad Request');
        error('Bad request: ' + requestLine);
    }

    const [seconds, nanoseconds] = process.hrtime(start); // Calculate the duration
    const durationInMs = (seconds * 1e3) + (nanoseconds / 1e6); // Convert to milliseconds

    info(`Request processed in ${durationInMs.toFixed(3)} ms`);
    // const memoryUsage = process.memoryUsage();
    // logger.info(`Memory usage: ${JSON.stringify(memoryUsage)}`);
}

const server = createServer((client) => {
    client.setTimeout(10000); // Set timeout to 10 seconds

    client.on('data', (data) => {
        handleRequest(client, data.toString());
    });

    client.on('error', (err) => {
        error('Client error: ' + err.message);
    });

    client.on('end', () => {
        info('Client disconnected');
    });
});

server.listen(3000, 'localhost', () => {
    const address = server.address();
    console.log(`Please connect to http://${address.address}:${address.port}/`);
});