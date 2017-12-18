<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
          <router-link to="/" class="navbar-brand icon img-href">
          <img :src="require('./../src/assets/img/ma/horse.png')"  class="img-title"> 
          </router-link> 
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active">
              <router-link to="/welcome/老六" class="btn btn-link">欢迎</router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组件 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/main">组件展示</router-link>
                </li>
                <li>
                  <router-link to="/point">指令</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/know" class="btn btn-link">知识点</router-link>
            </li>
            <li>
              <router-link to="/music" class="btn btn-link">网易云</router-link>
            </li>
            <li>
              <router-link :to="{name:'userinfo'}" class="btn btn-link">用户信息</router-link>
            </li>
            
          </ul>
         
          <ul class="nav navbar-nav navbar-right">
            <li style="line-height: 50px;">{{name}}　　</li>
            <li>
              <a href="https://github.com/OldSixLi" target="_blank" style="padding:0;" class="img-href"><img :src="require('./assets/img/github.png')" class="img-title"> </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="transition:all .5s;">
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
        isShow: true
      }
    },
    computed: {
      name(){
        //在根目录里边已经注册过store,此组件内不用注册,直接可以使用此属性
        return this.$store.state.name;
      }
    }
  }
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/css/vue-index.css';
  body,
  * {
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
    transform: translate(-20%, 0);
  }
  .btn-link {
    outline: none;
  }
  .routerFade-enter-active,
  .routerFade-leave-active {
    transform: scale(1);
    opacity: 1;
    transition: all .8s ease;
  }
  .routerFade-enter,
  .routerFade-leave-active {
    opacity: 0;
    transform: scale(0.5);
    transition: all .3s ease;
  }
  .icon {
    padding: 5px 10px 0;
  }
  .img-title{
    width:45px;height:45px; 
  }
</style>
