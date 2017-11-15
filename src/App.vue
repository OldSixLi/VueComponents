<template>
  <div id="app">
    <ul class="list-group" style="width: 20%;position: fixed;padding-right:15px;">
    <li class="list-group-item"><router-link to="/">初始页</router-link></li>
      <li class="list-group-item">
        <router-link to="/welcome">欢迎</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/main">主页面</router-link>
      </li>
      
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <div style="width: 80%;margin-left:20%;padding: 0 15px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        showModal: false,
        age: 45,
        zhoujielun: "周杰伦",
        price: 188,
        lanzuan: 15,
        aaa: 156,
        jinggun: 213,
        canglei: 8888888888888888,
        kuanglong: '321@qq.com',
        linghu: "1",
        searchData: {
          currentPage: 1
        },
        searchWord: "李老六",
        show: true,
        // 分页控件参数:
        pageOptions: {
          currentPage: 1,
          totalPage: 10,
          showItem: 5,
          // prevText: "上一页",
          // nextText: "下一页",
          click: function(currentPage) {
            console.log("当前方法显示的页数是:" + currentPage);
          }
        }
      }
    }
  }
</script>

<style>
 @import './assets/css/bootstrap.min.css';
 @import './assets/css/vue-index.css';
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
