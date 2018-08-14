import HttpUtils from './HttpUtils'


export default class TouTiaoNetApi{



    static  async request_commentsListData(articleId,aPageIndex,aPageSize){

        let url = `https://www.toutiao.com/api/comment/list/?group_id=${articleId}&item_id=${articleId}&offset=${aPageIndex * aPageSize}&count=${aPageSize}`;

        let data =  await HttpUtils.get(url);

        return data;

    }


    static  async request_replyCommentsListData(commentId,aPageIndex,aPageSize){

        let url = `https://www.toutiao.com/api/comment/get_reply/?comment_id=${commentId}&dongtai_id=${commentId}&offset=${aPageIndex * aPageSize}&count=${aPageSize}`;

        let data =  await HttpUtils.get(url);

        return data;

    }



}
