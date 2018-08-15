import NetApi from './utils/NetApi'
import Utils from './utils/Utils'
import {MongoClient} from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'mongodb';


async function postComments(articleId) {


    let client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const collection_commentsList = db.collection('toutiaoCommentsList');


    const collection_users = db.collection('users');


    let userArray = await collection_users.find().limit(50).toArray();

    let commentsArray = await collection_commentsList.find().limit(50).toArray();


    for (let i=0 ;i<10;i++){

        await NetApi.post_comments(commentsArray[i].text, articleId, userArray[i].userId, "");

    }

    console.log("发送完成");

}



export default postComments;
