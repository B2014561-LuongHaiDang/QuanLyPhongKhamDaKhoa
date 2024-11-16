const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema(
    {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: Boolean, default: false },
        birthday: { type: String },
        diagnosis: { type: String },
        evaluate: { type: String },
        name: { type: String },
        address: { type: String },
        phone: { type: String },
        date: { type: String },
        time: { type: String },
    },
    {
        timestamps: true
    }
);
const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;