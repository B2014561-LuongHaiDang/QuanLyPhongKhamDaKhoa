const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
    {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Tham chiếu đến bác sĩ
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },     // Tham chiếu đến bệnh nhân (User) // Mảng chứa các thuốc trong toa (tham chiếu đến model Medicine)
        status: { type: Boolean, default: false },
        medicineDetails: [
            {
                medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
                quantity: { type: Number, required: true, min: 1 }, // Số lượng thuốc này trong toa
            }
        ] // Trạng thái của toa thuốc (chưa sử dụng hay đã sử dụng)

    },
    {
        timestamps: true, // Thêm thời gian tạo và cập nhật
    }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
