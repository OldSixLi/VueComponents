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
    Vue.prototype.$notice = Notice.bind(Vue);
  }
}