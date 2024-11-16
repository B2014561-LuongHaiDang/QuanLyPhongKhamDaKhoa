const express = require('express');
const router = express.Router();
const SpecialtyController = require('../controllers/SpecialtyController');  // Đổi thành SpecialtyController

// Lấy tất cả chuyên khoa
router.get('/', SpecialtyController.getAllSpecialties);

// Lấy chuyên khoa theo ID
router.get('/:id', SpecialtyController.getSpecialtyById);  // Cái này đã được kích hoạt từ trước

// Tạo một chuyên khoa mới
router.post('/', SpecialtyController.createSpecialty);

// Cập nhật thông tin chuyên khoa
router.put('/:id', SpecialtyController.updateSpecialty);

// Xóa một chuyên khoa theo ID
router.delete('/:id', SpecialtyController.deleteSpecialty);  // Bạn có thể bỏ comment và sử dụng nếu cần xóa

module.exports = router;
