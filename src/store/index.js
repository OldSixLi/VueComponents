/**
 * Vuex学习
 * @returns
 */

import Vue from 'vue';
// import $ from 'jquery';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    name: "李老六",
    nameList: [
      '陆云', '张傲雪', '剑无尘', '百灵', '瑶光', '虚无天尊', '慕容剑秋', '玄玉真人', '玄鬼真人', '黑暗尊主', '乾元真人', '紫阳真人', '风远扬', '李宏飞', '林云枫', '静月大师', '妖皇裂天', '水麒麟', '三眼龙狼', '黑煞虎王', '寒鹰', '万魔之王', '血界尊主', '煞血阎罗', '阴尸鬼王',
    ]
  },
  //NOTE 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  strict: true,
  /**
   * 所有修改store的方法都要通过commit实现,也就是说只能通过自身的方法修改自身的属性 不能在其他组件中 直接赋值修改
   * @returns
   */
  mutations: {
    addNum(state) {
      state.count++
    },
    //NOTE 这块的个人理解是
    //在全局不管哪个组件内,只要是有改变name的行为 就会在全局生效 
    //这种情况应用场景可以是购物车 音乐播放器播放等
    changeName(state) {
      state.name = state.nameList[parseInt(Math.random() * 25)];
    },
    changeBasicName(state) {
      state.name = "OldSix Li "
    }
  }
});