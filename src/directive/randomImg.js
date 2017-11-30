/**
 * 2017年11月27日19:07:20 随机生成图片指令
 * 使用<img v-random-img>
 */
import Vue from 'vue';
Vue.directive('randomImg', {
  bind: function(el, binding, vnode, oldVnode) {
    el.tagName.toUpperCase() == "IMG" || console.error("指令 v-random-img 必须应用在 img 标签上");
    var randomNum = parseInt(Math.random() * 10) + 1;
    var url = 'http://om6fr85l4.bkt.clouddn.com/' + randomNum + '.jpg?imageView2/0/interlace/1/q/50|imageslim';
    el.style.width = '100%';
    el.style.height = 'auto';
    el.src = url;
  }
});