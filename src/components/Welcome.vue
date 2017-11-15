<template>
    <div class="row"><!-- 消除外边距 -->
    <div class="col-md-12">
      <h1 class="text-center">{{$route.params.name}}欢迎来到此页面</h1>
      <!-- <music></music> -->
      <img src="/src/assets/img/19696025--0--6c1b6af_r.jpg" alt="" class="img-responsive">
    </div>
    </div>
</template>
<script>
  import router from './../router/index.js';
  export default {
    name: "Welcome",
    props: {
      //对外获取的数据
    },
    data: function() {
      //组件内数据部分
      return {}
    },
    mounted: function() {
      //组件生成时调用
    },
    methods: {}
  }
</script>
<style scoped>
   
</style>