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
      _self._queryUpNews();
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
    _queryUpNews:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryUp, '1=1',1,9, function(respons) {
        if (respons.data) {
            var upNews = respons.data.list;
            _self._buildUpNewsDom(upNews);
        }
      });
    },
    _buildUpNewsDom:function(upNews){
      var _self = this;
      var html = '';
      html += '<ol class="carousel-indicators">';
      for(var i = 0 ; i < upNews.length;i++){
         if(i== 0){
          html += '<li class="rounded-x active" data-target="#portfolio-carousel" data-slide-to="'+ i +'">';
          html += '</li>';
         }else{
          html += '<li class="rounded-x" data-target="#portfolio-carousel" data-slide-to="'+ i +'">';
          html += '</li>';
         }
      };
      html += '</ol>';
  
      html += ' <div class="carousel-inner divT1">';
      upNews.forEach(function(element,index){
        if(index == 0){
          html += '<div class="item active">';
        }else{
          html += '<div class="item">';
        }
        html += '<a target="_blank" href="http://www.xa.gov.cnptl/def/def/index_1121_6774_ci_trid_2496279.html">';
        html += ' <img class="img-responsive full-width" src="'+ _self.options.OprUrls.news.queryThumbnail + element.thumbnail+'" alt="'+ element.title +'"';
        html += ' title="'+ element.title +'" style="opacity: 1; height: 280px;" />';
        html += '</a>';
        html += ' </div>';
      });
      html += '</div>';
      html += ' <a class="left carousel-control rounded-x" href="#portfolio-carousel" role="button" data-slide="prev">';
      html += ' <i class="fa fa-angle-left arrow-prev">';
      html += '</i>';
      html += '</a>';
      html += '<a class="right carousel-control rounded-x" href="#portfolio-carousel" role="button" data-slide="next">';
      html += '<i class="fa fa-angle-right arrow-next">';
      html += '</i>';
      html += '</a>';
      $('#portfolio-carousel').html(html);
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