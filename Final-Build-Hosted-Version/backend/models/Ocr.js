const { Schema, model } = require('mongoose')

const Ocr = new Schema({

    result: {
        type: String,
    },

    data: Object
})

module.exports = model("Ocr", Ocr)