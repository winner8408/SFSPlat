define('application/mycontent', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
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
            _self._getAuthorInfo();
            _self._queryProject();
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
        _buildProjectDom:function(items){
            var _self = this;
            var html = '';
             items.forEach(function(element,index){
                html += '<tr>';
                html += '<td style="width:20%;height:37px;overflow:hidden;">';
                html += '<a id="datarows_123456" name="datarows_123456" title="'+ element.projectname +'" href="accept.html?id='+ element.projectid +'" target="_blank">';
                html += element.projectname +'</a>';
                html += '</td>';
                html += '<td class="text-center ">';
                html += element.typename;
                html += '</td>';
                html += '<td class="text-center ">';
                html += _self.common.formatDate(element.applydate);
                html += '</td>';
                html += '<td class="text-center ">';
                html += element.statusname;
                html += '</td>';
                html += '<td class="text-center ">';
                if(element.typename == '参数确定' && element.statusname == '已发证'){
                    html += '<a id="datarows_123456" name="datarows_123456" title="'+ element.projectname +'" href="accept.html?id='+ element.projectid +'" target="_blank">申请验收</a>';
                }else{
                    html += '办理中'
                }
                html += '</td>';
                html += '</tr>';
             });
             $('#projectList').html(html);
        },
        _queryProject:function(){
            var _self = this;
            var query = {
                q: "1=1",
                currentPage: 0,
                pageSize: 10
            };
            try {
                $.ajax({
                    type: "POST",
                    url: _self.options.OprUrls.common.queryUrl,
                    dataType: "json",
                    data: JSON.stringify(query),     
                    contentType: "application/json",
                    timeout: 30000,
                    success: function(respons, status, xhr) {
                        if (respons.data) {
                            var projects = respons.data.list;
                            if (respons.data.total !== 0) {
                                _self._buildProjectDom(projects);
                            }else{
                              _self._buildNoneDom();
                            }
                        }
                    },
                    error: function(xhr, error, exception) {

                    },
                });
            } catch (e) {
            }
        },
    };

    return Widget;
});