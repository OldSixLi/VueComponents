//做个展示页面
<template>
  <div class="page">
    <div class="first-page">
      <!-- 遮罩区域 -->
      <transition name="cover">
        <div class="cover" v-show="showCover"></div>
      </transition>
      <!-- OLDSIXLI -->
      <img :src='require("./../assets/img/show/oldsix.png")' class="img-name" :class="imgClass" alt="OldSix.Li">
      <h3 class='h-welcome' :class="h3Class">
        Welcome To My Homepage.</h3>
    </div>
    <!-- 项目展示 -->
    <div class="container" id="main">
      <!-- 标题 -->
      <div class="intro">
        <div class="hor-block"></div>
        <div class="project">My Projects</div>
        <link async href="http://fonts.googleapis.com/css?family=Aldrich" data-generated="http://enjoycss.com" rel="stylesheet" type="text/css" />
      </div>
      <!-- 项目主要内容 -->
      <div class="row">
        <img-an class="col-md-4" :src='require("./../assets/img/show/hor4.jpg")' title="时间任务调度框架" content="一个基于C#的定时任务调度框架" href="https://github.com/OldSixLi/TimerSwitch"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/show/hor5.jpg")' title="后台管理网站" content="基于Angularjs的后台管理网站" href="https://github.com/OldSixLi/Nodes"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/show/hor6.jpg")' title="爬虫项目" content="基于nodejs的爬虫,下载知乎高质量回答下的图片" href="https://github.com/OldSixLi/NodeAngular"></img-an>
      </div>
      <div class="row" style="margin-top: 20px;">
        <img-an class="col-md-4" :src='require("./../assets/img/show/hor1.jpg")' title="Vue组件编写" content="Vue的学习以及一些组件的封装" href="https://github.com/OldSixLi/VueComponents"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/show/hor2.jpg")' title="浩天智慧财税" content="上线的网站项目" href="http://www.htyfw.com.cn/"></img-an>

        <img-an class="col-md-4" :src='require("./../assets/img/show/hor3.jpg")' title="服务支撑平台" content="后台管理项目,已上线" href="http://www.htyfw.com.cn/csfwpt_console/login"></img-an>
      </div>
    </div>
    <!-- 电影 -->
    <div class="section-two">
      <h1 class="text-center" style="padding-top: 110px;color: #fff;">剧</h1>
      <br><br>
      <div class="container">
        <div class="row">
          <!-- 士兵突击 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/soldier.jpg")' title="士兵突击" word="三多和成才就像一张纸的正反面，走过不同的路后都在成长。希望永远怀揣一颗赤子之心。" />
          </div>
          <!-- 釜山行 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/chumen.jpg")' title="楚门的世界" word="就算你能摄影我的一切也无法在我脑内安装摄影机" />
          </div>
          <!-- 活着 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/live.jpg")' title="活着" word="活着" />
          </div>
          <!-- 鬼子来了 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/devil.jpg")' title="鬼子来了" word="可能比大部分抗日剧都接地气的多" />
          </div>
        </div>
        <br>
        <div class="row">
          <!-- 烈日灼心 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/hot.jpg")' title="烈日灼心" word="烈日灼心" />
          </div>
          <!-- 阳光灿烂的日子 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/day.jpg")' title="阳光灿烂的日子" word="阳光灿烂的日子" />

          </div>
          <!-- 十二公民 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/twelve.jpg")' title="十二公民" word="言语的力量" />

          </div>
          <!-- 美国队长 -->
          <div class="col-md-3 col-sm-3 col-xs-3">
            <img-introduce :img='require("./../assets/img/movie/cover/capation.jpg")' title="美国队长" word="永远为了自由与公正" /> </div>
        </div>
      </div>
    </div>
    <!-- 空白 -->
    <div class="section-three" style="height: 1000px;"></div>
    <!-- 其他 -->
    <div class="section-four">
      <h1 class="text-center" style="padding-top: 250px;color: #fff;">其他文字</h1>
    </div>
    <!-- final -->
    <div class="section-five" style="height: 800px;"></div>
    <!-- <div class="">
      <running-man></running-man>
    </div> -->
    <div class="footer"></div>
  </div>
</template>
<script>
import store from "./../store/index";
export default {
  name: "Show",
  store,
  props: {},
  data: function() {
    return {
      imgClass: "",
      h3Class: "",
      showCover: true
    };
  },
  mounted: function() {
    store.commit("changeBasicName");
    var newImg = new Image();
    newImg.src = "http://om6fr85l4.bkt.clouddn.com/bgc.jpg";
    newImg.onload = () => {
      this.imgClass = "img-logo";
      this.h3Class = "h3-logo";
      setTimeout(() => {
        this.showCover = false;
      }, 1500);
    };
  }
};
</script>
<style scoped>
.first-page {
  margin-top: -20px;
  font: normal 18px/normal "brush-script-std", Helvetica, sans-serif;
  height: 800px;
  background-attachment: scroll, scroll, fixed;
  background-image: url("./../assets/img/show/top-3200.svg"),
    url("./../assets/img/show/a1.png"),
    url("http://om6fr85l4.bkt.clouddn.com/bgc.jpg");
  background-position: bottom center, top left, center center;
  background-repeat: repeat-x, repeat, no-repeat;
  background-size: 3200px 460px, auto, cover;
  color: rgba(255, 255, 255, 0.8);
  padding: 6em 0 20em 0;
  position: relative;
  text-align: center;
}

#main {
  position: relative;
}
#main:before {
  content: "";
  height: 100px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 49.9%;
  background: rgba(224, 224, 224, 0.75);
  z-index: -1;
}
.intro {
  padding-top: 100px;
}
.h-welcome {
  width: 640px;
  margin: 0 auto;
  opacity: 0;
  text-align: right;
}
.cover {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.img-name {
  transform: skewX(160deg);
  margin-bottom: -50px;
  opacity: 0;
}
.hor-block {
  width: 50%;
  transform: translateX(50%);
  height: 15px;
  border: 1px solid #e7e7e7;
  border-left: none;
  border-right: none;
}
.first-page .logo {
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
.img-logo {
  opacity: 1;
  animation: mymove 1s forwards;
}

.h3-logo {
  animation: mymoves 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s forwards;
}

.section-two {
  height: 1200px;
  background-image: url("./../assets/img/show/top-3200.svg"),
    url("./../assets/img/show/top-back.svg"), url("./../assets/img/show/a1.png"),
    url("./../assets/img/show/back-3.jpg");
  background-attachment: scroll, scroll, scroll, fixed;
  background-position: bottom center, top center, top left, center center;
  background-repeat: repeat-x, repeat-x, repeat, no-repeat;
}
.section-four {
  height: 1200px;
  background-image: url("./../assets/img/show/top-3200.svg"),
    url("./../assets/img/show/top-back.svg"), url("./../assets/img/show/a1.png"),
    url("./../assets/img/show/back-5.jpg");
  background-attachment: scroll, scroll, scroll, fixed;
  background-position: bottom center, top center, top left, center center;
  background-repeat: repeat-x, repeat-x, repeat, no-repeat;
}

.project {
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
.cover-enter-active {
  /* 动画过渡设置 */
  transition: all 0.8s;
}
.cover-leave-active {
  /* 动画过渡设置 */
  transition: all 1.9s;
}
.cover-leave,
.cover-enter-to {
  /* 终止,动画已完成 */
  opacity: 1;
}
.cover-leave-to,
.cover-enter {
  /* 起始,动画刚开始*/
  opacity: 0;
}
/* 图片动画效果 */
@keyframes mymove {
  from {
    transform: translateY(-500px) skewX(160deg);
  }
  to {
    transform: translateY(0) skewX(160deg);
  }
}
@-moz-keyframes mymove {
  from {
    transform: translateY(-500px) skewX(160deg);
  }
  to {
    transform: translateY(0) skewX(160deg);
  }
}
@-webkit-keyframes mymove {
  from {
    transform: translateY(-500px) skewX(160deg);
  }
  to {
    transform: translateY(0) skewX(160deg);
  }
}
@-o-keyframes mymove {
  from {
    transform: translateY(-500px) skewX(160deg);
  }
  to {
    transform: translateY(0) skewX(160deg);
  }
}
/* 段落动画效果 */
@keyframes mymoves {
  from {
    opacity: 0;
    transform: translateY(600px);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@-moz-keyframes mymoves {
  from {
    opacity: 0;
    transform: translateY(600px);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@-webkit-keyframes mymoves {
  from {
    opacity: 0;
    transform: translateY(600px);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@-o-keyframes mymoves {
  from {
    opacity: 0;
    transform: translateY(600px);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>