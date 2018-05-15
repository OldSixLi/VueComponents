import Vue from 'vue';
// import $ from 'jquery';
import Vuex from 'vuex';

//请求框架
import Axios from 'axios';

// import VueAxios from 'vue-axios';

//路由
import router from './router/index.js';
import store from './store/index';
//引入全局组件和指令
import globals from './global.js';

//引入插件
import pluginPopBar from './plugin/PopBar';
import pluginNotice from './plugin/Notice';

//引入样式
import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.js';

window.Vue = Vue;
window.log = str => console.log(str);


Vue.use(pluginPopBar);
Vue.use(pluginNotice);
Vue.prototype.$http = Axios;
//注册插件 
// console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
// console.log(router);
// console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
var vueBlock = new Vue({
  el: '#app',
  router,
  store,
  template: '<app></app>',
  beforeCreate() {
    console.log("Loading....");
  },
  created() {
    console.log("结束Loading");
  }
});
window.eventBus=new Vue();

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
    var str = "<img src=" + value + "/>";
    return str;
  },
  testMultiParams: function(id, name, problem) {
    return '<a href="javascript:;" onclick="HtmlFun.test(\'' + id + '\',\'' + name + '\',\'' + problem + '\')">弹出</a>';
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m;
  },
  test(id, name, problem) {
    vueBlock.$alert(
      "提示",
      'id是' + id + '<br>名称是：' + name + '<br>问题是：' + problem
    );
  }　　
}