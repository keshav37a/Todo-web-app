const port = 8000;
const express = require('express');
const routes = require('./routes/index');
const app = new express();

app.use('/', routes);

app.listen(port, (err)=>{
    if(err){
        console.log(`error creating server: ${err}`);
        return;
    }
    console.log(`server up and running on port ${port}`);
})




