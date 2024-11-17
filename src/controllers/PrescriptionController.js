const PrescriptionService = require('../services/PrescriptionService');

// Tạo toa thuốc mới
const createPrescription = async (req, res) => {
    try {
        const response = await PrescriptionService.createPrescription(req.body);
        return res.status(201).json(response);  // 201 OK khi tạo thành công
    } catch (e) {
        console.error(e); // Ghi log lỗi vào server (nếu cần)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error',  // Cung cấp thêm chi tiết lỗi
        });
    }
};

// Cập nhật toa thuốc
const updatePrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const data = req.body;

        if (!prescriptionId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The prescriptionId is required',
            });
        }

        const response = await PrescriptionService.updatePrescription(prescriptionId, data);
        return res.status(200).json(response);  // Trả về 200 OK khi cập nhật thành công
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error',  // Cung cấp chi tiết lỗi hơn
        });
    }
};

// Lấy tất cả các toa thuốc
const getAllPrescription = async (req, res) => {
    try {
        const response = await PrescriptionService.getAllPrescriptions();  // Sửa tên hàm từ `getAllPrescription` thành `getAllPrescriptions`
        return res.status(200).json(response);  // 200 OK khi lấy thành công
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error',
        });
    }
};

// Lấy chi tiết toa thuốc theo ID
const getDetailsPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id;

        if (!prescriptionId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The prescriptionId is required',
            });
        }

        const response = await PrescriptionService.getDetailsPrescription(prescriptionId);
        if (!response.data) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Prescription not found',
            });
        }
        return res.status(200).json(response);  // 200 OK khi lấy chi tiết thành công
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error',
        });
    }
};

const getPrescriptionsByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;

        if (!doctorId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The doctorId is required',
            });
        }

        const prescriptions = await Prescription.find({ doctorId }).populate('userId').populate('medicineDetails.medicineId');
        return res.status(200).json({
            status: 'OK',
            data: prescriptions,
        });
    } catch (error) {
        console.error("Error getting prescriptions:", error);
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'Internal server error',
        });
    }
};


module.exports = {
    createPrescription,
    updatePrescription,
    getAllPrescription,
    getDetailsPrescription,
    getPrescriptionsByDoctorId,
};
