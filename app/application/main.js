define('application/main', ['utils/ajaxUtil'], function(ajaxUtil) {
  var Widget = function(options) {
    var _self = this;
    _self.options = options;
    _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
    _self._init();
  };
  Widget.prototype = {
    _init: function() {
      var _self = this;
      _self._queryNews();
    },
    _queryNews:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryUrl, '1=1',1,10, function(respons) {
        if (respons.result) {
            _self.datas = respons.list;
            _self.viewModuls = _self.datas;
            _self._constructBdMap();
        }
    });
    }
    
  }
  return Widget;
});