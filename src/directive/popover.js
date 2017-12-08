import Vue from 'vue';
import $ from 'jquery';
Vue.directive('popover', {
  bind: (el, binding, vnode, oldVnode) => {
    $(el).popover();
    //相关事件的回调
    $(el).on('hide.bs.popover', () => vnode.data.on.hide ? vnode.data.on.hide() : function() {});
    $(el).on('show.bs.popover', () => vnode.data.on.show ? vnode.data.on.show() : function() {});
    $(el).on('hidden.bs.popover', () => vnode.data.on.hidden ? vnode.data.on.hidden() : function() {});
    $(el).on('shown.bs.popover', () => vnode.data.on.shown ? vnode.data.on.shown() : function() {});
  }
});