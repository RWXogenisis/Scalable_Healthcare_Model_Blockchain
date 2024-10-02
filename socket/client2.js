const net = require('net');

const PORT = 8080;

// Create a socket
const client = new net.Socket();

// Set server details and connect
client.connect(PORT, '127.0.0.1', () => {
    console.log('Connected to server');
});

// Communication loop
process.stdin.on('data', (data) => {
    const message = data.toString();

    // Send the message to the server
    console.log('Enter the message: ');
    client.write(message);

    // Exit loop if user sends 'quit'
    if (message.trim() === 'quit') {
        client.end(); // Initiates socket shutdown
    }
});

// Receive a response from the server
client.on('data', (data) => {
    console.log('Received from server: ' + data.toString());
});

// Handle socket close
client.on('close', () => {
    console.log('Connection closed');
    process.exit(); // Exit the process when the connection is closed
});
