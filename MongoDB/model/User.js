import {Alert} from "react-native";

export default class User{



    //是否是手机号
   static isPhoneNo(phoneNo){
        let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneReg.test(phoneNo)) {
            Alert.alert('请输入有效的手机号码！');
            return false;
        }else {
            return true;
        }
    }

    //验证码
    static isCode(code){
        let codeReg = /^[0-9]{6}$/;
        if (codeReg.test(code)){

            return true;

        }else {

            Alert.alert('请输入有效的验证码');

            return false;
        }
    }

    //密码
    static isPassword(password){

        if (password.length>6 && password.length < 20) {
            return true;
        }else {
            Alert.alert('请输入有效的密码');
            return false;
        }

    }


    static passwordIsValid(password,rePassword) {

        if (password === rePassword) {

            if (this.isPassword(password) && this.isPassword(rePassword)) {

                return true;
            }

            else {

                Alert.alert('密码不一致');

            }

        }
    }


    static codeIsValid(code,reCode){

       if (reCode === code){
           return true;
       } else {

           Alert.alert('验证码错误');
       }

    }



}
