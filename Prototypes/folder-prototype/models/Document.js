const { Schema, model } = require('mongoose');

const Document = Schema({
    _id: String,

    title: {
        type: String,
        required: [true, "Name of Document is required"]
    },
});

module.exports = model("Document", Document)