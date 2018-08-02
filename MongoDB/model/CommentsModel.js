

export default class CommentsModel{


    constructor(model){
        this.userId = model.userId;
        this.commentID = model.presentId;
        this.userName = model.userName;
        this.userImageUrl = model.userImg;
        this.comments = model.content;
        this.liked = model.isLike;
        this.likedNum = model.likeCount;
        this.replyNum = model.SubCount;
        this.time = model.createTime;


        this.parentCommentID = model.parentId;
        this.parentCommentUserId = model.parentUserId;
        this.parentCommentUserName = model.parentUserName;
        this.parentCommentComments = model.parent_content;

    }


}
