// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientContract {
    struct Patient {
        string name;
        uint age;
        string medicalHistory; // Public access to medical history
    }

    mapping(uint => Patient) public patients; // Public access to patient records
    uint public patientCount; // Count of patients

    // Function to add a patient
    function addPatient(string memory _name, uint _age, string memory _medicalHistory) public {
        patientCount++;
        patients[patientCount] = Patient(_name, _age, _medicalHistory);
    }

    // Function to retrieve patient details
    function getPatient(uint _id) public view returns (string memory, uint, string memory) {
        Patient memory patient = patients[_id];
        return (patient.name, patient.age, patient.medicalHistory);
    }
}
