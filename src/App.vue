<template>
  <div id="app" class="">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
          <router-link to="/" class="navbar-brand icon"><img src="/src/assets/img/ma/horse.png" alt="" style="width: 45px;height: 45px;"></router-link>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active">
              <router-link to="/welcome" class="btn btn-link">欢迎</router-link>
            </li>
            <li>
              <router-link to="/know" class="btn btn-link">知识点</router-link>
            </li>
            <li>
              <router-link to="/music" class="btn btn-link">网易云</router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组件 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/main">组件展示</router-link>
                </li>
                <!-- <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li> -->
              </ul>
            </li>
          </ul>
         
          <ul class="nav navbar-nav navbar-right">
            <li><a href="https://github.com/OldSixLi" target="_blank">Github</a></li>
             
          </ul>
        </div>
      </div>
    </nav>

    <!-- 原来的左侧菜单 -->
    <!-- <transition  name="fade">
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
        
      </transition> -->
    <!-- :style="{
        'margin-left':isShow?'20%':'0',
        'width':isShow?'80%':'100%',
        }" -->
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
</style>
