'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpUtils = require('./HttpUtils');

var _HttpUtils2 = _interopRequireDefault(_HttpUtils);

var _NewsModel = require('../model/NewsModel');

var _NewsModel2 = _interopRequireDefault(_NewsModel);

var _CommentsModel = require('../model/CommentsModel');

var _CommentsModel2 = _interopRequireDefault(_CommentsModel);

var _CarouselModel = require('../model/CarouselModel');

var _CarouselModel2 = _interopRequireDefault(_CarouselModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import {Alert} from "react-native";

//const Alert =null;

var baseURL = 'https://api.qichangv.com';

var oldBaseURL = "http://www.infoacq.com";

var NetApi = function () {
    function NetApi() {
        _classCallCheck(this, NetApi);
    }

    _createClass(NetApi, null, [{
        key: 'v1request_launchImageData',


        /**
         * v1获取开屏页数据
         * @returns {Promise<any>}
         */
        value: function v1request_launchImageData() {

            baseURL = 'https://out.qichangv.com';

            var url = baseURL + '/v1/showpage';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1get(url).then(function (data) {

                    resolve(new _NewsModel2.default(data));
                }).catch(reject);
            });
        }

        /**
         * v1获取弹出广告
         * @returns {Promise<any>}
         */

    }, {
        key: 'v1request_popAdInfoData',
        value: function v1request_popAdInfoData() {

            var url = baseURL + '/v1/advertisement/pop';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1get(url).then(function (data) {

                    if (JSON.stringify(c) == "{}") {

                        resolve(data);
                    } else {
                        resolve(new _NewsModel2.default(data));
                    }
                }).catch(reject);
            });
        }

        /**
         * v1获取轮播列表
         * @param columnName
         * @returns {Promise<any>}
         */

    }, {
        key: 'v1request_carouselListData',
        value: function v1request_carouselListData(columnName) {

            var url = baseURL + '/v1/home/banner/' + columnName;

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1get(url).then(function (data) {

                    resolve(data.map(function (item) {
                        return new _NewsModel2.default(item);
                    }));
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

    }, {
        key: 'v1request_newsListData',
        value: function v1request_newsListData(columnName, aPageIndex, aPageSize) {

            //baseURL = "http://192.168.1.98:3600";

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1get(baseURL + '/v1/home/list/' + aPageIndex + '/' + aPageSize + '/' + columnName).then(function (data) {

                    resolve(data.map(function (item) {
                        return new _NewsModel2.default(item);
                    }));
                }).catch(function (re) {

                    //Alert.alert("222",JSON.stringify(re));
                    reject(re);
                });
            });
        }

        /**
         * v1获取新闻详细信息中的广告信息
         * @param newId:新闻ID
         * @returns {Promise<any>}
         */

    }, {
        key: 'v1request_newsDetailAdInfo',
        value: function v1request_newsDetailAdInfo(newId) {

            var url = baseURL + '/v1/advertisement/content/' + newId;

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1get(url).then(function (data) {

                    if (JSON.stringify(data) == "{}") {

                        resolve(data);
                    } else {
                        resolve(new _NewsModel2.default(data));
                    }
                }).catch(reject);
            });
        }

        /**
         * v1获取推荐新闻列表
         * @param keyStr:关键字
         * @param newsId:新闻Id
         * @returns {Promise<any>}
         */

    }, {
        key: 'v1request_recommendedNewsListData',
        value: function v1request_recommendedNewsListData(keyStr, newsId) {

            var url = baseURL + '/v1/content/about';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.v1post(url, {
                    "tags": keyStr,
                    "contentId": newsId
                }).then(function (data) {

                    resolve(data.map(function (item) {
                        return new _NewsModel2.default(item);
                    }));
                }).catch(reject);
            });
        }

        /**
         * 获取导航栏列表
         * @returns {Promise<any>}
         */

    }, {
        key: 'request_columnListData',
        value: function request_columnListData() {

            var url = baseURL + '/home/NavigationBar';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.get(url).then(function (data) {

                    if (data.Code === '200') {

                        resolve(data.Data[0].class_name.split(',').map(function (text) {
                            return { columnName: text };
                        }));
                    } else {
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

    }, {
        key: 'request_registerUserWithPhoneNum',
        value: async function request_registerUserWithPhoneNum(phone, password, username) {

            var url = oldBaseURL + ('/mobile/getvalues.aspx?name=RegisterUserByMobile&username=' + username + '&mobile=' + phone + '&password=' + password);

            var userId = await _HttpUtils2.default.getText(encodeURI(url));

            return userId;
        }

        /**
         * 文章是否点赞
         * @param newsId:文章Id
         * @param userId:用户Id
         * @returns {Promise<boolean>}
         */

    }, {
        key: 'request_newsIsLiked',
        value: async function request_newsIsLiked(newsId, userId) {

            var url = oldBaseURL + ('/mobile/getvalues.aspx?name=PDDingnews&UserNum=' + userId + '&NewsID=' + newsId);

            var data = await _HttpUtils2.default.getText(url);

            return data === "OK" ? true : false;
        }

        /**
         * 文章是否收藏
         * @param newsId:文章Id
         * @param userId:用户Id
         * @returns {Promise<boolean>}
         */

    }, {
        key: 'request_newsIsCollected',
        value: async function request_newsIsCollected(newsId, userId) {

            var url = oldBaseURL + ('/mobile/getvalues.aspx?name=puanduanSC&UserNum=' + userId + '&NewsID=' + newsId + '&ReadType=2');

            var data = await _HttpUtils2.default.getText(url);

            return data === "1" ? true : false;
        }

        /**
         * 点赞文章
         * @param newsId:文章Id
         * @param userId:用户Id
         * @returns {Promise<boolean>}
         */

    }, {
        key: 'post_likeNews',
        value: async function post_likeNews(newsId, userId) {

            var url = oldBaseURL + ('/mobile/getvalues.aspx?name=insertDingnews&UserNum=' + userId + '&NewsID=' + newsId);

            var data = await _HttpUtils2.default.getText(url);

            return data === "OK" ? true : false;
        }

        /**
         * 收藏或取消收藏文章
         * @param newsId:文章Id
         * @param userId:用户Id
         * @param collected:true收藏,false取消收藏
         * @returns {Promise<boolean>}
         */

    }, {
        key: 'post_collectNews',
        value: async function post_collectNews(newsId, userId, collected) {

            var url = void 0;

            if (collected) {

                url = oldBaseURL + '/mobile/getvalues.aspx?name=insertNTusernews'; //收藏
            } else {

                url = oldBaseURL + '/mobile/getvalues.aspx?name=deleteNTusernewsB'; //删除收藏
            }

            url = url + ('&UserNum=' + userId + '&NewsID=' + newsId + '&ReadType=2');

            var data = await _HttpUtils2.default.getText(url);

            return data === "OK" ? true : false;
        }

        /**
         * 发送评论
         * @param comment:评论
         * @param newsId:文章Id
         * @param userId:用户Id
         * @param targetUserId:文章ID,视频ID 时为空, 评论ID时为目标用户ID
         * @returns {Promise<*>}
         */

    }, {
        key: 'post_comments',
        value: async function post_comments(comment, newsId, userId, targetUserId) {

            var url = baseURL + '/Comment/savemycomm';

            var type = {
                "A": "文章",
                "V": "视频",
                "C": "评论"
            };

            var data = await _HttpUtils2.default.post(url, {
                "content": comment, //评论内容
                "userId": userId, //用户ID
                "parentId": newsId, //文章ID, 视频ID, 评论ID
                "target_user_id": targetUserId, //文章ID,视频ID 时为空, 评论ID时为目标用户ID
                "type": type[newsId.charAt(0)]
            });

            if (data.Code === '200') {
                return data.Data[0];
            } else {
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

    }, {
        key: 'request_commentsListData',
        value: function request_commentsListData(newsId, aPageIndex, aPageSize, userId) {
            var _this = this;

            var url = void 0;

            if (newsId.charAt(0) === 'C') {

                url = baseURL + '/Comment/content';
            } else {

                url = baseURL + '/Comment';
            }

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.post(url, {
                    "id": newsId,
                    "userId": userId || "",
                    "page": aPageIndex.toString(),
                    "pageSize": aPageSize.toString()

                }).then(function (data) {

                    if (data.Code === '200') {
                        resolve(_this.parseCommentsData(data.Data));
                    } else {
                        Alert.alert(data.Code);
                    }
                }).catch(reject);
            });
        }

        /**
         * 请求视频栏目列表数据
         * @returns {Promise<any>}
         */

    }, {
        key: 'request_videoColumnListData',
        value: function request_videoColumnListData() {

            var url = baseURL + '/column/3';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.get(url).then(function (data) {

                    if (data.Code === '200') {
                        resolve(data.Data);
                    } else {
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

    }, {
        key: 'request_videoDetailData',
        value: async function request_videoDetailData(newsId) {

            var url = baseURL + '/Content/getVideo/' + newsId;

            var data = await _HttpUtils2.default.get(url);

            if (data.Code === '200') {
                return data.Data[0];
            } else {
                Alert.alert(data.Code);
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

    }, {
        key: 'request_newsDetailData',
        value: function request_newsDetailData(newsId) {

            var url = baseURL + '/Content/getNews/' + newsId;

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.get(url).then(function (data) {

                    if (data.Code === '200') {
                        resolve(data.Data[0]);
                    } else {
                        Alert.alert(data.Code);
                    }
                }).catch(reject);
            });
        }

        /**
         * 获取轮播列表
         * @param columnName
         * @returns {Promise<any>}
         */

    }, {
        key: 'request_carouselListData',
        value: function request_carouselListData(columnName) {

            var url = baseURL + '/home/gettop/' + columnName;

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.get(url).then(function (data) {

                    var dataArray = [];

                    for (var i = 0; i < data.Data.length; i++) {
                        var element = data.Data[i];
                        dataArray.push(new _CarouselModel2.default(element));
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

    }, {
        key: 'request_newsListData',
        value: function request_newsListData(columnName, aPageIndex, aPageSize) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.get(baseURL + '/home/getlist/' + columnName + '/' + aPageIndex + '/' + aPageSize).then(function (data) {

                    resolve(_this2.parseNewsData(data.Data));
                }).catch(function (error) {

                    reject(error);
                });
            });
        }

        /**
         * 获取推荐新闻列表
         * @param keyStr:关键字
         * @param newsId:新闻ID
         * @returns {Promise<any>}
         */

    }, {
        key: 'request_recommendedNewsList',
        value: function request_recommendedNewsList(keyStr, newsId) {
            var _this3 = this;

            var url = baseURL + '/Content/getAbout';

            return new Promise(function (resolve, reject) {

                _HttpUtils2.default.post(url, {
                    "tags": keyStr,
                    "contentId": newsId
                }).then(function (data) {

                    if (data.Code === '200') {
                        resolve(_this3.parseNewsData(data.Data));
                    } else {
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

    }, {
        key: 'parseCommentsData',
        value: function parseCommentsData(originalData) {

            var commentsArray = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = originalData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;


                    var comments = new _CommentsModel2.default(item);
                    commentsArray.push(comments);
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

            return commentsArray;
        }

        /**
         * 解析网络请求的新闻数据
         * @param originalData
         * @returns {Array}
         */

    }, {
        key: 'parseNewsData',
        value: function parseNewsData(originalData) {

            var dataArray = originalData;

            var newsArray = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = dataArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;


                    var newsModel = new _NewsModel2.default(item);
                    newsArray.push(newsModel);
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

            return newsArray;
        }
    }]);

    return NetApi;
}();

exports.default = NetApi;