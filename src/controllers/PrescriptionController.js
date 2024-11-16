const PrescriptionService = require('../services/PrescriptionService')
const createPrescription = async (req, res) => {
    try {
        const response = await PrescriptionService.createPrescription(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updatePrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id
        const data = req.body
        if (!prescriptionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The prescriptionId is required'
            })
        }
        const response = await PrescriptionService.updatePrescription(prescriptionId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllPrescription = async (req, res) => {
    try {
        const response = await PrescriptionService.getAllPrescription()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsPrescription = async (req, res) => {
    try {
        const prescriptionId = req.params.id

        if (!prescriptionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The prescriptionId is required'
            })
        }
        const response = await PrescriptionService.getDetailsPrescription(prescriptionId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createPrescription,
    updatePrescription,
    getAllPrescription,
    getDetailsPrescription
}