const DoctorService = require('../services/DoctorService')
const createDoctor = async (req, res) => {
    try {
        const response = await DoctorService.createDoctor(req.body)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id
        const data = req.body
        if(!doctorId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The doctorId is required'
            })
        }
        const response = await DoctorService.updateDoctor(doctorId, data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const response = await DoctorService.getAllDoctor()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id

        if(!doctorId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The doctorId is required'
            })
        }
        const response = await DoctorService.getDetailsDoctor(doctorId)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createDoctor,
    updateDoctor,
    getAllDoctor,
    getDetailsDoctor
}