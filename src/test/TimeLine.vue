<template>
  <div class="time-line-block fadeInLeft">
    <h2 style="position: absolute;
    left: 220px;">工作经历</h2>
    <div class="time-work-left">
      <div class="time-line-head">
        <h5></h5>
        <div class="time-line-head-parent">
          <div class="time-year" style="animation: runn 0.5s linear;">
            <span>WORK</span>
            <!-- <i>year</i> -->
            <div class="time-s" style="display: none;"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <ul class="time-ul" @mouseout="leaveUl()">
        <li v-for="(x,index) in data[0].lists" class="time-li-top time-li-top-diyi" :style="{height:lisHeightArr[index]+'px',lineHeight:lisHeightArr[index]+'px'}"
          @mouseover="leftLiHover(index)" :class="{'on':currentHoverIndex==index}">
          <em>{{x.year}}</em>
          <i>{{x.month}}月</i>
          <b></b>
          <div class="clear"></div>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="time-work-right">
      <ul ref="content" @mouseout="leaveUl()">
        <li v-for="(x,index) in data[0].lists" :class="{'on':currentHoverIndex==index}"  @mouseover="leftLiHover(index)">
          <p class="W-jie1">{{x.title}}</p>
          <p class="W-jie2">
            <span>{{x.job}}</span>
            <span>{{x.content}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  export default {
    name: "TimeLine",
    props: {
      //对外获取的数据
      data: {
        type: [Object, Array],
        require: true,
        default: function () {
          return [{
            year: 2017,
            lists: [{
              year: "2017",
              month: "8",
              day: "15",
              title: "完成代理版功能",
              job: "<你们你们你们>",
              content: "在大家的积极努力下,完成了代理版的功能和其他的数据补充"
            }, {
              year: "2017",
              month: "9",
              day: "30",
              title: "学习Es6功能",
              job: "<你们你们你们>",
              content: "ES6的数据知识学习以及补充和当前的数据链接"
            }, {
              year: "2017",
              month: "10",
              day: "6",
              title: "进行智慧财税功能开发",
              job: "<你们你们你们>",
              content: "进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发"
            }, {
              year: "2017",
              month: "12",
              day: "19",
              title: "进行智慧财税功能开发",
              job: "<你们你们你们>",
              content: "进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发进行智慧财税功能开发"
            }]
          }]
        }
      }
    },
    data: function () {
      //组件内数据部分
      return {
        lisHeightArr: [],
        currentHoverIndex: -1
      }
    },
    mounted: function () {
      //组件生成时调用
      let heightArr = [];
      var dom = this.$refs.content;
      $(dom).find('li').each(function () {
        heightArr.push($(this).outerHeight(true));
      });
      this.lisHeightArr = heightArr;
    },
    methods: {
      leftLiHover(index) {
        this.currentHoverIndex = index;
        console.log(index)
      },
      leaveUl() {
        this.currentHoverIndex = -1;
      }
    }
  }
</script>
<style scoped>
  li,
  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .W-work {}

  .time-line-block {
    width: 820px;
    min-height: 800px;
    overflow: hidden;
    padding-bottom: 1px;
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 0 0 -410px;
  }

  .time-work-left {
    float: left
  }

  .time-line-head {
    width: 200px;
    height: 82px
  }

  .time-line-head-parent {
    width: 93px;
    height: 93px;
    position: relative;
    float: right
  }

  .time-line-head .time-year {
    width: 83px;
    height: 83px;
    font-size: 20px;
    font-weight: bold;
    font-family: "微软雅黑";
    text-align: center;
    color: #44a4a5;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    border: 5px solid #81a7a7;
    cursor: pointer
  }

  .time-line-head h5 {
    margin-left: 10px;
    margin-top: 36px;
    float: left;
    font-size: 18px;
    color: #ffd200
  }

  .time-line-head .time-year i {
    font-size: 15px;
    color: #90af70;
    font-weight: bold;
    display: block;
    margin-top: -10px;
    text-transform: uppercase
  }

  .time-year span {
    display: block;
    width: 100%;
    margin-top: 22px
  }

  .time-s {
    display: none;
    width: 83px;
    height: 83px;
    background: url("?Anti-stealing-link=img&path=clock.png") no-repeat #6bc30d;
    border-radius: 50%;
    border: 5px solid #c4e79e;
    background-position: center center;
    background-size: cover;
    position: absolute;
    left: -5px;
    top: -5px
  }

  .time-ul {
    position: relative;
    width: 150px;
    /* height: 360px; */
    border-right: 8px solid #81a7a7;
    padding-top: 20px;
    cursor: pointer;
  }

  .time-ul li {
    /* height: 100px; */
    line-height: 100px
  }

  .time-ul li em {
    font-size: 12px;
    font-style: normal;
    color: #21211d;
    margin-left: 30px
  }

  .time-ul li i {
    font-size: 18px;
    color: #31312c;
    margin-left: 8px;
  }

  .time-ul li b {
    width: 25px;
    height: 2px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -1px;
    background: #6e716a;
  }

  .time-ul li span {
    border: 2px solid #6e716a;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fff;
    display: block;
    position: absolute;
    right: -14px;
    cursor: pointer;
    z-index: 111;
    border-width: 2px;
    top: 50%;
    right: 0;
    margin-right: -12px;
    margin-top: -8px;
  }

  .time-ul li:hover span ,
  .time-ul li.on span{
    /* border-width: 10px; */
    border-width: 8px;
    /* width: px; */
    width: 28px;
    height: 28px;
    margin-right: -18px;
    margin-top: -14px;
    transition: all .2s;
  }
  
  
  .time-ul li.on em{
    font-size: 13px;
    transition: all .2s;
  }.time-ul li.on i{
    font-size: 20px;
    transition: all .2s;
  }

  .time-ul .W-margin-top1 {
    margin-top: 25px;
  }

  .time-ul .time-li-top-diyi {
    margin-top: 3px;
    position: relative;
  }

  .time-ul .W-margin-top1 span {
    top: 188px;
  }

  .time-ul .W-margin-top2 {
    margin-top: 25px;
  }

  .time-ul .W-margin-top2 span {
    top: 313px;
  }

  .time-work-right {
    width: 670px;
    padding-bottom: 1px;
    overflow: hidden;
    position: absolute;
    left: 150px;
    top: 90px;
  }

  .time-work-right ul li .W-jie1 {
    color: rgb(47, 7, 7);
    font-size: 24px;
    transition: color 0.2s ease-in;
  }

  .time-work-right ul li.on {
    color: #ddd;
    transform: translateX(-2px);
    transition: all .2s;
  }

.time-work-right ul li.on .W-jie1{
  color: rgb(128, 141, 150);
  transition: all .2s;
}
  .W-jie1 strong {
    font-weight: 500;
  }

  .time-work-right ul li .W-jie2 {
    font-size: 14px;
    color: #fff;
  }

  .time-work-right ul li {
    margin-top: 26px;
    padding-left: 30px;
    /* height: 100px */
  }

  .time-work-right ul .time-year-top {
    margin-top: 25px;
  }

  .time-work-right ul li .W-jie2 span {
    display: block;
    margin: -2px 0 2px;
    color: #2f4244;
  }

  .time-work-right ul {
    cursor: pointer;
  }

  .W-mywork {}
</style>