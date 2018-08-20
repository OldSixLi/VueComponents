/**
 * 路由文件
 * @returns
 */
import Vue from 'vue';
import Router from 'vue-router';

import Welcome from './../components/Welcome.vue';
import Main from './../components/Main.vue';
import Begin from './../components/Begin.vue';
import Error from './../components/Error.vue';
import Know from './../components/Know.vue';
import Music from './../components/music/Music.vue';
import MusicUser from './../components/music/MusicUser.vue';
import MusicSearch from './../components/music/MusicSearch.vue';
import Point from './../components/Point.vue';
import User from './../components/User.vue';
import Show from './../components/Show.vue';
import UserInfo from './../components/UserInfo.vue';
import UserList from './../components/UserList.vue';
import WaterFall from './../components/WaterFall.vue';
// import Company from './../components/Company.vue';
import Login from './../components/Login.vue';
import IndexVue from './../components/Index.vue';
import NewForm from './../test/NewForm.vue';

Vue.use(Router);

let router = new Router({
  // mode: "history",
  routes: [{
      //每一个链接都是一个对象
      path: '/', //链接路径
      component: IndexVue, //对应的组件模板
      meta: {
        requireAuth: true
      },
      children: [{
          path: '/',
          name: 'begin',
          component: Begin
        },
        {
          path: '/main',
          name: 'main',
          component: Main
        },
        // welcome
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
        // water
        {
          path: "/water",
          name: "water",
          component: WaterFall
        },
        // know
        {
          path: "/know",
          name: "know",
          meta: {
            requireAuth: true
          },
          component: Know,
        },
        // show
        {

          path: "/show",
          name: "show",
          component: Show,
        },
        // point
        {
          path: "/point",
          name: "point",
          component: Point
        },
        // user
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
              path: 'list',
              component: UserList,
              name: "userlist"
            }
          ]
        },
        // company
        // {
        //   path: "/company",
        //   name: "company",
        //   component: resolve => require(['./../components/Company.vue'], resolve),
        // },
        // music
        {
          path: "/music",
          name: "music",
          component: Music,
          children: [{
              path: '/',
              component: MusicSearch,
              meta: {
                keepAlive: true // 不需要被缓存
              }
            },
            {
              path: 'user/:id',
              component: MusicUser,
              name: "musicuser",
              meta: {
                keepAlive: false // 不需要被缓存
              }
            }
          ]
        },
        {
          path: "/newform",
          name: "newform",
          component: NewForm
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: Error,
      // redirect: "/"
    }, // show 

    {

      path: "/index",
      name: "indexShow",
      component: Show,
    }
  ]
});

/**
 * 登陆权限校验 
 * @returns 
 */
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(m => m.meta.requireAuth)) {
//     if (store.state.login.isLogin) { // 已经登陆
//       next();
//     } else {
//       if (to.fullPath != '/') {
//         //处理此处的信息
//         next({ path: '/login', query: { redirect: to.fullPath.substr(1) } })　
//       } else {
//         next({ path: '/login' });
//       }
//     }
//   } else {
//     next();
//   }
// });

// //最先开始执行 全局前置守卫
/**
 * 拦截功能 
 * @returns 
 */
// router.beforeEach((to, from, next) => {

//   if (to.matched.some(res => res.meta.requireAuth)) {
//     Vue.prototype.$confirm(
//       "提示",
//       '当前页面涉及到登陆拦截等功能,确定跳转吗?',
//       $content => {
//         //确定按钮
//         next()
//       },
//       $content => {
//         //取消按钮
//         //提示用户
//         Vue.prototype.$alert(
//           "提示",
//           "您将跳转到周杰伦页面",
//           $content => {
//             //点击确定按钮进行操作(YES)
//             next({
//               name: "userinfo",
//               params: {
//                 id: 1
//               }
//             });
//           }
//         );

//       }
//     );
//   } else {
//     next()
//   }
// });


// 和上个区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
//全局解析守卫
router.beforeResolve((to, from, next) => {
  // console.log("开始beforeResolve");
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 不会接受 next 函数也不会改变导航本身
  // console.log("开始afterEach");
});

/**
 * 自定义方法 
 * @returns 
 */
router.redirect = (path) => {
  if (path) {
    router.push({
      path: path
    });
  }
}

export default router;