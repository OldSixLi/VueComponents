<template>
  <div class="contents">

    <div class="content" :class="{'d3':isFireFox}">
      <!-- 正面图片,背面介绍 -->
      <img :src='img' alt="图片" class="img-thumbnail img-responsive">
      <div class="back-div">
        <!-- 介绍文字 -->
        <p v-html="title" class="title" :title="title"></p>
        <p v-html="word" class="detail" :title="word"></p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ImgIntroducePanel",
    props: {
      //对外获取的数据
      word: String,
      title: String,
      img: String
    },
    data() {
      return {
        isFireFox: false
      }
    },
    mounted: function () {
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        setTimeout(() => {
          this.isFireFox = true;
        }, 1800);
      }
    },
    methods: {}
  };
</script>
<style scoped>
  .content img {
    -webkit-filter: grayscale(80%);
    filter: grayscale(80%);
  }

  .contents {
    display: inline-block;
    -webkit-perspective: 600px;
    -moz-perspective: 600px;
    -ms-perspective: 600px;
    perspective: 600px;
    min-height: 200px;
  }

  .content.d3 {
    -webkit-transform-style: flat;
    -moz-transform-style: flat;
    -ms-transform-style: flat;
    transform-style: flat;
  }

  .contents:hover .content.d3 {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .content {
    display: inline-block;
    position: relative;
    /* transform-style: none; */
    /* -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d; */
    backface-visibility: hidden;
    transition: all 1s;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    background-color: #fff;
    transform-style: preserve-3d;
    /* -webkit-perspective: 600px;
    -moz-perspective: 600px;
    -ms-perspective: 600px;
    perspective: 600px; */
  }

  .contents:hover .content {
    transition: all 0.8s;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    transform: rotateY(-180deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }



  /* 背面div */

  .back-div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #48576a;
    background-color: #fff;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ddd;
    transform: rotateY(-180deg);
  }

  /* 标题 */

  .title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }

  /* 详情页面 */

  .detail {
    text-indent: 2em;
  }
</style>