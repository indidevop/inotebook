const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    user:{
        // id of the user who has created this note will be added
        type: mongoose.Schema.Types.ObjectId,
        ref:'userModel', // reference the user schema
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('notesModel', notesSchema);