"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpUtils = function () {
    function HttpUtils() {
        _classCallCheck(this, HttpUtils);
    }

    _createClass(HttpUtils, null, [{
        key: "get",
        value: function get(url) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                (0, _nodeFetch2.default)(url).then(function (response) {

                    return _this.handleResponse(response, reject);

                    // let result = this.handleResponse(response,reject);
                    //
                    // if (typeof result !== "undefined"){
                    //     return result;
                    // }
                }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    //Alert.alert(error.message,"");
                    reject(error);
                });
            });
        }

        /**
         * 用于response不是json的情况
         * @param url
         * @returns {Promise<any>}
         */

    }, {
        key: "getText",
        value: function getText(url) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                (0, _nodeFetch2.default)(url).then(function (response) {
                    return _this2.handleResponse(response, reject, false);
                }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    //alert(error.message,"");
                    reject(error);
                });
            });
        }
    }, {
        key: "v1get",
        value: function v1get(url) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                (0, _nodeFetch2.default)(url).then(function (response) {
                    return _this3.handleResponse(response, reject);
                }).then(function (result) {

                    // if (result.code === '0'){
                    //
                    //     resolve(result.data);
                    //
                    // }else if (result.code === '1'){
                    //
                    //     let error =  new Error(JSON.stringify(result));
                    //     error.code = '1';
                    //     reject(error);
                    //     if (result.info){
                    //         return Alert.alert(result.info,"");
                    //     }
                    //
                    // }else {
                    //
                    //     let errorStr = "服务器异常:错误代码"+result.code;
                    //     Alert.alert(errorStr,"");
                    //     reject(new Error(errorStr));
                    //
                    // }
                    //
                    // Alert.alert(
                    //     'Alert Title',
                    //     JSON.stringify(result));


                    var error = _this3.v1handleResponseJsonData(result);

                    if (error !== undefined) {

                        //Alert.alert("333",JSON.stringify(re));

                        reject(error);
                    } else {

                        resolve(result.data);
                    }
                }).catch(function (error) {
                    //Alert.alert(error.message,"");
                    reject(error);
                });
            });
        }

        /**
         * 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
         * @param response
         */

    }, {
        key: "handleResponse",
        value: function handleResponse(response, reject) {
            var responseIsJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


            if (response.status == 200) {
                return responseIsJson ? response.json() : response.text();
            } else {

                var _errorStr = "服务器异常:错误代码" + response.status;
                //Alert.alert(errorStr,"");
                var error = new Error(_errorStr);
                reject(error);
            }
        }
    }, {
        key: "v1handleResponseJsonData",
        value: function v1handleResponseJsonData(result) {

            var error = void 0;

            if (result.code !== 0) {

                if (result.code === 1) {

                    error = new Error(JSON.stringify(result));
                    error.code = 1;
                    if (result.info) {
                        return Alert.alert(result.info, "");
                    }
                } else {

                    errorStr = "服务器异常:错误代码" + result.code;
                    //Alert.alert(errorStr,"");
                    error = new Error(errorStr);
                }
            }

            return error;
        }
    }, {
        key: "v1post",
        value: function v1post(url, data) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                (0, _nodeFetch2.default)(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Device': '13D9CC5D-6C54-46BB-957B-1371F3E621EE'
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return _this4.handleResponse(response, reject);
                }).then(function (result) {

                    var error = _this4.v1handleResponseJsonData(result);

                    if (error !== undefined) {
                        reject(error);
                    } else {

                        resolve(result.data);
                    }
                }).catch(function (error) {
                    //Alert.alert(error.message);
                    reject(error);
                });
            });
        }
    }, {
        key: "post",
        value: function post(url, data) {
            var _this5 = this;

            var isJsonData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return new Promise(function (resolve, reject) {
                (0, _nodeFetch2.default)(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Device': '13D9CC5D-6C54-46BB-957B-1371F3E621EE'
                    },
                    body: isJsonData ? JSON.stringify(data) : data
                }).then(function (response) {
                    return _this5.handleResponse(response, reject);
                }).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    //Alert.alert(error.message);
                    reject(error);
                });
            });
        }
    }]);

    return HttpUtils;
}();

exports.default = HttpUtils;