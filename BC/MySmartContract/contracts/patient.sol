// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PatientContract {
    struct Patient {
        string name;
        uint age;
        string medicalHistory;
    }

    mapping(uint => Patient) private patients;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can add or update patients");
        _;
    }

    function addPatient(uint _id, string memory _name, uint _age, string memory _medicalHistory) public onlyAdmin {
        patients[_id] = Patient(_name, _age, _medicalHistory);
    }

    function getPatient(uint _id) public view returns (string memory, uint, string memory) {
        Patient memory patient = patients[_id];
        return (patient.name, patient.age, patient.medicalHistory);
    }

    function updatePatient(uint _id, string memory _name, uint _age, string memory _medicalHistory) public onlyAdmin {
        patients[_id] = Patient(_name, _age, _medicalHistory);
    }
}
