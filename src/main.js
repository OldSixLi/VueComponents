import Vue from 'vue'
import App from './App.vue';
import Pr from './test/P.vue';
import PrList from './test/PrList.vue';
import HtModal from './ht/HtModal.vue';
import HtFormItem from './ht/HtFormItem.vue';
import HtFormGroup from './ht/HtFormGroup.vue';
import HtForm from './ht/HtForm.vue';

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
    linghu: "1"
  },
  methods: {
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
    App,
    Pr,
    PrList,
    HtModal,
    HtFormItem,
    HtForm,
    HtFormGroup
  }
})