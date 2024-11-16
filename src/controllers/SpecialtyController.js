const SpecialtyService = require('../services/SpecialtyService');  // Sửa tên Service cho đúng
const JwtService = require('../services/JwtService');  // Dịch vụ JWT vẫn giữ nguyên

// Controller để tạo chuyên khoa mới
const createSpecialty = async (req, res) => {
    try {
        const { name, description, head_doctor_Id, status } = req.body;


        // Kiểm tra các trường bắt buộc có trong request
        if (!name || !description || !head_doctor_Id || !status) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input fields (name, description, head_doctor_Id, status) are required'
            });
        }

        // Gọi service để tạo chuyên khoa
        const response = await SpecialtyService.createSpecialty(req.body);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal Server Error'
        });
    }
};

// Controller để lấy tất cả các chuyên khoa
const getAllSpecialties = async (req, res) => {
    try {
        const response = await SpecialtyService.getAllSpecialties();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal Server Error'
        });
    }
};

// Controller để lấy chuyên khoa theo ID
const getSpecialtyById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await SpecialtyService.getSpecialtyById(id);
        if (!response) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Chuyên khoa không tồn tại'
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

// Controller để cập nhật thông tin chuyên khoa
const updateSpecialty = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    try {
        // Gọi service để cập nhật chuyên khoa
        const updatedSpecialty = await SpecialtyService.updateSpecialty(id, {
            name, description, status,
        });

        if (!updatedSpecialty) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Chuyên khoa không tồn tại'
            });
        }

        res.status(200).json(updatedSpecialty);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi server khi cập nhật chuyên khoa',
            error: error.message || 'Internal Server Error'
        });
    }
};

// Controller để xóa chuyên khoa theo ID
const deleteSpecialty = async (req, res) => {
    const { id } = req.params;

    try {
        // Gọi service để xóa chuyên khoa
        const result = await SpecialtyService.deleteSpecialty(id);
        return res.status(200).json(result);  // Trả về kết quả xóa thành công
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi khi xóa chuyên khoa',
            error: error.message || 'Internal Server Error'
        });
    }
};

// Controller để refresh token
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Refresh token is required'
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal Server Error'
        });
    }
};

module.exports = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialty,
    refreshToken
};
