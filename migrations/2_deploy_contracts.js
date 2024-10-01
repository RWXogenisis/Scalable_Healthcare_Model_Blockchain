// Import the smart contract artifacts for deployment
const DoctorContract = artifacts.require("DoctorContract");
const PatientContract = artifacts.require("PatientContract");
const AppointmentContract = artifacts.require("AppointmentContract");

/**
 * @dev Migration script to deploy the Doctor, Patient, and Appointment contracts
 * @param {Truffle.Deployer} deployer - The deployer object provided by Truffle
 */
module.exports = function (deployer) {
  // Deploy the DoctorContract first
  deployer.deploy(DoctorContract)
    .then(() => {
      // After DoctorContract is deployed, deploy the PatientContract
      return deployer.deploy(PatientContract);
    })
    .then(() => {
      // After PatientContract is deployed, deploy the AppointmentContract
      return deployer.deploy(AppointmentContract);
    });
};