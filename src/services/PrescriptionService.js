const Prescription = require("../models/Prescription.js");

const createPrescription = (newPrescription) => {
    return new Promise(async (resolve, reject) => {
        const { doctorId, userId, medicineIds, instructions } = newPrescription;
        try {
            // Kiểm tra xem đã có toa thuốc trùng lặp nào chưa (tùy vào tiêu chí kiểm tra)
            const existingPrescription = await Prescription.findOne({
                doctorId,
                userId,
                instructions
            });

            if (existingPrescription) {
                return resolve({
                    status: 'ERR',
                    message: 'Prescription already exists'
                });
            }

            // Tạo mới toa thuốc
            const createdPrescription = await Prescription.create({
                doctorId,
                userId,
                medicineIds,
                instructions
            });

            if (createdPrescription) {
                resolve({
                    status: 'OK',
                    message: 'Prescription created successfully',
                    data: createdPrescription
                });
            }
        } catch (error) {
            reject({
                status: 'ERR',
                message: 'Error creating prescription',
                error: error.message
            });
        }
    });
};

const updatePrescription = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm và kiểm tra xem toa thuốc có tồn tại không
            const existingPrescription = await Prescription.findById(id);
            if (!existingPrescription) {
                return resolve({
                    status: 'ERR',
                    message: 'Prescription not found'
                });
            }

            // Cập nhật toa thuốc
            const updatedPrescription = await Prescription.findByIdAndUpdate(
                id,
                { ...data },
                { new: true }
            );

            resolve({
                status: 'OK',
                message: 'Prescription updated successfully',
                data: updatedPrescription
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: 'Error updating prescription',
                error: error.message
            });
        }
    });
};

const getAllPrescriptions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allPrescriptions = await Prescription.find()
                .populate('doctorId', 'name') // Lấy thêm thông tin bác sĩ
                .populate('userId', 'name') // Lấy thêm thông tin bệnh nhân
                .populate('medicineIds', 'name'); // Lấy thêm thông tin thuốc

            resolve({
                status: 'OK',
                message: 'Fetched all prescriptions successfully',
                data: allPrescriptions
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: 'Error fetching prescriptions',
                error: error.message
            });
        }
    });
};

const getDetailsPrescription = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const prescription = await Prescription.findById(id)
                .populate('doctorId', 'name')
                .populate('userId', 'name')
                .populate('medicineIds', 'name');

            if (!prescription) {
                return resolve({
                    status: 'ERR',
                    message: 'Prescription not found'
                });
            }

            resolve({
                status: 'OK',
                message: 'Fetched prescription details successfully',
                data: prescription
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: 'Error fetching prescription details',
                error: error.message
            });
        }
    });
};

module.exports = {
    createPrescription,
    updatePrescription,
    getAllPrescriptions,
    getDetailsPrescription
};
