/**
 * @author DYTH 2015
 */

var baseOprUrl = "http://47.93.32.53/kzsf-platform";
var configOptions = {
    "authorInfoKey": "authorInfo",
    "style": "normal", 
    "city": "西安",
    "showBound": false,
    "zoomlevel": 6,
    "proxyUrl": "app/proxy/proxy.jsp",
    "publicUrl": "http://www.gb18306.cn/",
    "isLogin": true,
    "LoginUrls": {
        "url": "http://124.17.4.31:8080/dbas2region/authentication/localbureau/login"
    },
    "thumbnailBaseUrl": baseOprUrl + "/",
    "OprUrls": {
        "news": {
            "queryUrl": baseOprUrl + "/news/search",
            'queryUp' :baseOprUrl  + "/news/query/up/news",
            "queryThumbnail":baseOprUrl + '/file/item/thumbnail/news/',
            "updateUrl": baseOprUrl + "/building/update"
        },
        "notice": {
            "queryUrl": baseOprUrl + "/notice/search"
        },
        "file": {
            "queryUrl": baseOprUrl + "/film/item/thumbnail/news/",
        }
    },
    "enumDatas": {}
};