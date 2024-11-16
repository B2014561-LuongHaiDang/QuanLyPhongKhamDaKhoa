const Medicine = require('../models/Medicine');

// Service để tạo thuốc mới
const createMedicine = async (newMedicine) => {
    const { name, quantity, ingredient, expiry, status, uses, avatar } = newMedicine;
    try {
        // Kiểm tra xem thuốc đã tồn tại chưa
        const checkMedicine = await Medicine.findOne({ name });
        if (checkMedicine) {
            return {
                status: 'ERR',
                message: 'Thuốc đã tồn tại',
            };
        }

        // Tạo thuốc mới nếu chưa tồn tại
        const createdMedicine = await Medicine.create({
            name,
            quantity,
            ingredient,
            expiry,
            status,
            uses,
            avatar
        });

        if (createdMedicine) {
            return {
                status: 'OK',
                message: 'Thành công',
                data: createdMedicine,
            };
        }
    } catch (e) {
        // Trả về lỗi nếu có
        throw e;
    }
};


// Service để lấy tất cả các thuốc
const getAllMedicines = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allMedicine = await Medicine.find()
            resolve({
                status: 'OK',
                message: 'Get all Medicine success',
                data: allMedicine
            })

        } catch (e) {
            reject(e)
        }
    })
};

// // Service để lấy thuốc theo ID
// const getMedicineById = async (id) => {
//     try {
//         const medicine = await Medicine.findById(id);
//         if (!medicine) throw new Error('Không tìm thấy thuốc!');
//         return medicine;
//     } catch (error) {
//         throw new Error(`Lỗi khi lấy thuốc: ${error.message}`);
//     }
// };

const updateMedicine = async (id, updatedData) => {
    try {
        // Cập nhật thông tin thuốc theo id
        const updatedMedicine = await Medicine.findByIdAndUpdate(id, updatedData, { new: true });
        return updatedMedicine;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật thuốc: ' + error.message);
    }
};

// Service để xóa thuốc theo ID
const deleteMedicine = async (id) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(id);
        if (!medicine) throw new Error('Không tìm thấy thuốc để xóa!');
        return { message: 'Xóa thuốc thành công!' };
    } catch (error) {
        throw new Error(`Lỗi khi xóa thuốc: ${error.message}`);
    }
};

module.exports = {
    createMedicine,
    getAllMedicines,
    // getMedicineById,
    updateMedicine,
    deleteMedicine
};
