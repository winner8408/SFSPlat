define('application/apply', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
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
            _self.searchCache = {
                currentPage: 0,
                num: 10, //itemPerPage
            };
            _self.q = '1=1';
            var typename = _self.common.getQueryStringByKey('typename');
            var applyman = _self.common.getQueryStringByKey('applyman');
            if(typename || applyman){
               
                if(typename == ''){
                    _self.q = "applyman='"+ applyman +"'";
                }else if (applyman == ''){
                    if(typename == '01'){
                        typename = '参数确定'
                    }else{
                        typename = '竣工验收'
                    }
                    _self.q = "typename='"+ typename +"'";
                }else{
                    if(typename == '01'){
                        typename = '参数确定'
                    }else{
                        typename = '竣工验收'
                    }
                    _self.q = "applyman='"+ applyman +"'" + ' and ' + "typename='"+ typename +"'";
                }
            }
            _self._queryProject();
            //查询事件
            _self._search();
        },
        //查询点击事件
        _search:function(){
            _self = this;
            $('#buttonSearch').on('click',function(){
                var q1 ='';
                var q2 ='';
                _self.searchCache.currentPage = 0 ;
                if($('#applyman').val() != ''){
                    q1 = "applyman='"+ $('#applyman').val() +"'";
                }
                if($('#typename').val() != ''){
                    q2 = "typename='"+ $('#typename').val() +"'";
                }
                if(q1 ==''&& q2 ==""){
                   _self.q = "1=1";
                }else if(q1 == ""){
                    _self.q = q2;
                }else if(q2 == ""){
                    _self.q = q1;
                }else {
                    _self.q = q1 + ' and ' + q2;
                }
                _self._queryProject();
            });
            $('#buttonReset').on('click',function(){
                _self.searchCache.currentPage = 0 ;
                _self.q = "1=1";
               _self._queryProject();
            });
        },
        _buildProjectDom:function(items){
            var _self = this;
            var html = '';
            html += '<tr style="background: #3498db; color: #fff;">';
            html += '<td class="text-center" style="width:25%;height:40px;">';
            html += '项目名称';
            html += '</td>';
            html += '<td class="text-center" style="width:25%;">';
            html += '申报人';
            html += '</td>';
            html += '<td class="text-center" style="width:29%;">';
            html += '申请事项';
            html += '</td>';
            html += '<td class="text-center" style="width:12%;">';
            html += '申报日期';
            html += '</td>';
            html += '<td class="text-center" style="width:10%;">';
            html += '办理状态';
            html += '</td>';
            html += '</tr>';
            items.forEach(function(element,index){
                html += '<tr>';

                html += '<td style="height:37px;overflow:hidden;">';
                html += element.projectname;
                html += '</td>';

                html += '<td class="text-center ">';
                html += element.applyman;
                html += '</td>';

                html += '<td class="text-center ">';
                html += element.typename;
                html += '</td>';

                html += '<td class="text-center ">';
                html += _self.common.formatDate(element.applydate);
                html += '</td>';

                html += '<td class="text-center ">';
                html += '<span class="label label-green">'+element.statusname+'</span>';
                html += '</td>';

                html += '</tr>';
             });
             $('#projectList').html(html);
        },
        _queryProject:function(){
            var _self = this;
            _self.ajaxUtil.search(_self.options.OprUrls.common.queryUrl, _self.q,_self.searchCache.currentPage,_self.searchCache.num, function(respons) {
                if (respons.data) {
                  var notice = respons.data.list;
                  _self._buildProjectDom(notice);
                  _self._renderPagination("#pagination", _self.searchCache.currentPage == 0 ?  _self.searchCache.currentPage :  _self.searchCache.currentPage-1,respons.data.total, _self.searchCache.num, function(pageIndex) {
                      _self.searchCache.currentPage = pageIndex + 1;
                      _self._queryProject();
                  });
                }
            });
        },
        _renderPagination: function(id, pageIndex, total, itemPerPage, callback) {
            //分页控件初始化
            $(id).pagination(total, {
                'items_per_page': itemPerPage,
                'current_page': pageIndex, //默认0，第一页
                'num_display_entries': 5,
                'num_edge_entries': 1,
                'prev_text': "上一页",
                'next_text': "下一页",
                'callback': callback
            });
         },
    };

    return Widget;
});