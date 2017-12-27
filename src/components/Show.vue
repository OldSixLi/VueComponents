//做个展示页面
<template>
  <div class="show-block">
    <div class="back-block">
      <img src='http://om6fr85l4.bkt.clouddn.com/bgc.jpg' class="bgc-img" alt='背景'>
    </div>
    <div class="container">
      <div class="intro">
        <div class="enjoy-css">My Projects</div>
        <link async href="http://fonts.googleapis.com/css?family=Aldrich" data-generated="http://enjoycss.com" rel="stylesheet" type="text/css" />
      </div> 
      <div class="row">
        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel4.jpg")' title="时间任务调度框架" content="一个基于C#的定时任务调度框架" href="https://github.com/OldSixLi/TimerSwitch"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel5.jpg")' title="后台管理网站" content="基于Angularjs的后台管理网站" href="https://github.com/OldSixLi/Nodes"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel6.jpg")' title="爬虫项目" content="基于nodejs的爬虫,下载知乎高质量回答下的图片" href="https://github.com/OldSixLi/NodeAngular"></img-an>
      </div>
      <div class="row"  style="margin-top: 20px;">
        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel1.jpg")' title="Vue组件编写" content="Vue的学习以及一些组件的封装" href="https://github.com/OldSixLi/VueComponents"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel2.jpg")' title="浩天智慧财税" content="上线的网站项目" href="http://www.htyfw.com.cn/"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel3.jpg")' title="服务支撑平台" content="后台管理项目,已上线" href="http://www.htyfw.com.cn/csfwpt_console/login"></img-an>
      </div>
      
      
    </div>
    <div >
        <running-man></running-man>
      </div>
  </div>
</template>
<script>
export default {
  name: "Show",
  props: {},
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>
<style scoped>
.back-block {
  margin-top: -20px;
  position: relative;
}
.bgc-img {
  width: 100%;
  height: auto;
  z-index: -1;
}
.title-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: #000;
}
.enjoy-css {
  position: relative;
  /* bottom: 0; */
  left: 50%;
  transform: translateX(-50%);
  -webkit-box-sizing: class="support css-value" content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border: none;
  font: normal normal 900 50px/normal "Aldrich", Helvetica, sans-serif;
  margin: 20px 0;
  color: rgba(102, 91, 101, 1);
  text-align: center;
  -o-text-overflow: clip;
  text-overflow: clip;
  text-shadow: 0 1px 0 rgb(128, 141, 147), -1px 0 0 rgb(205, 210, 213),
    -1px 2px 0 rgb(128, 141, 147), -2px 1px 0 rgb(205, 210, 213),
    -2px 3px 0 rgb(128, 141, 147), -3px 2px 0 rgb(205, 210, 213),
    -3px 4px 0 rgb(128, 141, 147), -4px 3px 0 rgb(205, 210, 213),
    -4px 5px 0 rgb(128, 141, 147), -5px 4px 0 rgb(205, 210, 213),
    -5px 6px 0 rgb(128, 141, 147), -6px 5px 0 rgb(205, 210, 213),
    -6px 7px 0 rgb(128, 141, 147), -7px 6px 0 rgb(205, 210, 213),
    -7px 8px 0 rgb(128, 141, 147), -8px 7px 0 rgb(205, 210, 213);
    
}
</style>