const { Schema, model } = require('mongoose')

const Document = new Schema({
    _id: String,

    title: {
        type: String,
    },

    data: Object
})

module.exports = model("Document", Document)