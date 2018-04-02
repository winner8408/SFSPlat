/**
 * @author DYTH 2015
 */

var baseOprUrl = "http://47.93.32.53/kzsf-platform";
// var baseOprUrl = "http://192.168.1.157:8080/dyth";
var configOptions = {
    "authorInfoKey": "authorInfo",
    "proxyUrl": "app/proxy/proxy.jsp",
    "isLogin": true,
    "LoginUrls": {
        "url": "http://124.17.4.31:8080/dbas2region/authentication/localbureau/login"
    },
    "thumbnailBaseUrl": baseOprUrl + "/",
    "OprUrls": {
        "news": {
            "queryUrl": baseOprUrl + "/news/search",
            "queryItem": baseOprUrl + "/news/",
            'queryUp' :baseOprUrl  + "/news/query/up/news",
            "queryThumbnail":baseOprUrl + '/file/item/thumbnail/news/',
            "updateUrl": baseOprUrl + "/building/update"
        },
        "notice": {
            "queryUrl": baseOprUrl + "/notice/search",
            "queryItem": baseOprUrl + "/notice/"
        },
        "common": {
            "queryUrl": baseOprUrl + "/common/search"
        },
        "file": {
            "queryUrl": baseOprUrl + "/film/item/thumbnail/news/",
        },
        "project": {
            "createUrl": baseOprUrl + "/project/create",
        },
        "security": {
            "sendCode": baseOprUrl + "/code/sms?mobile=",
            "register": baseOprUrl + "/security/register",
            "login": baseOprUrl + '/authentication/form',
        },
    },
    "enumDatas": {}
};