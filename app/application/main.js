define('app/application/main', ['app/utils/ajaxUtil'], function() {
  var Widget = function() {
    var _self = this;
    _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
    _self._init();
  };
  Widget.prototype = {
    _init: function() {
      var _self = this;
      alert('nihao');
    },
    _setDefaultOptions: function() {
      _self.ajaxUtil.search(_self.options.OprUrls.zoningInfo.searchUrl, "administRegion.address like '%" + queryStr + "%'", _self.searchCache.start, _self.searchCache.num, function(respons) {
        if (respons.results) {
            _self.datas = respons.results;
            _self.viewModuls = _self.datas;
            _self._constructTable();
            _self._constructBdMap();
            var currentPage = Math.ceil(_self.searchCache.start / _self.searchCache.num) - 1;
            _self._renderPagination("#pagination", currentPage, respons.totalRecords, _self.searchCache.num, function(pageIndex) {
                _self.searchCache.start = pageIndex * _self.searchCache.num + 1;
                _self._requestDatas();

            });
            $('.tfooter').removeClass('loading-light');
        }
    }, 'cb49c793-2572-4687-8347-7a14e97c0848');
    },
  }
  return Widget;
});