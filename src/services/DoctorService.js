
const Doctor = require("../models/Doctor.js")
const bcrypt = require("bcrypt")

const createDoctor = (newDoctor) => {
    return new Promise(async (resolve, reject) => {
        const { name, specialist, avatar, maso, time_slots, title, age_limit, experience, position, hospital } = newDoctor
        try {
            const checkDoctor = await Doctor.findOne({
                maso
            })
            if (checkDoctor !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The maso is already'
                })
            }

            const createdDoctor = await Doctor.create({
                name,
                maso,
                specialist,
                avatar,
                time_slots,
                title,
                age_limit,
                experience,
                position,
                hospital
            })

            if (createdDoctor) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdDoctor
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateDoctor = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDoctor = await Doctor.findOne({
                _id: id
            })
            if (checkDoctor === null) {
                resolve({
                    status: 'OK',
                    message: 'The Doctor is not defined'
                })
            }


            const updateDoctor = await Doctor.findByIdAndUpdate(id, {
                ...data,
                availability: data
            }, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateDoctor
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}



const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allDoctor = await Doctor.find()
            resolve({
                status: 'OK',
                message: 'Get all Doctor success',
                data: allDoctor
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctor = await Doctor.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'Success',
                data: doctor
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createDoctor,
    updateDoctor,
    getAllDoctor,
    getDetailsDoctor
}