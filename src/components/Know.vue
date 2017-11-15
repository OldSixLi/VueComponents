//开发过程中遇到的需要注意的知识点
<template>
    <div class="row">
        <h2 class="text-center">知识点</h2>
        <div class="col-md-4">
            <panel title="<trasition>标签使用">
                <p>组件过渡过程中，会有四个CSS类名进行切换，这四个类名与上面transition的name属性有关，比如name="fade"，会有如下四个CSS类名：</p>
                <ol>
                    <li>fade-enter：进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除； </li>
                    <li>fade-enter-active：进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除； </li>
                    <li>fade-leave：离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除； </li>
                    <li>fade-leave-active：离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除；</li>
                </ol>
                <p class="text-warning">注意:需要在transition标签中添加name="fade" 才可以使用.fade-enter-active等样式</p>
                <p slot="footer" ><a href="https://segmentfault.com/q/1010000007738500" target="_blank">参考地址</a></p>
            </panel>
        </div>
        <div class="col-md-4">
            <panel title="vue如何让自定义函数挂到全局">
                <pre>
// xxx.js 组件
exports.install = function (Vue, options) {
    Vue.prototype.ajax = function (){
        alert('aaaaaaa');
    };
};

// main.js 入口
import xxxx from './commons/xxxx'
Vue.use(xxxx);

// ccc.js 子组件
this.ajax();
</pre>
                <p slot="footer"><a target="_blank" href="https://segmentfault.com/q/1010000007031477">参考地址</a></p>
            </panel>
        </div>
        <div class="col-md-4"></div>
    </div>
</template>
<script>
    export default {
        name: "Know",
        props: {
            //对外获取的数据
        },
        data: function() {
            //组件内数据部分
            return {}
        },
        mounted: function() {
            //组件生成时调用
        },
        methods: {}
    }
</script>
<style scoped>
     
</style>