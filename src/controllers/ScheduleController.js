const ScheduleService = require('../services/ScheduleService')
const createSchedule = async (req, res) => {
    try {
        const response = await ScheduleService.createSchedule(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { status, diagnosis, evaluate } = req.body;

    try {
        // Gọi service để cập nhật chuyên khoa
        const updatedSchedule = await ScheduleService.updateSchedule(id, {
            status, diagnosis, evaluate
        });

        if (!updatedSchedule) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Cập nhật thất bại'
            });
        } else if (updatedSchedule) {
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Cập nhật thành công'
            });
        }

        res.status(200).json(updatedSchedule);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi server khi cập nhật chuyên khoa',
            error: error.message || 'Internal Server Error'
        });
    }
};

const getAllSchedule = async (req, res) => {
    try {
        const response = await ScheduleService.getAllSchedule()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id

        if (!scheduleId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The scheduleId is required'
            })
        }
        const response = await ScheduleService.getDetailsSchedule(scheduleId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getByUserId = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await ScheduleService.getByUserId(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getByDoctorId = async (req, res) => {
    try {
        const doctorId = req.params.id

        if (!doctorId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The doctorId is required'
            })
        }
        const response = await ScheduleService.getByDoctorId(doctorId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getByDoctorId,
    getByUserId,
    createSchedule,
    updateSchedule,
    getAllSchedule,
    getDetailsSchedule
}