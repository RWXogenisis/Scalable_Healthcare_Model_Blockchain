// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DoctorContract {
    struct Doctor {
        string name;
        string department;
        uint age;
    }

    mapping(uint => Doctor) private doctors;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can add or update doctors");
        _;
    }

    function addDoctor(uint _id, string memory _name, uint _age, string memory _department) public onlyAdmin {
        doctors[_id] = Doctor(_name, _department, _age);
    }

    function getDoctor(uint _id) public view returns (string memory, string memory, uint) {
        Doctor memory doctor = doctors[_id];
        return (doctor.name, doctor.department, doctor.age);
    }

    function updateDoctor(uint _id, string memory _name, uint _age, string memory _department) public onlyAdmin {
        doctors[_id] = Doctor(_name, _department, _age);
    }
}
