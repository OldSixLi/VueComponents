<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand icon img-href">
            <img src="https://i.loli.net/2018/11/20/5bf3e87c23427.png" class="img-title">
              </router-link>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="{
                      'active':$route.name=='welcome'
                      }">
              <router-link to="/welcome/老六" class="btn btn-link">欢迎</router-link>
            </li>
            <li class="dropdown" :class="{
                      'active':($route.name=='point'||$route.name=='main')
                      }">
              <a href="#" class="btn btn-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组件
                    <span class="caret"></span>
                  </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/main">组件展示</router-link>
                </li>
                <li>
                  <router-link to="/point">指令</router-link>
                </li>
              </ul>
            </li>
            <li :class="{
                      'active':$route.name=='know'
                      }">
              <router-link to="/know" class="btn btn-link">知识点</router-link>
            </li>
            <li :class="{
                      'active':$route.name=='music'
                      }">
              <router-link to="/music" class="btn btn-link">网易云</router-link>
            </li>
            <li :class="{
                      'active':$route.name=='userlist'
                      }">
              <router-link :to="{name:'userinfo'}" class="btn btn-link">用户信息</router-link>
            </li>
            <li :class="{
                      'active':$route.name=='begin'
                      }">
              <router-link to="/show" class="btn btn-link">展示</router-link>
            </li>
            <!-- <li :class="{
                      'active':$route.name=='water'
                      }">
                  <router-link to="/water" class="btn btn-link">瀑布流</router-link>
                </li> -->
            <li :class="{
                  'active':$route.name=='company'
                  }">
              <router-link to="/company" class="btn btn-link">公司业务</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li style="line-height: 50px;">{{name}}</li>
            <li>
              <a href="https://github.com/OldSixLi" target="_blank" style="padding:0;" class="img-href img-git"><img src="https://i.loli.net/2018/11/20/5bf3e8a881db5.png" class="img-title"> </a>
            </li>
            <li><button type="button" class="btn btn-link" @click="loginOut" style="margin-top: 8px;">退出登录</button></li>
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
  import store from "./../store/index";
  export default {
    name: "Index",
    store,
    props: {
      //对外获取的数据

    },
    data: function () {
      //组件内数据部分
      return {
        isShow: true
      }
    },
    mounted: function () {

      //组件生成时调用
    },
    methods: {
      loginOut() {
        store.commit("loginOut");
      },
    },
    computed: {
      name() {
        //在根目录里边已经注册过store,此组件内不用注册,直接可以使用此属性
        return this.$store.state.name;
      }
    }
  }
</script>
<style scoped>

</style>