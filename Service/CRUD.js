const Employee = require('../models/Employee');
const errorHandleRabit = require('../Middleware/errorRabbitMQ');


exports.getAllEmployee =  async (employee) => {
  try {
    const data = await Employee.find({});
    return data;
  } catch (err) {
    errorHandleRabit(err);
  }
};

exports.getOneEmployee =  async (ID) => {
  try {
    const data = await Employee.find({ _id: ID });
    return data;
  } catch (err) {
    errorHandleRabit(err);
  }
};


// Create Employee
exports.createEmployee =  async (employee) => {
  try {
    const employeeData = await Employee.create(employee);
    if(employeeData){
      return employeeData;
    }
  } catch (err) {
    errorHandleRabit(err);
  }
};

// Update Employee
exports.updateEmployee = async (employeeId, employeeData) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: employeeData },
      { new: true }
    );
    return updatedEmployee;
  } catch (err) {
    throw err;
  }
};

// Delete user
exports.deleteEmployee = async (employeeId) => {
  try {
    await Employee.findByIdAndRemove(employeeId);
    return employeeId;
  } catch (err) {
    throw err;
  }
};