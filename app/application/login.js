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
            _self._sendCode();
            _self._register();
        },
        _sendCode:function(){
            var _self = this;
            $('#butLogin').on('click',function(){
                var user = {
                    username : $('#username').val(),
                    password :  $('#password').val()
                }
                try {
                    $.ajax({
                        type: "POST",
                        url: _self.options.OprUrls.security.sendCode + mobile,
                        dataType: "json",
                        contentType: "application/x-www-form-urlencoded",
                        Authorization :"",
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
    };

    return Widget;
});