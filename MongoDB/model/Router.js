import React, {Component} from 'react';
import {
    StyleSheet,
    SectionList,
    Alert,
    Dimensions,
    WebView,
    Text,
    View,
    Platform,
    TouchableOpacity, NativeModules,

} from 'react-native';

import {NewsJumpType} from "./NewsModel";
import {StackActions} from "react-navigation";

export default class Router{

    static getActionWithNewsModel(model){


        let pushAction;


        if (model.redirectId == NewsJumpType.QCNewsJumpType_DontJump){

            //空跳转
            return  pushAction;

        } else if (model.redirectId == NewsJumpType.QCNewsJumpType_Article) {

                //文章
            pushAction = StackActions.push({
                routeName: 'ArticleScreen',
                params: {
                    newsId: model.jumpContent,
                },
            });

        }else if (model.redirectId ==  NewsJumpType.QCNewsJumpType_Video){

            //视频
            pushAction = StackActions.push({
                routeName: 'VideoDetailScreen',
                params: {
                    newsId: model.jumpContent,
                },
            });


        }else if (model.redirectId ==  NewsJumpType.QCNewsJumpType_Subject){

            NativeModules.RouterManager.goToNextVCWith(model);
            return  {};

            //专题
            pushAction = StackActions.push({
                routeName: 'SubjectScreen',
                params: {
                    newsId: model.jumpContent,
                },
            });

        }else if (model.redirectId ==  NewsJumpType.QCNewsJumpType_Live){

            NativeModules.RouterManager.goToNextVCWith(model);
            return  {};

            //直播
            pushAction = StackActions.push({
                routeName: 'LiveScreen',
                params: {
                    newsId: model.jumpContent,
                },
            });

        }else if (model.redirectId == NewsJumpType.QCNewsJumpType_Web){

            //网页
            pushAction = StackActions.push({
                routeName: 'WebScreen',
                params: {
                    url:model.jumpContent,
                    title:model.title,
                },
            });

        }

        return pushAction;

    }


}
