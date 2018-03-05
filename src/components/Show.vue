//做个展示页面
<template>
  <div class="show-block">
    <div class="back-block">
      <!-- <img src='http://om6fr85l4.bkt.clouddn.com/bgc.jpg' class="bgc-img" alt='背景'> -->
      

      <h1>Hi. This is My Homepage.</h1>
      <h1 >OldSix.Li</h1>
      <!-- <span class="logo"></span> -->
    </div>
    <div class="container" id="main">
      <div class="intro">
        <div class="hor-block"></div>
        <div class="enjoy-css">My Projects</div>
        <link async href="http://fonts.googleapis.com/css?family=Aldrich" data-generated="http://enjoycss.com" rel="stylesheet" type="text/css" />
      </div>
      <div class="row">
        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel4.jpg")' title="时间任务调度框架" content="一个基于C#的定时任务调度框架" href="https://github.com/OldSixLi/TimerSwitch"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel5.jpg")' title="后台管理网站" content="基于Angularjs的后台管理网站" href="https://github.com/OldSixLi/Nodes"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel6.jpg")' title="爬虫项目" content="基于nodejs的爬虫,下载知乎高质量回答下的图片" href="https://github.com/OldSixLi/NodeAngular"></img-an>
      </div>
      <div class="row" style="margin-top: 20px;">
        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel1.jpg")' title="Vue组件编写" content="Vue的学习以及一些组件的封装" href="https://github.com/OldSixLi/VueComponents"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel2.jpg")' title="浩天智慧财税" content="上线的网站项目" href="http://www.htyfw.com.cn/"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/travel/travel3.jpg")' title="服务支撑平台" content="后台管理项目,已上线" href="http://www.htyfw.com.cn/csfwpt_console/login"></img-an>
      </div>

    </div>
    <div class="">
      <running-man></running-man>
    </div>

    <div class="footer">
    </div>
  </div>
</template>
<script>
import store from "./../store/index";
export default {
  name: "Show",store,
  props: {},
  data: function() {
    return {};
  },
  mounted: function() {
    store.commit("changeBasicName")
  },
  methods: {}
};
</script>

<style scoped>
/* 竖线 */
/* .back-block:before {
  height: calc(100% - 50px);
  opacity: 0.15;
  top: 0;
}

.back-block:before,
.back-block:after {
  background: rgba(224, 224, 224, 0.75);
  content: "";
  left: 49.9%;
  position: absolute;
  width: 1px;
  z-index: 0;
} */
.hor-block{
  width: 50%;
  transform: translateX(50%);
  height: 15px;
  border:1px solid #E7E7E7;
  border-left: none;border-right: none;
}
#main{
  position: relative;
}
#main:before {
    background: rgba(224, 224, 224, 0.75);
    content: '';
    height: 100px;
    left: 49.9%;
    position: absolute;
    top: 0;
    width: 1px;
    z-index: -1;
}
.intro{
      padding-top: 100px;
}
.back-block {
  margin-top: -20px;
  /* position: relative; */
  font: normal 18px/normal "brush-script-std", Helvetica, sans-serif;
  height: 800px;
  background-attachment: scroll, scroll, fixed;
  background-image: url("http://demo.cssmoban.com/cssthemes4/btst_52_directive/css/images/top-3200.svg"),
    url("./../assets/img/a1.png"),
    url("http://om6fr85l4.bkt.clouddn.com/bgc.jpg");
  background-position: bottom center, top left, center center;
  background-repeat: repeat-x, repeat, no-repeat;
  background-size: 3200px 460px, auto, cover;
  color: rgba(255, 255, 255, 0.8);
  padding: 10em 0 20em 0;
  position: relative;
  text-align: center;
}
.back-block .logo {
  background: #4eb980;
  border-radius: 100%;
  color: white;
  cursor: default;
  display: inline-block;
  font-size: 2.25em;
  height: 2.35em;
  line-height: 2.35em;
  margin: 0 0 0.75em 0;
  text-align: center;
  width: 2.35em;
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
  padding: 20px 0 40px 0;
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
.footer {
      margin-bottom: -20px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 100%;
  height: 320px;
  border: none;
  font: normal 100%/normal Arial, Helvetica, sans-serif;
  color: rgb(255, 255, 255);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: -webkit-radial-gradient(
      100% 150%,
      circle,
      rgb(165, 207, 249) 24%,
      #ffffff 25%,
      #ffffff 28%,
      rgb(165, 207, 249) 29%,
      rgb(165, 207, 249) 36%,
      #ffffff 36%,
      #ffffff 40%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0) 100%
    ),
    -webkit-radial-gradient(0 150%, circle, rgb(165, 207, 249) 24%, #ffffff 25%, #ffffff
          28%, rgb(165, 207, 249) 29%, rgb(165, 207, 249) 36%, #ffffff 36%, #ffffff
          40%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%),
    -webkit-radial-gradient(50% 100%, circle, #ffffff 10%, rgb(165, 207, 249)
          11%, rgb(165, 207, 249) 23%, #ffffff 24%, #ffffff 30%, rgb(
            165,
            207,
            249
          )
          31%, rgb(165, 207, 249) 43%, #ffffff 44%, #ffffff 50%, rgb(
            165,
            207,
            249
          )
          51%, rgb(165, 207, 249) 63%, #ffffff 64%, #ffffff 71%, rgba(
            0,
            0,
            0,
            0
          )
          71%, rgba(0, 0, 0, 0) 100%),
    -webkit-radial-gradient(100% 50%, circle, #ffffff 5%, rgb(165, 207, 249) 6%, rgb(
            165,
            207,
            249
          )
          15%, #ffffff 16%, #ffffff 20%, rgb(165, 207, 249) 21%, rgb(
            165,
            207,
            249
          )
          30%, #ffffff 31%, #ffffff 35%, rgb(165, 207, 249) 36%, rgb(
            165,
            207,
            249
          )
          45%, #ffffff 46%, #ffffff 49%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)
          100%),
    -webkit-radial-gradient(0 50%, circle, #ffffff 5%, rgb(165, 207, 249) 6%, rgb(
            165,
            207,
            249
          )
          15%, #ffffff 16%, #ffffff 20%, rgb(165, 207, 249) 21%, rgb(
            165,
            207,
            249
          )
          30%, #ffffff 31%, #ffffff 35%, rgb(165, 207, 249) 36%, rgb(
            165,
            207,
            249
          )
          45%, #ffffff 46%, #ffffff 49%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)
          100%),
    rgb(165, 207, 249);
  background: -moz-radial-gradient(
      100% 150%,
      circle,
      rgb(165, 207, 249) 24%,
      #ffffff 25%,
      #ffffff 28%,
      rgb(165, 207, 249) 29%,
      rgb(165, 207, 249) 36%,
      #ffffff 36%,
      #ffffff 40%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0) 100%
    ),
    -moz-radial-gradient(0 150%, circle, rgb(165, 207, 249) 24%, #ffffff 25%, #ffffff
          28%, rgb(165, 207, 249) 29%, rgb(165, 207, 249) 36%, #ffffff 36%, #ffffff
          40%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%),
    -moz-radial-gradient(50% 100%, circle, #ffffff 10%, rgb(165, 207, 249) 11%, rgb(
            165,
            207,
            249
          )
          23%, #ffffff 24%, #ffffff 30%, rgb(165, 207, 249) 31%, rgb(
            165,
            207,
            249
          )
          43%, #ffffff 44%, #ffffff 50%, rgb(165, 207, 249) 51%, rgb(
            165,
            207,
            249
          )
          63%, #ffffff 64%, #ffffff 71%, rgba(0, 0, 0, 0) 71%, rgba(0, 0, 0, 0)
          100%),
    -moz-radial-gradient(100% 50%, circle, #ffffff 5%, rgb(165, 207, 249) 6%, rgb(
            165,
            207,
            249
          )
          15%, #ffffff 16%, #ffffff 20%, rgb(165, 207, 249) 21%, rgb(
            165,
            207,
            249
          )
          30%, #ffffff 31%, #ffffff 35%, rgb(165, 207, 249) 36%, rgb(
            165,
            207,
            249
          )
          45%, #ffffff 46%, #ffffff 49%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)
          100%),
    -moz-radial-gradient(0 50%, circle, #ffffff 5%, rgb(165, 207, 249) 6%, rgb(
            165,
            207,
            249
          )
          15%, #ffffff 16%, #ffffff 20%, rgb(165, 207, 249) 21%, rgb(
            165,
            207,
            249
          )
          30%, #ffffff 31%, #ffffff 35%, rgb(165, 207, 249) 36%, rgb(
            165,
            207,
            249
          )
          45%, #ffffff 46%, #ffffff 49%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)
          100%),
    rgb(165, 207, 249);
  background: radial-gradient(
      circle at 100% 150%,
      rgb(165, 207, 249) 24%,
      #ffffff 25%,
      #ffffff 28%,
      rgb(165, 207, 249) 29%,
      rgb(165, 207, 249) 36%,
      #ffffff 36%,
      #ffffff 40%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      circle at 0 150%,
      rgb(165, 207, 249) 24%,
      #ffffff 25%,
      #ffffff 28%,
      rgb(165, 207, 249) 29%,
      rgb(165, 207, 249) 36%,
      #ffffff 36%,
      #ffffff 40%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      circle at 50% 100%,
      #ffffff 10%,
      rgb(165, 207, 249) 11%,
      rgb(165, 207, 249) 23%,
      #ffffff 24%,
      #ffffff 30%,
      rgb(165, 207, 249) 31%,
      rgb(165, 207, 249) 43%,
      #ffffff 44%,
      #ffffff 50%,
      rgb(165, 207, 249) 51%,
      rgb(165, 207, 249) 63%,
      #ffffff 64%,
      #ffffff 71%,
      rgba(0, 0, 0, 0) 71%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      circle at 100% 50%,
      #ffffff 5%,
      rgb(165, 207, 249) 6%,
      rgb(165, 207, 249) 15%,
      #ffffff 16%,
      #ffffff 20%,
      rgb(165, 207, 249) 21%,
      rgb(165, 207, 249) 30%,
      #ffffff 31%,
      #ffffff 35%,
      rgb(165, 207, 249) 36%,
      rgb(165, 207, 249) 45%,
      #ffffff 46%,
      #ffffff 49%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      circle at 0 50%,
      #ffffff 5%,
      rgb(165, 207, 249) 6%,
      rgb(165, 207, 249) 15%,
      #ffffff 16%,
      #ffffff 20%,
      rgb(165, 207, 249) 21%,
      rgb(165, 207, 249) 30%,
      #ffffff 31%,
      #ffffff 35%,
      rgb(165, 207, 249) 36%,
      rgb(165, 207, 249) 45%,
      #ffffff 46%,
      #ffffff 49%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgb(165, 207, 249);
  -webkit-background-origin: padding-box;
  background-origin: padding-box;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-background-size: 100px 50px;
  background-size: 100px 50px;
}
</style>