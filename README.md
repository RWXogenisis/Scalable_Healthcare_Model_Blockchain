# Blockchain Scalability Analysis With Encryption

## Introduction

In this project, we conduct a detailed scalability analysis of a blockchain-based communication system designed for secure data exchange between two hospitals. Each hospital maintains its own blockchain, which stores information related to doctors, patients, and appointments. The system ensures that appointment details are added to the blockchain only after receiving consent from both doctor and patient, with RSA encryption providing secure communication between hospitals.

Data is encrypted on the sender side and decrypted on the receiver side before being stored in the blockchain. This setup guarantees privacy and security, but as the number of users and transactions increases, the scalability of the system becomes a crucial consideration.

The objective of this analysis is to assess how the system's performance is impacted as it scales, taking into account factors such as the growing size of the blockchain, increased transaction volume, and the computational overhead introduced by RSA encryption. We explore how the system handles increasing data load, focusing on areas like transaction throughput, network latency, and storage requirements. Additionally, we identify potential bottlenecks in the current setup and propose optimizations that could improve the scalability and efficiency of the system, ensuring it remains capable of supporting larger datasets and higher transaction volumes in a healthcare environment.

## Problem Statement

The healthcare industry is increasingly adopting blockchain technology to manage sensitive data in a secure and transparent way. However, consortium blockchains, which are designed specifically for healthcare, encounter significant challenges when it comes to scaling up as the number of participants and transaction volumes grow.

This project aims to explore the scalability of Ethereum-based consortium blockchains within the healthcare sector. It will assess how varying participant numbers affect key performance metrics such as transaction throughput (TPS), latency, resource utilization, and network bandwidth.

In addition to scalability, the project examines how integrating Rivest-Shamir-Adleman (RSA) encryption impacts blockchain performance. RSA is used to ensure that sensitive healthcare data is securely transmitted, but the goal is to understand if this added security measure affects the overall efficiency of the blockchain.

By running simulations and conducting performance evaluations, the project seeks to uncover the optimal configurations that can enable healthcare blockchains to scale effectively, while maintaining high levels of security and performance. This research could help establish a more practical approach to building secure and efficient blockchain networks for the healthcare industry.

## Scope of the Project

The scope of this project includes:

- **Analyzing scalability metrics** such as transaction throughput (TPS), latency, resource utilization, and network bandwidth.
- **Evaluating the impact of increasing participant numbers** on the overall performance of the blockchain.
- **Integrating and testing Rivest-Shamir-Adleman (RSA) encryption** to ensure secure transmission of healthcare data.
- **Applying these findings to real-world healthcare scenarios**, with a focus on secure and efficient management of patient data within blockchain networks.

## Software Requirements

### Functional Requirements

- **Patient Record Management**: Support creation, update, and secure storage of patient records using blockchain technology.
- **Secure Data Sharing Between Hospitals**: Implement encrypted data sharing between hospital nodes.
- **Transaction Processing**: Handle transactions of varying sizes and rates to accommodate diverse healthcare needs.
- **RSA Encryption**: Encrypt all patient data using RSA before storage or transmission.
- **Decryption for Authorized Nodes**: Allow authorized nodes to decrypt patient data when necessary.
- **Smart Contracts**: Develop smart contracts in Solidity to manage transactions and encryption processes.
- **Blockchain Monitoring**: Monitor performance metrics under various load conditions.

### Non-Functional Requirements

- **Scalability**: Handle an increasing number of participants and transactions without significant performance degradation.
- **Performance**: Target high throughput with low transaction confirmation latency.
- **Security**: Prioritize data privacy by ensuring all patient data is encrypted.
- **Resource Efficiency**: Optimize CPU, memory, and storage resource utilization.
- **Network Efficiency**: Manage network bandwidth efficiently to avoid bottlenecks.

### Technical Requirements

- **Ethereum and Ganache**: Use Ethereum blockchain with Ganache for local development.
- **Truffle Framework**: Use Truffle for developing, testing, and deploying smart contracts.
- **Node.js and Web3.js**: Use JavaScript and Web3.js to interact with Ethereum.
- **Encryption Libraries**: Implement RSA encryption with OpenSSL and Python's `rsa` library.
- **System Monitoring**: Use tools like Prometheus, Grafana, Wireshark, or Netdata for monitoring.

### Performance Constraints

- **Transaction Throughput (TPS)**: Handle at least 50 TPS under medium load and up to 100 TPS under high load.
- **Latency**: Confirm transactions in 1-2 seconds on average.
- **Resource Utilization**: Keep CPU usage under 70% and memory usage under 75%.
- **Network Bandwidth**: Ensure bandwidth does not limit throughput or increase latency.

## Implementation

### Prerequisites

- **Node.js** (v14.x or later): [Download Node.js](https://nodejs.org/en/download/)
- **Git**: [Download Git](https://git-scm.com/downloads)

### Steps to Set Up and Install Truffle and Ganache

#### 1. Install Truffle

Truffle is a development framework for Ethereum. Install it globally using npm:

```bash
npm install -g truffle
```

[Truffle Documentation](https://www.trufflesuite.com/docs/truffle/overview)

#### 2. Install Ganache

Ganache is a personal blockchain for Ethereum development.

- **Download Ganache**: [Ganache Downloads](https://www.trufflesuite.com/ganache)

#### 3. Create a Project Directory

Create a new directory for your project and navigate into it:

```bash
mkdir blockchain-scalability
cd blockchain-scalability
```

#### 4. Initialize Truffle Project

Initialize a new Truffle project:

```bash
truffle init
```

This command sets up the basic project structure.

*(Insert screenshot of the project directory structure here)*

#### 5. Create Contracts and Migrations

- **Contracts**: Place your Solidity contracts in the `contracts/` directory.
- **Migrations**: Create deployment scripts in the `migrations/` directory.

![image](https://github.com/user-attachments/assets/006693a2-01c7-4263-b2c6-52682f27b576)

#### 6. Compile Contracts

Compile your smart contracts:

```bash
truffle compile
```

#### 7. Get Commands from `set of commands.txt`

Refer to `set of commands.txt` for additional commands needed for your setup.

#### 8. Retrieve Contract Addresses

After compiling, search for `"address":` in the compiled contract JSON files to get the hex addresses.

![image](https://github.com/user-attachments/assets/ae133fb1-3517-4a36-a596-b174ac34e662)

#### 9. Update `app.js` with Contract Addresses

Paste all the contract addresses into your `app.js` file to interact with them.

#### 10. Change the Mnemonic in `truffle-config.js`

Edit `truffle-config.js` and replace the mnemonic with your own for secure deployment.

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'your mnemonic phrase here'; // Change this to your mnemonic

module.exports = {
  // ... rest of the configuration
};
```

![image](https://github.com/user-attachments/assets/a1d204d7-6022-42bd-b524-175011697cf0)

## Scalability Considerations

### Blockchain Size and Growth

As the number of transactions increases, the blockchain size grows, which can lead to:

- **Increased Transaction Volume**: May cause longer validation times.
- **Storage Constraints**: Requires more storage on each node.

### RSA Encryption Overhead

RSA encryption adds computational overhead:

- **Latency**: Encryption and decryption can slow down processing.
- **Front-End Integration**: Requires optimization to prevent performance issues.

### Access Control

Managing permissions becomes more complex as users increase:

- **Role-Based Access Control Overhead**: Needs efficient management to maintain performance.

### Network Latency

Geographical distribution can introduce latency:

- **Cross-Hospital Communication**: Ensuring low-latency is crucial for performance.

### Proof of Work Consensus Overhead

PoW can limit scalability:

- **Mining Difficulty**: Requires more computational power over time.
- **Energy Consumption**: High energy use can become prohibitive.

## Current Scalability Features

### Decentralized Data Management

- Each hospital operates its own blockchain, reducing network congestion.

### Secure Communication via RSA Encryption

- Ensures data privacy and security during transmission.

### Test Net for Access Control

- Validates user permissions efficiently.

### Proof of Work Consensus on Besu Network

- Provides a secure and decentralized transaction validation method.

### Smart Contract Deployment on Fabric EVM

- Optimized contracts handle large transaction volumes effectively.

## Scalability Solutions

### Optimizing Proof of Work (PoW) Consensus

- **Reduce Block Size**: Decrease mining time.
- **Increase Block Frequency**: Process more transactions per second.

### Optimizing RSA Encryption Overhead

- **Hybrid Encryption**: Use symmetric encryption for data, RSA for key exchange.
- **Parallel Encryption**: Handle multiple encryptions simultaneously.

### Smart Contract Optimization

- **Gas Optimization**: Reduce costs by streamlining code.
- **Lazy Evaluation**: Defer computations to optimize performance.

### Optimizing Network Latency

- **Geographic Node Distribution**: Place nodes strategically to reduce latency.
- **Content Delivery Networks**: Use CDNs for faster data access.

### Improving Access Control Validation

- **Role-Based Access Caching**: Cache permissions to reduce validation time.
- **Permissioned Blockchain**: Pre-approve users to streamline access control.

## Conclusion

This project addresses the challenges of scalability and security in healthcare consortium blockchains. By analyzing performance under varying loads and incorporating RSA encryption, we aim to optimize blockchain configurations for effective scaling without compromising security.

Our findings will help healthcare providers adopt blockchain solutions that are both efficient and secure, facilitating better patient data management and paving the way for broader industry adoption.
