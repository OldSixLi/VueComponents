/**
 * 2017年11月27日19:07:20 随机生成图片指令
 * 使用<img v-random-img>
 */
import Vue from 'vue';
// import $ from 'jquery';
Vue.directive('randomImg', {
  bind: function(el, binding, vnode, oldVnode) {
    el.tagName.toUpperCase() == "IMG" || console.error("指令 v-random-img 必须应用在 img 标签上");
    let randomNum = parseInt(Math.random() * 10) + 1;
    let name = randomNum;
    binding.modifiers && binding.modifiers.square && (name = 'square' + randomNum);
    el.style.width = '100%';
    el.style.height = 'auto';
    el.src = 'http://om6fr85l4.bkt.clouddn.com/' + name + '.jpg?imageView2/0/q/58|imageslim';
  }
});