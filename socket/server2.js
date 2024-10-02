const net = require('net');

const PORT = 8080;

// Create a server
const server = net.createServer((clientSocket) => {
    console.log('Connected by client');

    clientSocket.on('data', (data) => {
        const buffer = data.toString();
        console.log(`Received from client: ${buffer}`);

        // Exit loop if client sends 'quit'
        if (buffer.trim() === 'quit') {
            clientSocket.end(); // Close the socket connection
            return;
        }

        // User input
        process.stdout.write('Enter your response: ');
        process.stdin.once('data', (response) => {
            if (response.toString().trim() === 'quit') {
                clientSocket.end(); // End client connection if 'quit' is typed
            } else {
                clientSocket.write(response);
            }
        });
    });

    clientSocket.on('end', () => {
        console.log('Client disconnected');
        process.exit(); // Exit the server process
    });
});

// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
