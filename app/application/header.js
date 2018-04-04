define('application/header', ['utils/ajaxUtil','utils/common'], function(ajaxUtil,common) {
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
      _self._buildTopbar();
      _self._getAuthorInfo();
      if(window.location.pathname.indexOf('index.html')< 0){
        _self._buildTopNavbar();
      }
      _self._buildFooter();
    },
    //创建头部栏
    _buildTopbar:function(){
       var html = '';
       html += '<div class="container">';
       html += '<div class="row">';

       html += '<div class="col-sm-6">';
       html += '<ul class="right-topbar list-inline">';
       html += '<li><a href="http://www.cea.gov.cn/" target="_blank" class="white">中国地震局网站</a></li>';
       html += '<li><a href="http://www.cea-igp.ac.cn/" target="_blank" class="white">中国地震局地球物理研究所网站</a></li>';
       html += '</ul>';
       html += '</div>';

       html += '<div class="col-sm-6">';
       html += '<ul class="left-topbar pull-right">';
       html += '<li>';
       html += '<a>政务微博</a>';
       html += '<ul class="currency">';
       html += '<li><a href="https://m.weibo.cn/u/2652415683" target="_blank"><i class="fa fa-weibo"></i>&nbsp;新浪微博</a></li>';
       html += '<li><a href="http://xian.qq.com/zt2014/xazwfb/" target="_blank"><i class="fa fa-tencent-weibo"></i>&nbsp;腾讯微博</a></li>';
       html += '</ul>';
       html += '</li>';
       html += '<li>';
       html += '<a href="http://www.xa.gov.cnptl/def/def/index_1121_6950.html" target="_blank">手机客户端</a>';
       html += '<ul class="language">';
       html += '<li><a href="http://www.gxdzj.gov.cn/dzjappdownload.jspx"><i class="fa fa-android"></i>&nbsp;安卓客户端</a></li>';
       html += '<li><a href="https://itunes.apple.com/cn/app/zhong-guo-xi-an/id965460929?mt=8"><i class="fa fa-apple"></i>&nbsp;苹果客户端</a></li>';
       html += '</ul>';
       html += '</li>';

       html += '<li>';
       html += '<a>微信</a>';
       html += '<ul class="currency">';
       html += '<li><a href="http://mail.xa.gov.cn" target="_blank"><i class="fa fa-weixin"></i>&nbsp;微信</a></li>';
       html += '</ul>';
       html += '</li>';

       html += '<li>';
       html += '<a>邮箱</a>';
       html += '<ul class="currency">';
       html += '<li><a href="http://mail.xa.gov.cn" target="_blank"><i class="fa fa-envelope-o"></i>&nbsp;邮箱地址</a></li>';
       html += '</ul>';
       html += '</li>';

       html += '<li class="loginBut">';
       html += '<a href="login.html">登入</a>';
       html += '</li>';

       html += '<li class="userInfo" style="display:none;">';
       html += '<a data-toggle="dropdown" class="dropdown-toggle username" href="#">';
       html += ' 欢迎， 陈波 <b class="caret"></b>';
       html += '</a>';
       html += '<ul style="margin-top:-10px;" role="menu" class="dropdown-setting dropdown-menu">';
       html += '<li>';
       html += '<a href="mycontent.html">';
       html += '<span class="entypo-user"></span> &#160;&#160;个人资料';
       html += '</a>';
       html += '</li>';
       html += '<li>';
       html += '<a href="login.html">';
       html += '<span class="entypo-logout"></span> &#160;&#160; 退出';
       html += '</a>';
       html += '</li>';
       html += '</ul>';
       html += '</li>';
       html += '</ul>';
       html += '</div>';
       html += '</div>';
       html += '</div>';
       $('.topbar-v3').html(html);
    },
    _buildTopNavbar:function(){
      var html = '';
      html += '<div class="container">';
      html += '<div class="navbar-header">';
      html += '<a class="navbar-brand no-padding-top no-padding-bottom" href="http://www.xa.gov.cn/ptl/def/def/index_1121_7564.html#">';
      html += '<img id="logo-header" src="libs/unify/assets/img/themes/logo1-red.png" alt="Logo" style="height: 68px; display: inline-block;">';
      html += '</a>';
      html += '</div>';
      html += '<div class="collapse navbar-collapse navbar-responsive-collapse">';
      html += '<ul class="nav navbar-nav pull-right">';
      html += '<li class="active">';
      html += '<a href="index.html">';
      html += '首页';
      html += '</a>';
      html += '</li>';
      html += '<li class="mega-menu-fullwidth">';
      html += '<a href="list.html" target="_blank">';
      html += '震防规划';
      html += '</a>';
      html += '</li>';
      html += '<li class="mega-menu-fullwidth">';
      html += '<a href="list.html" target="_blank">';
      html += '安居工程';
      html += '</a>';
      html += '</li>';
      html += '<li class="mega-menu-fullwidth">';
      html += '<a href="list.html" target="_blank">';
      html += '办事指南';
      html += '</a>';
      html += '</li>';
      html += '<li class="mega-menu-fullwidth">';
      html += '<a href="list.html" target="_blank">';
      html += '信息公开';
      html += '</a>';
      html += '</li>';
      html += '<li class="mega-menu-fullwidth">';
      html += '<a href="list.html" target="_blank">';
      html += '关于';
      html += '</a>';
      html += '</li>';
      html += '</ul>';
      html += '</div>';
      html += '</div>';
      $('.topNavbar').html(html);
    },
    _getAuthorInfo: function() {
      var _self = this;
      if (sessionStorage.token) {
        $('.loginBut').css('display','none');
        $('.userInfo').css('display','inline');
        $(".username").html('欢迎，' + sessionStorage.username + ' <i class="icon-chevron-down"></i>');
      } else {
        $('.loginBut').css('display','inline');
        $('.userInfo').css('display','none');
      }
    },
    _buildFooter:function(){
      var _self = this;
      var html = '';
      html += '<div class="copyright">';
      html += '<div class="container">';
      html += '<div class="row">';
      
      html += '<div class="col-md-6 col-sm-12">';
      html += '<p class="no-margin" style="font-size:12px!important;">中国地震局地球物理研究所主办&nbsp;';
      html += '<a href="#" target="_blank">关于我们</a>|';
      html += '<a href="#" target="_blank">联系我们</a>|';
      html += '<a href="#" target="_blank">网站声明</a>|';
      html += '<a href="#" arget="_blank">站点地图</a>';
      html += '&nbsp;&nbsp;&nbsp;';
      html += '</p>';
      html += '</div>';

      html += '<div class="col-md-6 col-sm-12 pull-right">';
      html += '<a href="index.html">';
      html += '<span style="margin-top:5px;">';
      html += '<a href="http://www.12377.cn/" target="_blank">';
      html += '<img id="12377logo" src="images/footer_logo.png" style="width:30px;">';
      html += '</a>';
      html += '<a href="http://www.12377.cn/" target="_blank" style="font-size:8px!important;">';
      html += '互联网举报中心';
      html += '</a>';
      html += '</span>';
      html += '</a>';
      html += '<a href="index.html">';
      html += '<span id="_ideConac">';
      html += '<a href="#"';
      html += 'target="_blank">';
      html += '<img id="imgConac" vspace="0" hspace="0" border="0" src="//dcs.conac.cn/image/red.png"';
      html += 'data-bd-imgshare-binded="1" style="width: 40px;">';
      html += '</a>';
      html += '<a style="cursor:default;text-decoration:none;">';
      html += '京ICP备17063912号-1';
      html += '</a>';
      html += '</span>';
      html += '<span id="cnzz_stat_icon_4591279">';
      html += '<a href="http://www.cnzz.com/stat/website.php?web_id=4591279" target="_blank"';
      html += 'title="站长统计">';
      html += '<img border="0" hspace="0" vspace="0" src="http://icon.cnzz.com/img/pic1.gif">';
      html += '</a>';
      html += '</span>';
      html += '</a>';
      html += '<span id="_span_jiucuo" style="margin-left:15px;">';
      html += '</span>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';

      $('#footer-default').html(html);
    }
  }
  return Widget;
});