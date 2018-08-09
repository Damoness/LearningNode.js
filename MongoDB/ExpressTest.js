
var express = require('express');
var app = express();



// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'mongodb';
let MongoClient = require("mongodb").MongoClient;


let engines = require('consolidate');
app.engine("html",engines.nunjucks);
app.set("view engine","html");
app.set("views",__dirname + "/views");



MongoClient.connect(url,(err,client)=>{

    const db = client.db(dbName);

    app.get('/v1/home/list', function(req, res){

        db.collection('newslist').find().limit(10).toArray((err,result)=>{

            res.send(result);

        });

    });


});


app.get('/:name',(req,res)=>{

    let name = req.params.name;
    let query = req.query;

    res.send({
       name:name,
       query:query,
    });

});



let server = app.listen(3000,()=>{

    let port = server.address().port;
    console.log('listening on port %s',port);

});


