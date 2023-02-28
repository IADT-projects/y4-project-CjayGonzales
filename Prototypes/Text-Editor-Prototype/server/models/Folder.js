const { Schema, model } = require('mongoose');

const Folder = Schema({
    _id: String,

    title: {
        type: String,
        required: [true, "Name of Folder is required"]
    },

    documents: {
        type: [Schema.Types.ObjectId],
        ref: "Document"
    }
});

module.exports = model("Folder", Folder)