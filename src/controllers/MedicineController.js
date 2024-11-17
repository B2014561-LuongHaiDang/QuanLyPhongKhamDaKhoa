const MedicineService = require('../services/MedicineService');
const JwtService = require('../services/JwtService')
const createMedicine = async (req, res) => {
    try {
        const { name, quantity, ingredient, expiry, uses } = req.body

        if (!name || !quantity || !ingredient || !expiry || !uses) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await MedicineService.createMedicine(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllMedicines = async (req, res) => {
    try {
        const response = await MedicineService.getAllMedicines()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {

    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, ingredient, expiry, uses, avatar } = req.body;

    try {
        // Gọi service để cập nhật thuốc
        const updatedMedicine = await MedicineService.updateMedicine(id, { name, quantity, ingredient, expiry, uses, avatar });

        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Thuốc không tồn tại' });
        }

        res.status(200).json(updatedMedicine);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

const deleteMedicine = async (req, res) => {
    try {
        const medicineId = req.params.id
        const response = await MedicineService.deleteMedicine(medicineId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getMedicineById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await MedicineService.getMedicineById(id);
        if (!response) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Thuốc không tồn tại'
            });
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal Server Error'
        });
    }
};

module.exports = {
    createMedicine,
    getAllMedicines,
    refreshToken,
    updateMedicine,
    deleteMedicine,
    getMedicineById,
}