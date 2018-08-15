import HttpUtils from './HttpUtils'


export default class TouTiaoNetApi{



    static  async request_commentsListData(articleId,offset,count){

        let url = `https://www.toutiao.com/api/comment/list/?group_id=${articleId}&item_id=${articleId}&offset=${offset}&count=${count}`;

        let data =  await HttpUtils.get(url);

        return data;

    }


    static  async request_replyCommentsListData(commentId,offset,count){

        let url = `https://www.toutiao.com/api/comment/get_reply/?comment_id=${commentId}&dongtai_id=${commentId}&offset=${offset}&count=${count}`;

        let data =  await HttpUtils.get(url);

        return data;

    }



}
