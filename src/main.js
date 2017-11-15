import Vue from 'vue';
import $ from 'jquery';
//路由
import router from './router/index.js';
//引入全局组件
import globals from './global.js';
//引入样式
import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.js';

window.Vue = Vue;
// Vue.config.productionTip = false;//取消输出

Array.prototype.sum = function() {
  if (this.length != 0) {
    return this.reduce(function(partial, value) {
      return partial + value;
    });
  } else {
    return 0;
  }
};


new Vue({
  el: '#app',
  router,
  data: {
    showModal: false,
    age: 45,
    zhoujielun: "周杰伦",
    price: 188,
    lanzuan: 15,
    aaa: 156,
    jinggun: 213,
    canglei: 8888888888888888,
    kuanglong: '321@qq.com',
    linghu: "1",
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
    timepicker: "2017-11-08",
    radio: "2",
    totalPrice: [58],
    PersonsList: [{
      name: "猎狐者",
      price: 38
    }]
  },
  // template: '<app></app>',
  methods: {
    getPerson: function() {
      var _self = this;
      $.ajax({
        type: "GET",
        url: "/ma/person",
        dataType: "json",
        success: function(data) {
          if (data != null && data != "") {
            _self.PersonsList = data;
          } else {
            _self.PersonsList = [];
          }
        },
        error: function(response) {
          alert("获取人物列表失败,请重试");
        }
      });
    },
    //不推荐使用JQ操作DOM  但是此处只是展示效果
    alerts: function alerts(e) {
      $("#clickRecord").append('<p><b>@click</b>事件：每次<b>点击</b>都会增加内容，当前点击的值为：' + this.radio + '，可以根据此来进行相关操作</p>');
    },
    change: function change() {
      $("#changeRecord").append('<p><b>@change</b>事件：如果值发生改变，提示当前改变后的值为：' + this.radio + '可以根据此进行相关操作</p>');
      return false;
    },
    daterSelect: function(val) {
      alert('当前选择的日期为' + val);
    },
    changePage: function() {
      var num = parseInt(Math.random() * 20 + 1);
      this.pageOptions.currentPage = num;
      this.pageOptions.totalPage = parseInt(Math.random() * (40 - 30) + 30);
    },
    modalControl: function() {
      this.showModal = !this.showModal;
    },
    likai: function(formName) {
      // console.log(event.target)
      this.$refs[formName].check();
    },
    submitForm: function(formName) {
      this.$refs[formName].checkItem(function(isPass, errorList) {
        if (isPass) {
          console.log("通过");
        } else {
          console.error("通不过");
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.info("用户自定义处理错误" + errorList.join('&&&&&'));
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        }
      });
    },
    cancelCheckForm: function(formName) {
      this.$refs[formName].clearValidate();
    },
    test(id, name) {
      alert('不知道好不好使啊')
    },
    search: function(value) {
      console.log(
        new Date().getHours() +
        ':' + new Date().getMinutes() +
        ':' + new Date().getSeconds() + "的值是:" +
        value);
    },
    getjson() {
      $.getJSON("url",
        function(data, textStatus, jqXHR) {

        }
      );
    }
  },
  computed: {
    endDate: function() {
      var date = new Date(this.timepicker).setDate(new Date(this.timepicker).getDate() + 7);
      var time = new Date(parseInt(date))
      return time.getFullYear() + '-' + ((time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)) + '-' + (time.getDate() > 9 ? time.getDate() : '0' + time.getDate());
    }
  },
  mounted() {
    this.getPerson();
  }

});




//声明HtmlFun
/**
 * 当前对象为将参数转化为Html的方法集合
 * @returns
 */
window.HtmlFun = {
  //扩展
  extend: function(obj) {
    if (obj) {
      HtmlFun = $.extend(HtmlFun, obj);
    }
  },
  toGender: function(value) {
    return value == "M" ? "男" : "女";
  },
  /**
   * 时间戳转化为正常时间 
   * @param {any} shijianchuo  时间戳 精确到毫秒
   * @returns 正常时间
   */
  toNormalTime: function(shijianchuo) {
    var time = new Date(parseInt(shijianchuo));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  },
  /**
   * 转化为图片代码
   * @returns
   */
  toImg: function(value) {
    var str = "<img src='http://localhost:3001" + value + "'/>";
    return str;
  },
  testMultiParams: function(id, name, problem) {
    return '<a href="javascript:;" onclick="HtmlFun.test(\'' + id + '\',\'' + name + '\',\'' + problem + '\')">弹出</a>';
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m;
  },
  test(id, name, problem) {
    alert('id是' + id + '\r\n名称是：' + name + '\r\n问题是：' + problem);
  }　　
}