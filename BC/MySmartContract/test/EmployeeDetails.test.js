const EmployeeDetails = artifacts.require("EmployeeDetails"); //importing the contract

contract("EmployeeDetails", (accounts) => { // Define what is going to be tested, here the contract name and the function that will be executed for testing. Accounts is the array of accounts present in truffle
  it("should set and get employee details", async () => { // a description of the test
    const employeeDetails = await EmployeeDetails.deployed(); //Getting an instance of the EmployeeDetails
    
    await employeeDetails.setEmployee(1, "Alice", 28, "Developer"); //setting the details
    const employee = await employeeDetails.getEmployee(1); // getting the details
    
    assert.equal(employee[0], "Alice", "Name should be Alice"); // asserting of checking the output  and the description/error statment in case there is an error
    assert.equal(employee[1].toNumber(), 28, "Age should be 28"); // here we are accessing the data in the form of arrays
    assert.equal(employee[2], "Developer", "Position should be Developer");
  });
});
