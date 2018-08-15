import {MongoClient} from "mongodb";
import TouTiaoNetApi from "./utils/TouTiaoNetApi";


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongodb';


async function testGetTouTiaoComments(articleId,offset,size){

    let client;
    let count = 0;

    try {

        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const collection = db.collection('toutiaoCommentsList');

        let data = await TouTiaoNetApi.request_commentsListData(articleId,offset,size);
        //console.log("一级评论:" + JSON.stringify(data));

        if (data.data.total > 0 && data.data.comments.length > 0){

            let result = await collection.insertMany(data.data.comments);

            count +=result.insertedCount;

            //console.log("一级评论:" + result.insertedCount);

            //console.log(Date.now() + JSON.stringify(result));

            for (let comments of data.data.comments){

                console.log(comments.text);

                if (comments.reply_count > 0){

                    let replyCount = 0;

                    replyCount += await getTouTiaoReplyComments(collection,comments.id,0,10);

                    console.log("  总数:"+replyCount);

                    count += replyCount;

                }
            }

        }


        if (data.data.has_more){
            //console.log("当前评论总数:"+count);
            count += await testGetTouTiaoComments(articleId,offset+data.data.comments.length,size);
        }


    }catch (err) {
        console.log(err.stack);
    }

    if (client) {

        client.close();
    }


    return count;


}


async function getTouTiaoReplyComments(collection,commentId,offset,size){

    let count = 0;

    let data2 = await TouTiaoNetApi.request_replyCommentsListData(commentId,offset,size);
    //console.log("二级评论:"+JSON.stringify(data2));

    if (data2.data.data.length > 0){

        for (let comment of data2.data.data){

            console.log("  "+comment.text);
        }

        let r = await collection.insertMany(data2.data.data);
        count +=r.insertedCount;
        //console.log(Date.now() + JSON.stringify(r));

    }

    if (data2.data.has_more){
        count += await getTouTiaoReplyComments(collection,commentId,offset+data2.data.data.length,size);
    }

    return count;

}


/**
 *
 * @param articleId: 6588137326092747278
 * @returns {Promise<*>}
 */
async function fetchTouTiaoCommentsWithArticleId(articleId) {

    let total = 0;

    total = await testGetTouTiaoComments(articleId,0,10);

    console.log("获取评论总数total:"+total);

    return total;
}







export default fetchTouTiaoCommentsWithArticleId;
