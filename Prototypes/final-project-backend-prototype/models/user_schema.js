const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    // will need to look up mongoose documentation for this part
    {
        //Snake case for database properties
        name: {
            type: String,
            required: [true, 'Name is Required'],
        },
        email: {
            type: String,
            required: [true, 'Email Field is Required'],
            unique: true, // ensure that the email is unique. It's a mongoose schema (mongoose model)
            lowercase: true,
            trim: true      //removes spaces in beginning and end of input
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

// all of our models will be singular and capitilized what gets exported is a mongoose model and we use the festival schema
module.exports = model('User', userSchema);