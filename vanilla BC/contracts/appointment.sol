// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AppointmentContract {
    struct Appointment {
        uint patientId;
        uint doctorId;
        uint roomId;
        string appointmentDate; // Date of the appointment
    }

    mapping(uint => Appointment) public appointments; // Public access to appointments
    uint public appointmentCount; // Count of appointments

    // Function to create an appointment
    function createAppointment(uint _patientId, uint _doctorId, uint _roomId, string memory _appointmentDate) public {
        appointmentCount++;
        appointments[appointmentCount] = Appointment(_patientId, _doctorId, _roomId, _appointmentDate);
    }

    // Function to retrieve appointment details
    function getAppointment(uint _id) public view returns (uint, uint, uint, string memory) {
        Appointment memory appointment = appointments[_id];
        return (appointment.patientId, appointment.doctorId, appointment.roomId, appointment.appointmentDate);
    }
}
