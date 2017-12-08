import Vue from 'vue';
import $ from 'jquery';
Vue.directive('btnDelay', {
  bind: (el, binding, vnode, oldVnode) => {
    let beforeText = el.innerHTML, //BUTTON里的text
      secondNum = binding.value; //倒计时的秒数
    binding.value || (console.error("v-btn-delay 必须设置秒数") || el.setAttribute("disabled", true));
    $(el).click((e) => {
      e.preventDefault();
      settime(el);
    });
    //倒计时函数操作部分
    function settime(obj) {
      if (binding.value == 0) {
        obj.removeAttribute("disabled");
        obj.innerHTML = beforeText;
        binding.value = secondNum;
        return;
      } else {
        obj.setAttribute("disabled", true);
        obj.innerHTML = "重新发送(" + binding.value + "s)";
        binding.value--;
      }
      setTimeout(() => settime(obj), 1000);
    }
  }
});