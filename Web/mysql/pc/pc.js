1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
 
var t1 = new Date().getTime();
var allpage = 30;
var urllist = new Array()  ;
var urldata = new Array();
var mark = 0;
var no = 0;
for (var i=0; i<allpage; i++) {
    if (i==0) 
        urllist[i] = 'http://www.zhongchou.com/browse/di'
    else
        urllist[i] = 'http://www.zhongchou.com/browse/di-p'+(i+1).toString();
    // console.log(urllist[i]);
    request(urllist[i],function(error,resp,body){
        if (!error && resp.statusCode==200) {
            getUrl(body);
        }
    });
} 
 
function getUrl(data) {
    mark += 1;
    var start = 5000
    while (true) {
        var index1 = data.indexOf("deal-show", start);
        if (index1 == -1)     
            break;
        var url = "http://www.zhongchou.com/deal-show/"+data.substring(index1+10,index1+19)+"\n";
        // console.log(url);
        if (urldata.indexOf(url)==-1) {
            urldata.push(url);
        }
        start = index1 + 1000;
    }
    if (mark==allpage) {//所有页面执行完毕
        // console.log(urldata);
        no = urldata.length;
        fs.writeFile('./nodestandard.txt',urldata.join(""),function(err){
                    if(err) throw err;
        });
        var t2 = new Date().getTime();
        console.log("it takes " + ((t2-t1)/1000).toString() + " Seconds to get " + no.toString() + " items");
    }  
}
