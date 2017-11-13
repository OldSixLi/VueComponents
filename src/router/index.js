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

Vue.use(Router);

export default new Router({
  routes: [{ //每一个链接都是一个对象
    path: '/', //链接路径
    name: 'begin', //路由名称，
    component: Begin //对应的组件模板
  }, { //每一个链接都是一个对象
    path: '/main', //链接路径
    name: 'main', //路由名称，
    component: Main //对应的组件模板
  }, {
    path: "/welcome",
    name: "welcome",
    component: Welcome
  }]
});