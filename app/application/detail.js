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
      _self._buildDetailDom();
    },
    _buildDetailDom:function(){
      var id = _self.common.getQueryStringByKey('id');
    },
    _queryNews:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryUrl, '1=1',1,9, function(respons) {
        if (respons.data) {
            var news = respons.data.list;
            _self._buildNewsDom(news);
        }
      });
    },
  }
  return Widget;
});