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
            _self._queryProject();
        },
        _buildProjectDom:function(items){
            var _self = this;
            var html = '';
             items.forEach(function(element,index){
                html += '<tr>';

                html += '<td style="height:37px;overflow:hidden;">';
                html += '<a title="'+ element.projectname +'" href="accept.html?id='+ element.projectid +'" target="_blank">';
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

                html += '<td class="text-center">';
                html += '<a class="btn btn-xs btn-success" href="#" target="_blank" style="color: #fff;font-weight:100;margin-bottom:0px !important;">';
                html += ' 详情查看';
                html += '</a>  ';
                if(element.typename == '参数确定' && element.statusname == '已发证'){
                    html += '<a class="btn btn-xs btn-danger" href="#“ target="_blank" style="font-weight:100;margin-bottom:0px !important;"">';
                    html += ' 报告下载';
                    html += '</a> ';
                    html += '<a class="btn btn-xs btn-info" href="accept.html?id='+ element.projectid +'" target="_blank" style="font-weight:100;margin-bottom:0px !important;"">';
                    html += '申请验收';
                    html += '</a> ';
                }
                html += '</td>';
                html += '</tr>';
             });
             $('#projectList').html(html);
        },
        _queryProject:function(){
            var _self = this;
            var query = {
                q: "applyman='" + sessionStorage.username + "'",
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