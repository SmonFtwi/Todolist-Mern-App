const mongoose = require("mongoose");
const User = require('./user.model');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timeStamp : {
        type: String,
        default: Date.now()
    },
    dueDate: {
        type:Date,
        required:true

    },
})

const todoModel = mongoose.model("todo" , todoSchema);

module.exports = todoModel;