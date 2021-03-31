const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todoName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    } 
});

module.exports = Todo = mongoose.model("todo", todoSchema);
