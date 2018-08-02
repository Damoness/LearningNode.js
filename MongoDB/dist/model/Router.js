'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _NewsModel = require('./NewsModel');

var _reactNavigation = require('react-navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);
    }

    _createClass(Router, null, [{
        key: 'getActionWithNewsModel',
        value: function getActionWithNewsModel(model) {

            var pushAction = void 0;

            if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_DontJump) {

                //空跳转
                return pushAction;
            } else if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_Article) {

                //文章
                pushAction = _reactNavigation.StackActions.push({
                    routeName: 'ArticleScreen',
                    params: {
                        newsId: model.jumpContent
                    }
                });
            } else if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_Video) {

                //视频
                pushAction = _reactNavigation.StackActions.push({
                    routeName: 'VideoDetailScreen',
                    params: {
                        newsId: model.jumpContent
                    }
                });
            } else if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_Subject) {

                _reactNative.NativeModules.RouterManager.goToNextVCWith(model);
                return {};

                //专题
                pushAction = _reactNavigation.StackActions.push({
                    routeName: 'SubjectScreen',
                    params: {
                        newsId: model.jumpContent
                    }
                });
            } else if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_Live) {

                _reactNative.NativeModules.RouterManager.goToNextVCWith(model);
                return {};

                //直播
                pushAction = _reactNavigation.StackActions.push({
                    routeName: 'LiveScreen',
                    params: {
                        newsId: model.jumpContent
                    }
                });
            } else if (model.redirectId == _NewsModel.NewsJumpType.QCNewsJumpType_Web) {

                //网页
                pushAction = _reactNavigation.StackActions.push({
                    routeName: 'WebScreen',
                    params: {
                        url: model.jumpContent,
                        title: model.title
                    }
                });
            }

            return pushAction;
        }
    }]);

    return Router;
}();

exports.default = Router;