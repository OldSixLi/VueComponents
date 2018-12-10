<template>
  <div class="text-center well container">
    <b class="pull-right">子路由:user/info/:id</b>
    <h3>{{userInfoObj.name}},您好,您的年龄是: {{userInfoObj.age}}岁,您当前的牌号号码是:{{$route.params.id}}</h3>
    <img :src="userInfoObj.src" alt="歌手信息图片" class="img-thumbnail">
    <p>
      <router-link to="/user/list" class="btn btn-link">返回列表</router-link>
      <router-link to="/user/info/155" class="btn btn-link">ID:155,测试beforeRouteUpdate回调</router-link>
    </p>
  </div>
</template>
<script>
import router from "./../router/index.js";
export default {
  name: "UserInfo",
  router,
  props: {
    //对外获取的数据
  },
  data: function() {
    //组件内数据部分
    return {
      userInfoObj: {
        name: "",
        age: 0
      }
    };
  },
  mounted: function() {
    //组件生成时调用
    this.getInfo();
  },
  methods: {
    getInfo() {
      //此处模拟异步请求获取的结果
      let userListObj = {
        1: {
          name: "周杰伦",
          age: "35",
          src: "https://i.loli.net/2018/12/10/5c0e3520b485d.jpg"
        },
        2: {
          name: "蔡依林",
          age: "30",
          src: "https://i.loli.net/2018/12/10/5c0e34e74540e.jpg"
        },
        3: {
          name: "刘德华",
          age: "55",
          src: "https://i.loli.net/2018/12/10/5c0e34f285b7f.jpg"
        },
        4: {
          name: "倪妮",
          age: "18",
          src: "https://i.loli.net/2018/12/10/5c0e3500b119d.jpg"
        },
        5: {
          name: "苏阳",
          age: "43",
          src: "https://i.loli.net/2018/12/10/5c0e3512c9c01.jpg"
        },
        155: {
          name: "纵贯线",
          age: "200",
          src: "https://i.loli.net/2018/12/10/5c0e3530569c9.jpg"
        }
      };
      const userid = this.$route.params.id;
      userid && (this.userInfoObj = userListObj[userid]);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 无法访问this,只能通过 `vm` 访问组件实例
      // console.log(vm);    // 输出组件实例
      // console.log(this);  //无法访问this,所以输出undefined
      //NOTE 判断有没有传入参数 ,没有参数的话跳转至其他的页面
      if (!vm.$route.params.id) {
        alert("您当前未传入用户ID,将跳转至列表页面...");
        router.push({
          path: "/user/list"
        });
      }

      console.log(router);
      console.log(vm.$route);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // next();
    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    console.log(to);
    console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    //在ID改变时重新获取一次用户信息
    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    console.log(to.params.id);
    console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    if (to.params.id) {
      next();
      this.getInfo();
    } else {
      alert("您当前未传入用户ID,将跳转至列表页面...");
      router.push({
        path: "/user/list"
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    var _self = this;
    //TODO 2017年12月10日17:28:50这个地方和 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html 描述的不一致
    // 输出的this根本不是当前组件的实例,需要仔细查看下,找到原因
    // 当前网上的资料都在关心beforeRouteEnter的this,但是这个的this大家难道都没发现吗
    // 先给皇上做饭去,明天整
    // NOTE 问题的答案找到了  原来的写法是beforeRouteLeave:(to, from, next)=> {...}, 在箭头函数中,this指向当时的执行环境,所以this不是当前模板实例,应该写成beforeRouteLeave(to, from, next){...}
    //NOTE 箭头函数的this指向问题需仔细学习 例:http://blog.csdn.net/liwusen/article/details/70257837
    // console.log(self.a.data().userInfoObj);
    // console.log(_self);
    let result = _self.userInfoObj.name
      ? confirm(_self.userInfoObj.name + ",您确认离开此页面吗?")
      : true;
    next(result);
  },
  scrollBehavior (to, from, savedPosition) {
  return { x: 0, y:100 }
}
};
</script>
<style scoped>

</style>