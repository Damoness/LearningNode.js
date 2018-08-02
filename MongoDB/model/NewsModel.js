
//定义类
export default class NewsModel {

    constructor(model) {
        this.newsId = "";
        this.title = "";
        this.imageUrl = [];
        this.leftLabel = "";
        this.centerLabel = "";
        this.rightLabel = "";
        this.showViewId = ""  //视图类型
        this.redirectId = ""; //跳转类型
        this.jumpContent = ""; //跳转内容

        //类型为视频的时候n
        this.videoUrl = "";
        this.videoTime = "";
        this.videoColumn = "";
        this.videoColumnID = "";
        this.videoColumnImage = "";
        this.adUrl = "";

        for(let key in model){

            let setFunc = "set"+key.substring(0,1).toUpperCase()+key.substring(1);

            if (typeof this[setFunc] == "function" ){

                Reflect.apply(this[setFunc], this, [model[key]]);

            }else {

                this[key] = model[key];

            }


        }

    }


    setType(type){
        this.type = type;

        switch (type) {
            case NewsLayoutType.QCNewsLayoutType_LeftPic:
            case NewsLayoutType.QCNewsLayoutType_ThreePic_LeftLargeRightTwoSmall:
            case NewsLayoutType.QCNewsLayoutType_ThreePic_TheSameSize:
            {
                this.newsType = NewsType.QCNewsType_Article;

            }
                break;
            case NewsLayoutType.QCNewsLayoutType_BigVideo:
            case NewsLayoutType.QCNewsLayoutType_SmallVideo:
            {

                this.newsType = NewsType.QCNewsType_Video;

            }
                break;
            case NewsLayoutType.QCNewsLayoutType_Ad_Big:
            {

                this.newsType = NewsType.QCNewsType_Ad;

            }
                break;
            case NewsLayoutType.QCNewsLayoutType_Subject:
            {
                this.newsType = NewsType.QCNewsType_Subject;

            }
                break;
            case NewsLayoutType.QCNewsLayoutType_Ad_Small:
            {

                this.newsType = NewsType.QCNewsType_Ad;

            }
                break;
        }
    }


    setTitle(title){

        this.title = title.trim();

    }


    //解决第一个字段为空时,UI显示不对齐的问题
    setCenterLabel(centerLabel){

        if (this.leftLabel === "" ){
            this.leftLabel = centerLabel;
            this.centerLabel = "";
        }else {
            this.centerLabel = centerLabel;
        }
    }


    //转换时间
    setRightLabel(rightLabel){


        if (rightLabel.length == 0){
            this.rightLabel = "";
            return;
        }


        let now = new  Date();

        let date = new Date(rightLabel);

        let timeInterval = (now - date)/1000;

        let result;

        if (timeInterval < 60) {
            result = "刚刚";
        }else if (timeInterval < 3600){

            result = parseInt(timeInterval/60)+"分钟前";

        }else if (timeInterval < 3600 * 24){

            result = parseInt(timeInterval/3600)+"小时前";
        }else{

            result = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
        }

        this.rightLabel = result;

    }


}


const  NewsLayoutType ={
    QCNewsLayoutType_LeftPic : 1, //左边图片类型
    QCNewsLayoutType_ThreePic_LeftLargeRightTwoSmall : 2, //三张图片类型 ,左边大 右边2个小的
    QCNewsLayoutType_ThreePic_TheSameSize : 3, //三张图片类型 ,相同大小
    QCNewsLayoutType_BigVideo : 4 , //大视频类型
    QCNewsLayoutType_SmallVideo : 5, //小视频类型
    QCNewsLayoutType_Ad_Big : 6,//广告大图类型
    QCNewsLayoutType_Ad_Small : 7,//广告小图类型
    QCNewsLayoutType_Subject : 8, //专题类型

    //    QCNewsLayoutType_Carousel = 9, //轮播
    //    QCNewsLayoutType_PopAd = 10, //弹窗广告

    QCNewsLayoutType_BigImage:11, //大图类型
}

const  NewsJumpType = {
    QCNewsJumpType_DontJump : 0, //不跳转
    QCNewsJumpType_Article : 1, //文章 A
    QCNewsJumpType_Video : 2, //视频 V
    QCNewsJumpType_Subject : 3, //专题 S
    QCNewsJumpType_Live : 4 , //直播 L
    QCNewsJumpType_Vote : 5, //投票 V
    QCNewsJumpType_Comments : 6,//评论 C
    QCNewsJumpType_Magazine : 7,//杂志 M
    QCNewsJumpType_Question :8,//问车 Q
    QCNewsJumpType_Web : 9,//网页 W
    QCNewsJumpType_Ad  : 10, //广告 G

}

const  NewsType = {

    QCNewsType_Article : 1, //文章
    QCNewsType_Video : 2, //视频
    QCNewsType_Subject : 3, //专题
    QCNewsType_Live : 4 , //直播
    QCNewsType_Vote : 5, //投票
    QCNewsType_Ad : 9, //广告
}


export {NewsLayoutType,NewsType,NewsJumpType};



