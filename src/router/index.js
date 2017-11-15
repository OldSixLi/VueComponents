/**
 * 路由文件
 * @returns
 */
import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';

import Welcome from './../components/Welcome.vue';
import Main from './../components/Main.vue';
import Begin from './../components/Begin.vue';
import Know from './../components/Know.vue';

Vue.use(Router);
Router.beforeEnter = function(to, from, next) {
  alert("要切换了");
  next();
}
export default new Router({
  routes: [{ //每一个链接都是一个对象
    path: '/', //链接路径
    name: 'begin', //路由名称，
    component: Begin //对应的组件模板
  }, {
    path: '/main',
    name: 'main',
    component: Main
  }, {
    path: "/welcome",
    name: "welcome",
    component: Welcome
  }, {
    path: "/welcome/:name", //在页面中注入参数
    name: "welcome",
    component: Welcome
  }, {
    path: "/know",
    name: "know",
    component: Know,

  }]
});