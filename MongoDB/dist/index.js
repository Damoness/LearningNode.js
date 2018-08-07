'use strict';

var _NetApi = require('./utils/NetApi');

var _NetApi2 = _interopRequireDefault(_NetApi);

var _Utils = require('./utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertDocuments = function insertDocuments(db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    var phone = _Utils2.default.getRandomPhone();
    var password = phone;
    var name = _Utils2.default.getRandomName();
    var userId = '9434343434';

    var user = { phone: phone, password: password, name: name, userId: userId };

    collection.insertOne(user, function (err, result) {

        assert.equal(err, null);
        console.log('插入1条数据:' + JSON.stringify(user) + result);
        callback(result);
    });
};

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'mongodb';

// Use connect method to connect to the server

// //注册用户
// MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//
//     const db = client.db(dbName);
//
//
//     setInterval(()=>{
//
//         const phone = Utils.getRandomPhone();
//         const password = phone;
//         const name = Utils.getRandomName();
//
//
//         NetApi.request_registerUserWithPhoneNum(phone, password, name).then(userId => {
//
//
//             if (userId.length === 12) {
//
//                 const collection = db.collection('users');
//
//                 let user = {phone: phone,userId: userId, password: password, name: name,};
//
//                 collection.insertOne(user,(err,result)=>{
//
//                     assert.equal(err, null);
//                     console.log('插入1条数据:'+JSON.stringify(user)+result);
//
//                 });
//
//             }
//
//         });
//
//     },10);
//
//
// });


// MongoClient.connect(url,(err,client)=>{
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     const db = client.db(dbName);
//     const collection = db.collection('users');
//     collection.find({}).toArray(function(err, docs) {
//         assert.equal(err, null);
//         //console.log("Found the following records");
//         //console.log(docs)
//
//         let i = 0;
//         let user;
//
//         setInterval(()=>{
//
//
//             user=docs[i];
//             NetApi.post_comments(user.phone,"A185983476424",user.userId,"").then(data=>{
//
//                 console.log(data);
//                 i=i+1;
//
//             });
//
//
//         },3000);
//
//
//     });
//
//
// });


//荐读数据
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    var collection = db.collection('newslist');

    var index = 0;

    console.log("开始");

    var nIntervId = setInterval(function () {

        _NetApi2.default.request_newsListData(encodeURI("荐读"), index++, 50).then(function (newsData) {

            if (newsData.length > 0) {

                collection.insertMany(newsData, function (err, result) {

                    assert.equal(err, null);
                    //console.log('插入:'+JSON.stringify(result));
                });
            } else {

                clearInterval(nIntervId);
                console.log("结束");
            }
        }).catch(function (err) {

            console.log(err);
        });
    }, 100);
});