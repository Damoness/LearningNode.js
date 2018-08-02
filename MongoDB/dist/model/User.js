'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, null, [{
        key: 'isPhoneNo',


        //是否是手机号
        value: function isPhoneNo(phoneNo) {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!phoneReg.test(phoneNo)) {
                _reactNative.Alert.alert('请输入有效的手机号码！');
                return false;
            } else {
                return true;
            }
        }

        //验证码

    }, {
        key: 'isCode',
        value: function isCode(code) {
            var codeReg = /^[0-9]{6}$/;
            if (codeReg.test(code)) {

                return true;
            } else {

                _reactNative.Alert.alert('请输入有效的验证码');

                return false;
            }
        }

        //密码

    }, {
        key: 'isPassword',
        value: function isPassword(password) {

            if (password.length > 6 && password.length < 20) {
                return true;
            } else {
                _reactNative.Alert.alert('请输入有效的密码');
                return false;
            }
        }
    }, {
        key: 'passwordIsValid',
        value: function passwordIsValid(password, rePassword) {

            if (password === rePassword) {

                if (this.isPassword(password) && this.isPassword(rePassword)) {

                    return true;
                } else {

                    _reactNative.Alert.alert('密码不一致');
                }
            }
        }
    }, {
        key: 'codeIsValid',
        value: function codeIsValid(code, reCode) {

            if (reCode === code) {
                return true;
            } else {

                _reactNative.Alert.alert('验证码错误');
            }
        }
    }]);

    return User;
}();

exports.default = User;