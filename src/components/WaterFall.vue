<template>
  <div class="container">
    <h2 class="text-center">瀑布流展示图片</h2>

    <div class="row">
        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[0]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div>
        
        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[1]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div>

        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[2]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div>

        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[3]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div>

        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[4]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div>

        <div class="col-md-2">
          <img v-for="(y,$yindex) in singleImgList[5]" :userid='y.userID' :src="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img' >
        </div> 
        </div>
    </div>
  </div> 
<script>

//滚动条到底部的距离
    function getScrollBottomHeight() {
        return getPageHeight() - getScrollTop() - getWindowHeight();
    }
    //页面高度
    function getPageHeight() {
        return document.querySelector("html").scrollHeight
    }
    //滚动条顶 高度
    function getScrollTop() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
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
      page: 2,
      ImgList: [],
      singleImgList: [[], [], [], [], [], []]
    };
  },
  mounted: function() {
      let self=this;
    //组件生成时调用
    self.getImg(this.page); 

    document.addEventListener("scroll", e => { 
      self.handleScroll()
    });
  },
  methods: {
      handleScroll(){
          let self = this;
 if (getScrollBottomHeight() <= 50){
 self.getImg(2)
 }
      },
    getImg(page) {
      let self = this;
      //NOTE:这个方法不能用中文参数
      $.ajax({
        type: "GET",
        url: "/ma/musicUserList", async: false,
        data: {
          pageindex: self.page
        },
        dataType: "json",
        success: function(data) {
          if (data != null && data != "") {
            if (data.success) {
              // self.ImgList.push.apply(self.ImgList,data.data);
              self.resloveArr(data.data);
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
</style>