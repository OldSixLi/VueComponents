<template>
  <div id="app" class="">
    <transition  name="fade">
      <ul class="list-group text-right"  
      style="width: 20%;position: fixed;padding-right:15px;"  v-show="isShow">
        <li class="list-group-item">
          <router-link to="/" class="btn btn-link">初始页</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/welcome" class="btn btn-link">欢迎</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/main" class="btn btn-link">组件页面</router-link>
        </li>
        <li class="list-group-item"><router-link to="/know" class="btn btn-link">知识点</router-link></li>
        <li class="list-group-item"><router-link to="/music" class="btn btn-link">网易云</router-link></li>
        <li class="list-group-item">
        <a   class="btn btn-link" @click="isShow=false"><<隐藏</a>
         </li>
      </ul>
      
    </transition>
    <div style="width: 80%;margin-left:20%;padding: 0 15px;transition:all .5s;" :style="{
      'margin-left':isShow?'20%':'0',
      'width':isShow?'80%':'100%',
      }">
      <a @click="isShow=true" v-show="!isShow" style="position: fixed;top:10px;cursor: pointer;left:5px;z-index: 100;">>>展开</a>
      <transition name="routerFade" mode="">
         <router-view></router-view>
      </transition>
     
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
         isShow:true
      }
    }
  }
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/css/vue-index.css';
  body,*{
        font-family: "MicroSoft YaHei";
  }
   /* 完成状态 */
    .fade-enter-active,
    .fade-leave-active {
        transform: translate(0, 0);
        transition: all .5s ease;
    }
    /* 初始状态 */
    .fade-enter,
    .fade-leave-active { 
        transform: translate(-20%,0);
    }
    .btn-link{
      outline: none;
    }

    .routerFade-enter-active,.routerFade-leave-active{
        transform: scale(1);
        opacity: 1;
        transition: all .8s ease;
    }

    .routerFade-enter,.routerFade-leave-active{
      opacity: 0;
      transform: scale(0.5);
      transition: all .3s ease;
    }
  /* #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    } */
  /* h1,
      h2 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      } */


</style>
