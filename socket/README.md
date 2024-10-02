# Socket-Based Encrypted Communication (Client-Server)

This project demonstrates a basic TCP based client-server communication using Node.js `net` module with RSA encryption. The client and server exchange encrypted messages using predefined RSA key pairs.

## Prerequisites

- Node.js must be installed on your machine. You can check if it's installed by running the following command:
  ```bash
  node -v
  ```
  If Node.js is not installed, download and install it from [nodejs.org](https://nodejs.org/).

## RSA Key Setup

Before running the application, make sure you have the following RSA key files available in the project directory:

- `client_private_key.pem`: Client's private key
- `client_public_key.pem`: Client's public key
- `server_private_key.pem`: Server's private key
- `server_public_key.pem`: Server's public key

The keys can be generated using OpenSSL:

```bash
# Generate a 2048-bit RSA private key for the server
openssl genpkey -algorithm RSA -out server_private_key.pem -pkeyopt rsa_keygen_bits:2048

# Extract the public key from the private key
openssl rsa -pubout -in server_private_key.pem -out server_public_key.pem

# Generate a 2048-bit RSA private key for the client
openssl genpkey -algorithm RSA -out client_private_key.pem -pkeyopt rsa_keygen_bits:2048

# Extract the public key from the client's private key
openssl rsa -pubout -in client_private_key.pem -out client_public_key.pem
```

Make sure all these keys are in the root folder of your project.

## Installation

1. Clone or download the project.
2. Install any required dependencies (though no external packages are needed, ensure that Node.js is properly installed).

## Running the Application

To run the application, follow these steps:

1. Open **two terminals**:
   - **Terminal 1:** For running the server
   - **Terminal 2:** For running the client

### Step-by-Step Instructions:

1. In **Terminal 1** (Server Terminal), navigate to the project directory and run the server:
   ```bash
   node server2.js
   ```

   You should see the message:
   ```
   Server listening on port 8080
   ```

2. In **Terminal 2** (Client Terminal), navigate to the project directory and run the client:
   ```bash
   node client2.js
   ```

   You should see:
   ```
   Connected to server
   ```

### Interaction:

- Type a message in the **Client Terminal** and press `Enter`. The message will be encrypted with the server's public key and sent to the server.
- The **Server Terminal** will receive the encrypted message, decrypt it using its private key, and display the plaintext message.
- The server will then prompt you to enter a response, which will be encrypted with the client's public key and sent back to the client.
- The client will receive the encrypted message, decrypt it using its private key, and display the response.
  
You can type `quit` at any time at any side to end the connection.