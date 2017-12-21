//开发过程中遇到的需要注意的知识点
<template>
    <div class="container">
        <div class="row ">
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
                    <p slot="footer">
                        <a href="https://segmentfault.com/q/1010000007738500" target="_blank">参考地址</a>
                    </p>
                </panel>

                <panel title="Vue.js键盘事件">
                    <pre>
&lt;div id=&quot;box&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup=&quot;show($event)&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.13=&quot;show()&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.enter=&quot;show2()&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.up=&quot;show3()&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.down=&quot;show4()&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.left=&quot;show5()&quot;&gt;
  &lt;input type=&quot;text&quot; @keyup.right=&quot;show6()&quot;&gt;
&lt;/div&gt;
                </pre>
                    <p slot="footer">
                        <a href="http://www.jb51.net/article/111485.htm" target="_blank">参考地址</a>
                    </p>
                </panel>
                <panel title="Vue组件失去焦点事件">
                    <p>原理就是判断当前点击的元素是否属于当前组件</p>
                    <pre>
created() {
    // https://segmentfault.com/q/1010000007444595
    // 点击其他不在的区域触发事件
    document.addEventListener('click', (e) => {
        console.log(this.$el.contains(e.target));
        if (!this.$el.contains(e.target)) {
        //组件外点击事件
        }
    });
}
                </pre>
                </panel>
                <panel title="生命周期和钩子函数的一些理解"> 
                    <p slot="footer">
                        <a href=" https://segmentfault.com/a/1190000008010666" target="_blank">参考地址</a>
                    </p>
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
                    <p slot="footer">
                        <a target="_blank" href="https://segmentfault.com/q/1010000007031477">参考地址</a>
                    </p>
                </panel>

                <panel title="Vue 改变数组中对象的属性不重新渲染View的解决方案">
                    HTML代码
                    <pre>
//循环内部(hover 事件)
@mouseenter.stop=&quot;handleMouseIn(index)&quot;
@mouseleave.stop=&quot;handleMouseOut(index)&quot;
         </pre> JS代码
                    <pre>
//Object.assign() 只是一级属性复制，比浅拷贝多深拷贝了一层而已。用的时候，还是要注意这个问题的。
this.$data.items = Object.assign({}, this.$data.items);
//或
this.$set(this.$data.items[index], '_isHover', true);
         </pre>
                    <p slot="footer">

                        <a target="_blank" href="https://www.cnblogs.com/tugenhua0707/p/7440400.html">参考地址</a>
                    </p>
                </panel>

                <panel title="text-indent和图片缩进的问题">
                    <p>
                        text-indent 有个很奇怪的属性，就是其内部元素遇到 float 或者 display: block 后就不继承外部这个缩进的属性了，也就是说，只要给图片加上 float 或者 display: block 的 CSS 属性后，图片的缩进会自动失效。
                    </p>
                    <p slot="footer">
                        <a target="_blank" href="https://lms.im/css/text-indent-and-picture-indentation.html">参考地址</a>
                    </p>
                </panel>

                <panel title="深入理解ES6箭头函数中的this(很重要)">
                    <p>
                        箭头函数中的this，指向与一般function定义的函数不同，比较容易绕晕，箭头函数this的定义：箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定。
                        <br> 箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
                    </p>
                    <p slot="footer">
                        <a target="_blank" href="http://blog.csdn.net/liwusen/article/details/70257837">参考地址</a>
                    </p>
                </panel>

            </div>
            <div class="col-md-4">
                <panel title="Router回调执行顺序">
                    <b>执行顺序</b>
                    <ol>
                        <li>main.js:开始beforeEach(全局)</li>
                        <li>router.js:开始beforeEnter(单个路由回调)</li>
                        <li>Welcome.vue:开始beforeRouteEnter(组件内回调)</li>
                        <li>main.js:开始beforeResolve(全局)</li>
                        <li>main.js:开始afterEach(全局)</li>
                    </ol>

                    <h2>完整的导航解析流程</h2>
                    <ol>
                        <li>导航被触发。</li>
                        <li>在失活的组件里调用离开守卫。</li>
                        <li>调用全局的 beforeEach 守卫。</li>
                        <li>在重用的组件里调用 beforeRouteUpdate 守卫。</li>
                        <li>在路由配置里调用 beforeEnter。</li>
                        <li>解析异步路由组件。</li>
                        <li>在被激活的组件里调用 beforeRouteEnter。</li>
                        <li>调用全局的 beforeResolve 守卫 (2.5+)</li>
                        <li>导航被确认。</li>
                        <li>调用全局的 afterEach 钩子。</li>
                        <li>触发 DOM 更新。</li>
                        <li>用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。</li>
                    </ol>
                    <p slot="footer">
                        <a target="_blank" href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html">参考地址</a>
                    </p>
                </panel>

                <panel title="nodejs router.post请求中req.body无法获取数据">
                    <p>Latest versions of Express (4.x) has unbundled the middleware from the core framework. If you need body parser, you need to install it separately</p>
                    <pre>
npm install body-parser --save
                </pre>
                    <p>and then do this in your code</p>
                    <pre>
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
                </pre>
                    <p slot="footer">
                        <a target="_blank" href="https://stackoverflow.com/questions/9177049/express-js-req-body-undefined">参考地址</a>
                    </p>

                </panel>
            </div>
        </div>
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
    return {};
  },
  mounted: function() {
    //组件生成时调用
  },
  methods: {}
};
</script>
<style scoped>

</style>