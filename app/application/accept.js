define('application/accept', ['utils/ajaxUtil', 'utils/common'], function(ajaxUtil, common) {
    var Widget = function(options) {
        var _self = this;
        _self.options = options;
        _self.ajaxUtil = new ajaxUtil(_self.options.proxyUrl);
        _self.common = new common();
        _self.json1Data = '';
        _self.json2Data = '';
        _self.json3Data = '';
        _self.json4Data = '';
        _self.formDataReal = '';
        _self._init();
    };
    Widget.prototype = {
        _init: function() {
            var _self = this;
            
            _self._getAuthorInfo();
            _self._submitEvent();
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
        _submitEvent:function(){
            var _self = this;
            $('#firstSubmit').on('click',function(){
                _self.json1Data = $("#form_01").serializeArray();
                $('.step-header1').removeClass('active');
                $('.step-header1').removeClass('bgcolor-green');
                $('.step-header2').addClass('active');
                $('.step-header2').addClass('bgcolor-green');
                $('.form01').css('display','none');
                $('.form02').css('display','block');
            });
            $('#secondSubmit').on('click',function(){
                _self.json2Data = $("#form_02").serializeArray();
                $('.step-header2').removeClass('active');
                $('.step-header2').removeClass('bgcolor-green');
                $('.step-header3').addClass('active');
                $('.step-header3').addClass('bgcolor-green');
                $('.form02').css('display','none');
                $('.form03').css('display','block');
            });
            $('#thirdSubmit').on('click',function(){
                _self.json3Data = $("#form_03").serializeArray();
                $('.step-header3').removeClass('active');
                $('.step-header3').removeClass('bgcolor-green');
                $('.step-header4').addClass('active');
                $('.step-header4').addClass('bgcolor-green');
                $('.form03').css('display','none');
                $('.form04').css('display','block');
            });
            $('#fourSubmit').on('click',function(){
                _self.json4Data = $("#form_04").serializeArray();
                $('.step-header4').removeClass('active');
                $('.step-header4').removeClass('bgcolor-green');
                $('.step-header5').addClass('active');
                $('.step-header5').addClass('bgcolor-green');
                $('.form04').css('display','none');
                $('.form05').css('display','block');
            });
            $('#fiveSubmit').on('click',function(){
                _self.formDataReal  = new FormData($("#form_05")[0]);
                var id = _self.common.getQueryStringByKey('id');
                _self.formDataReal.append('id',id);
                _self.json1Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self.json2Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self.json3Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self.json4Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self._addAccept();
            });
        },
        _addAccept:function(){
            var _self = this;
            try {
                $.ajax({
                    type: "POST",
                    url: _self.options.OprUrls.acceptance.createUrl,
                    data: _self.formDataReal,
                    async: false,  
                    cache: false,  
                    contentType: false,  
                    processData: false, 
                    headers:{
                        Authorization:"bearer " + sessionStorage.token
                    },
                    success: function(data, status, xhr) {
                        if (data) {
                           window.location.href = 'mycontent.html';
                        } else {
                            
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