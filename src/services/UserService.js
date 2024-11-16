
const User = require("../models/UserModel.js")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService.js")
const Doctor = require("../models/Doctor.js")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = newUser
        try {
            const checkUser = await User.findOne({
                email
            })
            if (checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
                return
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                email,
                password: hash,
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email
            })
            if (!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The email is not exist'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Incorrect email or password!',
                })
            }
            const doctors = await Doctor.findOne({ userId: checkUser.id });
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin,
                isDoctor: checkUser.isDoctor
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin,
                isDoctor: checkUser.isDoctor
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                user: checkUser,
                doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = async (user, data) => {
    try {
        const checkUser = await User.findOne({
            email: user.email
        })
        if (!checkUser) {
            resolve({
                status: 'OK',
                message: 'The user is not exist'
            })
        }
        const updateUser = await User.findOneAndUpdate({ email: user.email }, { ...data }, { new: true })

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: updateUser
        }
    } catch (e) {
        return null
    }
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}


const getAllUser = async () => {
    try {
        // Fetch all users who are not admin
        const allUser = await User.find({ isAdmin: false });

        // Check if there are any users
        if (allUser.length > 0) {
            // Find all doctors and populate the user information (related via userId)
            const doctors = await Doctor.find().populate('userId'); // Sử dụng populate để lấy dữ liệu từ User

            // Combine users with corresponding doctor info
            const result = allUser.map(user => {
                const doctor = doctors.find(doc => doc.userId && doc.userId._id.toString() === user._id.toString());
                return {
                    ...user.toObject(),
                    doctor: doctor || null, // Gán thông tin bác sĩ (nếu có)
                };
            });

            return {
                status: 'OK',
                message: 'Success',
                data: result,
            };
        } else {
            return {
                status: 'OK',
                message: 'No users found',
                data: [],
            };
        }
    } catch (e) {
        throw e; // Handle error further up the call stack
    }
};


const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}