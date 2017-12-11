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
import Music from './../components/Music.vue';
import Point from './../components/Point.vue';
import User from './../components/User.vue';
import UserInfo from './../components/UserInfo.vue';
import UserList from './../components/UserList.vue';
Vue.use(Router);

export default new Router({
  beforeEach: function(to, from, next) {
    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    console.log(to);
    console.log(from);
    console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    alert('开始');
    next();
  },
  routes: [{ //每一个链接都是一个对象
      path: '/', //链接路径
      name: 'begin', //路由名称，
      component: Begin //对应的组件模板
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
      //此路由器单独使用此回调
      beforeEnter: (to, from, next) => {
        console.log(
          new Date().getHours() +
          ':' + new Date().getMinutes() +
          ':' + new Date().getSeconds() + "的值是:" +
          "开始beforeEnter");
        next();
      }
    },
    {
      path: "/welcome/:name", //在页面中注入参数
      name: "welcome",
      component: Welcome
    },
    //网易云音乐APP 
    {
      path: "/music",
      name: "music",
      component: Music
    },
    {
      path: "/music/:type",
      name: "music",
      component: Music,
      children: [{
          path: 'table',
          component: Music
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'detail',
          component: Music
        }
      ]
    },
    {
      path: "/know",
      name: "know",
      component: Know,
    },
    {
      path: "/point",
      name: "point",
      component: Point,
    },
    {
      path: "/user",
      name: "user",
      component: User,
      children: [{
          path: 'info/:id',
          component: UserInfo,
          name: "userinfo"
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'list',
          component: UserList,
          name: "userlist"
        }
      ]
    }
  ]
});