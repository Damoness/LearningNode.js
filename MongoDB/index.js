
import NetApi from './utils/NetApi'
import Utils from './utils/Utils'
import {NewsJumpType} from "./model/NewsModel";


import {MongoClient} from 'mongodb'



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


const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongodb';

// Use connect method to connect to the server

//注册用户
function registerUser() {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        setInterval(()=>{

            const phone = Utils.getRandomPhone();
            const password = phone;
            const name = Utils.getRandomName();


            NetApi.request_registerUserWithPhoneNum(phone, password, name).then(userId => {


                if (userId.length === 12) {

                    const collection = db.collection('users');

                    let user = {phone: phone,userId: userId, password: password, name: name,};

                    collection.insertOne(user,(err,result)=>{

                        assert.equal(err, null);
                        console.log('插入1条数据:'+JSON.stringify(user)+result);

                    });

                }

            });

        },10);


    });
}



//发布评论
function postComments() {
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs)

            let i = 0;
            let user;

            setInterval(() => {


                user = docs[i];
                NetApi.post_comments(user.phone, "A185983476424", user.userId, "").then(data => {

                    console.log(data);
                    i = i + 1;

                });


            }, 3000);


        });


    });
}


//获取新闻列表数据
function getNewsListData(){
    MongoClient.connect(url,(err,client)=>{
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('newslist');



        NetApi.request_columnListData().then(columnArray=>{


            let iterator =  columnArray[Symbol.iterator]();


            let index = 0;
            let columnName = iterator.next().value.columnName;

            console.log("开始:"+columnName+new Date());

            let nIntervId = setInterval(()=>{


                let currentName = columnName;

                NetApi.v1request_newsListData(encodeURI(currentName),index++,50).then(newsData=>{


                    if (newsData.length > 0){

                        const  insertData =  newsData.map(item =>{

                                item.columnName = currentName;
                                return item;

                            }
                        );

                        console.log(JSON.stringify(insertData));

                        collection.insertMany(insertData,(err,result)=>{

                            assert.equal(err, null);
                            //console.log('插入:'+JSON.stringify(result));

                        });

                    }else {


                        if (currentName === columnName){

                            let next = iterator.next();

                            if (next.done === true){


                                clearInterval(nIntervId);

                                console.log("结束:"+new Date());

                            }else {

                                index = 0;
                                columnName = next.value.columnName;

                                console.log("开始:"+columnName+new Date());

                            }

                        }else {

                            console.log("多余结束:"+currentName+new Date());

                        }

                    }


                }).catch(err =>{

                    console.log(err);

                });

            },100);


        })

    });

}



async function getNewsDetailData(){

    let client;

    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const collection = db.collection('newslist');

        // Get the cursor
        const cursor = collection.find();

        // Iterate over the cursor
        while(await cursor.hasNext()) {
            const doc = await cursor.next();

            if (doc.redirectId === NewsJumpType.QCNewsJumpType_Article){

                try {

                    let data = await NetApi.request_newsDetailData(doc.jumpContent);

                    console.log(new Date().getTime() + JSON.stringify(data));

                    let r = await db.collection('newsDetailList').insertOne(data);
                    assert.equal(1, r.insertedCount);

                }catch (err) {

                    console.log(err);

                }


            }else if(doc.redirectId === NewsJumpType.QCNewsJumpType_Video){

                try {
                    let data = await  NetApi.request_videoDetailData(doc.jumpContent);
                    console.log(new Date() + JSON.stringify(data));
                    let r = await db.collection('videoDetailList').insertOne(data);
                    assert.equal(1, r.insertedCount);

                }catch (err) {

                    console.log(err);

                }
            }

        }


    } catch (err) {
        console.log(err.stack);
    }

    if (client) {
        client.close();
    }


}


//获取文章详情信息
function  getNewsDetailData2(){

    MongoClient.connect(url,(err,client)=> {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('newslist');

        let cursor = collection.find();



        let id = setInterval(()=>{

            cursor.hasNext((err,hasNext)=>{


                if (hasNext) {

                    cursor.next((err,doc)=>{


                        if (doc.redirectId === NewsJumpType.QCNewsJumpType_Article){


                            NetApi.request_newsDetailData(doc.jumpContent).then(data=>{

                                    //console.log(JSON.stringify(data));

                                    db.collection('newsDetailList').insertOne(data,(err,result)=>{

                                        assert.equal(err, null);
                                        console.log(new Date().getTime() + JSON.stringify(result));

                                    });

                                }
                            ).catch(err=>{
                                console.log(err);
                            })


                        }else if(doc.redirectId === NewsJumpType.QCNewsJumpType_Video){


                            NetApi.request_videoDetailData(doc.jumpContent).then(data=>{


                                    db.collection('videoDetailList').insertOne(data,(err,result)=>{

                                        assert.equal(err, null);
                                        console.log(new Date().getTime() + JSON.stringify(result));

                                    });

                                }
                            ).catch(err=>{
                                console.log(err);
                            })

                        }

                    });


                }else {

                    setTimeout(()=>{

                        clearInterval(id);
                        console("结束");

                    },5000);

                }


            })

        },30);



    })




}



getNewsDetailData2();























