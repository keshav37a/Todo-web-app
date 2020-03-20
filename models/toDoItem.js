const mongoose = require('mongoose');
const toDoScheme = new mongoose.Schema({
    description: {
        type: String
    },

    category: {
        type: String
    },

    date:{
        type: Date
    }
});

const ToDoItem = mongoose.model('ToDoItem', toDoScheme);
module.exports = ToDoItem;