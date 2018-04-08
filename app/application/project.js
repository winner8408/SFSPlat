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

        _self.json1Data = '';
        _self.json2Data = '';
        _self.formDataReal = '';
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
                _self.json1Data = $("#form_01").serializeArray();
                $('.step-header1').removeClass('active');
                $('.step-header1').removeClass('bgcolor-green');
                $('.step-header2').addClass('active');
                $('.step-header2').addClass('bgcolor-green');
                $('.form01').css('display','none');
                $('.form02').css('display','block');
                $('.form03').css('display','none');
            });
            $('#secondSubmit').on('click',function(){
                _self.form2Data = $('#form_02').serialize();
                _self.json2Data = $("#form_02").serializeArray();
                $('.step-header2').removeClass('active');
                $('.step-header2').removeClass('bgcolor-green');
                $('.step-header3').addClass('active');
                $('.step-header3').addClass('bgcolor-green');
                $('.form01').css('display','none');
                $('.form02').css('display','none');
                $('.form03').css('display','block');
            });
            $('#thirdSubmit').on('click',function(){
               
                _self.form3Data = $('#form_03').serialize();
                _self.formData = _self.form2Data + '&' + _self.form2Data + '&' + _self.form3Data;


                _self.formDataReal  = new FormData($("#form_03")[0]); 
                _self.json1Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self.json2Data.forEach(function(element,index){
                    _self.formDataReal.append(element.name,element.value);
                });
                _self._addProject();
            });
        },
        _formartUrl: function(url) {
            var _self = this;
            return url.indexOf(window.location.host) > -1 ? url : _self.options.proxyUrl + '?' + url;
        },
        _addProject:function(){
            var _self = this;
            try {
                $.ajax({
                    type: "POST",
                    url: _self.options.OprUrls.project.createUrl,

                    // dataType: "json",
                    // data: _self.formData,
                    // contentType: "application/x-www-form-urlencoded",

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
                            window.location.href = "mycontent.html";
                        } else {
                            // var notify= _self.notifyMsg(data.content);
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