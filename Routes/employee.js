const express = require('express');
const router = express.Router();

const employeePack = require('../Controllers/Employee')

router.get('/getAll', employeePack.getAllEmployee)
router.get('/getOne/:id', employeePack.getOneEmployee)
router.post('/create',employeePack.createEmployee)
router.put('/update/:id',employeePack.updateEmployee)
router.delete('/delete/:id', employeePack.deleteEmployee)

module.exports = router;