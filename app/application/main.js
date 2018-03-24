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
      _self._queryNotice();
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
    _queryNotice:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.notice.queryUrl, '1=1',1,9, function(respons) {
        if (respons.data) {
            var notice = respons.data.list;
            _self._buildNoticeDom(notice);
        }
      });
    },
    _buildNewsDom:function(news){
      var html = '';
      html += '<ul style="list-style: none; line-height: 2; margin:0 10px;" class="padding-0">';
      news.forEach(element => {
        html += '<li>';
        html += '<div class="col-xs-12 col-md-12 padding-0" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">';
        html += '<span class="color-green" style="font-weight: 700;">';
        html += '&bull;';
        html += '</span>';
        html += '<span class="font-color6">';
        html += '<a href="ptl/def/def/index_1121_6774.jsp?trid=2523658" target="blank"';
        html += 'title="'+ element.title +'"> ';
        html += element.title;
        html += ' </a>';
        html += '</span>';
        html += '</div>';
        html += '</li>';
      });
      html += '</ul>';
      $('.news').html(html);
    },
    _buildNoticeDom:function(notice){
       var html = '';
       html += '<ul style="list-style: none; line-height: 2; margin:0 10px;" class="padding-0">';
       notice.forEach(element => {
        html += '<li>';
        html += '<div class="col-xs-12 col-md-12 padding-0" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">';
        html += '<span class="color-green" style="font-weight: 700;">';
        html += '&bull;';
        html += '</span>';
        html += '<span>';
        html += '<a target="_blank" class="color-green" href="ptl/def/def/index_1121_6899.jsp?trid=4379167&levNo=2&sortNo=1">';
        html += '【'+ element.type +'】';
        html += '</a> ';   
        html += ' </span>';
        html += '<span class="font-color6">';
        html += '<a href="ptl/def/def/index_1121_6774.jsp?trid=2523670" target="blank"';
        html += 'title="'+ element.title +'">';
        html += element.title;
        html += '</a>';
        html += '</span>';
        html += '</div>';
        html += '</li>';
       });
       html += '</ul>';
       $('.notice').html(html);
    },

    
  }
  return Widget;
});