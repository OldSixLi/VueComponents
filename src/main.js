import Vue from 'vue';
import $ from 'jquery';
import Vuex from 'vuex';

//路由
import router from './router/index.js';
import store from './store/index';
//引入全局组件和指令
import globals from './global.js';

//引入插件
import pluginPopBar from './plugin/PopBar';

//引入样式
import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.js';

window.Vue = Vue;
// Vue.config.productionTip = false;//取消输出
Vue.use(pluginPopBar);
// window.console.log = function() {}
// Array.prototype.sum = function() {
//   if (this.length != 0) {
//     return this.reduce(function(partial, value) {
//       return partial + value;
//     });
//   } else {
//     return 0;
//   }
// };
new Vue({
  el: '#app',
  router,
  store,
  data: {},
  template: '<app></app>',
  methods: {},
  computed: {},
  mounted() {}
});



//最先开始执行 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log("开始beforeEach");
  next();
});
// 和上个区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
//全局解析守卫
router.beforeResolve((to, from, next) => {
  console.log("开始beforeResolve");
  next();
});
// 全局后置钩子
router.afterEach((to, from) => {
  // 不会接受 next 函数也不会改变导航本身
  console.log("开始afterEach");
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
    alert('id是' + id + '\r\n名称是：' + name + '\r\n问题是：' + problem);
  }　　
}