<template>
  <div> 
    <div class="load-bg"></div>
    <loading style="z-index: 1060;position: fixed;"></loading>
  </div>
</template>
<script>
export default {
  name: "Load",
  props: {
    //对外获取的数据
    active: {
        type:Boolean,
        default:false
    }
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
/* 设置背景 */
.load-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  text-align: center;
  overflow-y: scroll;
  z-index: 1050;
  margin-right: -18px;
  /* opacity: 0.6; */
}
</style>