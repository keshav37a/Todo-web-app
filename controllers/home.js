//importing the db instance and the model instance
const db = require('../config/mongoose');
const ToDoItem = require('../models/toDoItem');

//exporting the home controller so that it is accessible in the routes file
module.exports.home = function (req, res) {
    
    //fetching all items from database
    ToDoItem.find({}, function (err, toDoList) {
        if(err) {
            console.log(`Error Fetching Data From DB`);
            return;
        }
        console.log('toDo List', toDoList);
        return res.render('home', {
            title: 'ToDo App',
            to_do_list: toDoList
        });
    })
}


module.exports.createItem = function (req, res) {
    //adding item in db
    ToDoItem.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newToDoItem) {
        if (err) {
            console.log(`error while add todo item to db: ${err}`);
            return;
        }
        console.log('db entry created: ', newToDoItem);
        return res.redirect('back');
    });
}

//Delete item from database
module.exports.deleteItem = function (req, res) {
    console.log('req.body for deletion', req.body);

    //getting the ids(_id from database) of all the checkboxes selected, locating them in the database and removing them
    let deleteData = req.body;
    for (let key of Object.keys(deleteData)) {
        console.log('key for deletion', key);
        ToDoItem.findByIdAndDelete(key, function (err) { 
            if(err){
                console.log('Error in Deleting from db');
                return;
            }
            console.log("Item Deleted");
         })
    }
    return res.redirect('back');
}