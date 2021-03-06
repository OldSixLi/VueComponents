/**
 * 此处引入全局组件
 * @returns
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

//测试组件
import App from './App.vue';
import Pr from './test/P.vue';
import PrList from './test/PrList.vue';
import AjaxSearch from './test/AjaxSearch.vue';
import Al from './test/Al.vue';
import TimeLine from './test/TimeLine.vue';
import ImgIntroducePanel from './layout/ImgIntroducePanel.vue';
import HtOrderList from './test/HtOrderList.vue';

//ht组件
import HtModal from './ht/HtModal.vue';
import HtFormGroup from './ht/HtFormGroup.vue';
import HtForm from './ht/HtForm.vue';
import HtTable from './ht/HtTable.vue';
import Column from './ht/Column.vue';
import HtPage from './ht/HtPage.vue';
import HtSearch from './ht/HtSearch.vue';
import HtDate from './ht/HtDate.vue';
import HtRadio from './ht/HtRadio.vue';
import HtCheckbox from './ht/HtCheckbox.vue';
import HtSelect from './ht/HtSelect.vue';
import HtOption from './ht/HtOption.vue';
import HtTab from './ht/HtTab.vue';
import HtTabs from './ht/HtTabs.vue';
// import HtClass from './test/HtClass.vue';
// import HtSell from './test/HtSell.vue';
import InputNum from './ht/InputNum.vue'
//2018年7月5日11:36:15 添加修改版本
import MaFormGroup from './ht/form/MaFormGroup.vue';
import MaForm from './ht/form/MaForm.vue';

//布局组件
import Panel from './layout/Panel.vue';
import InfoBlock from './layout/InfoBlock.vue';
import Loading from './layout/Loading.vue';
import PopBar from './layout/notice/PopBar.vue';
import ImgAn from './layout/ImgAn.vue';
import RrunningMan from './layout/RrunningMan.vue';
import Floor from './layout/cool/Floor.vue';
import Notice from './layout/notice/Notice.vue';
import LoadBtn from './test/LoadBtn.vue';
import OpenIcon from './test/OpenIcon.vue';
import Skill from './test/Skill.vue';
import Load from './layout/Load.vue';


//NOTE 指令
import './directive/randomImg.js';
import './directive/popover.js';
import './directive/btnDelay.js';
import './directive/tooltip.js';
import './directive/clickWord.js';

Vue.use(VueRouter);

Vue.component('app', App);
Vue.component('ht-page', HtPage);
Vue.component('panel', Panel);
Vue.component('ht-radio', HtRadio);
Vue.component('ht-checkbox', HtCheckbox);
Vue.component('info-block', InfoBlock);
Vue.component('ht-search', HtSearch);
Vue.component('pr', Pr);
Vue.component('pr-list', PrList);
Vue.component('ht-select', HtSelect);
Vue.component('ht-option', HtOption);
Vue.component('ht-modal', HtModal);
Vue.component('ht-form', HtForm);
Vue.component('ht-form-group', HtFormGroup);
Vue.component('ht-table', HtTable);
// 标签页
Vue.component('ht-tab', HtTab);
Vue.component('ht-tabs', HtTabs);
Vue.component('column', Column);
Vue.component('ht-date', HtDate);
Vue.component('ajax-search', AjaxSearch);
Vue.component('loading', Loading);
Vue.component('al', Al);
Vue.component('pop-bar', PopBar);
Vue.component('img-an', ImgAn);
Vue.component('running-man', RrunningMan);
Vue.component('floor', Floor);
Vue.component('notice', Notice);
Vue.component('load-btn', LoadBtn);
Vue.component('open-icon', OpenIcon);
Vue.component('img-introduce', ImgIntroducePanel);
//时间轴组件
Vue.component('time-line', TimeLine);
Vue.component('load', Load);
// Vue.component('ht-class', HtClass);
// Vue.component('ht-sell', HtSell);
Vue.component('input-num', InputNum);
Vue.component('skill', Skill);
Vue.component('ht-order-list', HtOrderList);
Vue.component('ma-form-group',MaFormGroup);
Vue.component('ma-form',MaForm);