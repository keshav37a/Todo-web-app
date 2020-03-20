const port = 8000;
const express = require('express');
const routes = require('./routes/index');
const app = new express();

app.use('/', routes);

app.set('view engine', 'ejs');
app.set('views', './views');



//use static files like images, css and js
app.use(express.static('assets'));

app.listen(port, (err)=>{
    if(err){
        console.log(`error creating server: ${err}`);
        return;
    }
    console.log(`server up and running on port ${port}`);
});




