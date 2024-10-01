// Event listener that waits for the page to load before executing the script
window.addEventListener('load', async () => {
    // Check if MetaMask (or any Web3 provider) is injected in the browser
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        // Request user's Ethereum account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new instance of Web3 using MetaMask as the provider
        const web3 = new Web3(window.ethereum);

        // Define the deployed contract addresses
        const doctorAddress = '0x68493cd1ec17d79e47a17a6D9bB7358C34287f92';  // Replace with actual Doctor contract address
        const patientAddress = '0x1e2cF3a04f2846dd7d7Ae96A7a3cdbABcfd43462';  // Replace with actual Patient contract address
        const appointmentAddress = '0x8452c7842D7f83510b5703cb74b519C41a9419f4';  // Replace with actual Appointment contract address

        // Retrieve the user's Ethereum accounts
        const accounts = await web3.eth.getAccounts();
        const defaultAccount = accounts[0];  // Use the first account as the default account for transactions

        // Fetch contract ABIs (Application Binary Interface) and metadata for the deployed contracts
        const doctorContractJson = await fetch('../build/contracts/DoctorContract.json').then(response => response.json());
        const patientContractJson = await fetch('../build/contracts/PatientContract.json').then(response => response.json());
        const appointmentContractJson = await fetch('../build/contracts/AppointmentContract.json').then(response => response.json());

        // Create instances of the contracts using their ABI and deployed addresses
        const doctorContract = new web3.eth.Contract(doctorContractJson.abi, doctorAddress);
        const patientContract = new web3.eth.Contract(patientContractJson.abi, patientAddress);
        const appointmentContract = new web3.eth.Contract(appointmentContractJson.abi, appointmentAddress);

        // ---------------- Doctor Contract Functionality ----------------

        /**
         * Event listener for submitting the Add Doctor form.
         * Captures form data, calls the addDoctor function of the smart contract, and sends a transaction.
         */
        document.getElementById('addDoctorForm').addEventListener('submit', async (e) => {
            e.preventDefault();  // Prevent the form from refreshing the page
            
            // Capture input values from the form fields
            const id = document.getElementById('doctorId').value;  // Get Doctor ID input
            const name = document.getElementById('doctorName').value;  // Get Doctor Name input
            const age = document.getElementById('doctorAge').value;  // Get Doctor Age input
            const department = document.getElementById('doctorDepartment').value;  // Get Doctor Department input
        
            try {
                // Call the smart contract method addDoctor with the form inputs
                await doctorContract.methods.addDoctor(id, name, age, department)
                    .send({ from: defaultAccount });  // Send the transaction from the default account

                // Notify user on success
                alert('Doctor added successfully!');
            } catch (error) {
                // Log and display error in case of failure
                console.error(error);
                alert('Error adding doctor: ' + error.message);  // Display a detailed error message to the user
            }
        });

        /**
         * Event listener for submitting the Get Doctor form.
         * Fetches doctor information from the smart contract and displays it.
         */
        document.getElementById('getDoctorForm').addEventListener('submit', async (e) => {
            e.preventDefault();  // Prevent the form from refreshing the page
            
            // Capture the Doctor ID input and ensure it is converted to a number
            const doctorId = Number(document.getElementById('doctorIdFetch').value);
            console.log(doctorId);  // Log the Doctor ID to check its value
        
            // Check if the ID is a valid number before proceeding
            if (isNaN(doctorId)) {
                alert('Please enter a valid Doctor ID.');
                return;  // Exit if the ID is not a number
            }
        
            try {
                // Call the smart contract method getDoctor to fetch details using the Doctor ID
                const doctor = await doctorContract.methods.getDoctor(doctorId).call();

                // Display the returned doctor data in the 'doctorInfo' div
                document.getElementById('doctorInfo').innerHTML = `
                    <p>Name: ${doctor[0]}</p>
                    <p>Age: ${doctor[2]}</p>
                    <p>Department: ${doctor[1]}</p>
                `;
            } catch (error) {
                // Log and display error in case of failure
                console.error(error);
                alert('Error fetching doctor information: ' + error.message);  // Display a detailed error message to the user
            }
        });

        // ---------------- Similarly, add patient and appointment contract functionality here ----------------

    } else {
        // Notify the user if MetaMask is not detected in the browser
        alert('MetaMask not detected. Please install MetaMask to interact with this application.');
    }
});