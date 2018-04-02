define('application/project', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
    var Widget = function(options) {
        var _self = this;
        _self.options = options;
        _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
        _self.common = new common();
        _self.formData = '';
        _self.form1Data = '';
        _self.form2Data = '';
        _self.form3Data = '';
        _self._init();
    };
    Widget.prototype = {
        _init: function() {
            var _self = this;
            _self._submitEvent();
        },
        _submitEvent:function(){
            var _self = this;
            $('#firstSubmit').on('click',function(){
                _self.form1Data = $('#form_01').serialize();
                $('.step-header1').removeClass('active');
                $('.step-header1').removeClass('bgcolor-green');
                $('.step-header2').addClass('active');
                $('.step-header2').addClass('bgcolor-green');
                $('.form01').css('display','none');
                $('.form02').css('display','block');
                $('.form03').css('display','none');
            });
            $('#secondSubmit').on('click',function(){
                $('.step-header2').removeClass('active');
                $('.step-header2').removeClass('bgcolor-green');
                $('.step-header3').addClass('active');
                $('.step-header3').addClass('bgcolor-green');
                _self.form2Data = $('#form_02').serialize();
                $('.form01').css('display','none');
                $('.form02').css('display','none');
                $('.form03').css('display','block');
            });
            $('#thirdSubmit').on('click',function(){
                _self.form3Data = $('#form_03').serialize();
                _self.formData = _self.form2Data + '&' + _self.form2Data + '&' + _self.form3Data;
                _self._addProject();
            });
        },
        _addProject:function(){
            var _self = this;
            try {
                $.ajax({
                    type: "POST",
                    url: _self.options.OprUrls.project.createUrl,
                    dataType: "json",
                    data: _self.formData,
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
        },

    };

    return Widget;
});