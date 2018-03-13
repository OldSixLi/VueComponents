<template>
  <div class="container">
    <load v-show="Loading"></load>
    <h2 class="text-center">瀑布流展示图片</h2>

    <div class="row">
      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[0]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[1]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[2]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[3]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[4]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[5]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

    </div>
    <div style="position: relative; height: 200px;" v-show="showLoad">
      <loading></loading>
    </div>
  </div>



</template>
<script>
//滚动条到底部的距离
function getScrollBottomHeight() {
  return getPageHeight() - getScrollTop() - getWindowHeight();
}
//页面高度
function getPageHeight() {
  return document.querySelector("html").scrollHeight;
}
//滚动条顶 高度
function getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

export default {
  name: "WaterFall",
  props: {
    //对外获取的数据
  },
  data: function() {
    //组件内数据部分
    return {
      Loading:true,
      page: 1,
      ImgList: [],
      singleImgList: [[], [], [], [], [], []],
      showLoad:false
    };
  },
  mounted: function() {
    let self = this;
    //组件生成时调用
    self.getImg(this.page);

    document.addEventListener("scroll", e => {
      self.handleScroll();
    });

    self.Loading=true;
    setTimeout(() => {
      self.Loading=false;
    }, 5000);
  },
  methods: {
    handleScroll() {
      let self = this;
      if (getScrollBottomHeight() <= 50) {
        self.getImg(2);
      }
    },
    getImg(page) {
      let self = this;
      //NOTE:这个方法不能用中文参数 
      self.$http.get('/ma/musicUserList',{
        params:{
            pageindex: self.page
          }
      }).then(response=>{ 
      return  Promise.resolve(response.data);
      }).then(data=>{
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        console.log(data.data);
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
      });

      $.ajax({
        type: "GET",
        url: "/ma/musicUserList",
        async: false,
        data: {
          pageindex: self.page
        },
        beforeSend:function(){
          self.showLoad=true;
        },
        dataType: "json",
        success: function(data) {
          if (data != null && data != "") {
            if (data.success) {
              // self.ImgList.push.apply(self.ImgList,data.data);
              self.resloveArr(data.data);
              // self.showLoad=false;
            } else {
              self.$alert("提示", "获取信息失败");
            }
          }
        },
        error: function(response) {
          self.$alert("提示", "请求服务失败,请重试!");
        }
      });
    },
    resloveArr(arr) {
      let self = this;
      arr.forEach((obj, i) => {
        self.singleImgList[i % 6].push(arr[i]);
      });
    }
  }
};
</script>
<style scoped>
.img {
  width: 100%;
}

/* Flex容器 */
      
      #main {
        height: 600px;
        border: 1px solid black;
        margin: 0 10px;
        /*Webkit 内核的浏览器，必须加上-webkit前缀。 For Safari */
        display: -webkit-flex;
        display: flex;
        /* NOTE flex-direction属性决定主轴的方向（即项目的排列方向） */
        flex-direction: row;
        /*  row（默认值）：主轴为水平方向，起点在左端。
            row-reverse：主轴为水平方向，起点在右端。
            column：主轴为垂直方向，起点在上沿。
            column-reverse：主轴为垂直方向，起点在下沿。 */
        /* NOTE flex-wrap属性定义，如果一条轴线排不下，如何换行 */
        flex-wrap: nowrap;
        /* nowrap（默认）：不换行。
        wrap：换行，第一行在上方。
        wrap-reverse：换行，第一行在下方。 */
        /* NOTE flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。 */
        flex-flow: row nowrap;
        /* flex-flow: <flex-direction> || <flex-wrap>; */
        /* NOTE justify-content属性定义了项目在主轴上的对齐方式。 */
        justify-content: center;
        /*  flex-start（默认值）：左对齐
            flex-end：右对齐
            center： 居中
            space-between：两端对齐，项目之间的间隔都相等。
            space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。 */
        /* NOTE align-items属性定义项目在交叉轴上如何对齐。 */
        align-items: center;
        /*  flex-start：交叉轴的起点对齐。
            flex-end：交叉轴的终点对齐。
            center：交叉轴的中点对齐。
            baseline: 项目的第一行文字的基线对齐。
            stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 */
        /* NOTE align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 */
        align-content: center;
        /*  flex-start：与交叉轴的起点对齐。
            flex-end：与交叉轴的终点对齐。
            center：与交叉轴的中点对齐。
            space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
            space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
            stretch（默认值）：轴线占满整个交叉轴。 */
      }
      /* 子项目 */
      
      #main div {
        height: 300px;
        background-color: coral;
        /* 子项目相关属性设置 */
        /* NOTE order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。 */
        order: 0;
        /* NOTE flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 */
        flex-grow: 0;
        /* NOTE flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。负值无效。*/
        flex-shrink: 1;
        /* NOTE flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。默认值为auto,可设置width */
        flex-basis: 100px;
        /* NOTE flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 */
        flex: 0 1 500px;
        /* NOTE align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。 */
        align-self: auto;
        /* 可取值: auto | flex-start | flex-end | center | baseline | stretch; */
      }
</style>