//顶部的提示条,可自动关闭
<template>
  <div class="notice-block" tabindex="-1" v-if="visible" :class="{'active':visible}">
    <div class="notice-backup"></div>
    <div class="notice-container">
      <div class="notice-word">
        <span class="pull-right notice-icon" @click="close()" >&times;</span>
        <h3 class="notice-title" v-html="title"></h3>
        
        <div class="notice-content" v-html="content" ref="container">
        </div>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-default" @click="cancelClick" v-if="alertType=='confirm'">{{cancelBtnText}}</button>
        <button type="button" class="btn btn-primary" @click="confirmClick"  >{{confirmBtnText}}</button>
      </div>
    </div>
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
        visible: false,
        title: "提示",
        confirmBtnText: "确定",
        cancelBtnText: "取消",
        cancelFun: function() {},
        confirmFun: function() {},
        readyFun: function() {},
        content: ""
      };
    },
    mounted: function() {
      //监控运行,如果显示 ,则运行readyFun
      this.$watch("visible", function(val) {
        val &&
          typeof this.readyFun === "function" &&
          this.readyFun($(this.$refs.container));
      });
    },
    methods: {
      close() {
        this.visible = false;
        //TODO 如果必要可以添加关闭时的统一回调事件 
      },
      cancelClick() {
        //当前提示内容作为默认值被回调
        typeof this.cancelFun === "function" &&
          this.cancelFun($(this.$refs.container));
        this.close();
      },
      confirmClick() {
        //当前提示内容作为默认值被回调
        typeof this.confirmFun === "function" &&
          this.confirmFun($(this.$refs.container));
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
    z-index: 1050;
  }
  
  .notice-container {
    line-height: 100%;
    display: inline-block;
    width: 400px;
    border-radius: 4px;
    padding: 15px 15px 20px;
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
  
  .notice-icon {
    font-size: 22px;
    cursor: pointer;
  }
  
  .notice-title {
    font-weight: bold;
    text-align: left;
    margin-bottom: 20px;
    margin-top: 0px;
    font-size: 18px;
  }
  
  .notice-content {
    text-align: left;
    line-height: 20px;
    margin-bottom: 30px;
    /* word-break: break-all; */
    word-wrap: break-word;
  }
  
  .notice-container {
    transition: all 0.3s;
  }
  
  .active .notice-container {
    animation-name: bounce;
    transform-origin: center bottom;
    animation-duration: 0.25s;
  }
  
  @keyframes bounce {
    from {
      opacity: 0;
      transform: rotateX(-60deg) scale3d(0.8, 0.8, 0.8);
      transform-origin: 50% 0 0;
    }
    100% {
      transform: rotateX(0deg);
      transform-origin: 50% 0 0;
      opacity: 1;
    }
  }
</style>