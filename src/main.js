import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import Pr from './test/P.vue';
import PrList from './test/PrList.vue';
import HtModal from './ht/HtModal.vue';
import HtFormGroup from './ht/HtFormGroup.vue';
import HtForm from './ht/HtForm.vue';
import HtTable from './ht/HtTable.vue';
import Column from './ht/Column.vue';
import HtPage from './ht/HtPage.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('app', App);
Vue.component('ht-page', HtPage);

window.Vue = Vue;

new Vue({
  el: '#app',
  data: {
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
    // 分页控件参数:
    pageOptions: {
      currentPage: 1,
      totalPage: 1,
      showItem: 5,
      // prevText: "上一页",
      // nextText: "下一页",
      click: function(currentPage) {
        console.log("当前方法显示的页数是:" + currentPage);
      }
    }
  },
  methods: {

    changePage: function() {
      var num = parseInt(Math.random() * 20 + 1);
      this.pageOptions.currentPage = num;
      this.pageOptions.totalPage = parseInt(Math.random() * (40 - 30) + 30);


      /**
       * 生成随机数（不包含起止点）
       * 
       * @param {any} start 起点
       * @param {any} end 终点
       */
      function radomNum(start, end) {
        end = start > end ? [start, start = end][0] : end; //保证End最大  
        return
      }
    },
    modalControl: function() {
      this.showModal = !this.showModal;
    },
    likai: function(formName) {
      // console.log(event.target)
      this.$refs[formName].check();
    },
    submitForm: function(formName) {
      this.$refs[formName].checkItem(function(isPass, errorList) {
        if (isPass) {
          console.log("通过");
        } else {
          console.error("通不过");
          console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
          console.info("用户自定义处理错误" + errorList.join('&&&&&'));
          console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        }
      });
    },
    cancelCheckForm: function(formName) {
      this.$refs[formName].clearValidate();
    }
  },
  components: {
    // App,
    Pr,
    PrList,
    HtModal,
    HtForm,
    HtFormGroup,
    HtTable,
    Column

  }
});