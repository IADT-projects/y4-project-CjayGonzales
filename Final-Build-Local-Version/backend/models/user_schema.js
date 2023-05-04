const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const Document = new Schema({
    title: {
        type: String
    },
    imgPath: {
        type: String
    },
    data: Object
});

const Folder = new Schema({

    folderTitle: {
        type: String
    },
    imgPath: {
        type: String
    },
    documents: [
        Document
    ],

});

const Ocr = new Schema({
    result: {
        type: String
    },
    imgPath: {
        type: String
    },
    data: Object
});

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
        },
        folders: [
            Folder
        ],
        ocrs: [
            Ocr
        ]
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