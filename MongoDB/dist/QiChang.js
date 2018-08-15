'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NetApi = require('./utils/NetApi');

var _NetApi2 = _interopRequireDefault(_NetApi);

var _Utils = require('./utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connection URL
var url = 'mongodb://localhost:27017';
// Database Name
var dbName = 'mongodb';

async function postComments(articleId) {

    var client = await _mongodb.MongoClient.connect(url);
    var db = client.db(dbName);

    var collection_commentsList = db.collection('toutiaoCommentsList');

    var collection_users = db.collection('users');

    var userArray = await collection_users.find().limit(50).toArray();

    var commentsArray = await collection_commentsList.find().limit(50).toArray();

    for (var i = 0; i < 10; i++) {

        await _NetApi2.default.post_comments(commentsArray[i].text, articleId, userArray[i].userId, "");
    }

    console.log("发送完成");
}

exports.default = postComments;