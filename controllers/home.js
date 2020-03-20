const db = require('../config/mongoose');
const ToDoItem = require('../models/toDoItem');
var toDoList = [];
var id = 0;

module.exports.home = function (req, res) {
    // return res.end('<h1>Home Controller</h1>');
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
    // console.log('req.body', req.body);
    // req.body['id'] = id;
    // id += 1;
    // toDoList.push(req.body);
    // console.log('toDo List', toDoList);

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

module.exports.deleteItem = function (req, res) {
    console.log('req.body for deletion', req.body);
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