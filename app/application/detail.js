define('application/detail', ['utils/ajaxUtil','utils/common'], function(ajaxUtil,common) {
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
      _self._queryDetail();
    },
    _queryDetail:function(){
      var _self = this;
      var id = _self.common.getQueryStringByKey('id');
      var type = decodeURI(_self.common.getQueryStringByKey('type'));
      var url = '';
      if(type == '参数确定'){
        url = _self.options.OprUrls.project.queryItem + id;
      }else{
        url = _self.options.OprUrls.acceptance.queryItem + id;
      }
      try {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            headers:{
                Authorization:"bearer "+sessionStorage.token
            },
            success: function(data, status, xhr) {
                if (data.result) {
                  if(type == '参数确定'){
                    _self._buildProjectDom(data.data);
                  }else{
                    _self._buildAccptancetDom(data.data);
                  }
                    
                } else {
                }
            },
            error: function(xhr, error, exception) {

            },
        });
    } catch (e) {
    }
    },
    _buildProjectDom:function(item){
      var _self = this;
      var html = '';
      html +='<thead>';
      html +='<tr style="background-color: #e9e9e9;">';
      html +=' <td  colspan="2">';
      html +='建设工程项目名称';
      html +=' </td>';
      html +='<td colspan="3">';
      html += item.projectName;
      html +='</td>';
      html +='</tr>';
      html +='</thead>';
      html +='<tbody>';

      html +='<tr>';
      html +='<td style="width: 20%; padding-left:5px;" rowspan="3">';
      html +='建设单位情况';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='名称';
      html +='</td>';
      html +='<td style="width:60%; padding: 0 5px;" colspan="3">';
      html += item.projectCompany;
      html +='</td>';
      html +='</tr>';

      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='项目联系人';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.projectContact;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='联系电话';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.telephone;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='法人代表';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.legalPerson;
      html +=' <td style="width:20%; padding: 0 5px;">';
      html +='工商注册号';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.registeredNo;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="padding: 0 5px;">';
      html +=' 建设地址';
      html +='</td>';
      html +='<td style="padding: 0 5px;" colspan="2">';
      html += item.projectAddress;
      html +='<td style="padding: 0 5px;">';
      html +=' 投资金额（万元）';
      html +='</td>';
      html +='<td style="padding: 0 5px;">';
      html +=item.projectMoney;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +=' <td style="padding: 0 5px;">';
      html +='工程用途';
      html +='</td>';
      html +='<td style="padding: 0 5px;" colspan="2">';
      html += item.projectUsage;
      html +='<td style="padding: 0 5px;">';
      html +='使用年限';
      html +='</td>';
      html +='<td style="padding: 0 5px;">';
      html += item.usefulLife;
      html +='</td>';
      html +='</tr>';
    
      html +='<tr>';
      html +='<td style="padding: 0 5px;">';
      html +='土地（规划许可证）';
      html +='</td>';
      html +='<td style="padding: 0 5px;" colspan="2">';
      html += item.landLicenseKey;
      html +='<td style="padding: 0 5px;">';
      html +=' 建设工程项目类型';
      html +='</td>';
      html +='<td style="padding: 0 5px;">';
      html += item.projectType;
      html +='</td>';
      html +='</tr>';
    
      html +='<tr>';
      html +='<td style="padding: 0 5px;">';
      html +='总占地面积（㎡ ）';
      html +='</td>';
      html +='<td style="padding: 0 5px;" colspan="2">';
      html += item.grossArea;
      html +='<td style="padding: 0 5px;">';
      html +=' 总建筑面积（㎡ ）';
      html +='</td>';
      html +='<td style="padding: 0 5px;">';
      html += item.grossBuildingArea;
      html +='</td>';
      html +='</tr>';
    
      html +=' <tr>';
      html +=' <td style="padding: 0 5px;">';
      html +='主体建筑最大高度（m）';
      html +='</td>';
      html +='<td style="padding: 0 5px;" colspan="2">';
      html +=item.buildingHeight;
      html +='<td style="padding: 0 5px;">';
      html +='主题建筑最高层数';
      html +='</td>';
      html +='<td style="padding: 0 5px;">';
      html +=item.buildingFloor;
      html +='</td>';
      html +=' </tr>';
    
                           
      html +='</tbody>';
      $('#detailTable').html(html);
    },
    _buildAccptancetDom:function(item){
      var html = '';
      html +='<thead>';
      html +='<tr style="background-color: #e9e9e9;">';
      html +='<td  colspan="2">';
      html +='建设工程项目名称';
      html +='</td>';
      html +='<td colspan="3">';
      html += item.projectname;
      html +='</td>';
      html +='</tr>';
      html +='</thead>';
      html +='<tbody>';
      html +='<tr>';
      html +='<td  colspan="2">';
      html +='建设工程地址';
      html +='</td>';
      html +='<td colspan="3">';
      html += item.projectaddress;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td  colspan="2">';
      html +='抗震设防要求';
      html +='</td>';
      html +='<td colspan="3">';
      html +=item.seismicfortification;
      html +='</td>';
      html +=' </tr>';
      html +='<tr>';
      html +='<td  colspan="2">';
      html +='立项批准部门';
      html +='</td>';
      html +='<td colspan="3">';
      html +=item.projectapprovaldepartment;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +=' <td  colspan="2">';
      html +='开工时间';
      html +=' </td>';
      html +='<td >';
      html +=item.starttime;
      html +='</td>';
      html +='<td  >';
      html +='竣工时间';
      html +='</td>';
      html +='<td >';
      html +=item.completiontime;
      html +=' </td>';
      html +='</tr>';
      html +=' <tr>';
      html +=' <td style="width: 20%; padding-left:5px;" rowspan="3">';
      html +=' 建设单位';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='名称';
      html +='</td>';
      html +='<td style="width:60%; padding: 0 5px;" colspan="3">';
      html +=item.constructioncompany;
      html +='</td>';
      html +='</tr>';
      html +=' <tr>';
      html +=' <td style="width:20%; padding: 0 5px;">';
      html +=' 地址';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.constructionaddress;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='工商注册号';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.constructionregisteredno;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='联系人';
      html +='</td>';
      html +=' <td style="width:20%; padding: 0 5px;">';
      html += item.constructioncontact;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='联系电话';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.constructiontelephone;
      html +='</td>';
      html +='</tr>';
      html +=' <tr>';
      html +='<td style="width: 20%; padding-left:5px;" rowspan="4">';
      html +='设计单位';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 名称';
      html +='</td>';
      html +=' <td style="width:60%; padding: 0 5px;" colspan="3">';
      html +=item.designcompany;
      html +=' </td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='地址';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.designaddress;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 邮政编码';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.designzipcode;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 资质证编码';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.designcertificateno;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 资质等级';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.designcertificatelevel;
      html +='</td>';
      html +='</tr>';
      html +=' <tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='项目负责人';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.designprojectperson;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='联系电话';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.designtelephone;
      html +=' </td>';
      html +='</tr>';
      html +=' <tr>';
      html +='<td style="width: 20%; padding-left:5px;" rowspan="4">';
      html +='监理单位';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='名称';
      html +='</td>';
      html +='<td style="width:60%; padding: 0 5px;" colspan="3">';
      html += item.supervisorycompany;
      html +='</td>';
      html +=' </tr>';
      html +=' <tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='地址';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisoryaddress;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 邮政编码';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisorzipcode;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='资质证编码';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisorycertificateno;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='资质等级';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisorcertificatelevel;
      html +='</td>';
      html +=' </tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='项目负责人';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisorprojectperson;
      html +=' <td style="width:20%; padding: 0 5px;">';
      html +=' 联系电话';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.supervisortelephone;
      html +=' </td>';
      html +=' </tr>';
      html +=' <tr>';
      html +='<td style="width: 20%; padding-left:5px;" rowspan="4">';
      html +='施工单位';
      html +=' </td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='名称';
      html +='</td>';
      html +='<td style="width:60%; padding: 0 5px;" colspan="3">';
      html += item.buildingcompany;
      html +=' </td>';
      html +='</tr>';
      html +=' <tr>';
      html +=' <td style="width:20%; padding: 0 5px;">';
      html +='地址';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.buildingaddress;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='邮政编码';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.buildingzipcode;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='资质证编码';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.buildingcertificateno;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='资质等级';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html += item.buildingcertificatelevel;
      html +='</td>';
      html +='</tr>';
      html +='<tr>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=' 项目负责人';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.buildingprojectperson;
      html +='<td style="width:20%; padding: 0 5px;">';
      html +='联系电话';
      html +='</td>';
      html +='<td style="width:20%; padding: 0 5px;">';
      html +=item.buildingtelephone;
      html +='</td>';
      html +='</tr>';
      html +='</tbody>';
      $('#detailTable').html(html);
    }
  }
  return Widget;
});