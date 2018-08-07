
import NetApi from './utils/NetApi'
import Utils from './utils/Utils'


const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    const phone = Utils.getRandomPhone();
    const password = phone;
    const name = Utils.getRandomName();
    const userId = '9434343434';

    let user = {phone: phone, password: password, name: name, userId: userId};

    collection.insertOne(user,(err,result)=>{

        assert.equal(err, null);
        console.log('插入1条数据:'+JSON.stringify(user)+result);
        callback(result);

    });
}


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongodb';

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
MongoClient.connect(url,(err,client)=>{
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('newslist');


    let index = 0;

    console.log("开始");

    let nIntervId = setInterval(()=>{

        NetApi.request_newsListData(encodeURI("荐读"),index++,50).then(newsData=>{


            if (newsData.length > 0){

                collection.insertMany(newsData,(err,result)=>{

                    assert.equal(err, null);
                    //console.log('插入:'+JSON.stringify(result));

                });

            }else {

                clearInterval(nIntervId);
                console.log("结束");

            }


        }).catch(err =>{

            console.log(err);

        });

    },100);


});



















