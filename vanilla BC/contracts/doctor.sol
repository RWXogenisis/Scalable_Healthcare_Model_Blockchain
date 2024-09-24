// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorContract {
    struct Doctor {
        string name;
        string department;
        uint age;
    }

    mapping(uint => Doctor) public doctors; // Public access to doctor records
    uint public doctorCount; // Count of doctors

    // Function to add a doctor
    function addDoctor(string memory _name, uint _age, string memory _department) public {
        doctorCount++; // Increment doctor count
        // Add the new doctor to the mapping
        doctors[doctorCount] = Doctor(_name, _department, _age);
    }

    // Function to retrieve doctor details
    function getDoctor(uint _id) public view returns (string memory, string memory, uint) {
        Doctor memory doctor = doctors[_id];
        return (doctor.name, doctor.department, doctor.age);
    }
}
