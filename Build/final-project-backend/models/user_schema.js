const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required'],
        },
        email: {
            type: String,
            required: [true, 'Email Field is Required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password Field is Required'],
        }
    },
    { timestamps: true }
);

// takes the password from the user controller
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password, function (result) {
        return result
    });
}

module.exports = model('User', userSchema);