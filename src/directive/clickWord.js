/*
 * @Author:马少博 (ma.shaobo@qq.com)
 * @Date: 2018年5月31日21:32:47
 * 指令绑定区域点击时弹出文字
 * @Last Modified by: 马少博
 * @Last Modified time:2018年5月31日21:32:43
 */
/* jshint esversion: 6 */
import Vue from 'vue';
Vue.directive('clickWord', {
  bind: function (el, binding, vnode, oldVnode) {
    //添加click 处理事件
    var fnTextPopup = function (arr, options) {
      if (!arr || !arr.length) {
        return;
      }
      var index = 0;
      el.addEventListener('click', function (event) {
        var x = event.pageX,
          y = event.pageY;
        var eleText = document.createElement('span');
        eleText.className = 'text-popup';
        this.appendChild(eleText);
        if (arr[index]) {
          eleText.innerHTML = arr[index];
        } else {
          index = 0;
          eleText.innerHTML = arr[0];
        }
        //动画结束后的事件
        eleText.addEventListener('animationend', function () {
          eleText.parentNode.removeChild(eleText);
        });
        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
        eleText.style.top = (y - eleText.clientHeight) + 'px';
        index++;
      });
    };
    fnTextPopup(binding.value || ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']);
  },
  //只调用一次，指令与元素解绑时调用。
  unbind: function (el) {
    console.log('clickWordunbind');
  }
});