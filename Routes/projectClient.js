const express = require('express')
const router = express.Router();

const ProjectClientPack = require('../Controllers/ProjectClient')

router.post('/create', ProjectClientPack.createProject);

module.exports = router