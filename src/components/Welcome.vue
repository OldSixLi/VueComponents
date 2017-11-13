<template>
  <div class="container">
    <div class="row">
      <!-- 消除外边距 -->
      <div class="col-md-4 col-sm-4">
        <!--在此处编辑内容-->
        <img src="/src/assets/img/logo.png">
        <h1>你好啊</h1>
        <h2>路由页面</h2>
      </div>
      <div class="col-md-4 col-sm-4">
        <!--在此处编辑内容-->
        <h2>欢迎页面</h2>
      </div>
      <div class="col-md-4 col-sm-4">
        <!--在此处编辑内容-->
      </div>
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