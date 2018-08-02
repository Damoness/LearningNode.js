"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommentsModel = function CommentsModel(model) {
    _classCallCheck(this, CommentsModel);

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
};

exports.default = CommentsModel;