const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // Ngày
    slots: { type: [String], required: true }, // Mảng giờ
});

const DoctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        title: { type: String, required: true },
        experience: { type: Number, required: true },
        age_limit: { type: Number, required: true },
        specialist: { type: String, required: true },
        position: { type: String, required: true },
        hospital: { type: String, required: true },
        avatar: { type: String, required: true },
        availability: { type: [TimeSlotSchema], required: true }, // Thêm trường availability
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;