define('application/mycontent', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
    var Widget = function(options) {
        var _self = this;
        _self.options = options;
        _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
        _self.common = new common();
        _self.userId ='';
        _self.username = '';
        _self._init();
    };
    Widget.prototype = {
        _init: function() {
            var _self = this;
            var type = _self.common.getQueryStringByKey('type');
            _self.searchCache = {
                currentPage: 0,
                num: 20, //itemPerPage
            };
            if(type == 'apply'){
                $('.mytype').html('我的申请');
                _self._queryProject();
            }else {
                _self._querSelfInfo();
            }
            _self._constructEvent();
        },
        _constructEvent:function(){
            var _self  = this ;
            $('.mydetail').on('click',function(){
                $(this).addClass('active');
                $('.mytype').html('我的资料');
                $('.myapply').removeClass('active');
               _self._querSelfInfo();
            });
            $('.myapply').on('click',function(){
                $('.mytype').html('我的申请');
                $(this).addClass('active');
                $('.mydetail').removeClass('active');
                _self._queryProject();
            });
            $('#submitChange').on('click',function(){
                var user = {
                    id:_self.userId,
                    name: _self.username,
                    email: $('#recipient-email').val(),
                    fullname:$('#recipient-fullname').val(),
                    mobile:$('#recipient-mobile').val(),
                    sex:$('#recipient-sex').val(),
                    company: $('#recipient-company').val()
                };

                try {
                    $.ajax({
                        type: "POST",
                        url: _self.options.OprUrls.user.updateUrl,
                        data : JSON.stringify(user),
                        contentType: "application/json",
                        dataType: "json",
                        headers:{
                            Authorization:"bearer " + sessionStorage.token
                        },
                        success: function(data, status, xhr) {
                            if (data.result) {
                                $('#myModal').modal('hide')
                                _self._querSelfInfo();
                            } else {
                            }
                        },
                        error: function(xhr, error, exception) {
    
                        },
                    });
                } catch (e) {
                    }

            });
        },
        
        _formartUrl: function(url) {
            var _self = this;
            return url.indexOf(window.location.host) > -1 ? url : _self.options.proxyUrl + '?' + url;
        },
        _querSelfInfo:function(){
            var _self = this;
            try {
                $.ajax({
                    type: "POST",
                    url: _self.options.OprUrls.user.queryUrl,
                    dataType: "json",
                    headers:{
                        Authorization:"bearer "+sessionStorage.token
                    },
                    success: function(data, status, xhr) {
                        if (data.result) {
                            _self.userId = data.data.id;
                            _self.username = data.data.name;
                            _self._buildSelfDom(data.data);
                            _self._buildSelfModal(data.data);
                        } else {
                        }
                    },
                    error: function(xhr, error, exception) {

                    },
                });
            } catch (e) {
                
            }

        },
        _buildSelfDom:function(info){
            var _self = this ;
            var html = '';
            html += '<table border="0" style="border-top: 1px solid #dfdfdf; border-bottom: 1px solid #dfdfdf;width:100%;">';
            html += '<tbody>';
            html += '<tr>';
            html += '<td style="text-align: center; width: 15%; height: 35px; border-left: 1px solid #dfdfdf; background-color: #f5f5f5;">';
            html += '<i class="fa fa-user"></i>&nbsp;登录名';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 15%; height: 35px;">' + info.name;
            html += '</td>';
            html += '<td style="text-align: center; width: 15%; height: 35px; background-color: #f5f5f5;">';
            html += '<i class="fa fa-envelope-o"></i>&nbsp;邮箱地址';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 30%; height: 35px;border-right: 1px solid #dfdfdf;">'+ info.email;
            html += '</td>';
                      
            html += '</tr>';
            
            html += '<tr>';
            html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;border-left: 1px solid #dfdfdf;">';
            html += '<i class="fa fa-user-secret"></i>&nbsp;全名';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 15%; height: 35px;border-top: 1px solid #dfdfdf;">'+ info.fullname;
            html += '</td>';
            html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;">';
            html += '<i class="fa fa-fax"></i>&nbsp;联系电话';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 30%; height: 35px;border-top: 1px solid #dfdfdf; border-right: 1px solid #dfdfdf;">' + info.mobile;
            html += '</td> ';
            html += '</tr>';

            html += '<tr>';
            html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;border-left: 1px solid #dfdfdf;">';
            html += '<i class="fa fa-venus-mars"></i>&nbsp;性别';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 15%; height: 35px;border-top: 1px solid #dfdfdf;">'+info.sex;
            html += '</td>';
            html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;">';
            html += '<i class="fa fa-university"></i>&nbsp;公司名称';
            html += '</td>';
            html += '<td style="padding-left: 5px; text-align: left; width: 30%; height: 35px;border-top: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;">'+info.company;
            html += '</td>';
            html += '</tr>';

            // html += '<tr>';
            // html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;border-left: 1px solid #dfdfdf;">';
            // html += '<i class="fa fa-birthday-cake"></i>&nbsp;生日';
            // html += ' </td>';
            // html += '<td style="padding-left: 5px; text-align: left; width: 15%; height: 35px;border-top: 1px solid #dfdfdf;">'+_self.common.formatDate(info.birthDate);
            // html += '</td>';
            // html += '<td style="text-align: center; width: 15%; height: 35px;background-color: #f5f5f5;border-top: 1px solid #dfdfdf;">';
            // html += '<i class="fa fa-clock-o"></i>&nbsp;最近登录';
            // html += '</td>';
            // html += '<td style="padding-left: 5px; text-align: left; width: 30%; height: 35px;border-top: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;">'+_self.common.formatDate(info.lastTime);
            // html += '</td>';
            // html += '</tr>';
    
            html += '</tbody>';
            html += '</table>';

            html += '<div class="col-md-12 text-center" style="margin-top: 10px;">';
    
            html += '<button type="button" class="btn-u btn-u-red" style="color: #fff;  margin:0 15px;padding: 0 12px;" data-toggle="modal" data-target="#myModal">更新</button>';
			// html += '<input value="更新" type="submit" name="buttonSearch" id="buttonSearch" class="btn-u btn-u-red" onclick="return getCase();" style="color: #fff;  margin:0 15px;padding: 0 12px;">';
			html += '</div>';
            $('#divTopicInfo').html(html);
            $('#divTopicInfo').css('display','block');
            $('#divApplyInfo').css('display','none');
        },
        _buildSelfModal:function(info){
           $('#recipient-email').val(info.email);
           $('#recipient-fullname').val(info.fullname);
           $('#recipient-mobile').val(info.mobile);
           $('#recipient-sex').val(info.sex);
           $('#recipient-company').val(info.company);
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
         _queryProject:function(){
            var _self = this;
            _self.ajaxUtil.search(_self.options.OprUrls.common.queryUrl, "applyman='" + sessionStorage.username + "'",_self.searchCache.currentPage,_self.searchCache.num, function(respons) {
              if (respons.data) {
                var projects = respons.data.list;
                if (respons.data.total !== 0) {
                    _self._buildProjectDom(projects);
                }else{
                  _self._buildNoneDom();
                }
                _self._renderPagination("#pagination", _self.searchCache.currentPage == 0 ?  _self.searchCache.currentPage :  _self.searchCache.currentPage-1,respons.data.total, _self.searchCache.num, function(pageIndex) {
                    _self.searchCache.currentPage = pageIndex + 1;
                    _self._queryProject();
                });
              }
            });
          },
        // _queryProject:function(){
        //     var _self = this;
        //     var query = {
        //         q: "applyman='" + sessionStorage.username + "'",
        //         currentPage: 0,
        //         pageSize: 10
        //     };
        //     try {
        //         $.ajax({
        //             type: "POST",
        //             url: _self.options.OprUrls.common.queryUrl,
        //             dataType: "json",
        //             data: JSON.stringify(query),     
        //             contentType: "application/json",
        //             timeout: 30000,
        //             success: function(respons, status, xhr) {
        //                 if (respons.data) {
        //                     var projects = respons.data.list;
        //                     if (respons.data.total !== 0) {
        //                         _self._buildProjectDom(projects);
        //                     }else{
        //                       _self._buildNoneDom();
        //                     }
        //                 }
        //             },
        //             error: function(xhr, error, exception) {

        //             },
        //         });
        //     } catch (e) {
        //     }
        // },
        _buildProjectDom:function(items){
            var _self = this;
            var html = '';
             items.forEach(function(element,index){
                html += '<tr>';

                html += '<td style="height:37px;overflow:hidden;">';
                html += element.projectname;
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
                html += '<a class="btn btn-xs btn-success" href="detail.html?type='+ element.typename + '&id=' + element.projectid +'" target="_blank" style="color: #fff;font-weight:100;margin-bottom:0px !important;">';
                html += ' 详情查看';
                html += '</a>  ';
                if(element.typename == '参数确定' && element.statusname == '已发证'){
                    html += '<a class="btn btn-xs btn-danger" href="'+ _self.options.OprUrls.project.download+element.projectid+'" target="_blank" style="font-weight:100;margin-bottom:0px !important;"">';
                    html += ' 报告下载';
                    html += '</a> ';
                    if(element.status == '200004'){
                        html += '<a class="btn btn-xs btn-info" href="accept.html?id='+ element.projectid +'" target="_blank" style="font-weight:100;margin-bottom:0px !important;"">';
                        html += '申请验收';
                        html += '</a> ';
                    }
                }else if(element.typename == '竣工验收' && element.statusname == '已发证'){
                    html += '<a class="btn btn-xs btn-danger" href="'+ _self.options.OprUrls.project.downloadAccept+element.projectid+'" target="_blank" style="font-weight:100;margin-bottom:0px !important;"">';
                    html += ' 报告下载';
                    html += '</a> ';
                }

                html += '</td>';
                html += '</tr>';
             });
             $('#projectList').html(html);
             $('#divTopicInfo').css('display','none');
             $('#divApplyInfo').css('display','block');
        },

    };

    return Widget;
});