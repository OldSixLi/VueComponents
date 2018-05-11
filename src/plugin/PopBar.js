/**
 * 右侧悬浮提示,封装成插件,引入到全局变量中,封装完毕后可以直接通过方法调用
 * @returns
 */

import Template from './../layout/notice/PopBar.vue';
let globalOptions = {
  title: "提示",
  message: "提示内容",
  direction: "right",
}
let instance;
const Notify = function(config = {}) {
  let Tpl = this.extend(Template);
  instance = new Tpl();
  //合并配置
  config = Object.assign({}, globalOptions, config);
  //配置传递到参数中
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      instance.$data[key] = config[key];
    }
  }
  //判断父容器
  if ($('.' + config.direction + 'NotifyContent').length == 0) {
    $('body').append('<div class="' + config.direction + 'NotifyContent' + '"></div>')
  }
  var $content = $('.' + config.direction + 'NotifyContent');
  $content.append(instance.$mount().$el);
  // document.body.appendChild(instance.$mount().$el);
  instance.$data.visible = true;
  //返回组件对象 ,便于操作
  return instance;
}


export default {
  install(Vue) {
    //原生需配置提示
    Vue.prototype.$notify = Notify.bind(Vue);
    //右侧提示
    Vue.prototype.$notifyMessage = function(message, duration) {
      return Vue.prototype.$notify({
        message: message,
        duration: duration == undefined ? 5000 : duration
      });
    };
    //左侧提示
    Vue.prototype.$notifyMessageLeft = function(message, duration) {
      return Vue.prototype.$notify({
        direction: "left",
        message: message,
        duration: duration == undefined ? 5000 : duration
      });
    };
    /**
     * Vue封装ajax,其实和jQ的ajax类似,只不过补充了 对错误的统一处理
     * @returns 
     */
    Vue.prototype.$ajax = function(option) {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: option.type || "POST",
          url: option.url || "",
          data: option.data,
          dataType: "json",
          success: function(data, textStatus, jqXHR) {
            if (data != null && data != "") {
              resolve(data);
            } else {
              reject();
              Vue.prototype.$notifyMessage("未请求到数据");
            }
          },
          error: function(response) {
            reject();
            Vue.prototype.$notifyMessage("请求服务失败,请重试!");
          },
          complete: function(xhr, textStatus) {
            option.complete && option.complete();
          }
        });
      })
    };
  }
}