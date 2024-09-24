// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Main Consortium Contract for linking all modules
contract Consortium {
    address public doctorContract;
    address public patientContract;
    address public appointmentContract;
    address public admin;

    constructor(address _doctorContract, address _patientContract, address _appointmentContract) {
        doctorContract = _doctorContract;
        patientContract = _patientContract;
        appointmentContract = _appointmentContract;
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can access this function");
        _;
    }

    function setDoctorContract(address _doctorContract) public onlyAdmin {
        doctorContract = _doctorContract;
    }

    function setPatientContract(address _patientContract) public onlyAdmin {
        patientContract = _patientContract;
    }

    function setAppointmentContract(address _appointmentContract) public onlyAdmin {
        appointmentContract = _appointmentContract;
    }
    
    // Add additional linking mechanisms if needed
}
