<template>
  <div class="container">
    <!--
        '##:::::'##:'########::'####:'########:'########:'####:'##::: ##:'########::'#######::
         ##:'##: ##: ##.... ##:. ##::... ##..:: ##.....::. ##:: ###:: ##: ##.....::'##.... ##:
         ##: ##: ##: ##:::: ##:: ##::::: ##:::: ##:::::::: ##:: ####: ##: ##::::::: ##:::: ##:
         ##: ##: ##: ########::: ##::::: ##:::: ######:::: ##:: ## ## ##: ######::: ##:::: ##:
         ##: ##: ##: ##.. ##:::: ##::::: ##:::: ##...::::: ##:: ##. ####: ##...:::: ##:::: ##:
         ##: ##: ##: ##::. ##::: ##::::: ##:::: ##:::::::: ##:: ##:. ###: ##::::::: ##:::: ##:
        . ###. ###:: ##:::. ##:'####:::: ##:::: ########:'####: ##::. ##: ##:::::::. #######::
        :...::...:::..:::::..::....:::::..:::::........::....::..::::..::..:::::::::.......:::
        -->
    <div class="row" v-show="currentPanel=='new'">
      <div class="col-md-12 col-sm-12">
        <h2 class="text-center">产品销售</h2>
        
        
        <form class="form-horizontal" method="post" role="form">
          <ht-tabss active="点位选择">
            <!--
           '########:::'#######::'####:'##::: ##:'########:
            ##.... ##:'##.... ##:. ##:: ###:: ##:... ##..::
            ##:::: ##: ##:::: ##:: ##:: ####: ##:::: ##::::
            ########:: ##:::: ##:: ##:: ## ## ##:::: ##::::
            ##.....::: ##:::: ##:: ##:: ##. ####:::: ##::::
            ##:::::::: ##:::: ##:: ##:: ##:. ###:::: ##::::
            ##::::::::. #######::'####: ##::. ##:::: ##::::
           ..::::::::::.......:::....::..::::..:::::..:::::
           -->
            <ht-tab title="点位选择">
              <panel title="点位选择">
                <div class="form-group" style="margin-top:15px;">
                  <div class="col-sm-2 text-right">
                    <label for="teacherId" class="control-label">点位选择</label>
                  </div>
                  <div class="col-sm-10">
                    <ht-select name="sds" v-model="point">
                      <option value="">请选择</option>
                      <option v-for="x in points" :value="x.id">{{x.name}}</option>
                    </ht-select>
                  </div>
                </div>
              </panel>
            </ht-tab>
            <!--
            '##::::'##::'######::'########:'########::'####:'##::: ##:'########::'#######::
             ##:::: ##:'##... ##: ##.....:: ##.... ##:. ##:: ###:: ##: ##.....::'##.... ##:
             ##:::: ##: ##:::..:: ##::::::: ##:::: ##:: ##:: ####: ##: ##::::::: ##:::: ##:
             ##:::: ##:. ######:: ######::: ########::: ##:: ## ## ##: ######::: ##:::: ##:
             ##:::: ##::..... ##: ##...:::: ##.. ##:::: ##:: ##. ####: ##...:::: ##:::: ##:
             ##:::: ##:'##::: ##: ##::::::: ##::. ##::: ##:: ##:. ###: ##::::::: ##:::: ##:
            . #######::. ######:: ########: ##:::. ##:'####: ##::. ##: ##:::::::. #######::
            :.......::::......:::........::..:::::..::....::..::::..::..:::::::::.......:::
            -->
            <ht-tab title="客户信息">
              <panel title="客户信息">
                <div class="form-group hidden">
                  <label for="inputPassword3" class="col-xs-2 control-label">地税纳税人识别号</label>
                  <div class="col-xs-10">
                    <div class="input-group">
                      <input type="text" class="form-control" id="dsNsrsbh" name="dsNsrsbh" value="${info.dsNsrsbh}" maxlength="50" placeholder="请输入地税纳税人识别号代码信息">
                      <span class="input-group-btn">
                        <button class="btn btn-primary" type="button" onclick="findMessageBydsNsrsbh(this)">
                          <span class="glyphicon glyphicon-search"></span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-xs-2 control-label">纳税人识别号(统一社会信用代码)</label>
                  <div class="col-xs-10">
                    <div class="col-xs-11" style="padding:0;">
                      <div class="input-group">
                        <input type="text" class="form-control" id="shxydm" name="shxydm" v-model="shxydm" maxlength="50" placeholder="请输入统一社会信用代码信息">
                        <span class="input-group-btn">
                          <button class="btn btn-primary" type="button" @click="getCompanyInfo()">
                            <span class="glyphicon glyphicon-search"></span>
                          </button>
                        </span>
                      </div>
                    </div>
                    <div class="col-xs-1" style="padding:2px 0 0 12px;">
                      <a class="delbtn btn btn-sm btn-primary" onclick="toOrderList()">查询订单</a>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-xs-2 control-label">纳税人名称</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" id="nsrmc" name="nsrmc" v-model="companyInfo.nsrmc" maxlength="300" placeholder="请输入纳税人名称信息">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-xs-2 control-label">联系地址</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" id="address" name="address" v-model="companyInfo.address" maxlength="300" placeholder="请输入联系地址信息">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-xs-2 control-label">联系邮编</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" id="zip" name="zip" v-model="companyInfo.zip" maxlength="6" placeholder="请输入联系邮编信息">
                  </div>
                </div>
                <!-- {{companyInfo}} -->
                <div class="form-group">
                  <label for="inputPassword3" class="col-xs-2 control-label">授权服务电话</label>
                  <div class="col-xs-10" id="phoneList">
                    <div v-for="(x,$index) in phoneArr" class="row" style="margin:  0 0 10px">
                      <div class="col-xs-11" style="padding:0">
                        <input type="text" class="form-control" v-model="phoneArr[$index]" placeholder="请输入授权服务电话信息">
                      </div>
                      <div class="col-xs-1" style="padding:2px 0 0 12px">
                        <a class="delbtn btn btn-sm btn-danger btn-block" title="删除" @click="(phoneArr.length > 1)&&phoneArr.splice($index,1)">删除</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-offset-2 col-xs-10">
                    <a class="btn btn-sm htbtn-info" @click="(phoneArr[phoneArr.length-1]!='')&&phoneArr.push('')">添加</a>
                  </div>
                </div>
                <div class="form-group">
                  <label for="contact" class="col-xs-2 control-label">联系人</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" id="contact" name="contact" maxlength="80" v-model="companyInfo.contact" placeholder="请输入联系人信息">
                  </div>
                </div>
                <div class="form-group">
                  <label for="mobilePhone" class="col-xs-2 control-label">联系人手机号码</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" id="mobilePhone" name="mobilePhone" v-model="companyInfo.mobilePhone" placeholder="请输入联系人手机号码">
                    <p class="text-danger padding-top7">(*请工作人员现场打电话确认)</p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="wechatOpenid" class="col-xs-2 control-label">联系人微信号</label>
                  <div class="col-xs-10">
                    <input type="text" class="form-control" v-model="companyInfo.wechatOpenid" maxlength="128" placeholder="请输入联系人微信号">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-xs-2 control-label">联系人职位</label>
                  <div class="col-xs-10">
                    <!-- <input type="hidden" class="form-control" id="jobHidden"  > -->
                    {{companyInfo.jobs}}
                    <ht-select v-model="companyInfo.jobs">
                      <option value="">请选择</option>
                      <option value="其他">其他</option>
                      <option value="公司负责人">公司负责人</option>
                      <option value="财务负责人">财务负责人</option>
                      <option value="会计">会计</option>
                      <option value="代理公司">代理公司</option>
                    </ht-select>
                  </div>
                </div>
                <div class="text-center text-danger">
                  <strong id="message"></strong>
                </div>
              </panel>

            </ht-tab>

            <!--
            :'######::::'#######:::'#######::'########:::'######::
            '##... ##::'##.... ##:'##.... ##: ##.... ##:'##... ##:
             ##:::..::: ##:::: ##: ##:::: ##: ##:::: ##: ##:::..::
             ##::'####: ##:::: ##: ##:::: ##: ##:::: ##:. ######::
             ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##::..... ##:
             ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##:'##::: ##:
            . ######:::. #######::. #######:: ########::. ######::
            :......:::::.......::::.......:::........::::......:::
            -->
            <ht-tab title="产品信息">
              <panel title="产品信息">
                <div class="form-group">
                  <label for="inputEmail3" class="col-xs-2 control-label">产品名称</label>
                  <div class="col-xs-10">
                    <ht-select class="form-control" v-model="selectGood">
                      <option value="">请选择产品</option>
                      <option :value="x.id" v-for="(x,$index) in goodsList">{{x.id+'、'+x.name+(x.alone=='Y'?'(独立销售产品)':'')}}</option>
                    </ht-select>
                  </div>
                </div>
                <table class="table table-hover text-center">
                  <thead>
                    <tr>
                      <th class="text-center">产品ID</th>
                      <th class="text-center">产品名称</th>
                      <th class="text-center">打印名称</th>
                      <th class="text-center">数量</th>
                      <th class="text-center">含税价格</th>
                      <th class="text-center">税率</th>
                      <th class="text-center">单价</th>
                      <th class="text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody id="goodsList">

                    <tr v-for="(vt,$index) in selectedGoods">
                      <td>{{vt.id}}</td>
                      <td style="max-width:350px;">{{vt.name}}</td>
                      <td>{{vt.printName}}</td>
                      <td><input class='form-control  text-center' value='1' type='text' readonly></td>
                      <td>
                        <input-num type="money" class="form-control  text-center price" v-model="vt.price" :readonly="vt.yj != 'Y'"></input-num>
                      </td>
                      <td>{{vt.sl*100}}%</td>
                      <td class="tdTotle">
                        {{(!isNaN(vt.price)&&(vt.price-0).toFixed(2))||'0.00'}}
                      </td>
                      <td>
                        <a class="btn btn-sm btn-danger" href="javascript:;" onclick="delProduct(this)" @click="deleteSelectedGoods($index)">删除</a>

                      </td>
                    </tr>
                  </tbody>
                  <tfoot id="right">
                    <tr>
                      <td class="text-right" colspan="8">
                        <strong>总价&nbsp;:&nbsp;</strong>&nbsp;&nbsp;&nbsp;
                        <span id="totlePrice">{{sumPrice}}</span>&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                  </tfoot>
                </table>

                <div>
                  <p style="padding: 15px;" class="text-danger lead text-center" v-show="messageWord!=''" id="backBuyMessage">{{messageWord}}</p>
                </div>
                {{selectedGoods}}
              </panel>
            </ht-tab>

            <!--
            :'######::'########:'##::: ##:'########:::'######::::'#######:::'#######::'########::
            '##... ##: ##.....:: ###:: ##: ##.... ##:'##... ##::'##.... ##:'##.... ##: ##.... ##:
             ##:::..:: ##::::::: ####: ##: ##:::: ##: ##:::..::: ##:::: ##: ##:::: ##: ##:::: ##:
            . ######:: ######::: ## ## ##: ##:::: ##: ##::'####: ##:::: ##: ##:::: ##: ##:::: ##:
            :..... ##: ##...:::: ##. ####: ##:::: ##: ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##:
            '##::: ##: ##::::::: ##:. ###: ##:::: ##: ##::: ##:: ##:::: ##: ##:::: ##: ##:::: ##:
            . ######:: ########: ##::. ##: ########::. ######:::. #######::. #######:: ########::
            :......:::........::..::::..::........::::......:::::.......::::.......:::........:::
            -->
            <ht-tab title="促销品信息">
              <panel title="促销品信息">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th class="id text-center">是否赠送</th>
                      <th class="text-center">促销品编号</th>
                      <th class="text-center">促销品名</th>
                      <th class="text-center">数量</th>
                    </tr>
                  </thead>
                  <tbody id="giftList">


                    <tr v-for="(vt,$index) in giftList">
                      <td class="text-center">
                        <ht-checkbox v-model="selectedGifts" :label="vt.id" :labelShow="false"></ht-checkbox>
                        <!-- <input type="checkbox" class="cxpCheckBox" /> -->
                      </td>
                      <td class="text-center">{{vt.id }}</td>
                      <td class="text-center">{{vt.name }} ({{vt.score||0 }}积分)</td>

                      <td class="text-center">
                        <a href="javascript:;" class="btn btn-sm btn-danger low" :disabled="selectedGifts.indexOf(vt.id)==-1" @click="vt.qualityNum>1&&vt.qualityNum--">减少</a>
                        <input type="text" class="form-control cxpNum text-center" v-model="vt.qualityNum" style="display: inline;width: 50px;" />
                        <a href="javascript:;" class="btn btn-sm btn-success up" :disabled="selectedGifts.indexOf(vt.id)==-1" @click="vt.qualityNum++">增加</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- {{selectedGifts}} -->
              </panel>
              <div class="text-right">
                <button type="button" class="btn btn-primary" @click="saveInfo()">保存信息</button>
              </div>
            </ht-tab>
          </ht-tabss>
        </form>
      </div>
    </div>

    <!--
    :'#######::'########::'########::'########:'########::'####:'##::: ##:'########::'#######::
    '##.... ##: ##.... ##: ##.... ##: ##.....:: ##.... ##:. ##:: ###:: ##: ##.....::'##.... ##:
     ##:::: ##: ##:::: ##: ##:::: ##: ##::::::: ##:::: ##:: ##:: ####: ##: ##::::::: ##:::: ##:
     ##:::: ##: ########:: ##:::: ##: ######::: ########::: ##:: ## ## ##: ######::: ##:::: ##:
     ##:::: ##: ##.. ##::: ##:::: ##: ##...:::: ##.. ##:::: ##:: ##. ####: ##...:::: ##:::: ##:
     ##:::: ##: ##::. ##:: ##:::: ##: ##::::::: ##::. ##::: ##:: ##:. ###: ##::::::: ##:::: ##:
    . #######:: ##:::. ##: ########:: ########: ##:::. ##:'####: ##::. ##: ##:::::::. #######::
    :.......:::..:::::..::........:::........::..:::::..::....::..::::..::..:::::::::.......:::
    -->
    <div class="row" v-show="currentPanel=='order'">
        <div class="col-md-12 ">

          <h1 class="text-center">确认订单</h1>
          <panel title="确认订单">
            <div class="menuContent">
              <div class="menuSmellTitle">
                  纳税人名称
                </div>
                <p>
                  &nbsp;&nbsp;&nbsp;{{orderInfo.info.nsrmc}}
                </p>
                  <div class="menuSmellTitle">
                  产品信息
                </div>
              	<table class="table table-hover text-center">
                    <thead>
                    <tr>
                      <th class="text-center">产品ID</th>
                      <th class="text-center">产品名称</th>
                      <th class="text-center">打印名称</th>
                      <th class="text-center">数量</th>
                      <th class="text-center">含税价</th>
                      <th class="text-center">税率</th>
                      <th class="text-center">单价</th>
                    </tr> </thead>
                      <tbody>
                      <tr v-for="x in orderInfo.goods" v-if="orderInfo.goods.length>0">
                        <td class="text-center">{{x.orderGoods.goodsId}}</td>
                        <td class="text-center">{{x.goodsName}}</td>
                          <td class="text-center">{{x.orderGoods.printName}}</td>
                        <td class="text-center">{{x.orderGoods.quantity}}</td>
                        <td class="text-center">{{x.orderGoods.price}}</td>
                        <td class="text-center">{{x.orderGoods.sl*100}}%</td>
                        <td class="text-center">{{x.orderGoods.amount}}</td>
                      </tr>
                      <tr v-if="orderInfo.goods.length==0">
                          <td class="text-center" colspan="10">暂无数据</td> 
                        </tr>
                    </tbody>
                </table>
                <div class="menuSmellTitle">
                    元件
                  </div>
                  <table class="table table-hover text-center">
                      <thead>
                      <tr>
                        <th class="text-center">元件名</th>
                        <th class="text-center">类型</th>
                        <th class="text-center">数量</th>
                        <th class="text-center">模块</th>
                        <th class="text-center">服务次数</th>
                        <th class="text-center">服务期限(月)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="orderInfo.items.length==0">
                          <td class="text-center" colspan="10">暂无数据</td> 
                        </tr>
                        <tr v-for="item in orderInfo.items" v-if="orderInfo.items.length>0">
                            <td class="text-center">${item.goodsItem.itemName}</td>
                            <td class="text-center">
                            <c:if test="${item.goodsItem.itemType eq '1'}">
                              硬件
                            </c:if>
                            <c:if test="${item.goodsItem.itemType eq '2'}">
                              软件
                            </c:if>
                            <c:if test="${item.goodsItem.itemType eq '3'}">
                              服务
                            </c:if>
                            </td>
                            <td class="text-center">
                              <c:if test="${item.goodsItem.itemType eq '2'}">
                                -
                              </c:if>
                              <c:if test="${item.goodsItem.itemType eq '3'}">
                                -
                              </c:if>
                              <c:if test="${item.goodsItem.itemType eq '1'}">
                                ${item.num}
                              </c:if>
                            </td>
                            <td class="text-center">${item.moduls}</td>
                            <td class="text-center">
                              <c:if test="${item.numOfService >= 0}">
                                ${item.numOfService }
                              </c:if>
                              <c:if test="${item.numOfService < 0}">
                                -
                              </c:if>
                            </td>
                            <td class="text-center">
                              <c:if test="${item.months >= 0}">
                                ${item.showMonths}
                              </c:if>
                              <c:if test="${item.months < 0}">
                                -
                              </c:if>
                            </td>
                          </tr>
                      </tbody>
                      <!-- <c:forEach items="${items}" var="item"> -->
                       
                      <!-- </c:forEach> -->
                    
                  </table>

                  <div class="menuSmellTitle">
                      促销品
              </div>
              <div class="form-horizontal">
              <c:forEach items="${gifts}" var="gift">
                <p v-for="x in orderInfo.gifts">
                {{x.giftName}}&nbsp;X&nbsp;{{x.gift.quantity}}&nbsp;&nbsp;&nbsp;
              </p>
              </c:forEach>
              </div>
              <br />


              </div>
          </panel>
          <div class="row">
          
          <div class="col-xs-12 text-center">
                  <h4 v-if="orderInfo.isExist ==='false'||orderInfo.isExist ===false">
                    <strong class="text-danger">该客户在一年之内存在产品相同的订单</strong>
                  </h4>
              </div>

              <div class="col-xs-12 text-center">
                  <h4><strong class="text-danger">{{orderInfo.flag}}</strong></h4>
                </div></div>
          <div class="row">
              <div class="col-xs-12">
                <div class="pull-left">
                </div>
                <div class="pull-right">
                  <p class="money">总计：
                    {{orderInfo.order.amount.toFixed(2) }}元</p><br/>
                  <p class="money">积分：
                   {{orderInfo.order.totalScore||0}}
                  </p>
                </div>
              </div>
            </div>
            <input type="hidden" id="flagAgreement" name="flagAgreement" value="1">
            <input type="hidden" name="id" value="${order.id}">
            <div class="row text-right">
              <div class="col-xs-12">
                <a id="btn_save" class="btn btn-primary " onclick="submits()">确认并提交</a> &nbsp;&nbsp;
                <a class="btn btn-danger" >取消</a>
              </div>
            </div> 

      </div> 
    </div>
  </div>

</template>
<script> 

  //  ██████╗ ██████╗ ██████╗ ███████╗
  // ██╔════╝██╔═══██╗██╔══██╗██╔════╝
  // ██║     ██║   ██║██║  ██║█████╗
  // ██║     ██║   ██║██║  ██║██╔══╝
  // ╚██████╗╚██████╔╝██████╔╝███████╗
  //  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
  export default {
    name: "HtSell",
    props: { 
    },
    /*
    '########:::::'###::::'########::::'###::::
     ##.... ##:::'## ##:::... ##..::::'## ##:::
     ##:::: ##::'##:. ##::::: ##:::::'##:. ##::
     ##:::: ##:'##:::. ##:::: ##::::'##:::. ##:
     ##:::: ##: #########:::: ##:::: #########:
     ##:::: ##: ##.... ##:::: ##:::: ##.... ##:
     ########:: ##:::: ##:::: ##:::: ##:::: ##:
    ........:::..:::::..:::::..:::::..:::::..::
    */
    //数据部分 
    data: function () {
      //组件内数据部分
      return {
        isRead: false, //是否为详情
        giftList: [],
        goodsList: [],
        points: [], //点位信息
        buyGoods: [],
        selectedGoods: [], //用户选择的商品
        selectGood: "", //每次选择的商品
        aloneNow: false, //是否允许存在独立产品
        selectedGifts: [], //用户选中的赠品
        companyInfo: {
          phone: ""
        }, //公司信息
        shxydm: "12010819710326251X31", //社会信用代码
        point: "009",
        phoneArr: [''],
        messageWord: "", //提示750信息
        currentPanel:"order",//当前展示订单页面还是展示信息填写页面
        orderInfo:JSON.parse('{"success":true,"message":null,"bean":{"flag":null,"order":{"id":"20180511142322471000000000000032","customerId":8806,"time":1526026473646,"salesman":"admin","amount":2552.0,"state":"N","flagPay":"N","payType":null,"flagInvoice":null,"flagAgreement":null,"remarks":null,"pointId":"001","sendStatus":null,"ly":"XSXT","totalScore":0,"remarksInvoice":null},"isExist":false,"items":[],"goods":[{"orderGoods":{"id":1111112169,"orderId":"20180511142322471000000000000032","goodsId":"KC_20170830_4","quantity":1,"price":0.01,"amount":0.01,"sl":0.17,"spbm":"1060301029900000000","printName":"浩天财税通-通用财务系统","isRenew":"Y","score":0},"goodsName":"测试商品1","gift":null,"giftName":null,"score":null,"alone":null,"yj":null,"onlyCompany":null}],"gifts":[{"orderGoods":null,"goodsName":null,"gift":{"id":11838,"orderId":"20180511142322471000000000000032","giftId":"001","quantity":1},"giftName":"测试促销品1","score":null,"alone":null,"yj":null,"onlyCompany":null},{"orderGoods":null,"goodsName":null,"gift":{"id":11839,"orderId":"20180511142322471000000000000032","giftId":"002","quantity":1},"giftName":"测试促销品22","score":null,"alone":null,"yj":null,"onlyCompany":null}],"isAgree":false,"info":{"id":8806,"type":"1","shxydm":"120117777303334","gsNsrsbh":"","dsNsrsbh":"","nsrmc":"kkkk","address":"的撒啊萨达大事的撒打算","zip":"123123","phone":"15902212707","contact":"联系人","wechatOpenid":"123","qqOpenid":null,"mobilePhone":"15902212707","vipLevel":1,"regTime":1510802155000,"modifyTime":1526026477791,"source":null,"jobs":"公司负责人","ukeyId":null,"djxh":null}}}').bean,

      }
    },
    mounted: function () {
      //组件生成时调用
    },
    // '##::::'##:'########:'########:'##::::'##::'#######::'########:::'######::
    //  ###::'###: ##.....::... ##..:: ##:::: ##:'##.... ##: ##.... ##:'##... ##:
    //  ####'####: ##:::::::::: ##:::: ##:::: ##: ##:::: ##: ##:::: ##: ##:::..::
    //  ## ### ##: ######:::::: ##:::: #########: ##:::: ##: ##:::: ##:. ######::
    //  ##. #: ##: ##...::::::: ##:::: ##.... ##: ##:::: ##: ##:::: ##::..... ##:
    //  ##:.:: ##: ##:::::::::: ##:::: ##:::: ##: ##:::: ##: ##:::: ##:'##::: ##:
    //  ##:::: ##: ########:::: ##:::: ##:::: ##:. #######:: ########::. ######::
    // ..:::::..::........:::::..:::::..:::::..:::.......:::........::::......:::
    //方法
    methods: {
      /**
       * 用于将外部数据转化为内部数据 
       * @returns 
       */
      initData() {
        //外部数据传递整体数据对象,然后获取
      },
      /**
       * 保存信息 
       * @returns 
       */
      saveInfo() {
        //过滤数组中的对象
        let giftArr = this.giftList.filter(item => {
          return this.selectedGifts.indexOf(item.id) > -1;
        });
        //发送给后台的数据格式
        let giftResult = [];
        giftArr.forEach(element => {
          giftResult.push({
            id: element.id,
            num: element.qualityNum
          });
        });
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        console.log(giftResult);
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
      },
      /**
       * 获取公司信息 
       * @returns 
       */
      getCompanyInfo() {
        let id = this.shxydm;
        let self = this;
        $.ajax({
          type: "POST",
          url: "/csfwpt_console/sales/order/get_customer",
          data: {
            shxydm: id,
            gsNsrsbh: "",
            dsNsrsbh: ""
          },
          dataType: "json",
          success: function (data, textStatus, jqXHR) {
            if (data != null && data != "") {
              if (data.success) {
                //TODO 此时需要更多操作
                self.companyInfo = data.bean;
              }
            } else {
              self.companyInfo = {}
            }
          },
          error: function (response) {
            self.companyInfo = {
              "id": 7,
              "type": "1",
              "shxydm": "12010819710326251X31",
              "gsNsrsbh": "",
              "dsNsrsbh": "",
              "nsrmc": "天津市滨海新区汉沽广正五金经营部",
              "address": "天津市河东区东局子大道",
              "zip": "173000",
              "phone": "15922135158,18722097320,15902212707",
              "contact": "小马同学",
              "wechatOpenid": "oldsix",
              "qqOpenid": null,
              "mobilePhone": "15922135158",
              "vipLevel": 1,
              "regTime": 1501816506000,
              "modifyTime": 1515560675000,
              "source": null,
              "jobs": "其他",
              "ukeyId": null,
              "djxh": null
            }
            //NOTE 此处电话需要操作
            self.phoneArr = self.companyInfo.phone ? self.companyInfo.phone.split(',') : ['']
          }
        });

        let customerstatusUrl = 'http://www.htyfw.com.cn:10078/customerstatus/qyjbxx';
        $.ajax({
          dataType: 'jsonp',
          data: {
            sh: id
          },
          jsonp: 'callback',
          jsonpCallback: "jsonpCallBack",
          url: customerstatusUrl,
          success: function (data) {
            if (data.bean > 0) {
              // $("#backBuyMessage").html("");
              self.messageWord = "该用户在纳税申报系统授权记录中存在，应该属于购买过750产品的用户，请谨慎销售！"
            }
          }
        });
      },
      addNum(index) {
        // alert(index)
        this.giftList[index].qualityNum += 1;
      },

      //添加到商品选择列表中
      pushSelectGood() {

      },
      //从选择商品列表删除
      deleteSelectedGoods(index) {
        this.selectedGoods.splice(index, 1)
      },
      // 搜索
      searchClick() {
        this.$alert(
          "提示",
          "搜索",
          function ($content) {
            //点击确定按钮进行操作(YES)
          },
          function ($content) {
            //提示框显示出来之后的操作(Ready)

          }
        );
      },
      getGiftAndGood() {

        // 点阵字 http://www.orz6.com/lattice.aspx 
        var self = this;
        // $.ajax({
        //   type: "GET",
        //   url: "service/give/getGiftAndGood",
        //   data: {
        //     liveId: liveId
        //   },
        //   dataType: "json",
        //   success: function(data, textStatus, jqXHR) {
        //     if (data != null && data != "") {
        //       if (data.success) {
        //       } else {
        //       }
        //     } else {
        //       // tool.alert("提示", "未获取到数据!");
        //     }
        //   },
        //   error: function(response) {
        //     // TODO 后期置空
        //     // self.giftList = [];
        //     // self.goodsList = [];

        //   }
        // });


        self.goodsList = [{
          "id": "TEST-04",
          "name": "测试商品4 ",
          "price": 0.01,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1494379956000,
          "mender": "admin",
          "modifyTime": 1506059430000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "浩天财税通-通用财务系统",
          "pjUserSpbmId": "106030102990000000004",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "Y",
          "isWeb": "",
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "TEST-03",
          "name": "测试商品3  ",
          "price": 0.01,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1494379956000,
          "mender": "admin",
          "modifyTime": 1490936053000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "浩天财税通-通用财务系统",
          "pjUserSpbmId": "106030102990000000004",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "Y",
          "isWeb": null,
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "TEST-02",
          "name": "测试商品2 ",
          "price": 1500,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1488767226000,
          "mender": "admin",
          "modifyTime": 1488779042000,
          "sl": 0.17,
          "spbm": "1090511020000000000",
          "printName": "固定式条码扫描器",
          "pjUserSpbmId": "109051102000000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "Y",
          "isWeb": null,
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "KC_20170830_4",
          "name": "测试商品1",
          "price": 0.01,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1510555302000,
          "mender": "",
          "modifyTime": 1488767206000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "浩天财税通-通用财务系统",
          "pjUserSpbmId": "106030102990000000004",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "",
          "canGive": "N",
          "isWeb": null,
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "GE_PRINT",
          "name": "个人版打印机",
          "price": 2500,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "HTY_001",
          "createTime": 1485049922000,
          "mender": "HTY_001",
          "modifyTime": 1482319331000,
          "sl": 0.17,
          "spbm": "1090511030000000000",
          "printName": "EPSON小型票据打印机",
          "pjUserSpbmId": "109051103000000000005",
          "yj": "Y",
          "onlyCompany": "N",
          "describeInfo": "个人版打印机描述",
          "canGive": null,
          "isWeb": null,
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "CSFW_720",
          "name": "智慧财税服务高级版  ",
          "price": 360,
          "once": "N",
          "alone": "N",
          "agreement": "Y",
          "monthsOfValidity": 24,
          "state": "2",
          "creator": "HTY_001",
          "createTime": 1485049919000,
          "mender": "admin",
          "modifyTime": 1482459650000,
          "sl": 0.06,
          "spbm": "3040201990000000000",
          "printName": "技术服务费",
          "pjUserSpbmId": "304020199000000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "智慧财税服务高级版描述",
          "canGive": null,
          "isWeb": null,
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "CSFW_360",
          "name": "智慧财税服务",
          "price": 360,
          "once": "N",
          "alone": "N",
          "agreement": "Y",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "HTY_001",
          "createTime": 1515481216000,
          "mender": "admin",
          "modifyTime": 1492154634000,
          "sl": 0.06,
          "spbm": "3040201990000000000",
          "printName": "技术服务费",
          "pjUserSpbmId": "304020199000000000001",
          "yj": "Y",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": null,
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101606095.jpg",
          "allowAuth": "N"
        }, {
          "id": "CSFW_1000",
          "name": "智慧财税服务特级版",
          "price": 360,
          "once": "N",
          "alone": "N",
          "agreement": "Y",
          "monthsOfValidity": 36,
          "state": "2",
          "creator": "HTY_001",
          "createTime": 1515481216000,
          "mender": "HTY_001",
          "modifyTime": 1481779253000,
          "sl": 0.06,
          "spbm": "3040201990000000000",
          "printName": "技术服务费",
          "pjUserSpbmId": "304020199000000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "智慧财税服务特级版描述",
          "canGive": null,
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101606095.jpg",
          "allowAuth": "N"
        }, {
          "id": "cs20180110",
          "name": "cs20180110",
          "price": 13900,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1515564466000,
          "mender": "admin",
          "modifyTime": 1524468857000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天云实训平台",
          "pjUserSpbmId": "106030102990000000005",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "11111",
          "canGive": "",
          "isWeb": "",
          "isCourse": null,
          "scoreType": "1",
          "score": 230,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171025/20171025135632181.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171025/20171025135617719.jpg",
          "allowAuth": "Y"
        }, {
          "id": "cs111",
          "name": "cs111 ",
          "price": 750,
          "once": "N",
          "alone": "Y",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1516100024000,
          "mender": "admin",
          "modifyTime": 1516859129000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "csacascasca123\r\n\t\t\t\t\t\t\t\t\t\t\t<table><tr><td>asdasd</td><td>asdasd</td></tr><tr><td>asdasd</td><td>asdasd</td></tr></table>\r\n####+1",
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 33,
          "coverImage": "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          "allowAuth": "Y"
        }, {
          "id": "CS02212",
          "name": "测试",
          "price": 750,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 24,
          "state": "2",
          "creator": "admin",
          "createTime": 1515481224000,
          "mender": "admin",
          "modifyTime": 1488449764000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": null,
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          "allowAuth": "N"
        }, {
          "id": "cs005",
          "name": "修改打印名称 ",
          "price": 40,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1524469177000,
          "mender": "admin",
          "modifyTime": 1524470510000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天云实训平台",
          "pjUserSpbmId": "106030102990000000003",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "啊啊",
          "canGive": "",
          "isWeb": "",
          "isCourse": null,
          "scoreType": "3",
          "score": null,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101717357.jpg",
          "allowAuth": "N"
        }, {
          "id": "999",
          "name": "浩天培训",
          "price": 0,
          "once": "Y",
          "alone": "Y",
          "agreement": "N",
          "monthsOfValidity": 0,
          "state": "2",
          "creator": "admin",
          "createTime": 1496987975000,
          "mender": "admin",
          "modifyTime": 1496987981000,
          "sl": 0.06,
          "spbm": "3049900000000000000",
          "printName": "培训费",
          "pjUserSpbmId": "304990000000000000001",
          "yj": "N",
          "onlyCompany": "N",
          "describeInfo": "",
          "canGive": "",
          "isWeb": "",
          "isCourse": null,
          "scoreType": null,
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "750",
          "name": "智慧财税服务 750",
          "price": 750,
          "once": "N",
          "alone": "N",
          "agreement": "Y",
          "monthsOfValidity": 36,
          "state": "2",
          "creator": "admin",
          "createTime": 1515481223000,
          "mender": "admin",
          "modifyTime": 1492154678000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 80,
          "coverImage": "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          "allowAuth": "N"
        }, {
          "id": "6",
          "name": "99元促销产品         ",
          "price": 99,
          "once": "N",
          "alone": "Y",
          "agreement": "Y",
          "monthsOfValidity": 0,
          "state": "2",
          "creator": "admin",
          "createTime": 1516100020000,
          "mender": "admin",
          "modifyTime": 1513304965000,
          "sl": 0.06,
          "spbm": "3040201990000000000",
          "printName": "技术服务费",
          "pjUserSpbmId": "304020199000000000001",
          "yj": "N",
          "onlyCompany": "N",
          "describeInfo": null,
          "canGive": "N",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "3",
          "score": null,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "360",
          "name": "智慧财税服务 360         ",
          "price": 360,
          "once": "N",
          "alone": "N",
          "agreement": "Y",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1515481222000,
          "mender": "admin",
          "modifyTime": 1516859083000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "cs",
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 10,
          "coverImage": "http://192.168.10.102:18001/resources/image/20170401/20170401130412084.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20180105/20180105135539481.png",
          "allowAuth": "Y"
        }, {
          "id": "20180205cs",
          "name": "测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度",
          "price": 950,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1517798389000,
          "mender": "admin",
          "modifyTime": 1517798389000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天票据管理系统",
          "pjUserSpbmId": "106030102990000000002",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "123",
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 50,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171024/20171024155915708.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "allowAuth": "Y"
        }, {
          "id": "20180110ceshi",
          "name": "20180110测试360    ",
          "price": 360,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1515580773000,
          "mender": "admin",
          "modifyTime": 1515640928000,
          "sl": 0.06,
          "spbm": "3040201990000000000",
          "printName": "年技术服务费",
          "pjUserSpbmId": "304020199000000000008",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "<table >\r\n   <tr>\r\n        <td>课程服务课程服务</td>   \r\n       <td>一年课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务课程服务 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n  <tr>\r\n        <td>课程服务</td>   \r\n       <td>一年 </td> \r\n</tr>\r\n\r\n</table>",
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 200,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171025/20171025134945145.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171025/20171025132516761.png",
          "allowAuth": "N"
        }, {
          "id": "20171225cs2",
          "name": "20171225cs2  ",
          "price": 750,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1514183759000,
          "mender": "admin",
          "modifyTime": 1516844311000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "![图片详情](http://192.168.10.102:18001/resources/image/20171025/20171025135617719.jpg)",
          "canGive": "",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "2",
          "score": 211,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171024/20171024155915708.png",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "allowAuth": "Y"
        }, {
          "id": "20171225cs",
          "name": "20171225cs         ",
          "price": 750,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1515390561000,
          "mender": "admin",
          "modifyTime": 1515565141000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "[{\"type\":\"测试\",\"value\":\"1\"}]\r\n\t\t\t\t\t\t\t![图片详情](http://192.168.10.102:18001/resources/image/20171024/20171024103217808.jpg)",
          "canGive": "",
          "isWeb": "",
          "isCourse": null,
          "scoreType": "2",
          "score": 444,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171025/20171025135632181.jpg",
          "allowAuth": "N"
        }, {
          "id": "20171218cs1",
          "name": "20181218cs1",
          "price": 750,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 12,
          "state": "2",
          "creator": "admin",
          "createTime": 1514190229000,
          "mender": "admin",
          "modifyTime": 1513560139000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "",
          "isWeb": "",
          "isCourse": null,
          "scoreType": "2",
          "score": 700,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }, {
          "id": "20171215ceshi2",
          "name": "cs2",
          "price": 750,
          "once": "N",
          "alone": "Y",
          "agreement": "N",
          "monthsOfValidity": 24,
          "state": "2",
          "creator": "admin",
          "createTime": 1515481417000,
          "mender": "admin",
          "modifyTime": 1515739464000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "![图片详情](http://192.168.10.102:18001/resources/image/20171024/20171024101705002.jpg)",
          "canGive": "Y",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "2",
          "score": 22,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101653786.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101649229.jpg",
          "allowAuth": "N"
        }, {
          "id": "20171215ceshi",
          "name": "1215ceshi               ",
          "price": 750,
          "once": "N",
          "alone": "Y",
          "agreement": "N",
          "monthsOfValidity": 36,
          "state": "2",
          "creator": "admin",
          "createTime": 1515726303000,
          "mender": "admin",
          "modifyTime": 1515565820000,
          "sl": 0.17,
          "spbm": "1060301029900000000",
          "printName": "神州浩天网上纳税申报系统",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": "##商品ID      123\r\n服务期限             ![图片详情](http://192.168.10.102:18001/resources/image/20180108/20180108184457674.png)年\r\n\t\t\t\t\t\t\t\t<table><tr><td>asdasd</td><td>asdasd</td></tr><tr><td>asdasd</td><td>asdasd</td></tr></table>\r\n####+1",
          "canGive": "Y",
          "isWeb": "Y",
          "isCourse": null,
          "scoreType": "1",
          "score": 300,
          "coverImage": "http://192.168.10.102:18001/resources/image/20171030/20171030084420673.jpg",
          "detailImage": "http://192.168.10.102:18001/resources/image/20171024/20171024101711320.jpg",
          "allowAuth": "N"
        }, {
          "id": "000789",
          "name": "test_isweb",
          "price": 1200,
          "once": "N",
          "alone": "N",
          "agreement": "N",
          "monthsOfValidity": 36,
          "state": "2",
          "creator": "admin",
          "createTime": 1514190234000,
          "mender": "admin",
          "modifyTime": 1513315939000,
          "sl": 0.17,
          "spbm": "1090511020000000000",
          "printName": "二维码智能扫描仪",
          "pjUserSpbmId": "106030102990000000001",
          "yj": "N",
          "onlyCompany": "Y",
          "describeInfo": null,
          "canGive": "",
          "isWeb": "N",
          "isCourse": null,
          "scoreType": "2",
          "score": 55,
          "coverImage": "",
          "detailImage": "",
          "allowAuth": "N"
        }];
        var giftList = [{
          "id": "000001",
          "name": "小米手机7",
          "state": "Y",
          "sendOutQuantity": 112,
          "creator": "admin",
          "createTiime": 1496990843000,
          "mender": "admin",
          "modifyTime": 1481009341000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "00001",
          "name": "购物袋",
          "state": "Y",
          "sendOutQuantity": 51,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1481506720000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "00002",
          "name": "宣传册",
          "state": "Y",
          "sendOutQuantity": 30,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1481618425000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "00020002",
          "name": "神州浩天LOGO湿纸巾",
          "state": "Y",
          "sendOutQuantity": 52,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": null,
          "modifyTime": null,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "001",
          "name": "测试促销品1",
          "state": "Y",
          "sendOutQuantity": 41,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1513135254000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "002",
          "name": "测试促销品22",
          "state": "Y",
          "sendOutQuantity": 34,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1488449814000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "123213123",
          "name": "李峰",
          "state": "Y",
          "sendOutQuantity": 123123172,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": null,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "231",
          "name": "张璐",
          "state": "Y",
          "sendOutQuantity": 12317,
          "creator": "admin",
          "createTiime": 1515137915000,
          "mender": "admin",
          "modifyTime": 1481767889000,
          "isweb": "Y",
          "isukey": "N",
          "score": 10
        }, {
          "id": "2333",
          "name": "鼠标垫",
          "state": "Y",
          "sendOutQuantity": 116,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": null,
          "modifyTime": null,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "3423423wqe wq",
          "name": "123",
          "state": "Y",
          "sendOutQuantity": 2,
          "creator": "admin",
          "createTiime": 1515137917000,
          "mender": "admin",
          "modifyTime": 1515740083000,
          "isweb": "N",
          "isukey": "Y",
          "score": 123456789
        }, {
          "id": "5655",
          "name": "李正",
          "state": "Y",
          "sendOutQuantity": 148,
          "creator": "admin",
          "createTiime": 1515138352000,
          "mender": "admin",
          "modifyTime": 1515580865000,
          "isweb": "Y",
          "isukey": "N",
          "score": 2000
        }, {
          "id": "666",
          "name": "刘安琪",
          "state": "Y",
          "sendOutQuantity": 23137,
          "creator": "admin",
          "createTiime": 1515137971000,
          "mender": "admin",
          "modifyTime": 1515579094000,
          "isweb": "Y",
          "isukey": "N",
          "score": 100
        }, {
          "id": "66999",
          "name": "刘看山",
          "state": "Y",
          "sendOutQuantity": 19,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1481767835000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "88",
          "name": "郭培航",
          "state": "Y",
          "sendOutQuantity": 38,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1481767861000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "987",
          "name": "123",
          "state": "Y",
          "sendOutQuantity": 13,
          "creator": "admin",
          "createTiime": 1515138417000,
          "mender": "admin",
          "modifyTime": 1515740098000,
          "isweb": "Y",
          "isukey": "N",
          "score": 0
        }, {
          "id": "999",
          "name": "张思铭",
          "state": "Y",
          "sendOutQuantity": 13,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": "admin",
          "modifyTime": 1481767818000,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "aaa",
          "name": "养乐多",
          "state": "Y",
          "sendOutQuantity": 18,
          "creator": "admin",
          "createTiime": 1496970887000,
          "mender": null,
          "modifyTime": null,
          "isweb": null,
          "isukey": "N",
          "score": null
        }, {
          "id": "eeee",
          "name": "张思铭",
          "state": "Y",
          "sendOutQuantity": 141,
          "creator": "admin",
          "createTiime": 1515141051000,
          "mender": "admin",
          "modifyTime": 1481542723000,
          "isweb": null,
          "isukey": "N",
          "score": 10000
        }, {
          "id": "fer43",
          "name": "水杯",
          "state": "Y",
          "sendOutQuantity": 0,
          "creator": "admin",
          "createTiime": 1515664809000,
          "mender": null,
          "modifyTime": null,
          "isweb": "N",
          "isukey": "N",
          "score": 1
        }, {
          "id": "fhg",
          "name": "234",
          "state": "Y",
          "sendOutQuantity": 0,
          "creator": "admin",
          "createTiime": 1515664864000,
          "mender": "admin",
          "modifyTime": 1515740093000,
          "isweb": "N",
          "isukey": "N",
          "score": 564554
        }];
        giftList.forEach(element => {
          element.qualityNum = 1;
        });
        self.giftList = giftList;
        self.points = [{
          "id": "000",
          "name": "园区",
          "state": "Y"
        }, {
          "id": "001",
          "name": "河西",
          "state": "Y"
        }, {
          "id": "002",
          "name": "西青",
          "state": "Y"
        }, {
          "id": "003",
          "name": "武清",
          "state": "Y"
        }, {
          "id": "004",
          "name": "北辰",
          "state": "Y"
        }, {
          "id": "005",
          "name": "河北",
          "state": "Y"
        }, {
          "id": "006",
          "name": "宝坻",
          "state": "Y"
        }, {
          "id": "007",
          "name": "蓟县",
          "state": "Y"
        }, {
          "id": "008",
          "name": "静海",
          "state": "Y"
        }, {
          "id": "009",
          "name": "津南",
          "state": "Y"
        }, {
          "id": "010",
          "name": "大港",
          "state": "Y"
        }, {
          "id": "011",
          "name": "东丽",
          "state": "Y"
        }, {
          "id": "012",
          "name": "滨海",
          "state": "Y"
        }, {
          "id": "013",
          "name": "塘沽",
          "state": "Y"
        }, {
          "id": "014",
          "name": "河东",
          "state": "Y"
        }, {
          "id": "015",
          "name": "宁河",
          "state": "Y"
        }, {
          "id": "016",
          "name": "技术服务",
          "state": "Y"
        }, {
          "id": "017",
          "name": "汉沽",
          "state": "Y"
        }, {
          "id": "018",
          "name": "南开",
          "state": "Y"
        }, {
          "id": "019",
          "name": "东疆",
          "state": "Y"
        }, {
          "id": "020",
          "name": "红桥",
          "state": "Y"
        }, {
          "id": "021",
          "name": "和平",
          "state": "Y"
        }, {
          "id": "022",
          "name": "空港",
          "state": "Y"
        }];
      }
    },

    // '########:'####:'##:::::::'########:'########:'########:::'######::
    //  ##.....::. ##:: ##:::::::... ##..:: ##.....:: ##.... ##:'##... ##:
    //  ##:::::::: ##:: ##:::::::::: ##:::: ##::::::: ##:::: ##: ##:::..::
    //  ######:::: ##:: ##:::::::::: ##:::: ######::: ########::. ######::
    //  ##...::::: ##:: ##:::::::::: ##:::: ##...:::: ##.. ##::::..... ##:
    //  ##:::::::: ##:: ##:::::::::: ##:::: ##::::::: ##::. ##::'##::: ##:
    //  ##:::::::'####: ########:::: ##:::: ########: ##:::. ##:. ######::
    // ..::::::::....::........:::::..:::::........::..:::::..:::......:::
    //过滤器
    filters: {},

    // :'######::'########::'########::::'###::::'########:'########:'########::
    // '##... ##: ##.... ##: ##.....::::'## ##:::... ##..:: ##.....:: ##.... ##:
    //  ##:::..:: ##:::: ##: ##::::::::'##:. ##::::: ##:::: ##::::::: ##:::: ##:
    //  ##::::::: ########:: ######:::'##:::. ##:::: ##:::: ######::: ##:::: ##:
    //  ##::::::: ##.. ##::: ##...:::: #########:::: ##:::: ##...:::: ##:::: ##:
    //  ##::: ##: ##::. ##:: ##::::::: ##.... ##:::: ##:::: ##::::::: ##:::: ##:
    // . ######:: ##:::. ##: ########: ##:::: ##:::: ##:::: ########: ########::
    // :......:::..:::::..::........::..:::::..:::::..:::::........::........:::
    //加载后立即执行的方法(created 这个钩子在实例被创建之后被调用)
    created: function () {
      this.getGiftAndGood();
      setTimeout(() => {
        this.point = "008"
      }, 3000);
    },
    // :'######:::'#######::'##::::'##:'########::'##::::'##:'########:'########:'########::
    // '##... ##:'##.... ##: ###::'###: ##.... ##: ##:::: ##:... ##..:: ##.....:: ##.... ##:
    //  ##:::..:: ##:::: ##: ####'####: ##:::: ##: ##:::: ##:::: ##:::: ##::::::: ##:::: ##:
    //  ##::::::: ##:::: ##: ## ### ##: ########:: ##:::: ##:::: ##:::: ######::: ##:::: ##:
    //  ##::::::: ##:::: ##: ##. #: ##: ##.....::: ##:::: ##:::: ##:::: ##...:::: ##:::: ##:
    //  ##::: ##: ##:::: ##: ##:.:: ##: ##:::::::: ##:::: ##:::: ##:::: ##::::::: ##:::: ##:
    // . ######::. #######:: ##:::: ##: ##::::::::. #######::::: ##:::: ########: ########::
    // :......::::.......:::..:::::..::..::::::::::.......::::::..:::::........::........:::
    computed: {
      sumPrice() {
        return this.selectedGoods.reduce((sum, ele) => sum + ele.price, 0);
      }
    },

    // '##:::::'##::::'###::::'########::'######::'##::::'##:
    //  ##:'##: ##:::'## ##:::... ##..::'##... ##: ##:::: ##:
    //  ##: ##: ##::'##:. ##::::: ##:::: ##:::..:: ##:::: ##:
    //  ##: ##: ##:'##:::. ##:::: ##:::: ##::::::: #########:
    //  ##: ##: ##: #########:::: ##:::: ##::::::: ##.... ##:
    //  ##: ##: ##: ##.... ##:::: ##:::: ##::: ##: ##:::: ##:
    // . ###. ###:: ##:::: ##:::: ##::::. ######:: ##:::: ##:
    // :...::...:::..:::::..:::::..::::::......:::..:::::..::
    watch: {
      selectGood() {
        //如果不为空
        if (this.selectGood) {
          let items = this.goodsList.filter(ele => {
            return ele.id == this.selectGood;
          });
          if (items.length > 0) {
            //判断是否存在此商品
            let isHaveGoodsId = this.selectedGoods.some(ele => {
              return ele.id == this.selectGood;
            });
            //独立产品判断
            if (this.selectedGoods.length > 0) {
              if (items[0].alone == "Y") {
                this.$alert("提示", "编号" + items[0].id + "产品为独立销售产品，不可组合销售");
                return false;
              }
              if (this.selectedGoods[0].alone == "Y") {
                this.$alert("提示", "购买产品中存在独立销售产品，不可添加其余产品");
                return false;
              }
              if (this.selectedGoods.length >= 5) {
                this.$alert("提示", "产品不能超过五种");
                return false;
              }
            }

            isHaveGoodsId && this.$alert("提示", "编号" + this.selectGood + "已存在,不可重复添加");
            !isHaveGoodsId && this.selectedGoods.push(items[0]);
          }
        }
      },
      phoneArr() {
        this.companyInfo.phone = this.phoneArr.join(',');
      }
    }　　　　　　　　　　　　　　　　　　　　　　　　　
  }
</script>
<style scoped>
  th,
  td {
    vertical-align: middle !important;
  }

  .lead {
    font-size: 21px;
  }
  .menuContent .menuSmellTitle {
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    color: #002e3d;
    padding-left: 5px;
    border-bottom: 2px solid #ddd;
    margin-bottom: 10px;
}
</style>