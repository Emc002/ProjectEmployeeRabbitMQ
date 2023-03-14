const express = require('express');
const router = express.Router();

const employeePack = require('../Controllers/Employee')

router.get('/All', employeePack.getAllEmployee)
router.get('/One/:id', employeePack.getOneEmployee)
router.post('/create',employeePack.createEmployee)
router.put('/update/:id',employeePack.updateEmployee)
router.delete('/delete/:id', employeePack.deleteEmployee)

module.exports = router;