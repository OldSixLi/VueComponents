//做个展示页面
<template>
  <div class="page">
    <!-- 首屏加载 -->
    <div class="first-page">
      <!-- 遮罩区域 -->
      <transition name="cover">
        <div class="cover" v-show="showCover"></div>
      </transition>
      <!-- OLDSIXLI -->
      <img src='http://om6fr85l4.bkt.clouddn.com/oldsix.png' class="img-name" :class="imgClass" alt="OldSix.Li">
      <h3 class='h-welcome' :class="h3Class">
        Welcome To My Homepage.</h3>
    </div>

    <!-- 项目展示 -->
    <div class="container" id="main">
      <!-- 标题 -->
      <div class="intro">
        <div class="hor-block"></div>
        <div class="project">My Projects</div>
      </div>
      <!-- 项目主要内容 -->
      <div class="row">
        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor4.jpg" title="时间任务调度框架" content="一个基于C#的定时任务调度框架" href="https://github.com/OldSixLi/TimerSwitch"></img-an>

        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor5.jpg" title="后台管理网站" content="基于Angularjs的后台管理网站" href="https://github.com/OldSixLi/Nodes"></img-an>

        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor6.jpg" title="爬虫项目" content="基于nodejs的爬虫,下载知乎高质量回答下的图片"
          href="https://github.com/OldSixLi/NodeAngular"></img-an>
      </div>
      <div class="row" style="margin-top: 20px;">
        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor1.jpg" title="Vue组件编写" content="Vue的学习以及一些组件的封装" href="https://github.com/OldSixLi/VueComponents"></img-an>

        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor2.jpg" title="浩天智慧财税" content="上线的网站项目" href="http://www.htyfw.com.cn/"></img-an>

        <img-an class="col-md-4" src="http://om6fr85l4.bkt.clouddn.com/hor3.jpg" title="服务支撑平台" content="后台管理项目,已上线" href="http://www.htyfw.com.cn/csfwpt_console/login"></img-an>
      </div>
    </div>

    
    <!-- 其他 -->
    <div class="section-four">
        <h1 class="text-center" style="padding-top: 200px;color: #fff;">技能</h1>
        <div class="container">
          <div class="row" style="margin-top:30px;">
  
  
  
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s1.jpg" title="HTML">
                <ul class="lists">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s2.jpg" title="CSS">
                <ul class="lists">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s3.jpg" title="JS">
                <ul class="JS">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s4.jpg" title="NODE">
                <ul class="NODE">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
          </div>
  
          <div class="row" style="margin-top:30px;">
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s5.jpg" title="C#">
                <ul class="NODE">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s6.jpg" title="SQL">
                <ul class="NODE">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s7.jpg" title="IFRAME">
                <ul class="NODE">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
            <div class="col-md-3">
              <skill imgsrc="http://om6fr85l4.bkt.clouddn.com/per-s8.jpg" title="OTHER">
                <ul class="NODE">
                  <li>熟练使用HTML构建页面功能</li>
                  <li>熟悉HTML5新功能和相关特性</li>
                  <li>正确使用语义化标签以及良好的代码规范</li>
                </ul>
              </skill>
            </div>
          </div>
        </div>
      </div>

    <!-- 空白 -->
    <div class="section-three" style="height: 1300px;padding-left: 200px;position: relative;" id="expericnceBlock">
      <div class="intro" style="margin-left: -200px;">
        <div class="hor-block"></div>
        <div class="project">My Experience</div>
      </div>
      <!-- <h1 class="text-center">工作经历</h1>
        <span>利用时间控件  展示工作经历</span> -->
      <div style="height: 1000px;position: relative;">
        <time-line></time-line>
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
              <img-introduce img='http://om6fr85l4.bkt.clouddn.com/soldier.jpg' title="士兵突击" word="三多和成才就像一张纸的正反面，走过不同的路后都在成长。希望永远怀揣一颗赤子之心。"
              />
            </div>
            <!-- 釜山行 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/chumen.jpg" title="楚门的世界" word="就算你能摄影我的一切也无法在我脑内安装摄影机" />
            </div>
            <!-- 活着 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/live.jpg" title="活着" word="活着" />
            </div>
            <!-- 鬼子来了 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/devil.jpg" title="鬼子来了" word="可能比大部分抗日剧都接地气的多" />
            </div>
          </div>
          <br>
          <div class="row">
            <!-- 烈日灼心 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/hot.jpg" title="烈日灼心" word="烈日灼心" />
            </div>
            <!-- 阳光灿烂的日子 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/day.jpg" title="阳光灿烂的日子" word="阳光灿烂的日子" />
  
            </div>
            <!-- 十二公民 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/twelve.jpg" title="十二公民" word="言语的力量" />
  
            </div>
            <!-- 美国队长 -->
            <div class="col-md-3 col-sm-3 col-xs-3">
              <img-introduce img="http://om6fr85l4.bkt.clouddn.com/capation.jpg" title="美国队长" word="永远为了自由与公正" /> </div>
          </div>
        </div>
      </div>
    <!-- final -->
    <div class="section-five" style="height: 800px;">
    </div>

    <!-- footer -->
    <div class="footer">
      <h1>联系方式

      </h1>
    </div>
  </div>
</template>

<script>
  import store from "./../store/index";
  export default {
    name: "Show",
    store,
    data() {
      return {
        imgClass: "",
        h3Class: "",
        showCover: true,
      };
    },
    methods: {
      imgLoad(src) {
        //返回一个promise对象才可以调用then等函数
        return new Promise(function (resolve, reject) {
          var newImg = new Image();
          newImg.src = src;
          newImg.onload = () => {
            resolve("success");
          };
          newImg.onerror = () => {
            reject("error");
          };
        });
      }
    },
    mounted() {
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        this.$alert(
          "提示",
          "Firefox浏览器下动画展示不完美"
        );
      }
      store.commit("changeBasicName");
      let self = this;
      //保证首屏可以完整显示
      Promise.all([
        self.imgLoad("http://om6fr85l4.bkt.clouddn.com/back-1.jpg"),
        self.imgLoad("http://om6fr85l4.bkt.clouddn.com/oldsix.png"),
        self.imgLoad("http://om6fr85l4.bkt.clouddn.com/top-3200.svg"),
        self.imgLoad("http://om6fr85l4.bkt.clouddn.com/a1.png")
      ]).then(
        str => {
          self.imgClass = "img-logo";
          self.h3Class = "h3-logo";
          setTimeout(() => {
            self.showCover = false;
          }, 1500);

        },
        err => {
          //失败了也得让进去啊,多等一会就得了
          setTimeout(() => {
            self.imgClass = "img-logo";
            self.h3Class = "h3-logo";
            setTimeout(() => {
              self.showCover = false;
            }, 1500);
          }, 1500);
        }
      );
    }
  };
</script>
<style scoped>
  .head-title {
    position: fixed;
    left: 50%;
    margin-left: -360px;
    z-index: 101;
  }

  /* latin */

  @font-face {
    font-family: "Aldrich";
    font-style: normal;
    font-weight: 400;
    src: local("Aldrich Regular"), local("Aldrich-Regular"), url("./../assets/fonts/MCoTzAn-1s3IGyJMVacY3w.woff2") format("woff2");
    unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da, U+02dc, U+2000-206f, U+2074, U+20ac, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  .first-page {
    margin-top: -20px;
    font: normal 18px/normal "brush-script-std", Helvetica, sans-serif;
    height: 800px;
    background-attachment: scroll, scroll, fixed;
    background-image: url("http://om6fr85l4.bkt.clouddn.com/top-3200.svg"), url("http://om6fr85l4.bkt.clouddn.com/a1.png"), url("http://om6fr85l4.bkt.clouddn.com/back-1.jpg");
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

  #expericnceBlock:before,
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

  .img-logo {
    opacity: 1;
    animation: mymove 1s forwards;
  }

  .h3-logo {
    animation: mymoves 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s forwards;
  }

  .section-two {
    height: 1200px;
    background-image: url("http://om6fr85l4.bkt.clouddn.com/top-3200.svg"), url("http://om6fr85l4.bkt.clouddn.com/top-back.svg"), url("http://om6fr85l4.bkt.clouddn.com/a1.png"), url("http://om6fr85l4.bkt.clouddn.com/back-3.jpg");
    background-attachment: scroll, scroll, scroll, fixed;
    background-position: bottom center, top center, top left, center center;
    background-repeat: repeat-x, repeat-x, repeat, no-repeat;
  }

  .section-four {
    height: 1200px;
    background-image: url("http://om6fr85l4.bkt.clouddn.com/top-3200.svg"), url("http://om6fr85l4.bkt.clouddn.com/top-back.svg"), url("http://om6fr85l4.bkt.clouddn.com/a1.png"), url("http://om6fr85l4.bkt.clouddn.com/back-7.jpg");
    background-attachment: scroll, scroll, scroll, fixed;
    background-position: bottom center, top center, top left, center center;
    background-repeat: repeat-x, repeat-x, repeat, no-repeat;
  }

  .project {
    position: relative;
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
    text-shadow: 0 1px 0 rgb(128, 141, 147), -1px 0 0 rgb(205, 210, 213), -1px 2px 0 rgb(128, 141, 147), -2px 1px 0 rgb(205, 210, 213), -2px 3px 0 rgb(128, 141, 147), -3px 2px 0 rgb(205, 210, 213), -3px 4px 0 rgb(128, 141, 147), -4px 3px 0 rgb(205, 210, 213), -4px 5px 0 rgb(128, 141, 147), -5px 4px 0 rgb(205, 210, 213), -5px 6px 0 rgb(128, 141, 147), -6px 5px 0 rgb(205, 210, 213), -6px 7px 0 rgb(128, 141, 147), -7px 6px 0 rgb(205, 210, 213), -7px 8px 0 rgb(128, 141, 147), -8px 7px 0 rgb(205, 210, 213);
  }

  .footer {
    /* background: url('http://om6fr85l4.bkt.clouddn.com/showfooter.png'); */
    background-repeat: no-repeat;
    background-size: 103% 100%;
    background-color: #2d3237;
    height: 450px;
    margin-bottom: -20px;
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