const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        name: { type: String, require: true, default: '' },
        phone: { type: String, require: true, default: '' },
        birthday: { type: String, require: false, default: '' },
        address: { type: String, require: false, default: '' },
        isAdmin: { type: Boolean, default: false },
        isDoctor: { type: Boolean, default: false },
        avatar: { type: String, default: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg' },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;