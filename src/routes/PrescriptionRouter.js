const express = require("express");
const router = express.Router()
const PrescriptionController = require('../controllers/PrescriptionController');


router.post('/', PrescriptionController.createPrescription)
router.put('/:id', PrescriptionController.updatePrescription)
router.get('/', PrescriptionController.getAllPrescription)
router.get('/:id', PrescriptionController.getDetailsPrescription)

module.exports = router