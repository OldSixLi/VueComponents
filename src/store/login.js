/*
 * @Author:马少博 (ma.shaobo@qq.com)
 * 登陆模块相关方法
 * @Date: 2018年6月12日13:43:11
 * @Last Modified by: 马少博
 * @Last Modified time:2018年6月12日13:43:14
 */
/* jshint esversion: 6 */

import router from './../router/index';
let storage = window.localStorage;

const loginModule = {
  state: {
    isLogin: (storage.getItem('isLogin') == "1") || false,
  },
  mutations: {
    //登陆成功操作
    loginSuccess(state) {
      state.isLogin = true;
      storage.setItem('isLogin', '1');
      let urlObj = new UrlSearch();
      if (urlObj.redirect) {
        router.redirect('/' + urlObj.redirect);
      } else {
        router.redirect('/');
      }
    },
    //退出登录操作
    loginOut(state) {
      state.isLogin = false;
      storage.setItem('isLogin', '0');
      router.redirect('/login');
    }
  }
}

function UrlSearch() {
  let name, value;
  let str = location.href; //取得整个地址栏
  let num = str.indexOf("?");
  str = str.substr(num + 1);
  let arr = str.split("&"); //各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
}
export default loginModule;