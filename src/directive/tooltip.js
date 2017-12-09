import $ from 'jquery';
import './../assets/js/bootstrap.js';
import Vue from 'vue';
Vue.directive('tooltip', {
  bind: function(el, binding, vnode, oldVnode) {
    console.log(el);
    console.log(binding);
    console.log(vnode);
    console.log(oldVnode);
    var leadObj = binding.modifiers;
    var tipWord = binding.value;
    let currentLead = 'top';
    for (const key in leadObj) {
      if (leadObj.hasOwnProperty(key) && leadObj[key]) {
        currentLead = key;
      }
    }
    $(el).attr("data-placement", currentLead);
    $(el).attr("title", tipWord);
    $(el).css('cursor', 'pointer');
    $(el).tooltip();
  },
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    console.log('inserted')
  },
  // 值发生变化时事件  被绑定元素所在的模板更新时调用，而不论绑定值是否变化。
  update: function(el) {
    console.log('update')
  },
  // 值发生变化后事件  被绑定元素所在模板完成一次更新周期时调用。
  componentUpdated: function(el) {
    console.log('componentUpdated')
  },
  //只调用一次，指令与元素解绑时调用。
  unbind: function(el) {
    console.log('unbind')
  }
})