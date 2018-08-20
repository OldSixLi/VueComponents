<template>
  <div class="container">
    <!-- <load v-show="Loading"></load> -->
    <h2 class="text-center">瀑布流展示图片</h2>

    <div class="row">
      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[0]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[1]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[2]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[3]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[4]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
      </div>

      <div class="col-md-2">
        <img v-for="(y,$yindex) in singleImgList[5]" :userid='y.userID' v-lazy="y.imgUrl" :alt='y.nickName' class='img-responsive img-thumbnail img'>
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
    let scrollTop = 0,
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
    let windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  //  function 
  /**
   * 函数节流 方法
   * @returns 
   */
  function throttle() {
    threshhold || (threshhold = 250);
    var last,
      timer;
    return function () {
      var context = scope || this;

      var now = +new Date(),
        args = arguments;
      if (last && now - last + threshhold < 0) {
        // hold on to it
        clearTimeout(deferTimer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  /**
   * 函数去抖 
   * @returns 
   */
  function debounce() {
    let timer = null;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        method.apply(context, args);
      }, delay);
    }
  }

  export default {
    name: "WaterFall",
    props: {
      //对外获取的数据
    },
    data: function () {
      //组件内数据部分
      return {
        Loading: true,
        page: 1,
        ImgList: [],
        singleImgList: [
          [],
          [],
          [],
          [],
          [],
          []
        ],
        showLoad: false
      };
    },
    mounted: function () {
      let self = this;
      //组件生成时调用
      self.getImg(this.page);
      // $(window).scroll(self.loadMore());
      $(window).scroll(self.debounce(self.loadMore(), 300))
      self.Loading = true;
      setTimeout(() => {
        self.Loading = false;
      }, 5000);
    },
    methods: {
      al() {
        alert('1')
      },
      /**
       * 加载更多时增加去抖函数 
       * @returns 
       */
      loadMore() {
        let _self = this;
        let canRun = true;
        return function () {
          if (!canRun) {
            return;
          }
          canRun = false;
          setTimeout(function () {
            console.log("执行滚动事件");
            // let docHeight = $(document).height();
            // let winHeight = $(window).innerHeight();
            // let scrollDistance = $(window).scrollTop();
            if (getScrollBottomHeight() <= 300) {
              _self.getImg(2);
            }
            canRun = true;
          }, 1000);
        }
      },
      /**
       * 去抖函数 
       * @returns 
       */
      debounce(method, delay) {
        let timer = null;
        let self = this;
        return function () {
          let context = self,
            args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            method.apply(context, args);
          }, delay);
        }
      },

      handleScroll() {
        this.getImg(2);
      },
      getImg(page) {
        let self = this;
        //NOTE:这个方法不能用中文参数 
        // self.$http.get('/ma/musicUserList', {
        //   params: {
        //     pageindex: self.page
        //   }
        // })
        // .then(response => {
        //   return Promise.resolve(response.data);
        // })
        // .then(data => {
        //   console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        //   console.log(data.data);
        //   console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        // });

        $.ajax({
          type: "GET",
          url: "/ma/musicUserList",
          async: true,
          data: {
            pageindex: self.page
          },
          beforeSend: function () {
            self.showLoad = true;
          },
          dataType: "json",
          success: function (data) {
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
          error: function (response) {
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