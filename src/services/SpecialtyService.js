const Specialty = require('../models/Specialty');  // Import model Specialty

// Service để tạo chuyên khoa mới
const createSpecialty = async (newSpecialty) => {
    const { name, description, status, avatar } = newSpecialty;
    try {
        // Kiểm tra xem chuyên khoa đã tồn tại chưa (dựa vào tên chuyên khoa)
        const checkSpecialty = await Specialty.findOne({ name });
        if (checkSpecialty) {
            return {
                status: 'ERR',
                message: 'Chuyên khoa đã tồn tại',
            };
        }

        // Tạo chuyên khoa mới nếu chưa tồn tại
        const createdSpecialty = await Specialty.create({
            name,
            description,
            status,
            avatar,
        });

        if (createdSpecialty) {
            return {
                status: 'OK',
                message: 'Tạo chuyên khoa thành công',
                data: createdSpecialty,
            };
        }
    } catch (e) {
        // Trả về lỗi nếu có
        throw new Error(`Lỗi khi tạo chuyên khoa: ${e.message}`);
    }
};

// Service để lấy tất cả các chuyên khoa
const getAllSpecialties = async () => {
    try {
        // Lấy tất cả các chuyên khoa và populate bác sĩ trưởng khoa (head_doctor_Id)
        return await Specialty.find()
    } catch (error) {
        throw new Error(`Lỗi khi lấy danh sách chuyên khoa: ${error.message}`);
    }
};

// Service để lấy chuyên khoa theo ID
const getSpecialtyById = async (id) => {
    try {
        const specialty = await Specialty.findById(id)
        if (!specialty) throw new Error('Không tìm thấy chuyên khoa!');
        return specialty;
    } catch (error) {
        throw new Error(`Lỗi khi lấy chuyên khoa: ${error.message}`);
    }
};

// Service để cập nhật thông tin chuyên khoa
const updateSpecialty = async (id, updatedData) => {
    try {
        // Cập nhật thông tin chuyên khoa theo id
        const updatedSpecialty = await Specialty.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSpecialty) throw new Error('Không tìm thấy chuyên khoa để cập nhật');
        return updatedSpecialty;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật chuyên khoa: ' + error.message);
    }
};

// Service để xóa chuyên khoa theo ID
const deleteSpecialty = async (id) => {
    try {
        const deletedSpecialty = await Specialty.findByIdAndDelete(id);
        if (!deletedSpecialty) throw new Error('Không tìm thấy chuyên khoa để xóa!');
        return { message: 'Xóa chuyên khoa thành công!' };
    } catch (error) {
        throw new Error(`Lỗi khi xóa chuyên khoa: ${error.message}`);
    }
};

module.exports = {
    createSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialty
};
