import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return emailRegex.test(value);
            },
            message: 'Please enter a valid email address.',
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        minlength: [8, 'Password must be at least 8 characters long.']
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
    },
    country: {
        type: String,
        maxlength: [15, 'Country cannot exceed 15 characters.'],
    },
});


const userModel = mongoose.model('User', userSchema)
export default userModel;
