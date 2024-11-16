const express = require("express");
const router = express.Router()
const DoctorController = require('../controllers/DoctorController');


router.post('/', DoctorController.createDoctor)
router.put('/:id', DoctorController.updateDoctor)
router.get('/', DoctorController.getAllDoctor)
router.get('/:id', DoctorController.getDetailsDoctor)

module.exports = router