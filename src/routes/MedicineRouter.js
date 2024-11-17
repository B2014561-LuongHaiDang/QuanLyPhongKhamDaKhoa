const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/MedicineController');

// Get all medicines
router.get('/', MedicineController.getAllMedicines);

// Get medicine by ID
router.get('/:id', MedicineController.getMedicineById);

// Create a new medicine
router.post('/', MedicineController.createMedicine);

// Định nghĩa route cho việc cập nhật thông tin thuốc
router.put('/:id', MedicineController.updateMedicine);

// Delete a medicine by ID
router.delete('/:id', MedicineController.deleteMedicine);

module.exports = router;
