var toDoList = [];
var id = 0;

module.exports.home = function(req, res){
    // return res.end('<h1>Home Controller</h1>');
    console.log('toDo List', toDoList);
    return res.render('home', {
        title: 'My Title For Home for EJS File',
        to_do_list: toDoList
    });
}

module.exports.createItem = function(req, res){
    // console.log('req.body', req.body);
    req.body['id'] = id;
    id+=1;
    toDoList.push(req.body);
    console.log('toDo List', toDoList);
    return res.render('home', {
        title: 'My Title For Home for EJS File',
        to_do_list: toDoList 
    });
}

module.exports.deleteItem = function(req, res){
    console.log('req.body', req.body);
    let deleteData = req.body;
    for (let key of Object.keys(deleteData)) {
        for(let value of toDoList){
            if(value.id==key){
                toDoList.splice(value, 1);
            }
        }
    }
    return res.render('home', {
        title: 'My Title For Home for EJS File',
        to_do_list: toDoList 
    });
}

