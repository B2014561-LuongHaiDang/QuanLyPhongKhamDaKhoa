const mongoose = require('mongoose');

// Định nghĩa Schema thuốc
const medicineSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        name: {
            type: String,
            required: true,
            default: ''
        },
        ingredient: {
            type: String,
            required: true,
            default: ''
        },
        expiry: {
            type: Date,  // Đảm bảo là kiểu Date thay vì String
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Còn hàng', 'Hết hàng'],  // Thêm trạng thái 'Sắp hết hàng'
            default: 'Còn hàng'
        },
        uses: {
            type: String,
            required: true,
            default: ''
        },
        avatar: {
            type: [String],  // Sử dụng kiểu [String] nếu muốn nhiều ảnh
            default: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqK_LrQOEMVc94ABs-dWtLqLQS52lN5k8p1g&s'
            ]
        },
    },
    {
        timestamps: true  // Tự động tạo thời gian createdAt và updatedAt
    }
);

// Tạo model Medicine từ schema
const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
