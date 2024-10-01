// Import the EmployeeDetails contract artifact
const EmployeeDetails = artifacts.require("EmployeeDetails"); 

/**
 * @dev Test suite for the EmployeeDetails contract
 * @param {Array} accounts - Array of accounts available in Truffle for testing
 */
contract("EmployeeDetails", (accounts) => {
  
  /**
   * @dev Test case to set and get employee details
   */
  it("should set and get employee details", async () => {
    // Retrieve an instance of the deployed EmployeeDetails contract
    const employeeDetails = await EmployeeDetails.deployed(); 
    
    // Set employee details with ID 1
    await employeeDetails.setEmployee(1, "Alice", 28, "Developer"); 

    // Retrieve the employee details for ID 1
    const employee = await employeeDetails.getEmployee(1); 
    
    // Assert that the name is correct
    assert.equal(employee[0], "Alice", "Name should be Alice"); 
    
    // Assert that the age is correct, converting it to a number
    assert.equal(employee[1].toNumber(), 28, "Age should be 28"); 
    
    // Assert that the position is correct
    assert.equal(employee[2], "Developer", "Position should be Developer");
  });
});