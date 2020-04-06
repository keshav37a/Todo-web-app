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

module.exports.sortItem = async function(req, res){
    console.log(req.query);
    let sortParameter = req.query;
    let getAndSortItems = {};
    if(sortParameter.sby=='due-date'){
        getAndSortItems = await ToDoItem.find({}).sort({date: -1});
    }
    else if(sortParameter.sby=='created-at'){
        getAndSortItems = await ToDoItem.find({}).sort({createdAt: -1});
    }
    else if(sortParameter.sby=='updated-at'){
        getAndSortItems = await ToDoItem.find({}).sort({updatedAt: -1});
    }
    else{
        getAndSortItems = await ToDoItem.find({});
    }
    console.log(getAndSortItems);
    console.log('Home Controller called for sortItem');
    if(req.xhr){
        console.log(`req.xhr: ${req.xhr}`);
        return res.status(200).json({
            data: {
                items: getAndSortItems
            },
            message: 'Found and Sorted Successfully'
        });
    }
    console.log('after xhr check', getAndSortItems);
    return res.render('home', {
        title: 'ToDo App',
        to_do_list: getAndSortItems
    });
}


module.exports.filterItem = async function(req, res){
    console.log(req.query);
    let filterParameter = req.query;
    let getFilteredItems = {};
    let filter = req.query.fby;

    if(filter.length>0)
        getFilteredItems = await ToDoItem.find({'category': filter});

    else
        getFilteredItems = await ToDoItem.find({});

    
    console.log(getFilteredItems);
    console.log('Home Controller called for sortItem');
    if(req.xhr){
        console.log(`req.xhr: ${req.xhr}`);
        return res.status(200).json({
            data: {
                items: getFilteredItems
            },
            message: 'Found and Filtered Successfully'
        });
    }
    console.log('after xhr check', getAndSortItems);
    return res.render('home', {
        title: 'ToDo App',
        to_do_list: getFilteredItems
    });
}