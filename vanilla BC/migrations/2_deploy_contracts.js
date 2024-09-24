const DoctorContract = artifacts.require("DoctorContract");
const PatientContract = artifacts.require("PatientContract");
const AppointmentContract = artifacts.require("AppointmentContract");

module.exports = function (deployer) {
  deployer.deploy(DoctorContract);
  deployer.deploy(PatientContract);
  deployer.deploy(AppointmentContract);
};
