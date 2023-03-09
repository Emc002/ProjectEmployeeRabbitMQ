const asyncWrapper = require('../Middleware/async')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../Errors')
const rabbitmq = require('../config/rabbitMQ');
const crud = require('../Service/CRUD')
 
const employeePack = {
  getAllEmployee: asyncWrapper(async (req, res) => {
    const employee = await crud.getAllEmployee()
    if (!employee) {
      throw new NotFoundError(`No Employee Data`, 404)
    }
    res.status(StatusCodes.OK).json({ message: "Get All Success", employee })
  }),

  getOneEmployee: asyncWrapper(async (req, res) => {
    const ID = req.params.id
    const employee = await crud.getOneEmployee(ID)
    if (employee == null) {
      throw new NotFoundError(`No Employee with ID : ${ID}`, 404)
    }
    res.status(StatusCodes.OK).json({ message: "Get One Success", employee })
  }),

  createEmployee: asyncWrapper(async (req, res) => {    
    rabbitmq.publishMessage('employee.created', req.body);
    res.status(StatusCodes.CREATED).json({ message: "publish Success" })
  }),

  updateEmployee: asyncWrapper(async (req, res) => {
    const ID = req.params.id;
    req.body.id = ID;
    rabbitmq.publishMessage('employee.updated', req.body);
    res.status(StatusCodes.OK).json({ message: "publish Success" })
  }),

  deleteEmployee: asyncWrapper(async (req, res) => {
    const ID = req.params.id;
    req.body.id = ID;
    rabbitmq.publishMessage('employee.deleted', ID);
    res.status(StatusCodes.CREATED).json({ message: "publish Success" })
  })
}

module.exports = employeePack;