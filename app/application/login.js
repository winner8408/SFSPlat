define('application/login', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
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
            _self._login();
        },
        _login:function(){
            var _self = this;
            $('#butLogin').on('click',function(){
                var username = $('#username').val();
                try {
                    $.ajax({
                        type: "POST",
                        url: _self.options.OprUrls.security.login,
                        dataType: "json",
                        data:$('#loginForm').serialize(),
                        contentType: "application/x-www-form-urlencoded",
                        headers:{
                            Authorization:"Basic ZHl0aDpkeXRoU2VjcmV0"
                        },
                        success: function(data, status, xhr) {
                            if (data.access_token) {
                                sessionStorage.setItem('username', username);
                                sessionStorage.setItem('token', data.access_token);
                                window.location.href = "index.html";
                            } else {
                                var notify= _self.notifyMsg(data.content);
                            }
                        },
                        error: function(xhr, error, exception) {

                        },
                    });
                } catch (e) {
                }
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