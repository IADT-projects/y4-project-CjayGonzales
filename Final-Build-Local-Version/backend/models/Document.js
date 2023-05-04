const { Schema, model } = require('mongoose')

const Document = new Schema({

    title: {
        type: String,
    },

    imgPath: {
        type: String
    },

    data: Object
});

module.exports = model("Document", Document)