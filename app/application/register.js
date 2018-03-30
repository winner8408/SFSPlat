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
        _register:function(){
            var _self = this;
            $('#butRegister').on('click',function(){
                var user = {
                    name : $('#registerName').val(),
                    fullname: $('#registerName').val(),
                    mobile: $('#registerMobile').val(),
                    password: $('#registerPassword').val()
                }
                var smsCode= $('#registerCode').val();
                try {
                    $.ajax({
                        type: "POST",
                        url: _self.options.OprUrls.security.register + '?mobile=' + user.mobile + '&smscode=' + smsCode,
                        data: user,
                        dataType: "json",
                        contentType: "application/json",
                        timeout: 30000,
                        success: function(data, status, xhr) {
                            if (data.error_code) {
                                if (data.error_code.indexOf('401') >= 0)
                                    return; // gotologin
                            }
                            if (callback) callback(data);
                        },
                        error: function(xhr, error, exception) {
                            if (callback) callback(null);
                        }
                    });
                } catch (e) { //Here should be delaying with error
                    if (callback) callback(null);
                }
                
            })
        },
    };

    return Widget;
});