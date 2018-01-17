// import $ from 'jquery';
import './../assets/js/bootstrap.js';
import Vue from 'vue';
Vue.directive('tooltip', {
  bind: function(el, binding) {
    var leadObj = binding.modifiers;
    var tipWord = binding.value;
    let currentLead = 'top';
    for (const key in leadObj) {
      (leadObj.hasOwnProperty(key) && leadObj[key]) && (currentLead = key)
    }
    $(el).attr("data-placement", currentLead);
    $(el).attr("title", tipWord);
    $(el).css('cursor', 'pointer');
    $(el).tooltip();
  }
});