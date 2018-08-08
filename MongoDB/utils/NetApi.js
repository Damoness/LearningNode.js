import HttpUtils from './HttpUtils'
import NewsModel from "../model/NewsModel";
import CommentsModel from '../model/CommentsModel'
import CarouseModel from "../model/CarouselModel";

//import {Alert} from "react-native";

//const Alert =null;

let baseURL = 'https://api.qichangv.com';

let oldBaseURL = "http://www.infoacq.com";

export default class NetApi {


    /**
     * v1获取开屏页数据
     * @returns {Promise<any>}
     */
    static v1request_launchImageData(){

        baseURL = 'https://out.qichangv.com';

        let url = baseURL + '/v1/showpage';

        return new Promise((resolve, reject) => {

            HttpUtils.v1get(url).then(data =>{


                resolve(new NewsModel(data));


            }).catch(reject);

        });

    }


    /**
     * v1获取弹出广告
     * @returns {Promise<any>}
     */
    static v1request_popAdInfoData(){

        let url = baseURL + '/v1/advertisement/pop';

        return new Promise((resolve, reject) => {

            HttpUtils.v1get(url).then(data =>{

                if(JSON.stringify(c) == "{}"){

                    resolve(data);

                }else {
                    resolve(new NewsModel(data));
                }




            }).catch(reject);

        });

    }


    /**
     * v1获取轮播列表
     * @param columnName
     * @returns {Promise<any>}
     */
    static v1request_carouselListData(columnName){

        let url = baseURL + '/v1/home/banner/' + columnName;

        return new Promise((resolve, reject) => {

            HttpUtils.v1get(url).then(data =>{


                resolve(data.map(item => new NewsModel(item)));


            }).catch(reject);

        });
    }



    /**
     * v1获取新闻列表
     * @param columnName:栏目名称
     * @param aPageIndex:当前页索引0开始
     * @param aPageSize:每页大小
     * @returns {Promise<any>}
     */
    static v1request_newsListData(columnName,aPageIndex,aPageSize){

        //baseURL = "http://192.168.1.98:3600";

        return new Promise((resolve,reject)=>{

            HttpUtils.v1get(`${baseURL}/v1/home/list/${aPageIndex}/${aPageSize}/${columnName}`)
                .then(data =>{

                        resolve(data.map(item => new NewsModel(item)));

                    }
                ).catch(re=>{

                    //Alert.alert("222",JSON.stringify(re));
                    reject(re)
            });

        });

    }



    /**
     * v1获取新闻详细信息中的广告信息
     * @param newId:新闻ID
     * @returns {Promise<any>}
     */
    static v1request_newsDetailAdInfo(newId){

        let url = baseURL + '/v1/advertisement/content/' + newId;

        return new Promise((resolve,reject)=>{

            HttpUtils.v1get(url)
                .then(data =>{

                        if(JSON.stringify(data) == "{}"){

                            resolve(data);

                        }else {
                            resolve(new NewsModel(data));
                        }

                    }
                ).catch(reject);

        });

    }

    /**
     * v1获取推荐新闻列表
     * @param keyStr:关键字
     * @param newsId:新闻Id
     * @returns {Promise<any>}
     */
    static v1request_recommendedNewsListData(keyStr,newsId){


        let url = baseURL+'/v1/content/about';

        return new Promise((resolve, reject) => {

            HttpUtils.v1post(url,{
                "tags":keyStr,
                "contentId":newsId,
            }).then(data =>{

                resolve(data.map(item => new NewsModel(item)));

            }).catch(reject);

        });

    }


    /**
     * 获取导航栏列表
     * @returns {Promise<Array>}
     */
    static request_columnListData(){

        let url = baseURL+'/home/NavigationBar';


        return new Promise((resolve, reject) => {

            HttpUtils.get(url).then(data=>{

                if (data.Code === '200'){

                    resolve(data.Data[0].class_name.split(',').map((text) =>{  return {columnName:text}}));

                }else {
                    Alert.alert(data.Code);
                }


            }).catch(reject);

        });


    }

    /**
     * 注册用户
     * @param phone
     * @param password
     * @param username
     * @returns {Promise<string>}
     */
    static async request_registerUserWithPhoneNum(phone,password,username){

        const url = oldBaseURL + `/mobile/getvalues.aspx?name=RegisterUserByMobile&username=${username}&mobile=${phone}&password=${password}`;

        let userId = await HttpUtils.getText(encodeURI(url));

        return userId;


    }

    /**
     * 文章是否点赞
     * @param newsId:文章Id
     * @param userId:用户Id
     * @returns {Promise<boolean>}
     */
    static async request_newsIsLiked(newsId,userId){

        let  url = oldBaseURL + `/mobile/getvalues.aspx?name=PDDingnews&UserNum=${userId}&NewsID=${newsId}`;

        let data = await HttpUtils.getText(url);

        return data === "OK" ? true: false;

    }

    /**
     * 文章是否收藏
     * @param newsId:文章Id
     * @param userId:用户Id
     * @returns {Promise<boolean>}
     */
    static async request_newsIsCollected(newsId,userId){

        let  url = oldBaseURL + `/mobile/getvalues.aspx?name=puanduanSC&UserNum=${userId}&NewsID=${newsId}&ReadType=2`;

        let data = await HttpUtils.getText(url);

        return data === "1" ? true: false;

    }



    /**
     * 点赞文章
     * @param newsId:文章Id
     * @param userId:用户Id
     * @returns {Promise<boolean>}
     */
    static async post_likeNews(newsId,userId){


        let  url = oldBaseURL + `/mobile/getvalues.aspx?name=insertDingnews&UserNum=${userId}&NewsID=${newsId}`;

        let data = await HttpUtils.getText(url);


        return data === "OK" ? true: false;


    }


    /**
     * 收藏或取消收藏文章
     * @param newsId:文章Id
     * @param userId:用户Id
     * @param collected:true收藏,false取消收藏
     * @returns {Promise<boolean>}
     */
    static async post_collectNews(newsId,userId,collected){

        let url;

        if (collected) {

            url = oldBaseURL+'/mobile/getvalues.aspx?name=insertNTusernews'; //收藏

        }else{

            url = oldBaseURL+'/mobile/getvalues.aspx?name=deleteNTusernewsB'; //删除收藏

        }

        url = url+`&UserNum=${userId}&NewsID=${newsId}&ReadType=2`;


        let data = await HttpUtils.getText(url);


        return data === "OK" ? true: false;





    }


    /**
     * 发送评论
     * @param comment:评论
     * @param newsId:文章Id
     * @param userId:用户Id
     * @param targetUserId:文章ID,视频ID 时为空, 评论ID时为目标用户ID
     * @returns {Promise<*>}
     */
    static async post_comments(comment,newsId,userId,targetUserId){

        const url = baseURL+'/Comment/savemycomm';


        const type ={
            "A":"文章",
            "V":"视频",
            "C":"评论",
        };

        let data =  await HttpUtils.post(url,{
            "content":comment, //评论内容
            "userId":userId, //用户ID
            "parentId":newsId, //文章ID, 视频ID, 评论ID
            "target_user_id":targetUserId, //文章ID,视频ID 时为空, 评论ID时为目标用户ID
            "type":type[newsId.charAt(0)],
        });

        if (data.Code === '200'){
            return data.Data[0];
        }else {
            //Alert.alert(data.Code);
            console.log(data);
        }


    }

    /**
     * 请求评论列表
     * @param newsId:新闻Id
     * @param aPageIndex:当前页索引0开始
     * @param aPageSize:每页大小
     * @param userId:用户ID
     * @returns {Promise<any>}
     */
    static request_commentsListData(newsId,aPageIndex,aPageSize,userId){

        let url;

        if (newsId.charAt(0) === 'C'){

            url = baseURL+'/Comment/content';

        }else {

            url = baseURL+'/Comment';

        }

        return new Promise((resolve, reject) => {

            HttpUtils.post(url,{
                "id":newsId,
                "userId":userId || "",
                "page":aPageIndex.toString(),
                "pageSize":aPageSize.toString(),

            }).then(data=>{

                if (data.Code === '200'){
                    resolve(this.parseCommentsData(data.Data));
                }else {
                    Alert.alert(data.Code);
                }


            }).catch(reject);

        });


    }


    /**
     * 请求视频栏目列表数据
     * @returns {Promise<any>}
     */
    static request_videoColumnListData(){

        let url = baseURL+'/column/3';

        return new Promise((resolve, reject) => {

            HttpUtils.get(url).then(data =>{

                if (data.Code === '200'){
                    resolve(data.Data)
                }else {
                    Alert.alert(data.Code);
                }

            }).catch(reject);

        });

    }


    /**
     * 请求视频详细信息
     * @param newsId
     * @returns {Promise<*>}
     */
    static async request_videoDetailData(newsId){


        let url = baseURL+'/Content/getVideo/'+newsId;

        let data =  await HttpUtils.get(url);

        if (data.Code === '200'){
            return data.Data[0];
        }else {
            //Alert.alert(data.Code);
            console.log("错误代码:"+data.Code +" url:"+url);
            resolve(data.Code);
        }


        // return new Promise((resolve, reject) => {
        //
        //     HttpUtils.get(url).then(data =>{
        //
        //         if (data.Code === '200'){
        //             resolve(data.Data[0])
        //         }else {
        //             Alert.alert(data.Code);
        //         }
        //
        //     }).catch(reject);
        //
        // });


    }


    /**
     * 获取新闻详情
     * @param newsId
     * @returns {Promise<any>}
     */
    static request_newsDetailData(newsId){

        let url = baseURL+'/Content/getNews/'+newsId;

        console.log(new Date().getTime() + "开始:"+url);

        return new Promise((resolve, reject) => {

            HttpUtils.get(url).then(data =>{

                if (data.Code === '200'){
                    resolve(data.Data[0])
                }else {
                    console.log("错误代码:"+data.Code +" url:"+url);
                    resolve(data.Code);
                }

            }).catch(reject);

        });

    }


    /**
     * 获取轮播列表
     * @param columnName
     * @returns {Promise<any>}
     */
    static request_carouselListData(columnName){

        let url = baseURL + '/home/gettop/' + columnName;

        return new Promise((resolve, reject) => {

            HttpUtils.get(url).then(data =>{


                let dataArray = [];

                for (let i = 0; i < data.Data.length; i++) {
                    const element = data.Data[i];
                    dataArray.push(new CarouseModel(element));
                }

                resolve(dataArray);


            }).catch(reject);

        });

    }


    /**
     * 获取新闻列表
     * @param columnName:栏目名称
     * @param aPageIndex:当前页索引0开始
     * @param aPageSize:每页大小
     * @returns {Promise<Array>}
     */
    static request_newsListData(columnName,aPageIndex,aPageSize){

        let url = `${baseURL}/home/getlist/${columnName}/${aPageIndex}/${aPageSize}`;

        console.log(url);

        return new Promise((resolve,reject)=>{

            HttpUtils.get(url)
                .then(data =>{

                        resolve(this.parseNewsData(data.Data));

                    }
                ).catch(error =>{

                reject(error)
            });

        });

    }


    /**
     * 获取推荐新闻列表
     * @param keyStr:关键字
     * @param newsId:新闻ID
     * @returns {Promise<any>}
     */
    static request_recommendedNewsList(keyStr,newsId){


        let url = baseURL+'/Content/getAbout';

        return new Promise((resolve, reject) => {

            HttpUtils.post(url,{
                "tags":keyStr,
                "contentId":newsId,
            }).then(data =>{

                if (data.Code === '200'){
                    resolve(this.parseNewsData(data.Data));
                }else {
                    Alert.alert(data.Code);
                }

            }).catch(reject);

        });

    }







    /**
     * 解析网络请求的评论数据
     * @param originalData
     * @returns {Array}
     */
    static  parseCommentsData(originalData){

        let commentsArray = [];

        for (let item of originalData){

            let comments = new CommentsModel(item);
            commentsArray.push(comments);
        }

        return commentsArray;

    }


    /**
     * 解析网络请求的新闻数据
     * @param originalData
     * @returns {Array}
     */
    static parseNewsData(originalData){

        let dataArray = originalData;

        let newsArray = [];

        for(let item of dataArray){

            let newsModel = new NewsModel(item);
            newsArray.push(newsModel);

        }

        return newsArray;

    }



}
