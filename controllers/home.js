var toDoList = [];

module.exports.home = function(req, res){
    // return res.end('<h1>Home Controller</h1>');
    return res.render('home', {
        title: 'My Title For Home for EJS File'
    });
}

module.exports.createItem = function(req, res){
    console.log('req.body', req.body);
    toDoList.push(req.body);
    return res.render('home', {
        title: 'My Title For Home for EJS File',
        'toDoList': toDoList 
    });
}

