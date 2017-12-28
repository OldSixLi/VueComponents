/*
 * @Author:马少博 (ma.shaobo@qq.com)
 * @Date: 2017年12月27日18:38:32
 * @Last Modified by: 马少博
 * @Last Modified time:2017年12月27日18:38:35
 */
/* jshint esversion: 6 */
import NoticeTemplate from './../layout/notice/Notice.vue';

let globalOptions = {
  title: "确认"
}
let instance;

const Notice = function(config = {}) {
  let Tel = this.extend(NoticeTemplate);
  instance = new Tel();
  config = Object.assign({}, globalOptions, config);
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      instance.$data[key] = config[key];
    }
  }
  $('body').append(instance.$mount().$el);
  instance.$data.visible = true;
  return instance;
}
export default {
  install(Vue) {
    /**
     * 弹框提示组件 (传入配置对象)
     * @returns 
     */
    Vue.prototype.$notice = Notice.bind(Vue);
    /**
     * alert提示框 
     * @returns 
     */
    Vue.prototype.$alert = (title, content, okCallback, readyCallback) => {
        return Vue.prototype.$notice({
          alertType: "alert",
          title: title,
          alertType: "alert",
          content: content,
          confirmFun: okCallback || function() {},
          readyFun: readyCallback || function() {}
        });
      },
      /**
       * confirm提示框
       * 在Vue实例内部,调用this.$confirm()调用此方法 
       * @returns 
       */
      Vue.prototype.$confirm = (title, content, okCallback, cancelCallback, readyCallback) => {
        return Vue.prototype.$notice({
          alertType: "confirm",
          title: title,
          content: content,
          cancelFun: cancelCallback || function() {},
          confirmFun: okCallback || function() {},
          readyFun: readyCallback || function() {}
        });
      }
  }
}