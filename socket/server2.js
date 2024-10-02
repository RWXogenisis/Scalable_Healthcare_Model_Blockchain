const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

// Read the server's private key from the file
const serverPrivateKey = fs.readFileSync('server_private_key.pem', 'utf8');

// Read the client's public key from the file
const clientPublicKey = fs.readFileSync('client_public_key.pem', 'utf8');

const PORT = 8080;

const server = net.createServer((clientSocket) => {
    console.log('Connected by client');

    clientSocket.on('data', (data) => {
        try {
            const encryptedMessage = Buffer.from(data.toString(), 'base64');

            // Decrypt the message using the server's private key with RSA_PKCS1_OAEP_PADDING
            const decryptedMessage = crypto.privateDecrypt({
                key: serverPrivateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256" // Explicitly define OAEP hash
            }, encryptedMessage);

            console.log(`Received from client (decrypted): ${decryptedMessage.toString()}`);

            if (decryptedMessage.toString().trim() === 'quit') {
                clientSocket.end();
                process.exit();
                return;
            }

            process.stdout.write('Enter your response: ');
            process.stdin.once('data', (response) => {
                const message = response.toString().trim();

                // Encrypt the response using the client's public key with RSA_PKCS1_OAEP_PADDING
                const encryptedResponse = crypto.publicEncrypt({
                    key: clientPublicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256" // Explicitly define OAEP hash
                }, Buffer.from(message));

                console.log('Sending encrypted response: ', encryptedResponse.toString('base64'));

                clientSocket.write(encryptedResponse.toString('base64'));

                if (message === 'quit') {
                    clientSocket.end();
                    process.exit();
                }
            });
        } catch (err) {
            console.error('Decryption error:', err);
        }
    });

    clientSocket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
