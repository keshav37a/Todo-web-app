//creating model and schema for our database
const mongoose = require('mongoose');
const toDoScheme = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },

    date:{
        type: Date,
        require: true
    }
});

//Creating and exporting out schema
const ToDoItem = mongoose.model('ToDoItem', toDoScheme);
module.exports = ToDoItem;