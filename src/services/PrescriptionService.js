const Prescription = require("../models/Prescription");
const Medicine = require("../models/Medicine");

const createPrescription = async (newPrescription) => {
    const { doctorId, userId, medicineDetails } = newPrescription;
    try {
        // Kiểm tra xem đã có toa thuốc trùng lặp nào chưa
        // const existingPrescription = await Prescription.findOne({
        //     doctorId,
        //     userId,
        //     'medicineDetails.medicineId': { $in: medicineDetails.map(item => item.medicineId) } // Kiểm tra toa thuốc đã có thuốc này chưa
        // });

        // if (existingPrescription) {
        //     return {
        //         status: 'ERR',
        //         message: 'Prescription already exists'
        //     };
        // }

        // Tạo mới toa thuốc
        const createdPrescription = await Prescription.create({
            doctorId,
            userId,
            medicineDetails
        });

        // Cập nhật số lượng thuốc trong kho (nếu cần thiết)
        // for (const detail of medicineDetails) {
        //     const medicine = await Medicine.findById(detail.medicineId);
        //     if (medicine && medicine.stock >= detail.quantity) {
        //         medicine.stock -= detail.quantity; // Giảm số lượng thuốc trong kho
        //         await medicine.save();
        //     } else {
        //         // Nếu thuốc không đủ trong kho, hủy tạo toa thuốc
        //         await Prescription.findByIdAndDelete(createdPrescription._id); // Xóa toa thuốc đã tạo
        //         return {
        //             status: 'ERR',
        //             message: `Not enough stock for ${medicine.name}`
        //         };
        //     }
        // }

        return {
            status: 'OK',
            message: 'Prescription created successfully',
            data: createdPrescription
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Error creating prescription',
            error: error.message
        };
    }
};

const updatePrescription = async (id, data) => {
    try {
        const existingPrescription = await Prescription.findById(id);
        if (!existingPrescription) {
            return {
                status: 'ERR',
                message: 'Prescription not found',
            };
        }

        // Cập nhật toa thuốc
        const updatedPrescription = await Prescription.findByIdAndUpdate(id, data, { new: true });

        return {
            status: 'OK',
            message: 'Prescription updated successfully',
            data: updatedPrescription,
        };
    } catch (error) {
        console.error("Error updating prescription:", error);
        return {
            status: 'ERR',
            message: 'Error updating prescription',
            error: error.message,
        };
    }
};

const getAllPrescriptions = async () => {
    try {
        const allPrescriptions = await Prescription.find()
            .populate('doctorId', 'name') // Lấy thông tin bác sĩ
            .populate('userId', 'name') // Lấy thông tin bệnh nhân
            .populate('medicineDetails.medicineId', 'name'); // Lấy thông tin thuốc trong chi tiết

        return {
            status: 'OK',
            message: 'Fetched all prescriptions successfully',
            data: allPrescriptions
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Error fetching prescriptions',
            error: error.message
        };
    }
};

const getDetailsPrescription = async (id) => {
    try {
        const prescription = await Prescription.findById(id)
            .populate('doctorId', 'name')
            .populate('userId', 'name')
            .populate('medicineDetails.medicineId', 'name');

        if (!prescription) {
            return {
                status: 'ERR',
                message: 'Prescription not found'
            };
        }

        return {
            status: 'OK',
            message: 'Fetched prescription details successfully',
            data: prescription
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Error fetching prescription details',
            error: error.message
        };
    }
};
const getPrescriptionsByDoctorId = async (doctorId) => {
    try {
        const prescriptions = await Prescription.find({ doctorId })
            .populate('userId') // Nếu muốn lấy thông tin chi tiết user
            .populate('medicineDetails.medicineId'); // Lấy thông tin chi tiết thuốc
        return {
            status: 'OK',
            data: prescriptions,
        };
    } catch (error) {
        console.error("Error fetching prescriptions by doctorId:", error);
        return {
            status: 'ERR',
            message: error.message || 'Internal server error',
        };
    }
};

module.exports = {
    createPrescription,
    updatePrescription,
    getAllPrescriptions,
    getDetailsPrescription,
    getPrescriptionsByDoctorId
};
