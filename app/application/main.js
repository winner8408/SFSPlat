define('application/main', ['utils/ajaxUtil','utils/common'], function(ajaxUtil,common) {
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
      //首页 ---热点关注
      //新闻置顶  新闻轮播图 
      _self._queryUpNews();
      // 通知公告
      _self._queryNotice();
      // 震防要闻
      _self._queryNews();
      // 办件公示
      _self._queryCommon();
      // 办件搜素
      _self._seachCommon();
    },
    //新闻轮播图
    _queryUpNews:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryUp, '1=1',1,9, function(respons) {
        if (respons.data) {
            var upNews = respons.data.list;
            _self._buildUpNewsDom(upNews);
        }
      });
    },
    // 新闻轮播 dom
    _buildUpNewsDom:function(upNews){
      var _self = this;
      var html = '';
      // html += '<ol class="carousel-indicators">';
      // for(var i = 0 ; i < upNews.length;i++){
      //    if(i== 0){
      //     html += '<li class="rounded-x active" data-target="#portfolio-carousel" data-slide-to="'+ i +'">';
      //     html += '</li>';
      //    }else{
      //     html += '<li class="rounded-x" data-target="#portfolio-carousel" data-slide-to="'+ i +'">';
      //     html += '</li>';
      //    }
      // };
      // html += '</ol>';
  
      html += ' <div class="carousel-inner divT1">';
      upNews.forEach(function(element,index){
        if(index == 0){
          html += '<div class="item active">';
        }else{
          html += '<div class="item">';
        }
        html += '<a target="_blank" href="pageContent.html?id='+element.id+'&type=news">';
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
    // 通知公告
    _queryNotice:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.notice.queryUrl, '1=1',1,9, function(respons) {
        if (respons.data) {
          var notice = respons.data.list;
          _self._buildNoticeDom(notice);
          _self._buildNoticeBar(notice);
        }
      });
    },
    // 通知dom
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
       html += '<a target="_blank" class="color-green" href="#">';
       html += '【'+ element.type +'】';
       html += '</a> ';   
       html += ' </span>';
       html += '<span class="font-color6">';
       html += '<a href="pageContent.html?id='+ element.id +'&type=notice" target="blank"';
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
   //通知滚动条
  _buildNoticeBar:function(notice){
     var html = '';
     html += '<marquee onmouseover=stop() onmouseout=start()>';
     notice.forEach(function(element,index){
       if(index < 3){
         html += '<span style="margin:0px;padding:0px;height:14px;padding-right:30px;overflow:hidden;max-width:500px;">';
         html += '<a class="color-green" title="'+ element.title +'" href="#" target="_blank" >';
         html += '<i class="fa fa-volume-up color-green">';
         html += '</i>';
         html += '&nbsp;&nbsp;';
         html += element.type + '：'+ element.title +'</a>';
         html += '</span>';
       }
     });
     html += '</marquee>';
     $('.noticeBar').html(html);
  },
    // 震防要闻
    _queryNews:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.news.queryUrl, "summary='防震减灾'",1,9, function(respons) {
        if (respons.data) {
            var news = respons.data.list;
            _self._buildNewsDom(news);
        }
      });
    },
    // 震防要闻 dom
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
        html += '<a href="pageContent.html?id='+ element.id +'&type=news" target="blank"';
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

    _queryCommon:function(){
      var _self = this;
      _self.ajaxUtil.search(_self.options.OprUrls.common.queryUrl, '1=1',1,9, function(respons) {
        if (respons.data) {
            var common = respons.data.list;
            _self._buildCommonDom(common);
        }
      });
    },
    _seachCommon:function(){
       $('.searchBtn').on('click',function(){
          var applyman = $('#applyman').val();
          var typename = $('#typename').val();
          if(applyman != '' || typename != ''){
            window.location.href ='apply.html?applyman='+ applyman+'&typename='+ typename;
          }
       });
       $('.resetBtn').on('click',function(){
        $('#applyman').val('');
        $('#typename').val('00');
     });
    },
    _buildCommonDom:function(items){
      var _self = this;
      var html = '';
      html += '<li style="margin-bottom: 0px;">';
      items.forEach(function(item,index){
        if(item.projectname.length > 16){
          item.projectname = item.projectname.substring(0,16) + '...'
        }
        html += '<div style="margin-bottom: 0px;">';
        html += '<table class="table" style="border-collapse: collapse; width:100%;line-height:42px;text-align:left;">';
        html += '<tbody>';
        html += '<tr style="color:#666666; font-size:14px;">';
        html += '<td style="width:15%;overflow:hidden;line-height:2.4;" title="'+item.applyman+'">'+item.applyman+'</td>';
        html += '<td style="width:15%;overflow:hidden;line-height:2.4;" title="抗震设防参数确定">'+item.typename+'</td>';
        html += '<td style="width:30%;overflow:hidden;line-height:2.4;">'+ item.projectname+'</td>';
        html += '<td style="width:20%;overflow:hidden;line-height:2.4;">'+ _self.common.formatDate(item.applydate)+'</td>';
        html += '<td style="width:10%;overflow:hidden;vertical-align: middle;" class="text-center">';
        html += '<span class="label label-blue">'+item.statusname+'</span>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
      });                        
      html += '</li>';
      $('.Mqlist').html(html);
      $('#Marquee').jcMarquee({
        'marquee': 'y',
        'margin_bottom': '0',
        'margin_right': '0px',
        'speed': 20
    });
   },
    
    
  }
  return Widget;
});