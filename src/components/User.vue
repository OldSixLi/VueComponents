<template>
  <div id="">
    <h3 class="text-center">会员信息父级页面
      <small>
        
      </small>
    </h3>
    <transition name="userRouter" mode="">
      <router-view></router-view>
    </transition>
    <!-- <div class="text-center">
      <floor></floor>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "User",
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
  methods: {
    notice() {
      this.$notice({
        title: "友情提示",
        alertType: "alert",
        content:
          '<p><b>请输入您的值：</b></p><input id="ainput" type="text" placeholder="请输入值" class="form-control">',
        cancelFun($content) {
          this.$notifyMessageLeft("您点击了取消提示框");
        },
        confirmFun($content) {
          var val =
            $content
              .find("#ainput")
              .val()
              .trim() || "您没有输入任何内容";
          this.$notifyMessage("您输入的值是<b>" + val + "</b>");
        },
        readyFun($content) {
          console.log("加载完了");
          $content.find("#ainput")[0].focus();
        }
      });
    }
  }
};
</script>
<style scoped>
/* 进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除； */
.userRouter-enter-active {
  transform: scale(1);
  opacity: 1;
  -webkit-transform: rotateY(0);
  transform: rotateY(0);
  -webkit-transform-origin: 50% 0 0;
  transform-origin: 50% 0 0;
  transition: all 0.8s ease;
}
/* 进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除； */
.userRouter-enter {
  opacity: 0;
  -webkit-transform: rotateY(-90deg) translateZ(0);
  transform: rotateY(-90deg) translateZ(0);
  -webkit-transform-origin: 50% 0 0;
  transform-origin: 50% 0 0;
}
/* 离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除； */
.userRouter-leave-active {
  opacity: 0;
  -webkit-transform: rotateY(-90deg);
  transform: rotateY(-90deg);
  -webkit-transform-origin: 50% 0 0;
  transform-origin: 50% 0 0;
  transition: all 0.3s ease;
}
/* 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除； */
.userRouter-leave {
  opacity: 1;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
</style>