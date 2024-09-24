const DoctorContract = artifacts.require("DoctorContract");
const PatientContract = artifacts.require("PatientContract");
const AppointmentContract = artifacts.require("AppointmentContract");

module.exports = function (deployer) {
  deployer.deploy(DoctorContract)
    .then(() => deployer.deploy(PatientContract))
    .then(() => deployer.deploy(AppointmentContract));
};

