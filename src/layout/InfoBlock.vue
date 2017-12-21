//说明:个人信息展示面板
//时间:2017年11月10日09:01:09

<template>
  <div class="img-info-block">
    <div class="content">
      <img class="img" :src="imgSrc" alt="头像">
      <p class="title">{{title}}</p>
      <p class="intro">{{intro}}</p>
      <p class="word" :title="word">{{word}}
        <slot></slot>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoBlock",
  props: {
    imgSrc: String,
    title: String,
    intro: String,
    word: String
  }
};
</script>
<style scoped>
.img-info-block {
  position: relative;
  width: 19%;
  height: 350px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 20px 1% 20px 0;
  padding-bottom: 20px;
  float: left;
  font-family: "MicroSoft YaHei";
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
  border-radius: 5px;
}
.img-info-block:hover {
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.2);
}
.img-info-block > .content {
  height: 100%;
  margin: 10px;
  text-align: center;
  overflow: hidden;
}
.img-info-block > .content > img {
  width: 120px;
  height: 120px;
  position: absolute;
  margin-left: -60px;
  left: 50%;
  top: -16px;
  z-index: 100;
  border-radius: 50%;
  transition: all 0.3s;
}
.img-info-block:hover > .content > img {
  width: 60px;
  height: 60px;
  margin-left: -30px;
  left: 50%;
}
.img-info-block > .content > .title {
  margin-bottom: 2px;
  margin-top: 110px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;
}
.img-info-block > .content > .word {
  text-align: left;
  line-height: 24px;
}
.img-info-block:hover > .content > .intro {
  opacity: 0;
}
.img-info-block:hover > .content > .title {
  margin-top: 0;
  opacity: 0;
}
</style>