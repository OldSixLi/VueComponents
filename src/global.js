/**
 * 此处引入全局组件
 * @returns
 */


import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
//测试组件
import App from './App.vue';
import Pr from './test/P.vue';
import PrList from './test/PrList.vue';
//ht组件
import HtModal from './ht/HtModal.vue';
import HtFormGroup from './ht/HtFormGroup.vue';
import HtForm from './ht/HtForm.vue';
import HtTable from './ht/HtTable.vue';
import Column from './ht/Column.vue';
import HtPage from './ht/HtPage.vue';
import HtSearch from './ht/HtSearch.vue';
//布局组件
import Panel from './layout/Panel.vue';
import InfoBlock from './layout/InfoBlock.vue';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('app', App);
Vue.component('ht-page', HtPage);
Vue.component('panel', Panel);
Vue.component('info-block', InfoBlock);
Vue.component('ht-search', HtSearch);
Vue.component('pr', Pr);
Vue.component('pr-list', PrList);
Vue.component('ht-modal', HtModal);
Vue.component('ht-form', HtForm);
Vue.component('ht-form-group', HtFormGroup);
Vue.component('ht-table', HtTable);
Vue.component('column', Column);