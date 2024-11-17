const mongoose = require('mongoose');

// Định nghĩa Schema cho chuyên khoa (specialty)
const specialtySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,  // Bắt buộc có tên chuyên khoa
            trim: true       // Loại bỏ khoảng trắng thừa
        },
        description: {
            type: String,
            required: true,  // Bắt buộc có mô tả chuyên khoa
            trim: true       // Loại bỏ khoảng trắng thừa
        },

        // Các trang thiết bị chuyên khoa
        status: {
            type: String,
            required: true,  // Trạng thái hoạt động của chuyên khoa
            enum: ['Hoạt động', 'Tạm ngừng', 'Đóng cửa'],
            default: 'Hoạt động'
        },
        avatar: {
            type: String,
            default: ''  // URL hình ảnh đại diện cho chuyên khoa (nếu có)
        },

    },
    {
        timestamps: true  // Tự động thêm các trường createdAt và updatedAt
    }
);

// Tạo model cho Specialty dựa trên Schema đã định nghĩa
const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
