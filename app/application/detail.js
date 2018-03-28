define('application/detail', ['utils/ajaxUtil','utils/common'], function(ajaxUtil,common) {
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
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryItem + id, '1=1',1,9, function(respons) {
        if (respons.data) {
          var item = respons.data;
          _self._buildDetailDom(item);   
        }
      });
    },
    _buildDetailDom:function(item){
      var _self = this;
      $('.itemTitle').html(item.title);
      $('.itemSource').html('信息来源：'+ item.source);
      $('.itemDate').html('发布日期：'+ _self.common.formatDate(item.publishdate));
      $('.itemContent').html(item.content);
    },
  }
  return Widget;
});