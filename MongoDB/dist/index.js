'use strict';

var _NetApi = require('./utils/NetApi');

var _NetApi2 = _interopRequireDefault(_NetApi);

var _Utils = require('./utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _NewsModel = require('./model/NewsModel');

var _mongodb = require('mongodb');

var _TouTiaoNetApi = require('./utils/TouTiaoNetApi');

var _TouTiaoNetApi2 = _interopRequireDefault(_TouTiaoNetApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertDocuments = function insertDocuments(db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    var phone = _Utils2.default.getRandomPhone();
    var password = phone;
    var name = _Utils2.default.getRandomName();
    var userId = '9434343434';

    var user = { phone: phone, password: password, name: name, userId: userId };

    collection.insertOne(user, function (err, result) {

        assert.equal(err, null);
        console.log('插入1条数据:' + JSON.stringify(user) + result);
        callback(result);
    });
};

var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'mongodb';

// Use connect method to connect to the server

//注册用户
function registerUser() {
    _mongodb.MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        var db = client.db(dbName);

        setInterval(function () {

            var phone = _Utils2.default.getRandomPhone();
            var password = phone;
            var name = _Utils2.default.getRandomName();

            _NetApi2.default.request_registerUserWithPhoneNum(phone, password, name).then(function (userId) {

                if (userId.length === 12) {

                    var collection = db.collection('users');

                    var user = { phone: phone, userId: userId, password: password, name: name };

                    collection.insertOne(user, function (err, result) {

                        assert.equal(err, null);
                        console.log('插入1条数据:' + JSON.stringify(user) + result);
                    });
                }
            });
        }, 30);
    });
}

//发布评论
function postComments() {
    _mongodb.MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('users');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            //console.log("Found the following records");
            //console.log(docs)

            var i = 0;
            var user = void 0;

            setInterval(function () {

                user = docs[i];
                _NetApi2.default.post_comments(user.phone, "A185983476424", user.userId, "").then(function (data) {

                    console.log(data);
                    i = i + 1;
                });
            }, 3000);
        });
    });
}

//获取新闻列表数据
function getNewsListData() {
    _mongodb.MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('newslist');

        _NetApi2.default.request_columnListData().then(function (columnArray) {

            var iterator = columnArray[Symbol.iterator]();

            var index = 0;
            var columnName = iterator.next().value.columnName;

            console.log("开始:" + columnName + new Date());

            var nIntervId = setInterval(function () {

                var currentName = columnName;

                _NetApi2.default.v1request_newsListData(encodeURI(currentName), index++, 50).then(function (newsData) {

                    if (newsData.length > 0) {

                        var insertData = newsData.map(function (item) {

                            item.columnName = currentName;
                            return item;
                        });

                        console.log(JSON.stringify(insertData));

                        collection.insertMany(insertData, function (err, result) {

                            assert.equal(err, null);
                            //console.log('插入:'+JSON.stringify(result));
                        });
                    } else {

                        if (currentName === columnName) {

                            var next = iterator.next();

                            if (next.done === true) {

                                clearInterval(nIntervId);

                                console.log("结束:" + new Date());
                            } else {

                                index = 0;
                                columnName = next.value.columnName;

                                console.log("开始:" + columnName + new Date());
                            }
                        } else {

                            console.log("多余结束:" + currentName + new Date());
                        }
                    }
                }).catch(function (err) {

                    console.log(err);
                });
            }, 100);
        });
    });
}

async function getNewsDetailData() {

    var client = void 0;

    try {
        // Use connect method to connect to the Server
        client = await _mongodb.MongoClient.connect(url);

        var db = client.db(dbName);
        var collection = db.collection('newslist');

        // Get the cursor
        var cursor = collection.find();

        // Iterate over the cursor
        while (await cursor.hasNext()) {
            var doc = await cursor.next();

            if (doc.redirectId === _NewsModel.NewsJumpType.QCNewsJumpType_Article) {

                try {

                    var data = await _NetApi2.default.request_newsDetailData(doc.jumpContent);

                    console.log(new Date().getTime() + JSON.stringify(data));

                    var r = await db.collection('newsDetailList').insertOne(data);
                    assert.equal(1, r.insertedCount);
                } catch (err) {

                    console.log(err);
                }
            } else if (doc.redirectId === _NewsModel.NewsJumpType.QCNewsJumpType_Video) {

                try {
                    var _data = await _NetApi2.default.request_videoDetailData(doc.jumpContent);
                    console.log(new Date() + JSON.stringify(_data));
                    var _r = await db.collection('videoDetailList').insertOne(_data);
                    assert.equal(1, _r.insertedCount);
                } catch (err) {

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
function getNewsDetailData2() {

    _mongodb.MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = client.db(dbName);
        var collection = db.collection('newslist');

        var cursor = collection.find();

        var id = setInterval(function () {

            cursor.hasNext(function (err, hasNext) {

                if (hasNext) {

                    cursor.next(function (err, doc) {

                        if (doc.redirectId === _NewsModel.NewsJumpType.QCNewsJumpType_Article) {

                            _NetApi2.default.request_newsDetailData(doc.jumpContent).then(function (data) {

                                //console.log(JSON.stringify(data));

                                db.collection('newsDetailList').insertOne(data, function (err, result) {

                                    assert.equal(err, null);
                                    console.log(Date.now() + JSON.stringify(result));
                                });
                            }).catch(function (err) {
                                console.log(err);
                            });
                        } else if (doc.redirectId === _NewsModel.NewsJumpType.QCNewsJumpType_Video) {

                            _NetApi2.default.request_videoDetailData(doc.jumpContent).then(function (data) {

                                db.collection('videoDetailList').insertOne(data, function (err, result) {

                                    assert.equal(err, null);
                                    console.log(Date.now() + JSON.stringify(result));
                                });
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    });
                } else {

                    setTimeout(function () {

                        clearInterval(id);
                        console.log("结束");
                    }, 5000);
                }
            });
        }, 100);
    });
}

async function testGetTouTiaoComments(articleId, offset, size) {

    var client = void 0;
    var count = 0;

    try {

        client = await _mongodb.MongoClient.connect(url);

        var db = client.db(dbName);
        var collection = db.collection('toutiaoCommentsList');

        var data = await _TouTiaoNetApi2.default.request_commentsListData(articleId, offset, size);
        //console.log("一级评论:" + JSON.stringify(data));

        if (data.data.total > 0 && data.data.comments.length > 0) {

            var result = await collection.insertMany(data.data.comments);

            count += result.insertedCount;

            //console.log("一级评论:" + result.insertedCount);

            //console.log(Date.now() + JSON.stringify(result));

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.data.comments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var comments = _step.value;


                    console.log(comments.text);

                    if (comments.reply_count > 0) {

                        var replyCount = 0;

                        replyCount += await getTouTiaoReplyComments(collection, comments.id, 0, 10);

                        console.log("  总数:" + replyCount);

                        count += replyCount;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        if (data.data.has_more) {
            //console.log("当前评论总数:"+count);
            count += await testGetTouTiaoComments(articleId, offset + data.data.comments.length, size);
        }
    } catch (err) {
        console.log(err.stack);
    }

    if (client) {

        client.close();
    }

    return count;
}

async function getTouTiaoReplyComments(collection, commentId, offset, size) {

    var count = 0;

    var data2 = await _TouTiaoNetApi2.default.request_replyCommentsListData(commentId, offset, size);
    //console.log("二级评论:"+JSON.stringify(data2));

    if (data2.data.data.length > 0) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

            for (var _iterator2 = data2.data.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var comment = _step2.value;


                console.log("  " + comment.text);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var r = await collection.insertMany(data2.data.data);
        count += r.insertedCount;
        //console.log(Date.now() + JSON.stringify(r));
    }

    if (data2.data.has_more) {
        count += await getTouTiaoReplyComments(collection, commentId, offset + data2.data.data.length, size);
    }

    return count;
}

(async function f() {

    var total = 0;

    total = await testGetTouTiaoComments('6584205462130917896', 0, 10);

    console.log("获取评论总数total:" + total);
})();

//getNewsListData();
//registerUser();
//getNewsDetailData2();