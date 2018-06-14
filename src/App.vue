<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        isShow: true
      };
    },
    computed: {
      name() {
        //在根目录里边已经注册过store,此组件内不用注册,直接可以使用此属性
        return this.$store.state.name;
      }
    },
    mounted() {}
  };
</script>

<style>
  @import "./assets/css/bootstrap.min.css";
  @import "./assets/css/vue-index.css";
  body,
  * {
    font-family: "MicroSoft YaHei";
  }
  
  .img-git {
    margin-left: 10px;
  }
  /* 完成状态 */
  
  .fade-enter-active,
  .fade-leave-active {
    transform: translate(0, 0);
    transition: all 0.5s ease;
  }
  /* 初始状态 */
  
  .fade-enter,
  .fade-leave-active {
    transform: translate(-20%, 0);
  }
  
  .btn-link {
    outline: none;
  }
  
  .routerFade-enter-active,
  .routerFade-leave-active {
    transform: scale(1);
    opacity: 1;
    transition: all 0.8s ease;
  }
  
  .routerFade-enter,
  .routerFade-leave-active {
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s ease;
  }
  
  .icon {
    padding: 5px 10px 0;
  }
  
  .img-title {
    width: 45px;
    height: 45px;
  }
  
  .rightNotifyContent {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 0;
    z-index: 100;
    background-color: transparent;
  }
  
  .leftNotifyContent {
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    z-index: 100;
  }
  
  .nav .open>a,
  .nav .open>a:focus,
  .nav .open>a:hover {
    border: none;
  }
</style>