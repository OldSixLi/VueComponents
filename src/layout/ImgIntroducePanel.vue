
<template>
  <div class="contents">
    <div class="content">
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
  mounted: function() {
    console.log(this.img);
  },
  methods: {}
};
</script>
<style scoped>
  .content img{
    
    -webkit-filter: grayscale(80%);
    filter: grayscale(80%);
  }
.contents {
  display: inline-block;
  min-height: 200px;
}
.content {
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: all 0.3s;
}
.contents:hover .content {
  transition: all 0.5s;
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