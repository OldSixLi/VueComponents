<template>
  <div id="app" class="container" v-cloak>
    <div class="row">
      <!-- 消除外边距 -->
      <div class="col-md-12">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="">
            <a href="#home" aria-controls="home" role="tab" data-toggle="tab">表单</a>
          </li>
          <li role="presentation">
            <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">布局组件</a>
          </li>
          <li role="presentation" class="active">
            <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">其他组件</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <!-- 第一个 -->
          <div role="tabpanel" class="tab-pane" id="home">
            <div class="row">
              <div class="col-md-6">
                <!-- 表单 -->
                <panel title="表单组件">
                  <!-- 标题 -->
                  <h3 style="margin-bottom:15px;text-align:center;">CF武器列表</h3>
                  <!-- Form表单 -->
                  <ht-form ref="wuqiku" info-type="info" :horizontal="true">
                    <ht-form-group label="M4A1-蓝钻：" label-width="20" name="lanzuan" :require="true" require-message="请输入武器价格">
                      <input type="text" name="lanzuan" v-model="lanzuan" class="form-control" placeholder="请输入武器价格">
                    </ht-form-group>
                    <ht-form-group label="9A91-S：" label-width="20" name="aaa" min="91" max="200" max-message="您输入的值超出了范围">
                      <input type="text" name="aaa" v-model="aaa" class="form-control" placeholder="请输入武器价格">
                    </ht-form-group>
                    <ht-form-group label="黄金警棍啊：" label-width="20" name="jinggun" maxlength="10" maxlength-message="最多输入10个字符" minlength="3" :require="true">
                      <input type="text" name="jinggun" v-model="jinggun" class="form-control" placeholder="请输入武器价格">
                    </ht-form-group>
                    <ht-form-group label="M240B-苍雷：" label-width="20" name="canglei" minlength="10">
                      <textarea rows="5" cols="15" v-model="canglei" class="form-control" name="canglei"></textarea>
                    </ht-form-group>
                    <ht-form-group label="破天狂龙：" label-width="20" name="kuanglong" pattern="^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])" pattern-message="破天狂龙邀请你请输入正确的邮箱格式">
                      <input type="text" name="kuanglong" v-model="kuanglong" class="form-control" placeholder="请输入武器价格">
                    </ht-form-group>
                    <ht-form-group label="塞尔维亚M21：" label-width="20" name="weiya" :require="true" require-message="请选择您的武器">
                      <ht-select class="form-control" name="weiya" v-model="sltValue">
                        <option value="">请选择</option>
                        <option value="FR-F2 寒冰">FR-F2 寒冰</option>
                        <option value="绿色烟雾弹">绿色烟雾弹</option>
                        <option value="金砖">金砖</option>
                        <option value="碳合金小刀">碳合金小刀</option>
                      </ht-select>

                    </ht-form-group>
                    <ht-form-group label="购买人物：" label-width="20" name="cfWuqi" :require="true" require-message="请至少选择一个人物" min='2' min-message="请至少选择两位CF人物">
                      <template v-for="y in formPersonsList">
                        <ht-checkbox v-model="formTotalPrice" :label='y.price' name='cfWuqi'> {{y.name+'('+y.price+'元)　'}}</ht-checkbox>
                      </template>
                    </ht-form-group>
                    <ht-form-group label="付款方式：" label-width="20" name="payWay" :require="true" require-message="请选择付款方式">
                      <template for="" v-for="x in payWayList">
                        <ht-radio v-model="payWay" :label="x.value" name="payWay">{{x.name}}　</ht-radio>
                      </template>
                    </ht-form-group>
                    <hr>
                    <div class="text-right">
                      <button type="button" class="btn btn-default" @click="cancelCheckForm('wuqiku')">取消</button>
                      <button type="button" class="btn btn-large btn-primary" @click="submitForm('wuqiku')">保存</button>
                    </div>
                  </ht-form>
                </panel>

                <panel title="下拉菜单组件">
                  <p>您当前选择的值是 {{selectModel}} </p>
                  <ht-select v-model="selectModel">
                    <option value="1">终结者</option>
                    <option value="2">幽灵猎手</option>
                    <option value="3">疯狂宝贝</option>
                    <option value="4">灵魂忍者</option>
                    <option value="5">终结者</option>
                    <option value="6">幽灵猎手</option>
                    <option value="7">疯狂宝贝</option>
                    <option value="8">灵魂忍者</option>
                    <option value="9">终结者</option>
                    <option value="10">幽灵猎手</option>
                    <option value="11">疯狂宝贝</option>
                    <option value="12">灵魂忍者</option>
                  </ht-select>
                </panel>
                <panel title="单选按钮组件">
                  <ht-radio v-model="radio" label="1" @click="alerts()" @change="change()" name="cfPerson">灵狐者</ht-radio>
                  <ht-radio v-model="radio" label="2" @click="alerts()" @change="change()" name="cfPerson">猎狐者</ht-radio>
                  <ht-radio v-model="radio" label="3" @click="alerts()" @change="change()" name="cfPerson">夜玫瑰</ht-radio>
                  <ht-radio v-model="radio" label="4" @click="alerts()" @change="change()" name="cfPerson">曼陀罗</ht-radio>
                  <p>当前选项的值是:{{radio}}</p>
                  <div id="clickRecord" class="col-md-6"></div>
                  <div id="changeRecord" class="col-md-6"></div>
                </panel>
                <panel title="复选框组件">
                  <label v-for="x in PersonsList">
                    <ht-checkbox v-model="totalPrice" :label='x.price' name='cfWuqis'> {{x.name+'('+x.price+'元)　'}}</ht-checkbox>
                  </label>
                  <p> 总共花费了 {{arrSum(totalPrice)}}元</p>
                </panel>

              </div>
              <div class="col-md-6">
                <panel title="日期组件">
                  <p>
                    <b>起止日期(时间限定一周之内)</b>
                  </p>
                  <div style="font-size: 0;">
                    <div style="display: inline-block;width:48%;">
                      <ht-date v-model="timepicker" @select="daterSelect"></ht-date>
                    </div>
                    <span style="display: inline-block;width:4%;text-align: center;font-size: 14px;line-height: 38px;vertical-align: top;">至</span>
                    <div style="display: inline-block;width:48%;">
                      <ht-date :min-date="timepicker" :max-date="endDate"></ht-date>
                    </div>
                  </div>
                  <p class="text-muted" slot="footer">
                    <b>注:</b>此处利用第一个ht-date的值(timepicker)为基础,第二个ht-date组件中prop属性'min-date'的值设置为timepicker,而'max-date'值通过Vue computed属性进行实时计算,在timepicker的基础上加7天</p>
                </panel>
                <panel title="分页组件">
                  <button type="button" slot="header" class="btn-link pull-right" @click="changePage" style="outline: none;">随机生成总页数与页码</button>
                  <ht-page :param="pageOptions"></ht-page>
                </panel>
                <panel title="Modal提示框">
                  <div class="text-center">
                    <button type="button" class="btn btn-success " @click="modalControl()">显示modal</button>
                  </div>
                  <!-- Modal提示框 -->
                </panel>
                <ht-modal :is-show="showModal" @states="modalControl" title="提示框"> <img :src="require('./../assets/img/usericon/usericon_2.jpg')" alt="" class="img-responsive"></ht-modal>
                <!-- 人物列表 -->
                <panel title="动画效果" style="background-color: #ddd;">
                  <info-block :img-src="require('./../assets/img/usericon/xun.jpg')" title="陈奕迅" intro="Eason,歌手,演员" word="拦路雨偏似雪花饮泣的你冻吗这风褛我给你磨到有襟花连调了职也不怕怎么始终牵挂苦心选中今天想车你回家原谅我不再送花伤口应要结疤花瓣铺满心里坟场才害怕如若你非我不嫁彼此终必火化一生一世等一天需要代价谁都只得那双手靠拥抱亦难任你拥有要拥有必先懂失去怎接受曾沿着雪路浪游为何为好事泪流谁能凭爱意要富士山私有何不把悲哀感觉假设是来自你虚构试管里找不到它染污眼眸前尘硬化像石头随缘地抛下便逃走我绝不罕有往街里绕过一周我便化乌有" style="width:32%;margin-left: 1%;"></info-block>
                  <info-block :img-src="require('./../assets/img/usericon/zhou.jpg')" title="周杰伦" intro="歌手,演员" word="对这个世界如果你有太多的抱怨跌倒了 就不敢继续往前走为什么 人要这么的脆弱 堕落请你打开电视看看 多少人为生命在努力勇敢的走下去我们是不是该知足珍惜一切 就算没有拥有还记得你说家是唯一的城堡随着稻香河流继续奔跑微微笑 小时候的梦我知道不要哭让萤火虫带着你逃跑乡间的歌谣永远的依靠回家吧 回到最初的美好" style="width:32%;"></info-block>
                  <info-block :img-src="require('./../assets/img/usericon/qian.jpg')" title="薛之谦" intro="歌手" word="简单点说话的方式简单点递进的情绪请省略你又不是个演员别设计那些情节没意见我只想看看你怎么圆你难过的太表面 像没天赋的演员观众一眼能看见该配合你演出的我演视而不见在逼一个最爱你的人即兴表演什么时候我们开始收起了底线顺应时代的改变看那些拙劣的表演可你曾经那么爱我干嘛演出细节我该变成什么样子才能延缓厌倦原来当爱放下防备后的这些那些才是考验" style="width:32%;"></info-block>
                </panel>
                <panel title="提示框">
                  <button type="button" class="btn btn-primary" @click="notify()">左侧悬浮框</button>
                  <button type="button" class="btn btn-primary" @click="notifyRight()">右侧悬浮框</button>
                </panel>
                <panel title="对话框">
                  <button type="button" class="btn btn-primary" @click="alertBtnClick()">alert提示框</button>
                  <button type="button" class="btn btn-primary" @click="confirmBtnClick()">confirm提示框</button>
                </panel>
              </div>
            </div>
          </div>
          <!-- 第二个 -->
          <div role="tabpanel" class="tab-pane" id="profile">
            <div class="row">
              <div class="col-md-2">
                <panel title="随便测试的组件">
                  <pr-list ref="pianduan">
                    <pr slot min="1" length="2" :has-error="false" message="昵索的对">父组件获取到这句话并进行校验</pr>
                    <pr slot min="32" length="10" message="something wrong!">显示相关的内容</pr>
                    <pr slot="red" min="3333" length="3" message="something3333!">slot='red'的组件内容</pr>
                  </pr-list>
                  <button type="button" class="btn btn-success" @click="likai('pianduan')">自定义BUTTON</button>
                </panel>
              </div>
              <div class="col-md-6">
                <div class="panel panel-default" style="margin-top: 15px;">
                  <div class="panel-heading">搜索建议组件</div>
                  <div class="panel-body">
                    <ajax-search @suggestClick="suggestClick"></ajax-search>
                    <panel title="歌曲详情">
                      <div class="row" style="margin-top: 15px;" v-show="song.showDetail">
                        <div class="col-md-3">
                          <p class="text-right"><img :src="song.songImg" alt="" class="img-responsive img-thumbnail" style="width:100px;height: 100px;"></p>
                        </div>
                        <div class="col-md-9">
                          <p>名称:{{song.name}}</p>
                          <p>作者:{{song.author}}</p>
                          <p style="word-break: break-all;">链接:
                            <a :href="song.url" class="btn-link" v-show="song.name" :download="song.name+'.mp3'">点此下载</a>
                          </p>
                        </div>
                      </div>
                      <!-- 动画效果 -->
                      <div style="position: relative; height: 100px;" v-show="!song.showDetail">
                        <loading></loading>
                      </div>
                    </panel>
                  </div>
                </div>

                <panel title="按钮样式">
                  <load-btn></load-btn>
                </panel>
              </div>
              <div class="col-md-4">
                <br>
                <button type="button" class="btn btn-primary btn-block" @click="changeName">改变全局store中的名称</button>
                <panel title=".sync使用">
                  <textarea type="text" v-model="inputMsg" class="form-control"></textarea>
                  <p>封装组件如下</p>
                  <al :message.sync="inputMsg"></al>
                </panel>

              </div>
            </div>
          </div>
          <!-- 第三个 -->
          <div role="tabpanel" class="tab-pane active" id="messages">
            <panel title="tab标签页组件"> 
              <ht-tabs active="第三个">
                <ht-tab title="第一个">
                  <h1>我属于第一个模块</h1>
                </ht-tab>
                <ht-tab title="第二个">
                  <h1>第二个模块在这展示</h1>
                </ht-tab>
                <ht-tab title="第三个">
                  <h1>目前为止有三个模块</h1>
                </ht-tab>
              </ht-tabs> 

            </panel>
            
            <panel title="表格组件">
              <span slot="header" class="pull-right">
                <b>2017年11月8日11:25:07 生成</b>
              </span>
              <panel title="人员列表">
                <ht-table slot="outer" ajaxurl="ma/users" :search-data="searchData" class="">
                  <column slot name="名称" data-key=name width="15%" align="left" class="nameClass aaa" style="color:blue;text-align:right;font-weight:bold;"></column>
                  <column slot name="性别" data-key="gender" align="center" filter="toGender"></column>
                  <column slot name="时间" data-key="Regtime" align="center" filter="toNormalTime"></column>
                  <column slot name="头像" data-key="iconUrl" align="center" filter="toImg"></column>
                  <column slot name="编辑" data-key="ID,name,Regtime" align="center" filter="testMultiParams"></column>
                </ht-table>
              </panel>
            </panel>

            <!-- <panel title="展开图标">
              <open-icon></open-icon> 
              <p slot="footer">目前部分图标存在偏移的问题  待修改</p>
            </panel> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "./../router/index.js";
import HtDate from "./../ht/HtDate.vue";
import store from "./../store/index";
export default {
  name: "Main",
  props: {
    //对外获取的数据
  },
  data: function() {
    //组件内数据部分
    return {
      selectModel: "4",
      inputMsg: "你们好",
      timepicker: "2017/11/14",
      song: {
        id: "",
        name: "",
        author: "",
        songImg: "",
        url: "",
        showDetail: true
      },
      showModal: false,
      age: 45,
      zhoujielun: "周杰伦",
      price: 188,
      lanzuan: 15,
      aaa: 156,
      jinggun: 213,
      canglei: 8888888888888888,
      kuanglong: "321@qq.com",
      linghu: "1",
      payWay: "1",
      payWayList: [],
      searchData: {
        currentPage: 1
      },
      searchWord: "李老六",
      show: true,
      // 分页控件参数:
      pageOptions: {
        currentPage: 1,
        totalPage: 10,
        showItem: 5,
        // prevText: "上一页",
        // nextText: "下一页",
        click: function(currentPage) {
          console.log("当前方法显示的页数是:" + currentPage);
        }
      },
      timepicker: "2017/11/14",
      radio: "2",
      totalPrice: [38, 58],
      PersonsList: [
        {
          name: "猎狐者",
          price: 38
        },
        {
          name: "飞虎队",
          price: 58
        },
        {
          name: "灵狐者",
          price: 108
        },
        {
          name: "夜玫瑰",
          price: 18
        },
        {
          name: "刀锋战士",
          price: 36
        },
        {
          name: "潘多拉",
          price: 19
        }
      ],
      formPersonsList: [],
      formTotalPrice: [19],
      sltValue: "金砖"
    };
  },
  // beforeCreate(){
  //   console.log("Loading....");
  // },
  // created(){
  //   console.log("结束Loading");
  // },
  mounted: function() {
    setTimeout(() => {
      this.selectModel = "3";
    }, 3000);
    // this.getPerson();
    setTimeout(() => {
      this.formPersonsList = [
        {
          name: "猎狐者",
          price: 38
        },
        {
          name: "飞虎队",
          price: 58
        },
        {
          name: "灵狐者",
          price: 108
        },
        {
          name: "夜玫瑰",
          price: 18
        },
        {
          name: "刀锋战士",
          price: 36
        },
        {
          name: "潘多拉",
          price: 19
        }
      ];
      this.payWayList = [
        {
          name: "微信",
          value: "1"
        },
        {
          name: "支付宝",
          value: "2"
        }
      ];
    }, 0);
  },
  methods: {
    alertBtnClick() {
      this.$alert(
        "提示",
        '<p><b>请输入您的值：</b></p><input id="ainput" type="text" placeholder="请输入值" class="form-control">',
        $content => {
          var val =
            $content
              .find("#ainput")
              .val()
              .trim() || "您没有输入任何内容";
          this.$notifyMessage("您输入的值是<b>" + val + "</b>");
        },
        $content => {
          console.log("加载完了");
          $content.find("#ainput")[0].focus();
        }
      );
    },
    confirmBtnClick() {
      this.$confirm(
        "提示",
        '<p><b>请输入您的值：</b></p><input id="ainput" type="text" placeholder="请输入值" class="form-control">',
        $content => {
          var val =
            $content
              .find("#ainput")
              .val()
              .trim() || "您没有输入任何内容";
          this.$alert("提示", "您输入了<b>" + val + "</b>");
        },
        $content => {
          this.$alert("提示", "您点击了取消按钮");
        },
        $content => {
          console.log("加载完了");
          $content.find("#ainput")[0].focus();
        }
      );
    },
    /**
     * 修改Vuex中属性的方法
     * 要求必须使用commit修改属性,这样数据流更加清晰和容易维护
     * @returns
     */
    changeName() {
      store.commit("changeName");
    },
    getPerson() {
      var _self = this;
      $.ajax({
        type: "GET",
        url: "/ma/person",
        dataType: "json",
        success: function(data) {
          if (data != null && data != "") {
            _self.PersonsList = data;
          } else {
            // _self.PersonsList = [];
            _self.PersonsList = [
              {
                name: "猎狐者",
                price: 38
              },
              {
                name: "飞虎队",
                price: 58
              },
              {
                name: "灵狐者",
                price: 108
              },
              {
                name: "夜玫瑰",
                price: 18
              },
              {
                name: "刀锋战士",
                price: 36
              },
              {
                name: "潘多拉",
                price: 19
              }
            ];
          }
        },
        error: function(response) {
          console.log("Mian.vue获取人物列表失败,请重试");
          _self.PersonsList = [
            {
              name: "猎狐者",
              price: 38
            },
            {
              name: "飞虎队",
              price: 58
            },
            {
              name: "灵狐者",
              price: 108
            },
            {
              name: "夜玫瑰",
              price: 18
            },
            {
              name: "刀锋战士",
              price: 36
            },
            {
              name: "潘多拉",
              price: 19
            }
          ];
        }
      });
    },
    arrSum(arr) {
      if (!arr.length) {
        return 0;
      }
      return arr.reduce(function(partial, value) {
        return partial + value;
      });
    },
    //不推荐使用JQ操作DOM  但是此处只是展示效果
    alerts: function alerts(e) {
      $("#clickRecord").append(
        "<p><b>@click</b>事件：每次<b>点击</b>都会增加内容，当前点击的值为：" +
          this.radio +
          "，可以根据此来进行相关操作</p>"
      );
    },
    change: function change() {
      $("#changeRecord").append(
        "<p><b>@change</b>事件：如果值发生改变，提示当前改变后的值为：" +
          this.radio +
          "可以根据此进行相关操作</p>"
      );
      return false;
    },
    daterSelect: function(val) {
      alert("当前选择的日期为" + val);
    },
    suggestClick: function(state, result) {
      if (state == "begin") {
        this.song.showDetail = false;
        this.song.name = "获取中...";
        this.song.author = "";
        this.song.songImg = "";
        this.song.url = "";
        this.song.id = "";
      } else if (state == "end") {
        //歌曲详情
        this.song.id = result.id;
        this.song.name = result.name;
        this.song.author = result.author;
        this.song.songImg = result.songImg;
        this.song.url = result.url;
        this.song.showDetail = true;
      }
    },
    changePage: function() {
      var num = parseInt(Math.random() * 20 + 1);
      this.pageOptions.currentPage = num;
      this.pageOptions.totalPage = parseInt(Math.random() * (40 - 30) + 30);
      /**
       * 生成随机数（不包含起止点）
       *
       * @param {any} start 起点
       * @param {any} end 终点
       */
      function radomNum(start, end) {
        end = start > end ? [start, (start = end)][0] : end; //保证End最大
        return;
      }
    },
    modalControl: function() {
      this.showModal = !this.showModal;
    },
    likai: function(formName) {
      this.$refs[formName].check();
    },
    submitForm: function(formName) {
      this.$refs[formName].checkItem(function(isPass, errorList) {
        if (isPass) {
          this.$alert(
            "提示",
            "添加成功",
            function($content) {
              //点击确定按钮进行操作(YES)
            },
            function($content) {
              //提示框显示出来之后的操作(Ready)
            }
          );
          console.log("通过");
        } else {
          var n = this.$alert(
            "<b>用户自定义处理错误</b>",
            errorList.join("<br>")
          );
          console.log("■■■■■■■■■■■■■此处显示提示框对象组件■■■■■■■■■■■■");
          console.log(n);
          console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        }
      });
    },
    cancelCheckForm: function(formName) {
      this.$refs[formName].clearValidate();
    },
    test(id, name) {
      alert("不知道好不好使啊");
    },
    search: function(value) {
      console.log(
        new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds() +
          "的值是:" +
          value
      );
    },
    notify() {
      this.$notifyMessageLeft("在左边弹出一些东西你说呢");
    },
    notifyRight() {
      this.$notifyMessage("弹出一些提示内容,10s后自动关闭", 10000);
    }
  },
  components: {
    HtDate
  },
  computed: {
    endDate: function() {
      var date = new Date(this.timepicker).setDate(
        new Date(this.timepicker).getDate() + 7
      );
      var time = new Date(parseInt(date));
      return (
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1)) +
        "-" +
        (time.getDate() > 9 ? time.getDate() : "0" + time.getDate())
      );
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>