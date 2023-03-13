const { Schema, model } = require('mongoose')

const Document = new Schema({
    _id: Object,

    user: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },

    title: {
        type: String,
    },

    data: Object
})

module.exports = model("Document", Document)