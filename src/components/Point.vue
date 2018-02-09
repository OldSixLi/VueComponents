<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <panel title="倒计时按钮指令 v-btn-delay='10' ">
                    <button type="button" class="btn btn-success" v-btn-delay="10" @click="btnClick">
                        一个倒计时按钮
                    </button>
                </panel>
            </div>

            <div class="col-md-4">
                <panel title="popover指令">
                    <a tabindex="0" v-popover class="btn btn-lg btn-danger" role="button" data-placement="bottom" data-toggle="popover" data-trigger="hover" title="设置的表头" data-content="设置的data-content的内容" @show="popShow" @hide="popHide" @hidden="" @shown="">
                        可消失的弹出框
                    </a>
                    <p slot="footer">
                        需要注意的就是和普通的Bootstrap是一个用法,只不过此处添加指令后 不需要再在js中声明一次
                    </p>
                </panel>
            </div>

            <div class="col-md-4">
                <panel title="tooltip">
                    <a href="javascript:;" title="通过使用v-tooltip.right指令在右侧显示信息" v-tooltip.right> 展示tooltip</a>
                    <br>
                </panel>
            </div>
        </div>
        <panel>
            <h4 slot="header">
                <b>用于开发时快速生成一张占位图片</b> 此处生成正方形IMG:&lt;img v-random-img.square class="img-thumbnail"&gt;</h4>
            <div class="row">
                <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
            </div>
        </panel>

        <panel>
            <h4 slot="header">
                <b>用于开发时快速生成一张占位图片</b> 此处生成长方形图片:&lt;img v-random-img class="img-thumbnail"&gt;</h4>
            <div class="row">
                <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
                <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
            </div>
        </panel>
    </div>
</template>
<script>
import store from "./../store/index";
export default {
  name: "Point",
  store,
  mounted: function() {
    //组件生成时调用
    store.commit("changeName");
  },
  methods: {
    changeName() {
      store.commit("changeName");
    },
    btnClick() {
      this.$notifyMessageLeft("点击倒计时后执行的事件！");
      
    },
    popShow() {
      console.log("当前指令显示对话框回调事件");
    },
    popHide() {
      console.log("当前指令关闭对话框移除事件");
    }
  }
};
</script>
<style scoped>

</style>