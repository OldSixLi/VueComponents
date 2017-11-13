import Vue from 'vue';
import $ from 'jquery'
// import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
//测试组件
import App from './App.vue';
import Pr from './test/P.vue';
import PrList from './test/PrList.vue';
//ht组件
import HtModal from './ht/HtModal.vue';
import HtFormGroup from './ht/HtFormGroup.vue';
import HtForm from './ht/HtForm.vue';
import HtTable from './ht/HtTable.vue';
import Column from './ht/Column.vue';
import HtPage from './ht/HtPage.vue';
import HtSearch from './ht/HtSearch.vue';
//布局组件
import Panel from './layout/Panel.vue';
import InfoBlock from './layout/InfoBlock.vue';

import router from './router/index.js';

//引入全局组件
import globals from './global.js';

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.js'


window.Vue = Vue;
// Vue.config.productionTip = false;//取消输出

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
    }
  },
  template: '<app></app>',
  methods: {

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
        end = start > end ? [start, start = end][0] : end; //保证End最大  
        return
      }
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
    }
  },
  components: {
    // App,
    Pr,
    PrList,
    HtModal,
    HtForm,
    HtFormGroup,
    HtTable,
    Column
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