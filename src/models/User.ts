import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        default: "https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        default: "User"
    }

})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;