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
        // console.log('toDo List', toDoList);
        return res.render('home', {
            title: 'ToDo App',
            to_do_list: toDoList
        });
    })
}



module.exports.createItem = async function (req, res) {
    //adding item in db

    try{
        console.log('create item in home controller called');
        console.log(req.body);
        let createItem = await ToDoItem.create({description: req.body.description,
                                                category: req.body.category,
                                                date: req.body.date});
        
        if(req.xhr){
            console.log(`req.xhr in create item: ${req.xhr}`);
            return res.status(200).json({
                data: {
                    items: createItem
                },
                message: 'Added one item successfully'
            })
        }
        console.log('db entry created: ', createItem);
        return res.redirect('back');
    }
    catch(err){
        console.log(`${err}`);
    }
}

//Delete item from database
module.exports.deleteItem = async function (req, res) {
    console.log('req.body for deletion', req.body);
    console.log(req.query);
    //getting the ids(_id from database) of all the checkboxes selected, locating them in the database and removing them

    try{
        let deleteData = req.query;
        delete deleteData['sort-items'];
        delete deleteData['filter-items'];
        let delItems = [];
        for (let key of Object.keys(deleteData)) {
            console.log('key for deletion', key);
            let deletedItem = await ToDoItem.findByIdAndDelete(key);
            delItems.push(deletedItem);
        }

        if(req.xhr){
            console.log(`deleteData: ${req.xhr}`);
            return res.status(200).json({
                data: {
                    deletedItems: delItems
                },
                message: 'Items Deleted Successfully'
            });
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }

    
}

module.exports.sortItem = async function(req, res){
    console.log(req.query);
    let sortParameter = req.query;
    let getAndSortItems = {};

    try{
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
    catch(err){
        console.log(`error: ${err}`);
    }
}


module.exports.filterItem = async function(req, res){
    console.log(req.query);
    let filterParameter = req.query;
    let getFilteredItems = {};
    let filter = req.query.fby;

    try{
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
    catch(err){
        console.log(`${err}`);
    }
}