import fetch from 'node-fetch';

export default class HttpUtils{

    static get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>{


                      return this.handleResponse(response,reject);


                      // let result = this.handleResponse(response,reject);
                      //
                      // if (typeof result !== "undefined"){
                      //     return result;
                      // }

                    }
                )
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    //Alert.alert(error.message,"");
                    reject(error)
                })
        })
    }

    /**
     * 用于response不是json的情况
     * @param url
     * @returns {Promise<any>}
     */
    static getText(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>{
                        return this.handleResponse(response,reject,false);
                    }
                )
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    //alert(error.message,"");
                    reject(error)
                })
        })
    }







    static v1get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>this.handleResponse(response,reject))
                .then(result=>{

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



                    let error = this.v1handleResponseJsonData(result);


                    if (error !==undefined){

                        //Alert.alert("333",JSON.stringify(re));

                        reject(error);
                    }else {

                        resolve(result.data);
                    }

                })
                .catch(error=>{
                    //Alert.alert(error.message,"");
                    reject(error);
                })
        })
    }


    /**
     * 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
     * @param response
     */
    static  handleResponse(response,reject,responseIsJson=true){

        if (response.status  == 200)
        {
            return responseIsJson ? response.json():response.text();

        }else {

            let errorStr = "服务器异常:错误代码"+response.status;
            //Alert.alert(errorStr,"");
            let error = new Error(errorStr);
            reject(error);

        }

    }


    static v1handleResponseJsonData(result){

        let error

        if (result.code !== 0) {

            if (result.code === 1){

                error = new Error(JSON.stringify(result));
                error.code = 1;
                if (result.info){
                    return Alert.alert(result.info,"");
                }

            }else {

                errorStr = "服务器异常:错误代码"+result.code;
                //Alert.alert(errorStr,"");
                error = new Error(errorStr);

            }


        }

        return error;

    }


    static v1post(url, data) {
        return new Promise((resolve, reject)=>{
            fetch(url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Device': '13D9CC5D-6C54-46BB-957B-1371F3E621EE',
                },
                body:JSON.stringify(data)
            })
                .then(response=>this.handleResponse(response,reject))
                .then(result=>{

                    let error = this.v1handleResponseJsonData(result);

                    if (error !==undefined){
                        reject(error);
                    }else {

                        resolve(result.data);
                    }

                })
                .catch(error=>{
                    //Alert.alert(error.message);
                    reject(error)
                })
        })
    }

    static post(url, data,isJsonData=true) {
        return new Promise((resolve, reject)=>{
            fetch(url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Device': '13D9CC5D-6C54-46BB-957B-1371F3E621EE',
                },
                body:isJsonData ? JSON.stringify(data) :data
            })
                .then(response=>this.handleResponse(response,reject))
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    //Alert.alert(error.message);
                    reject(error)
                })
        })
    }
}
