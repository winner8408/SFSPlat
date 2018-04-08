define('application/register', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
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
            _self._sendCode();
            _self._register();
        },
        _sendCode:function(){
            var _self = this;
            $('#sendcode').on('click',function(){
                var mobile = $('#registerMobile').val();
                var isMobile=/^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;
                if(isMobile.test(mobile)){
                    $('#sendcode').val('已发送');
                }
                try {
                    $.ajax({
                        type: "GET",
                        url: _self.options.OprUrls.security.sendCode + mobile,
                        dataType: "json",
                        contentType: "application/json",
                        timeout: 2000,
                        success: function(data, status, xhr) {
                            if (data) {
                                window.location.href = "index.html";
                            } else {
                            }
                        },
                        error: function(xhr, error, exception) {

                        }
                    });
                } catch (e) {
                }
            });
        },
        _formartUrl: function(url) {
            var _self = this;
            return url.indexOf(window.location.host) > -1 ? url : _self.options.proxyUrl + '?' + url;
        },
        _register:function() {
            var _self = this;
            $('#butRegister').on('click',function(){
                $('#defaultForm').data('bootstrapValidator').validate();//手动对表单进行校检
                if (!$('#defaultForm').data('bootstrapValidator').isValid()) {//判断校检是否通过
                    return;
                }else {
                    //提交动作
                }
                var registerCode = $('#registerCode').val();
                var user = {
                    name:$('#registerName').val(),
                    fullname:$('#registerName').val(),
                    mobile:$('#registerMobile').val(),
                    password:$('#registerPassword').val(),
            
                };
                $.ajax({
                    type : "POST",
                    url : _self._formartUrl(_self.options.OprUrls.security.register+"?mobile="+user.mobile+"&smsCode="+ registerCode),
                    data : JSON.stringify(user),
                    contentType : "application/json",
                    dataType : "json",
                    timeout: 30000,
                    // complete:function(msg) {
                    //   alert(msg);
                    // }
                    success: function(data, status, xhr) {
                        if (data.result) {
                           window.location.href = 'login.html?username='+ data.data;
                        }else{
                            var notify= _self.notifyMsg(data.content);
                        }
                    },
                    error: function(xhr, error, exception) {
    
                    }
                });
            });
        },
        notifyMsg: function(msg){
            var notify =  $.notify({
                 // options
                 icon: 'glyphicon glyphicon-warn-sign',
                 title: '警告:',
                 message: msg,
                 target: '_blank'
             },{
                 // settings
                 element: 'body',
                 position: null,
                 type: "danger",
                 allow_dismiss: true,
                 newest_on_top: true,
                 showProgressbar: false,
                 placement: {
                     from: "top",
                     align: "right"
                 },
                 offset: 20,
                 spacing: 10,
                 z_index: 1031,
                 delay: 5000,
                 timer: 1000,
                 url_target: '_blank'
             });
     
            return notify;
         }
    };

    return Widget;
});