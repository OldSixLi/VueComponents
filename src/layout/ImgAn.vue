// Img展示CSS3动画
<template>
  <div class="css3-box">
    <div class="img-block">
      <img class="img-block_img" :src="src" :alt="title">
      <div class="img-block_caption">
        <h3 class="img-block_caption_title">{{title}}</h3>
        <p class="img-block_caption_content">{{content}}</p>
        <a class="img-block_caption_a" :href="href"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ImgAn",
  props: {
    src: String,
    title: String,
    content: String,
    href: String,
  }
};
</script>
<style scoped> 
.css3-box {
  float: left; 
}
.img-block {
  background: #000; 
  height: auto; 
  padding: 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}
.img-block .img-block_img {
  display: block;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  position: relative;
  opacity: 1;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}
.img-block:hover .img-block_img {
  /* position: absolute; */
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  opacity: 0.6;
}
.img-block .img-block_caption {
  color: #fff;
  padding: 0;
  margin: 0;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}
.img-block .img-block_caption::before,
.img-block .img-block_caption::after {
  position: absolute;
  content: "";
  opacity: 0;
  -webkit-transition: opacity 0.4s, -webkit-transform 0.4s;
  -moz-transition: opacity 0.4s, -moz-transform 0.4s;
  -o-transition: opacity 0.4s, -o-transform 0.4s;
  transition: opacity 0.4s, transform 0.4s;
}
.img-block .img-block_caption::before {
  top: 14%;
  right: 5%;
  bottom: 14%;
  left: 5%;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: scale(0, 1);
  -moz-transform: scale(0, 1);
  -o-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
}
.img-block .img-block_caption::after {
  top: 8%;
  right: 10%;
  bottom: 8%;
  left: 10%;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform: scale(1, 0);
  -moz-transform: scale(1, 0);
  -o-transform: scale(1, 0);
  transform: scale(1, 0);
  -webkit-transform-origin: 100% 0;
  -moz-transform-origin: 100% 0;
  -o-transform-origin: 100% 0;
  transform-origin: 100% 0;
}
.img-block:hover .img-block_caption::before,
.img-block:hover .img-block_caption::after {
  opacity: 1;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
.img-block .img-block_caption,
.img-block .img-block_caption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  z-index: 1000;
}
.img-block .img-block_caption_title {
  font-size: 1.3em;
  font-weight: 700;
  text-align: center;
  width: 80%;
  position: absolute;
  top: 20%;
  left: 10%;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  opacity: 1;
}
.img-block .img-block_caption_content {
  font-size: 1em;
  text-align: center;
  width: 80%;padding: 0 5px;
  position: absolute;
  top: 60%;
  left: 10%;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  opacity: 0;
}
.img-block:hover .img-block_caption_content {
  top: 45%;
  opacity: 1;
}
</style>