const AppointmentContract = artifacts.require("AppointmentContract");

contract("AppointmentContract", (accounts) => {
    let appointmentContract;
    const admin = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    beforeEach(async () => {
        // Deploy a new instance of the contract before each test
        appointmentContract = await AppointmentContract.new();
    });

    describe("Admin functions", () => {
        it("should allow admin to create an appointment", async () => {
            await appointmentContract.createAppointment(1, 101, 201, 301, "2024-10-10", { from: admin });

            const appointment = await appointmentContract.getAppointment(1);
            assert.equal(appointment[0].toString(), "101", "Incorrect patient ID");
            assert.equal(appointment[1].toString(), "201", "Incorrect doctor ID");
            assert.equal(appointment[2].toString(), "301", "Incorrect room ID");
            assert.equal(appointment[3], "2024-10-10", "Incorrect appointment date");
        });

        it("should reject non-admin from creating an appointment", async () => {
            try {
                await appointmentContract.createAppointment(2, 102, 202, 302, "2024-10-11", { from: user1 });
                assert.fail("Non-admin was able to create an appointment");
            } catch (error) {
                assert(error.message.includes("Only admin can create or update appointments"), "Error message does not match");
            }
        });
    });

    describe("Appointment retrieval", () => {
        beforeEach(async () => {
            // Create an appointment before testing retrieval
            await appointmentContract.createAppointment(1, 101, 201, 301, "2024-10-10", { from: admin });
        });

        it("should allow anyone to retrieve an appointment", async () => {
            const appointment = await appointmentContract.getAppointment(1, { from: user1 });
            assert.equal(appointment[0].toString(), "101", "Incorrect patient ID");
            assert.equal(appointment[1].toString(), "201", "Incorrect doctor ID");
            assert.equal(appointment[2].toString(), "301", "Incorrect room ID");
            assert.equal(appointment[3], "2024-10-10", "Incorrect appointment date");
        });
    });
});
