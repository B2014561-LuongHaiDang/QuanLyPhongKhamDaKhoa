const User = require("../models/UserModel.js")
const Schedule = require("../models/Schedule.js")
const Doctor = require("../models/Doctor.js")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');

const createSchedule = (newSchedule) => {
    return new Promise(async (resolve, reject) => {
        const { userId, doctorId, status, diagnosis, evaluate, name, birthday, phone, address, date, time } = newSchedule
        if (!userId && !phone) {
            resolve({
                status: 'Error',
                message: 'ERROR',
            })
        }
        try {
            const createdSchedule = await Schedule.create({
                date,
                time,
                userId,
                doctorId,
                status,
                diagnosis,
                evaluate,
                name,
                birthday,
                phone,
                address
            })
            if (createdSchedule) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateSchedule = async (id, updatedData) => {
    try {
        // Cập nhật thông tin chuyên khoa theo id
        const updatedSchedule = await Schedule.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSchedule) throw new Error('Không tìm thấy chuyên khoa để cập nhật');
        return updatedSchedule;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật chuyên khoa: ' + error.message);
    }
};



const getAllSchedule = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSchedule = await Schedule.find().populate('userId').populate('doctorId')
            resolve({
                status: 'OK',
                message: 'Get all Schedule success',
                data: allSchedule
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsSchedule = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const schedule = await Schedule.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'Success',
                data: schedule
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}

const getByUserId = async (userId) => {
    try {
        // Fetch schedule for the user
        const schedule = await Schedule.find({ userId });

        // If there's a schedule, fetch associated doctor information
        if (schedule.length > 0) {
            const doctorIds = schedule.map(item => item.doctorId); // Assuming schedule has doctorId
            const doctors = await Doctor.find({ _id: { $in: doctorIds } });
            const userIds = schedule.map(item => item.userId); // Assuming schedule has doctorId
            const users = await User.find({ _id: { $in: userIds } });

            // Combine schedules with doctor information
            const result = schedule.map(item => {
                const doctor = doctors.find(doc => doc._id.toString() === item.doctorId.toString());
                const user = users.find(doc => doc._id.toString() === item.userId.toString());
                return {
                    ...item.toObject(),
                    doctor: doctor ? doctor : null,
                    user: user ? user : null, // Add doctor info to each schedule item
                };
            });

            return {
                status: 'OK',
                message: 'Success',
                data: result,
            };
        } else {
            return {
                status: 'OK',
                message: 'No schedule found',
                data: [],
            };
        }
    } catch (e) {
        throw e; // You can handle the error further up the call stack
    }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getByDoctorId = async (doctorId) => {
    try {
        if (!isValidObjectId(doctorId)) {
            return {
                status: 'ERROR',
                message: 'Invalid doctor ID',
                data: null,
            };
        }

        // Fetch schedule for the doctor
        const schedule = await Schedule.find({ doctorId: new mongoose.Types.ObjectId(doctorId) });

        if (schedule.length > 0) {
            const doctorIds = schedule.map(item => item.doctorId);
            const userIds = schedule.map(item => item.userId);

            // Ensure all userIds are valid before querying
            const validUserIds = userIds.filter(id => isValidObjectId(id));
            const doctors = await Doctor.find({ _id: { $in: doctorIds } });
            const users = await User.find({ _id: { $in: validUserIds } });

            // Map and combine the results
            const result = schedule.map(item => {
                const doctor = doctors.find(doc => doc._id.toString() === item.doctorId.toString());
                const user = users.find(usr => usr._id.toString() === item.userId.toString());
                return {
                    ...item.toObject(),
                    doctor: doctor || null,
                    user: user || null,
                };
            });

            return {
                status: 'OK',
                message: 'Success',
                data: result,
            };
        } else {
            return {
                status: 'OK',
                message: 'No schedule found',
                data: [],
            };
        }
    } catch (e) {
        return {
            status: 'ERROR',
            message: e.message,
            data: null,
        };
    }
};




module.exports = {
    getByDoctorId,
    getByUserId,
    createSchedule,
    updateSchedule,
    getAllSchedule,
    getDetailsSchedule
}