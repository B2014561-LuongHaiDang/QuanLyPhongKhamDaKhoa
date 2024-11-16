const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const authMiddelware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        } // bar
    });
}

const authUserMiddelware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }

        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        } // bar
    });
}


const checkAuth = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]
    if (!token) {
        return res.status(403).json({
            message: 'Vui long dang nhap de tiep tuc',
            status: 'ERR'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }
        req.user = user
        next()
    });
}

module.exports = {
    authMiddelware,
    authUserMiddelware,
    checkAuth
}