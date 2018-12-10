/**
 * 2017年11月27日19:07:20 随机生成图片指令
 * 使用<img v-random-img>
 */
import Vue from 'vue';

//基础地址
let baseUrl = 'https://i.loli.net/2018/12/10/5c0e3';

/**
 * 长方形地址Arr
 * @returns 
 */
let commonImgs = ['8aa4001e','8ba0d59a','8c0b5714','8c14a9fa','8c3ca62c','8c681b4c','8cbe3c67','8d4ef278','8d5f3f26','8e6012ec'];

/**
 * 正方形地址Arr 
 * @returns 
 */
let squareImgs = ['777d5301', '779ec892', '77ac4c11', '77b45b56', '77d09853', '77dbfeed', '77e49d50', '77ed6b92', '77f961ba', '781a034e'];

Vue.directive('randomImg', {
  bind: function (el, binding, vnode, oldVnode) {
    el.tagName.toUpperCase() == "IMG" || console.error("指令 v-random-img 必须应用在 img 标签上");
    let randomNum = parseInt(Math.random() * 10);
    let name = commonImgs[randomNum];
    binding.modifiers && binding.modifiers.square && (name = squareImgs[randomNum]);
    el.style.width = '100%';
    el.style.height = 'auto';
    el.src = baseUrl + name + '.jpg';
  }
});