import {request} from 'http'; // or 'https' if your server uses SSL

const options = {
    hostname: 'localhost', // Replace with your server's hostname
    port: 3000,            // Replace with your server's port
    path: '/bundle.js',             // Replace with the path you want to test
    method: 'GET',         // Or 'POST', 'PUT', etc. depending on your use case
};

const makeRequest = () => {
    const req = request(options, (res) => {
        // Collect response data
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(`Response: ${res.statusCode} - ${data}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
};

// Number of concurrent requests
const numRequests = 1000;

// Interval between each request in milliseconds
const interval = 10;

// Stress testing loop
for (let i = 0; i < numRequests; i++) {
    setTimeout(makeRequest, i * interval);
}
