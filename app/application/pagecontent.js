define('application/pagecontent', ['utils/ajaxUtil','utils/common'], function(ajaxUtil,common) {
  var Widget = function(options) {
    var _self = this;
    _self.options = options;
    _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
    _self.common = new common();
    _self._init();
  };
  Widget.prototype = {
    _init: function() {
      var _self = this;
      _self._queryDetail();
    },
    _queryDetail:function(){
      var _self = this;
      var id = _self.common.getQueryStringByKey('id');
      var type = _self.common.getQueryStringByKey('type');
      var url = '';
      if(type == 'news'){
        url = _self.options.OprUrls.news.queryItem + id;
      }else{
        url = _self.options.OprUrls.notice.queryItem + id;
      }
      _self.ajaxUtil.search(url, '1=1',1,9, function(respons) {
        if (respons.data) {
          var item = respons.data;
          _self._buildDetailDom(item,type);   
        }
      });
    },
    _buildDetailDom:function(item,type){
      var _self = this;
      $('.itemType').html(item.type);
      $('.itemTitle').html(item.title);
      if(type == 'news'){
        $('.itemSource').html('信息来源：'+ item.source);
        $('.itemDate').html('发布日期：'+ _self.common.formatDate(item.publishdate));
      }else{
        $('.itemSource').html('发布者：'+ item.publisher);
        $('.itemDate').html('发布日期：'+ _self.common.formatDate(item.publishDate));
      }
      $('.itemContent').html(item.content);
    },
  }
  return Widget;
});