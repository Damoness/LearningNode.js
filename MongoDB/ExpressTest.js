
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('hello world1');
});


let server = app.listen(3000,()=>{

        let port = server.address().port;
        console.log('listening on port %s',port);

    });
