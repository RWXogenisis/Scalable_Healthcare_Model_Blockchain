// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AppointmentContract {
    struct Appointment {
        uint patientId;
        uint doctorId;
        uint roomId;
        string appointmentDate;
    }

    mapping(uint => Appointment) public appointments;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can create or update appointments");
        _;
    }

    function createAppointment(uint _appointmentId, uint _patientId, uint _doctorId, uint _roomId, string memory _appointmentDate) public onlyAdmin {
        appointments[_appointmentId] = Appointment(_patientId, _doctorId, _roomId, _appointmentDate);
    }

    function getAppointment(uint _appointmentId) public view returns (uint, uint, uint, string memory) {
        Appointment memory appointment = appointments[_appointmentId];
        return (appointment.patientId, appointment.doctorId, appointment.roomId, appointment.appointmentDate);
    }
}
