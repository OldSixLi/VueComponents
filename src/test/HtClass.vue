<template>
  <div class="row">
    <h3 class="text-center">添加课程</h3>
    <form class="form-horizontal" method="post" role="form">
      <div class="col-md-12">
        <div class="form-group" v-show="config.name==undefined||config.name.show!=false">
          <div class="col-sm-2 text-right">
            <label for="name" class="control-label">课程名称</label>
          </div>
          <div class="col-sm-10">
            <input v-model="obj.name" :disabled="config.name.disabled" type="text" class="form-control" id="name" name="name" placeholder="请输入课程名称，不超过40字" maxlength="40">
          </div>
        </div>
        <!-- 任课教师 -->
        <div class="form-group" v-show="config.teacherId==undefined||config.teacherId.show!=false">
          <div class="col-sm-2 text-right">
            <label for="teacherId" class="control-label">任课教师</label>
          </div>
          <div class="col-sm-10">
            <ht-select v-model="obj.teacherId" :disabled="config.teacherId&&config.teacherId.disabled" id="teacherId" name="teacherId" class="form-control" style="height:34px;" placeholder="请输入任课教师" ref="teacherLists">
              <option value="">请选择</option>
              <option :value="x.id" v-for="x in teacherList">{{x.name}}</option>
            </ht-select>
 
          </div>
        </div>

        <!-- 课程类型 -->
        <div class="form-group" v-show="config.type==undefined||config.type.show!=false">
          <div class="col-sm-2 text-right">
            <label for="type" class="control-label">课程类型</label>
          </div>
          <div>
            <div class="col-sm-10" id="type">
              <ht-radio v-model="obj.type" :disabled="config.type&&config.type.disabled" label="D">单次课程</ht-radio>
              <ht-radio v-model="obj.type" :disabled="config.type&&config.type.disabled" label="X">系列课程</ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 听课方式 -->
        <div class="form-group" v-show="config.lineType==undefined||config.lineType.show!=false">
          <div class="col-sm-2 text-right">
            <label for="line_type" class="control-label">听课方式</label>
          </div>
          <div>
            <div class="col-sm-10" id="line_type">
              <ht-radio v-model="obj.lineType" :disabled="config.lineType&&config.lineType.disabled" label="O">线上课程</ht-radio>
              <ht-radio v-model="obj.lineType" :disabled="config.lineType&&config.lineType.disabled" label="F">线下课程</ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 课程属性 -->
        <div class="form-group" v-show="config.allowVip==undefined||config.allowVip.show!=false">
          <div class="col-sm-2 text-right">
            <label for="forbid" class="control-label">课程属性</label>
          </div>
          <div class="col-sm-10 checkForm" id="forbid">
            <ht-checkbox v-model="obj.allowVip" :disabled="config.allowVip&&config.allowVip.disabled" label="vipfree">会员免费</ht-checkbox>
            <ht-checkbox v-model="obj.allowVip" :disabled="config.allowVip&&config.allowVip.disabled" label="allowVip">会员专享</ht-checkbox>
            <ht-checkbox v-model="obj.allowVip" :disabled="config.allowVip&&config.allowVip.disabled" label="vipBest">会员精品</ht-checkbox>
            <br>
            <ht-checkbox v-model="obj.allowVip" :disabled="config.allowVip&&config.allowVip.disabled" label="allowAbsent">禁止一年内有报名记录但未到场者报名</ht-checkbox>
            <ht-checkbox v-model="obj.allowVip" :disabled="config.allowVip&&config.allowVip.disabled" label="allowAbandon">禁止取消报名后的用户再报名</ht-checkbox>
          </div>
        </div>

        <!-- 报名人数 -->
        <div class="form-group" v-show="config.studentCount==undefined||config.studentCount.show!=false||config.singleCount==undefined||config.singleCount.show!=false">
          <div class="col-sm-2 text-right" v-show="config.studentCount==undefined||config.studentCount.show!=false">
            <label for="student_count" class="control-label">报名人数</label>
          </div>
          <div class="col-sm-3" v-show="config.studentCount==undefined||config.studentCount.show!=false">
            <input-num type="numbers" :max=100000 v-model="obj.studentCount" :disabled="config.studentCount&&config.studentCount.disabled" class="form-control" id="student_count" name="studentCount" placeholder="请输入报名人数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></input-num>
          </div>
          <div class="col-sm-2 text-right" v-show="config.singleCount==undefined||config.singleCount.show!=false">
            <label for="single_count" class="control-label">单账户参加人数</label>
          </div>
          <div class="col-sm-3" v-show="config.singleCount==undefined||config.singleCount.show!=false">
            <input-num type="numbers" v-model="obj.singleCount" :max=100000 :disabled="config.singleCount&&config.singleCount.disabled" class="form-control" id="single_count" name="singleCount" placeholder="单账户参加人数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></input-num>
          </div>
        </div>

        <!-- 报名开始时间 -->
        <div class="form-group" v-show="config.begin_time==undefined||config.begin_time.show!=false||config.end_time==undefined||config.end_time.show!=false">
          <div class="col-sm-2 text-right" v-show="config.begin_time==undefined||config.begin_time.show!=false">
            <label for="begin_time" class="control-label">报名开始时间</label>
          </div>
          <div class="col-sm-3" v-show="config.begin_time==undefined||config.begin_time.show!=false">
            <div>
              <!-- {{obj.begin_time}} -->
              <ht-date  :option="timeOption" v-model="obj.begin_time" placeholder="请输入报名开始时间" :disabled="config.begin_time&&config.begin_time.disabled"></ht-date>
            </div>
          </div>
          <div class="col-sm-2 text-right" v-show="config.end_time==undefined||config.end_time.show!=false">
            <label for="end_time" class="control-label">报名结束时间</label>
          </div>
          <div class="col-sm-3" v-show="config.end_time==undefined||config.end_time.show!=false">
            <div>
              <ht-date :option="timeOption" v-model="obj.end_time" placeholder="请输入报名结束时间" :disabled="config.end_time&&config.end_time.disabled" :minDate="obj.begin_time">
              </ht-date>
            </div>
          </div>
        </div>

        <!-- 赠送标志 -->
        <div class="form-group" v-show="config.transVip==undefined||config.transVip.show!=false">
          <div class="col-sm-2 text-right">
            <label for="fee_type" class="control-label">赠送标志</label>
          </div>
          <div>
            <div class="col-sm-10" id="fee_type">
              <ht-checkbox v-model="obj.transVipArr" :disabled="config.transVip&&config.transVip.disabled" label="trans_vip">会员赠送</ht-checkbox>
              <ht-checkbox v-model="obj.transVipArr" :disabled="config.transVip&&config.transVip.disabled" label="not_vip_give">非会员赠送</ht-checkbox>
              <label>（勾选相应按钮之后选择对应赠送产品方可生效）</label>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 会员赠送产品 -->
        <div class="form-group" v-if="obj.transVipArr&&obj.transVipArr.indexOf('trans_vip')>-1">
          <div class="col-sm-2 text-right">
            <label for="vipGoodsId" class="control-label">会员赠送产品</label>
          </div>
          <div class="col-sm-10">
            <ht-select v-model="obj.vipGoodsId" id="vipGoodsId" name="vipGoodsId" class="form-control" style="height:34px;width:100%" placeholder="请输入绑定企业">
              <option value="">请选择</option>
              <option :value="x.id" v-for="x in memberGoodsList">{{x.name}}</option>
            </ht-select>
          </div>
        </div>
        <!-- 表格 -->
        <div class="form-group" v-if="obj.transVipArr&&obj.transVipArr.indexOf('trans_vip')>-1&&obj.vipGoodsId!=''&&obj.vipGoodsId!=undefined">
          <div class="col-sm-2 text-right"></div>
          <div class="col-sm-10">
            <div class="panel panel-default hasradius" id="course_panel1">
              <table class="table">
                <thead>
                  <tr>
                    <th width="5%"></th>
                    <th width="15%">产品ID</th>
                    <th width="25%">产品名称</th>
                    <th width="25%">打印名称</th>
                    <th width="15%">含税价</th>
                    <th width="15%">税率</th>
                  </tr>
                </thead>
                <tbody id="table">
                  <tr>
                    <td></td>
                    <td>
                      <span>{{vipGoodsObj.id}}</span>
                    </td>
                    <td>
                      <span>{{vipGoodsObj.name}}</span>
                    </td>
                    <td>
                      <span>{{vipGoodsObj.printName}}</span>
                    </td>
                    <td>
                      <span>{{vipGoodsObj.price}}</span>
                    </td>
                    <td>
                      <span>{{vipGoodsObj.sl}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 非会员赠送产品 -->
        <div class="form-group" v-if="obj.transVipArr&&obj.transVipArr.indexOf('not_vip_give')>-1">
          <div class="col-sm-2 text-right">
            <label for="notVipGoodsId" class="control-label">非会员赠送产品</label>
          </div>
          <div class="col-sm-10">
            <ht-select v-model="obj.notVipGoodsId" id="notVipGoodsId" name="notVipGoodsId" class="form-control" style="height:34px;width:100%" placeholder="请输入绑定企业">
              <option value="">请选择</option>
              <option :value="x.id" v-for="x in notMemberGoodsList">{{x.name}}</option>
            </ht-select>
          </div>
        </div>
        <div class="form-group" v-if="obj.transVipArr&&obj.transVipArr.indexOf('not_vip_give')>-1&&obj.notVipGoodsId!=''&&obj.notVipGoodsId!=undefined">
          <div class="col-sm-2 text-right"></div>
          <div class="col-sm-10">
            <div class="panel panel-default hasradius" id="course_panel2">
              <table class="table">
                <thead>
                  <tr>
                    <th width="5%"></th>
                    <th width="15%">产品ID</th>
                    <th width="25%">产品名称</th>
                    <th width="25%">打印名称</th>
                    <th width="15%">含税价</th>
                    <th width="15%">税率</th>
                  </tr>
                </thead>
                <tbody id="table">
                  <tr>
                    <td></td>
                    <td>
                      <span>{{notMemberGoodObj.id}}</span>
                    </td>
                    <td>
                      <span>{{notMemberGoodObj.name}}</span>
                    </td>
                    <td>
                      <span>{{notMemberGoodObj.printName}}</span>
                    </td>
                    <td>
                      <span>{{notMemberGoodObj.price}}</span>
                    </td>
                    <td>
                      <span>{{notMemberGoodObj.sl}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 收费类型 -->
        <div class="form-group" v-show="config.feeType==undefined||config.feeType.show!=false">
          <div class="col-sm-2 text-right">
            <label for="fee_type" class="control-label">收费类型</label>
          </div>
          <div>
            <div class="col-sm-10">
              <ht-radio label="F" v-model="obj.feeType" :disabled="config.feeType&&config.feeType.disabled">免费 </ht-radio>
              <ht-radio label="P" v-model="obj.feeType" :disabled="config.feeType&&config.feeType.disabled">收费 </ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>
        <!-- 会员价格 与 非会员差价-->
        <div class="form-group" v-show="
        config.vipPrice==undefined||config.vipPrice.show!=false||config.nonVipPrice==undefined||config.nonVipPrice.show!=false">
          <div class="col-sm-2 text-right" v-show="config.vipPrice==undefined||config.vipPrice.show!=false">
            <label for="vip_price" class="control-label">会员价格</label>
          </div>
          <div class="col-sm-3" v-show="config.vipPrice==undefined||config.vipPrice.show!=false">
            <input-num type="money" v-model="obj.vipPrice" :disabled="(config.vipPrice&&config.vipPrice.disabled)||obj.feeType=='F'||(obj.allowVip&&obj.allowVip.indexOf('vipfree')>-1)" class="form-control vipprices" id="vip_price" name="vipPrice" placeholder="会员价格，保留两位小数，单位：元"></input-num>
          </div>
          <div class="col-sm-2 text-right" v-show="config.nonVipPrice==undefined||config.nonVipPrice.show!=false">
            <label for="non_vip_price" class="control-label">非会员差价</label>
          </div>
          <div class="col-sm-3" v-show="config.nonVipPrice==undefined||config.nonVipPrice.show!=false">
            <input-num type="money" v-model="obj.nonVipPrice" :disabled="(config.nonVipPrice&&config.nonVipPrice.disabled)||obj.feeType=='F'" class="form-control vipprices" id="non_vip_price" name="nonVipPrice" placeholder="非会员差价，保留两位小数，单位：元"></input-num>
          </div>
        </div>

        <!-- 是否赠送积分 -->
        <div class="form-group" v-show="config.scoreRadio==undefined||config.scoreRadio.show!=false">
          <div class="col-sm-2 text-right">
            <label for="scoreGroup" class="control-label">是否赠送积分</label>
          </div>
          <div>
            <div class="col-sm-10" id="scoreGroup">
              <ht-radio label="1" v-model="obj.scoreRadio" :disabled="config.scoreRadio&&config.scoreRadio.disabled">是 </ht-radio>
              <ht-radio label="3" v-model="obj.scoreRadio" :disabled="config.scoreRadio&&config.scoreRadio.disabled">否 </ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 积分赠送方式 -->
        <div class="form-group">
          <div class="col-sm-2 text-right">
            <label for="scoreKind" class="control-label">积分赠送方式</label>
          </div>
          <div>
            <div class="col-sm-10" id="scoreKind">
              <ht-radio label="1" v-model="obj.scoreKindRadio" :disabled="obj.scoreRadio=='3'">价格百分比 </ht-radio>
              <ht-radio label="2" v-model="obj.scoreKindRadio" :disabled="obj.scoreRadio=='3'">固定积分</ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 积分值 积分计算规则-->

        <div class="form-group" v-if="obj.scoreRadio!='3'&&obj.scoreKindRadio!=''">
          <div id="percentDiv" v-if="obj.scoreKindRadio=='1'">
            <div class="col-sm-2 text-right">
              <label for="percent" class="control-label">积分计算规则</label>
            </div>
            <div class="col-sm-9">
              <input type="text" v-model="obj.score" class="form-control score-input" id="percent" name="" placeholder="请输入积分计算规则" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*" maxlength="3">
            </div>
            <div class="col-sm-1">
              <label class="control-label">%</label>
            </div>
          </div>
          <div id="fixedDiv" v-if="obj.scoreKindRadio=='2'">
            <div class="col-sm-2 text-right">
              <label for="percent" class="control-label">积分值</label>
            </div>
            <div class="col-sm-10">
              <input type="text" v-model="obj.score" class="form-control score-input" id="fixed" name="" placeholder="请输入积分值" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*">
            </div>
          </div>
        </div>

        <!-- 是否需使用听课券 -->
        <div class="form-group">
          <div class="col-sm-2 text-right">
            <label for="cou_ticket" class="control-label">是否需使用听课券</label>
          </div>
          <div>
            <div class="col-sm-10" id="cou_ticket">
              <ht-radio label="Y" v-model="obj.useCourseTicket">是 </ht-radio>
              <ht-radio label="N" v-model="obj.useCourseTicket">否 </ht-radio>
            </div>
            <span class="help-block"></span>
          </div>
        </div>

        <!-- 咨询电话 -->
        <div class="form-group" v-show="config.phone==undefined||config.phone.show!=false">
          <div class="col-sm-2 text-right">
            <label for="phone" class="control-label">咨询电话</label>
          </div>
          <div class="col-sm-10">
            <input v-model="obj.phone" :disabled="(config.phone&&config.phone.disabled)" type="text" class="form-control" id="phone" name="phone" placeholder="请输入咨询电话">
          </div>
        </div>

        <!-- 多人参加计费规则 -->
        <div class="form-group" v-show="config.mutiplySale==undefined||config.mutiplySale.show!=false">
          <div class="col-sm-2 text-right">
            <label for="mutiply_sale" class="control-label">多人参加计费规则</label>
          </div>
          <div class="col-sm-10">
            <input v-model="obj.mutiplySale" :disabled="(config.mutiplySale&&config.mutiplySale.disabled)" type="text" class="form-control" id="mutiply_sale" name="mutiplySale" placeholder="请输入计费规则，M代表单价，N代表人数。示例：M+(N-1)*(M-100)">
          </div>
          <div class="col-sm-1" v-show="false">
            <a id="yanzheng" class="btn btn-primary pull-right" href="#modal1" data-toggle="modal">验证</a>
          </div>
        </div>

        <!-- 规则说明 -->
        <div class="form-group" v-show="config.mutiplDes==undefined||config.mutiplDes.show!=false">
          <div class="col-sm-2 text-right">
            <label for="mutipl_des" class="control-label">规则说明</label>
          </div>
          <div class="col-sm-10">
            <input v-model="obj.mutiplDes" :disabled="(config.mutiplDes&&config.mutiplDes.disabled)" type="text" class="form-control" id="mutipl_des" name="mutiplDes" placeholder="请输入规则说明，示例：第一人全价，其他人每人减一百" value="单价乘以人数">
          </div>
        </div>
        <!-- 录入课程信息 -->
        <div class="form-group" v-show="config.courdetail==undefined||config.courdetail.show!=false">
              <div class="col-sm-2 text-right">
                  <label for="mutipl_des" class="control-label">上课时间</label>
              </div>
              <div class="col-md-10"> 
                <div class="panel panel-default hasradius" id="course_panel">
                  <input type="hidden" id="ZUOBIAO_X" value=""> <input
                    type="hidden" id="ZUOBIAO_Y" value="">
                  <table class="table">
                    <thead>
                      <tr>
                        <th width="5%" class="text-center">#</th>
                        <th width="35%" class="text-center">上课地点</th>
                        <th width="35%" class="text-center">上课时间</th>
                        <th width="25%" class="text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody id="tableBody">
                      <tr v-for="(x,$index) in obj.courdetail">
                        <td width="5%"  class="text-center">{{($index+1)}}</td>
                        <td width="35%" class="text-center">{{x.address}}</td>
                        <td width="35%" class="text-center">{{x.time}}</td>
                        <td  width="25%" class="text-center">
                          <a href="javascript:;" @click="deleteColumn($index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                 <!-- 添加按钮  -->
                <div id="addColumn">
                  <div id="newcolumn" class="form-inline"
                     v-show="isAddNewClass">
                    <div style="width:5%;"></div>
                    <div style="width:35%;text-align: center;">
                      <input type="text" class="form-control" style="width:100%;" disabled="true" placeholder="请输入上课地点"  value="线上">
                    </div>
                    <div style="width:35%;text-align: center;">
                      <ht-date :option="timeOption"  v-model="newClassObjTime" placeholder="请选择上课时间"></ht-date>
                    </div>
                    <div style="width:25%;text-align: center;">
                      <button type="button" name="button" class="btn btn-primary btn-sm" id="course_save" @click="saveNewClass">保存</button>
                    </div>
                  </div>
                </div>
                <div class="form-inline course_column_bottom text-center">
                  <p name="button" id="addCourseColumn" @click="addClassClick">
                    添加上课时间地点
                    </p>
                </div>
              </div>
        </div>
          

        <!-- 课程介绍 -->
        <div class="form-group" v-show="config.introduction==undefined||config.introduction.show!=false">
          <div class="col-md-2 text-right">
            <label>课程介绍</label>
          </div>
          <div class="col-md-10">
            <textarea v-model="obj.introduction" :disabled="(config.introduction&&config.introduction.disabled)" class="form-control" id="introduction" name="introduction" placeholder="请在此输入课程介绍"></textarea>
          </div>
        </div>

        <!-- 按钮 -->

        <div class="">
          <div class="form-group text-right">
            <div class="col-md-12">
              <button type="button" class="btn btn-primary" id="saveBtn" @click="saveInfo()">保存课程信息</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-danger" id="cancelBtn" @click="cancel()">放弃本次操作</button>
            </div>

          </div>
        </div>
      </div>
    </form>
  </div>

</template>
<script>
  export default {
    name: "HtClass",
    props: {
      //对外获取的数据
      config: {
        type: Object,
        required: true
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        required: true
      }
    },
    data: function() {
      //组件内数据部分
      return {
        money: 78,
        obj: this.assignData(this.config, this.data),
        teacherList: [], //教师列表
        memberGoodsList: [], //会员赠送产品列表
        notMemberGoodsList: [], //非会员赠送产品列表
        isAddNewClass: false, //是否添加新上课地点(用于控制控件的显示与隐藏)
        newClassObjTime: "",
        //日期控件配置
        timeOption: {
          format: "yyyy-mm-dd hh:ii:ss",
          weekStart: 1,
          todayBtn: "linked",
          pickerPosition: "bottom-left",
          autoclose: true,
          todayHighlight: 1,
          startView: 2,
          forceParse: 0,
          showMeridian: true,
          showMeridian: 1,
          startDate: new Date(),
          language: 'zh-CN'
        },
      };
    },
    mounted: function() {
      this.getTeacherSltOptions();
      this.getVipSltOptions();
    },
    computed: {
      isShowVipGoods() {

      },
      // 选择后才显示表格
      notMemberGoodObj() {
        var obj = {};
        var id = this.obj.notVipGoodsId;
        if (id) {
          obj = this.notMemberGoodsList.filter(x => x.id == id);
        }
        return obj.length > 0 ? obj[0] : {};
      },
      vipGoodsObj() {
        var obj = {};
        var id = this.obj.vipGoodsId;
        if (id) {
          obj = this.notMemberGoodsList.filter(x => x.id == id);
        }
        return obj.length > 0 ? obj[0] : {};
      }
    },
    methods: {
      /**
       * 删除某一行 
       * @returns 
       */
      deleteColumn(index) {
        this.obj.courdetail.splice(index, 1);
      },
      /**
       * 添加子课程 
       * @returns 
       */
      saveNewClass() {
        //TODO 添加操作
        if (!this.newClassObjTime) {
          alert("请选择上课时间")
          return false;
        }
        this.obj.courdetail.push({
          address: "线上",
          time: this.newClassObjTime
        });
        this.newClassObjTime = "";
        this.isAddNewClass = false;
      },
      addClassClick() {
        if (this.isAddNewClass) {
          alert("请完善上一条信息后再进行添加操作");
        } else {
          this.isAddNewClass = true;
        }
      },
      cancel() {
        this.$emit("cancel");
      },
      assignData(config, data) {
        var self = this;
        var obj = {};
        for (const k in data) {
          if (data.hasOwnProperty(k)) {
            const ele = data[k];
            if (ele != undefined && !obj[k]) {
              obj[k] = ele;
            }
          }
        }
        for (const key in config) {
          if (config.hasOwnProperty(key)) {
            const element = config[key];
            console.log(element.default);
            if (element.default != undefined && !obj[key]) {
              obj[key] = element.default;
            }
          }
        }

        // obj.transVipArr = [];
        if (obj.transVip != undefined && obj.transVip == "Y") {
          obj.transVipArr[0] = "trans_vip";
        }
        if (obj.notVipGive != undefined && obj.notVipGive == "Y") {
          obj.transVipArr[1] = "not_vip_give";
        }
        return obj;
      },
      // 保存信息按钮
      saveInfo() {
        var phone = $("#phone").val();
        var des = $("#mutipl_des").val();
        var self = this;
        var __error = [];
        if (!$.trim(self.obj.name)) {
          __error.push("课程名称不能为空！");
        }
        if ($.trim(self.obj.name).length > 40) {
          __error.push("课程名称不超过40字，请修改！");
        }
        if (!$.trim(self.obj.teacherId)) {
          __error.push("任课教师不能为空！");
        }
        //2017年8月16日13:07:06   sjh   添加
        if (!$.trim(self.obj.vipGoodsId) &&
          self.obj.transVipArr.indexOf("trans_vip") > -1
        ) {
          __error.push("会员赠送产品不能为空！");
        }
        if (!$.trim(self.obj.notVipGoodsId) &&
          self.obj.transVipArr.indexOf("not_vip_give") > -1
        ) {
          __error.push("非会员赠送产品不能为空！");
        }
        if (!$.trim(self.obj.studentCount)) {
          __error.push("课程报名人数不能为空！");
        }
        if (!$.trim(self.obj.singleCount)) {
          __error.push("单账户参加人数不能为空！");
        }

        if (!$.trim(self.obj.begin_time)) {
          __error.push("课程开始时间不能为空！");
        }
        if (!$.trim(self.obj.end_time)) {
          __error.push("课程结束时间不能为空！");
        }
        if (!$.trim(self.obj.introduction)) {
          __error.push("课程介绍信息不能为空！");
        }

        //如果课程为收费，则进行以下校验
        if (self.obj.feeType == "P") {
          if (!$.trim(self.obj.vipPrice)) {
            __error.push("会员价格不能为空！");
          }
          if (!$.trim(self.obj.nonVipPrice)) {
            __error.push("非会员差价不能为空！");
          }
          if (!$.trim(self.obj.mutiplDes)) {
            __error.push("计费规则描述不能为空！");
          }
        }

        var scoreKind = self.obj.scoreKindRadio; //积分赠送方式
        var percent = $.trim(self.obj.score); //价格百分比方式
        var fixed = $.trim(self.obj.score); //固定积分方式
        if (self.obj.scoreRadio == "1") {
          if (scoreKind == "1") {
            if (percent == "" || percent == null) {
              __error.push("请输入积分计算规则！");
            }
          } else if (scoreKind == "2") {
            if (fixed == "" || fixed == null) {
              __error.push("请输入积分值！");
            }
          }
        }
        //错误提示
        if (__error.length > 0) {
          __error.push("请修改后再进行提交。");
          alert(__error.join("\r\n"));
          return false;
        }
        // this.obj.name_err = "请填写相关姓名";

        //关于两个属性的处理
        if (self.obj.transVipArr.indexOf("trans_vip") > -1) {
          self.obj.transVip = "Y";
        } else {
          self.obj.transVip = "";
          self.obj.vipGoodsId = "";
        }
        if (self.obj.transVipArr.indexOf("not_vip_give") > -1) {
          self.obj.notVipGive = "Y";
        } else {
          self.obj.notVipGive = "";
          self.obj.notVipGoodsId = "";
        }
        this.$emit("result", this.obj);
      },
      // 获取教师下拉列表
      getTeacherSltOptions() {
        setTimeout(() => {
          this.teacherList = [{
            id: 2,
            username: "szht",
            password: "null111111",
            name: "马兆瑞",
            birthdayYear: "1970",
            note: "    有近二十年会计职称考试辅导经验，并担任企业法律顾问。为企业作纳税筹划。经常参与注册会计师后期培训及企业专题讲座，先后为天津市各企事业单位、税务机关、单位领导干部、MBA学员讲授经济法、税法、税收实务、纳税检查、税收筹划等综合性课程。2007年开始，先后为德勤、普华永道等四大会计师事务所做CPA专职培训。理论功底深厚，并具有丰富的实践经验。",
            email: "",
            phone: "13752326919",
            icon: "/upload_file/2018-02-01/396e7300-fa23-4148-83c9-cd1dbe873971.jpg",
            lifeIcon: "",
            evaluation: "天津市资深会计职称、注册会计师考试辅导专家，天津财经大学法学院教授，硕士生导师。天津仲裁委员会仲裁员，中国法学会会员，天津市经济法研究会理事，自1993年开始长期担任会计资格考试、注册会计师、注册税务师、注册资产评估师和国家司法考试经济法、税法课程的教学辅导工作，发表论文多篇，著作多部。",
            state: "Y"
          }, {
            id: 3,
            username: "szht",
            password: "null111111",
            name: "张文英",
            birthdayYear: "1980",
            note: "张文英，神州浩天技术服务部经理、业务研究员。长期从事财税业务研究工作，多次参与天津税务申报软件升级业务需求分析工作，撰写了大量的申报软件操作指南。熟悉企业实际业务情况。",
            email: "",
            phone: "",
            icon: "static/common/images/course/upload-alert.png",
            lifeIcon: "",
            evaluation: "业务扎实，讲解细致入微，深入浅出，具备实用价值。",
            state: "Y"
          }, {
            id: 4,
            username: "szht",
            password: "f86e6c8816600f6a45ae5abbbcc7b6a7",
            name: "安文英",
            birthdayYear: "1979",
            note: "天津工业大学副教授，赴美访问学者。工业大学税研所主任，天津市财政局、天津市国税局、地税局、天津市教委税收、会计领域特聘专家。",
            email: "",
            phone: "13752326919",
            icon: "/upload_file/2017-04-26/71e712ba-619f-453c-a9dd-5b6b0344c774.png",
            lifeIcon: "",
            evaluation: "严谨、专业、高效、务实",
            state: "Y"
          }, {
            id: 26,
            username: "szht",
            password: "null111111",
            name: "aa",
            birthdayYear: "2014",
            note: "asdasdad",
            email: "",
            phone: "",
            icon: "/upload_file/2017-06-05/486d312e-32ec-4cd4-8438-9aa54c1c2720.jpg",
            lifeIcon: "/upload_file/2017-06-05/f8442522-8432-4feb-96e1-8add81385681.jpg",
            evaluation: "asdasd",
            state: "Y"
          }];

          //何时调用方法
          this.$nextTick(() => {
            this.$refs.teacherLists.bindSelect();
          })
        }, 1000);


      },
      // 获取会员赠品下拉列表
      getVipSltOptions() {
        this.notMemberGoodsList = this.memberGoodsList = [{
          id: "TEST-04",
          name: "测试商品4 ",
          price: 0.01,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1494379956000,
          mender: "admin",
          modifyTime: 1506059430000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "浩天财税通-通用财务系统",
          pjUserSpbmId: "106030102990000000004",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "Y",
          isWeb: "",
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "TEST-03",
          name: "测试商品3  ",
          price: 0.01,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1494379956000,
          mender: "admin",
          modifyTime: 1490936053000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "浩天财税通-通用财务系统",
          pjUserSpbmId: "106030102990000000004",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "Y",
          isWeb: null,
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "TEST-02",
          name: "测试商品2 ",
          price: 1500.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1488767226000,
          mender: "admin",
          modifyTime: 1488779042000,
          sl: 0.17,
          spbm: "1090511020000000000",
          printName: "固定式条码扫描器",
          pjUserSpbmId: "109051102000000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "Y",
          isWeb: null,
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "KC_20170830_4",
          name: "测试商品1",
          price: 0.01,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1510555302000,
          mender: "",
          modifyTime: 1488767206000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "浩天财税通-通用财务系统",
          pjUserSpbmId: "106030102990000000004",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "",
          canGive: "N",
          isWeb: null,
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "GE_PRINT",
          name: "个人版打印机",
          price: 2500.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "HTY_001",
          createTime: 1485049922000,
          mender: "HTY_001",
          modifyTime: 1482319331000,
          sl: 0.17,
          spbm: "1090511030000000000",
          printName: "EPSON小型票据打印机",
          pjUserSpbmId: "109051103000000000005",
          yj: "Y",
          onlyCompany: "N",
          describeInfo: "个人版打印机描述",
          canGive: null,
          isWeb: null,
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "CSFW_720",
          name: "智慧财税服务高级版  ",
          price: 360.0,
          once: "N",
          alone: "N",
          agreement: "Y",
          monthsOfValidity: 24,
          state: "2",
          creator: "HTY_001",
          createTime: 1485049919000,
          mender: "admin",
          modifyTime: 1482459650000,
          sl: 0.06,
          spbm: "3040201990000000000",
          printName: "技术服务费",
          pjUserSpbmId: "304020199000000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "智慧财税服务高级版描述",
          canGive: null,
          isWeb: null,
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "CSFW_360",
          name: "智慧财税服务",
          price: 360.0,
          once: "N",
          alone: "N",
          agreement: "Y",
          monthsOfValidity: 12,
          state: "2",
          creator: "HTY_001",
          createTime: 1515481216000,
          mender: "admin",
          modifyTime: 1492154634000,
          sl: 0.06,
          spbm: "3040201990000000000",
          printName: "技术服务费",
          pjUserSpbmId: "304020199000000000001",
          yj: "Y",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: null,
          isWeb: "Y",
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171024/20171024101606095.jpg",
          allowAuth: "N"
        }, {
          id: "CSFW_1000",
          name: "智慧财税服务特级版",
          price: 360.0,
          once: "N",
          alone: "N",
          agreement: "Y",
          monthsOfValidity: 36,
          state: "2",
          creator: "HTY_001",
          createTime: 1515481216000,
          mender: "HTY_001",
          modifyTime: 1481779253000,
          sl: 0.06,
          spbm: "3040201990000000000",
          printName: "技术服务费",
          pjUserSpbmId: "304020199000000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "智慧财税服务特级版描述",
          canGive: null,
          isWeb: "Y",
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171024/20171024101606095.jpg",
          allowAuth: "N"
        }, {
          id: "cs111",
          name: "cs111 ",
          price: 750.0,
          once: "N",
          alone: "Y",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1516100024000,
          mender: "admin",
          modifyTime: 1516859129000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "csacascasca123\r\n\t\t\t\t\t\t\t\t\t\t\t<table><tr><td>asdasd</td><td>asdasd</td></tr><tr><td>asdasd</td><td>asdasd</td></tr></table>\r\n####+1",
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 33,
          coverImage: "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          allowAuth: "Y"
        }, {
          id: "CS02212",
          name: "测试",
          price: 750.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 24,
          state: "2",
          creator: "admin",
          createTime: 1515481224000,
          mender: "admin",
          modifyTime: 1488449764000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: null,
          isWeb: "Y",
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          allowAuth: "N"
        }, {
          id: "999",
          name: "浩天培训",
          price: 0.0,
          once: "Y",
          alone: "Y",
          agreement: "N",
          monthsOfValidity: 0,
          state: "2",
          creator: "admin",
          createTime: 1496987975000,
          mender: "admin",
          modifyTime: 1496987981000,
          sl: 0.06,
          spbm: "3049900000000000000",
          printName: "培训费",
          pjUserSpbmId: "304990000000000000001",
          yj: "N",
          onlyCompany: "N",
          describeInfo: "",
          canGive: "",
          isWeb: "",
          isCourse: null,
          scoreType: null,
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "750",
          name: "智慧财税服务 750",
          price: 750.0,
          once: "N",
          alone: "N",
          agreement: "Y",
          monthsOfValidity: 36,
          state: "2",
          creator: "admin",
          createTime: 1515481223000,
          mender: "admin",
          modifyTime: 1492154678000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 80,
          coverImage: "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          allowAuth: "N"
        }, {
          id: "6",
          name: "99元促销产品         ",
          price: 99.0,
          once: "N",
          alone: "Y",
          agreement: "Y",
          monthsOfValidity: 0,
          state: "2",
          creator: "admin",
          createTime: 1516100020000,
          mender: "admin",
          modifyTime: 1513304965000,
          sl: 0.06,
          spbm: "3040201990000000000",
          printName: "技术服务费",
          pjUserSpbmId: "304020199000000000001",
          yj: "N",
          onlyCompany: "N",
          describeInfo: null,
          canGive: "N",
          isWeb: "Y",
          isCourse: null,
          scoreType: "3",
          score: null,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "360",
          name: "智慧财税服务 360         ",
          price: 360.0,
          once: "N",
          alone: "N",
          agreement: "Y",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1515481222000,
          mender: "admin",
          modifyTime: 1516859083000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "cs",
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 10,
          coverImage: "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          allowAuth: "Y"
        }, {
          id: "20180205cs",
          name: "测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度",
          price: 950.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1517798389000,
          mender: "admin",
          modifyTime: 1517798389000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天票据管理系统",
          pjUserSpbmId: "106030102990000000002",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "123",
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 50,
          coverImage: "http://192.168.10.102:18001/resources/image/20171024/20171024155915708.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          allowAuth: "Y"
        }, {
          id: "20180110ceshi",
          name: "20180110测试360    ",
          price: 360.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1515580773000,
          mender: "admin",
          modifyTime: 1515640928000,
          sl: 0.06,
          spbm: "3040201990000000000",
          printName: "年技术服务费",
          pjUserSpbmId: "304020199000000000008",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "<table >\r\n   <tr>\r\n        <td>课程服务课程服务</td>   \r\n       <td>一年课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n\r\n</table>",
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 200,
          coverImage: "http://192.168.10.102:18001/resources/image/20171025/20171025134945145.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171025/20171025132516761.png",
          allowAuth: "N"
        }, {
          id: "20171225cs2",
          name: "20171225cs2  ",
          price: 750.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1514183759000,
          mender: "admin",
          modifyTime: 1516844311000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "![图片详情](http://192.168.10.102:18001/resources/image/20171025/20171025135617719.jpg)",
          canGive: "",
          isWeb: "Y",
          isCourse: null,
          scoreType: "2",
          score: 211,
          coverImage: "http://192.168.10.102:18001/resources/image/20171024/20171024155915708.png",
          detailImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          allowAuth: "Y"
        }, {
          id: "20171225cs",
          name: "20171225cs         ",
          price: 750.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1515390561000,
          mender: "admin",
          modifyTime: 1515565141000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: '[{"type":"测试","value":"1"}]\r\n\t\t\t\t\t\t\t![图片详情](http://192.168.10.102:18001/resources/image/20171024/20171024103217808.jpg)',
          canGive: "",
          isWeb: "",
          isCourse: null,
          scoreType: "2",
          score: 444,
          coverImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171025/20171025135632181.jpg",
          allowAuth: "N"
        }, {
          id: "20171218cs1",
          name: "20181218cs1",
          price: 750.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 12,
          state: "2",
          creator: "admin",
          createTime: 1514190229000,
          mender: "admin",
          modifyTime: 1513560139000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "",
          isWeb: "",
          isCourse: null,
          scoreType: "2",
          score: 700,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }, {
          id: "20171215ceshi2",
          name: "cs2",
          price: 750.0,
          once: "N",
          alone: "Y",
          agreement: "N",
          monthsOfValidity: 24,
          state: "2",
          creator: "admin",
          createTime: 1515481417000,
          mender: "admin",
          modifyTime: 1515739464000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "![图片详情](http://192.168.10.102:18001/resources/image/20171024/20171024101705002.jpg)",
          canGive: "Y",
          isWeb: "Y",
          isCourse: null,
          scoreType: "2",
          score: 22,
          coverImage: "http://192.168.10.102:18001/resources/image/20171024/20171024101653786.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171024/20171024101649229.jpg",
          allowAuth: "N"
        }, {
          id: "20171215ceshi",
          name: "1215ceshi               ",
          price: 750.0,
          once: "N",
          alone: "Y",
          agreement: "N",
          monthsOfValidity: 36,
          state: "2",
          creator: "admin",
          createTime: 1515726303000,
          mender: "admin",
          modifyTime: 1515565820000,
          sl: 0.17,
          spbm: "1060301029900000000",
          printName: "神州浩天网上纳税申报系统",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: "##商品ID      123\r\n服务期限             ![图片详情](http://192.168.10.102:18001/resources/image/20180108/20180108184457674.png)年\r\n\t\t\t\t\t\t\t\t<table><tr><td>asdasd</td><td>asdasd</td></tr><tr><td>asdasd</td><td>asdasd</td></tr></table>\r\n####+1",
          canGive: "Y",
          isWeb: "Y",
          isCourse: null,
          scoreType: "1",
          score: 300,
          coverImage: "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          detailImage: "http://192.168.10.102:18001/resources/image/20171024/20171024101711320.jpg",
          allowAuth: "N"
        }, {
          id: "000789",
          name: "test_isweb",
          price: 1200.0,
          once: "N",
          alone: "N",
          agreement: "N",
          monthsOfValidity: 36,
          state: "2",
          creator: "admin",
          createTime: 1514190234000,
          mender: "admin",
          modifyTime: 1513315939000,
          sl: 0.17,
          spbm: "1090511020000000000",
          printName: "二维码智能扫描仪",
          pjUserSpbmId: "106030102990000000001",
          yj: "N",
          onlyCompany: "Y",
          describeInfo: null,
          canGive: "",
          isWeb: "N",
          isCourse: null,
          scoreType: "2",
          score: 55,
          coverImage: "",
          detailImage: "",
          allowAuth: "N"
        }];
      }
    },
    watch: {
      //检测对象中属性变化
      "obj.scoreRadio": function() {
        if (this.obj.scoreRadio == "3") {
          this.obj.scoreKindRadio = "";
        } else if (this.obj.scoreRadio == "1") {
          // this.obj.scoreKindRadio = "1";
        }
      },
      "obj.allowVip": function() {
        if (this.obj.allowVip.indexOf("vipfree") > -1) {
          this.obj.vipPrice = 0;
        }
      },
      "obj.feeType": function() {
        if (this.obj.feeType == "F") {
          this.obj.vipPrice = this.obj.nonVipPrice = 0;
        }
      },
      "obj.scoreKindRadio": function() {
        this.obj.score = "";
      }
    }
  };
</script>
<style scoped>
  .form-group:empty {
    margin-bottom: 0;
  }
  
  .course_column_bottom:hover {
    background-color: #E5E7EC;
  }
  
  .course_column_bottom {
    padding: 5px 0;
    border: 1px solid #ddd;
    background-color: #EFF0F4;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  
  #addCourseColumn {
    margin: 0;
    cursor: pointer;
  }
  
  #course_panel {
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  #newcolumn {
    font-size: 0;
    border: 1px solid #ddd;
    border-top: none;
  }
  
  #newcolumn>div {
    display: inline-block;
    font-size: 14px;
    padding: 4px 8px;
  }
</style>