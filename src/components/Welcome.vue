<template>
  <div class="row">
    <!-- 消除外边距 -->
    <div class="col-md-12">
      <h1 class="text-center ">
        {{$route.params.name}}{{$route.params.name?',':""}}欢迎加入我们
      </h1>
      <!-- <music></music> -->
      <img src="https://i.loli.net/2018/12/10/5c0e30682becd.jpg" class="img-responsive">

       
    </div>
  </div>
</template>
<script>
  import router from "./../router/index.js";
  export default {
    name: "Welcome",
    props: {
      //对外获取的数据
    },
    data: function() {
      //组件内数据部分
      return {};
    },
    mounted: function() {},
    methods: {},
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // NOTE 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      console.log(
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        "的值是:" +
        "beforeRouteEnter"
      );
      next();
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log(
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        "的值是:" +
        "beforeRouteUpdate"
      );
      next();
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log(
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        "的值是:" +
        "beforeRouteLeave"
      );
      next();
    }
  };
</script>
<style scoped>

</style>