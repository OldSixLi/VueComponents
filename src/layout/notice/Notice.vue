//顶部的提示条,可自动关闭
<template>

  <div class="notice-block" tabindex="-1" v-if="visible">
    <div class="notice-backup" ></div>
    <transition name="notice">
    <div class="notice-container">
      <div class="notice-word">
        <h3 class="notice-title" v-html="title"></h3>
        <div class="notice-content" v-html="content"> 
        </div>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-default" @click="cancelClick" v-if="alertType=='confirm'">{{cancelBtnText}}</button>
        <button type="button" class="btn btn-success" @click="confirmClick" 
        :class="{
          'pull-right':alertType=='alert'
        }"
        >{{confirmBtnText}}</button>
      </div>
    </div> 
</transition>
  </div>
</template>
<script>
export default {
  name: "Notice",
  props: {
    //对外获取的数据
    type: String
  },
  data: function() {
    //组件内数据部分
    return {
      alertType: this.type || "confirm",
      visible: true,
      title: "提示",
      confirmBtnText: "确定",
      cancelBtnText: "取消",
      cancelFun:function(){},
      confirmFun:function(){},
    content: ""
    };
  },
  mounted: function() {
    //组件生成时调用
  },
  methods: {
    close() {
      this.visible = false;
    },
    cancelClick(){
      this.cancelFun();
      this.close();
    },
    confirmClick(){
      this.confirmFun();
      this.close();
    }
  }
};
</script>
<style scoped>
.notice-block {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  overflow-y: scroll;
  padding: 50px;
  margin-right: -17px;
}
.notice-container {
  line-height: 100%;
  display: inline-block;
  width: 400px;
  border-radius: 4px;
  padding: 15px 30px 30px;
  vertical-align: middle;
  box-shadow: 1px 3px 15px 3px rgba(38, 28, 28, 0.2);
  background-color: #ffffff;
}

/*
 *  vertical-align与text-align完全不一样
 *  它是依赖div内子元素最高的行高来实现对某元素居中的，需要建立一个新元素，给他加上
 */
.notice-block:after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
.notice-backup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background: #000;
  z-index: -1;
}
.notice-word {
  text-align: center;
  color: #606266;
}
.notice-title {
  text-align: center;
  margin-bottom:15px;
}
.notice-content {
  line-height: 20px;
  margin-bottom: 30px;
}

.notice-enter-active {
  -webkit-transform: translateY(0) scaleY(1);
  transform: translateY(0) scaleY(1);
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}
/* TODO 动画效果  以及是否确实需要添加格外的遮罩层 */
/* 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除； */

.notice-leave-active {
  opacity: 0;
  transition: all 0.2s ease;
}
.notice-enter,
.notice-leave-active{
  opacity: 0;
  -webkit-transform: translateY(-50%) ;
  transform: translateY(-50%) ;
}
</style>