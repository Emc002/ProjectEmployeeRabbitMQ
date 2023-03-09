const ProjectClient = require('../Models/ProjectClient')
const asyncWrapper = require('../Middleware/async')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../Errors')

const ProjectClientPack = {
  createProject: asyncWrapper(async (req,res) => {
    const project = await ProjectClient.create(req.body)
    res.status(StatusCodes.CREATED).json({ message: "Create Success", project })
  })
}

module.exports = ProjectClientPack;
