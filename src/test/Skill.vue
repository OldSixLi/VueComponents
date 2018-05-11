<template>
  <div class="skill-content">
    <div class="back">
      <img :src="imgsrc">
    </div>
    <div class="introduce">
      <div class="title">
        <p>
          {{title}}
        </p>
      </div>
      <div class="word">
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Skill",
    props: {
      title: String,
      content: String,
      imgsrc: {
        type: String,
        require: true
      }
    }
  };
</script>
<style scoped>
  .skill-content {
    max-width: 300px;
    /* height: 0; */
    max-height: 300px;
    position: relative;
    overflow: hidden;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;
    background-color: #fff;
    /* padding-bottom: 100%; */
    width: 100%;
  }

  .skill-content:hover .introduce {
    transform: translateY(-50%);
    transition: all .4s;
    transition-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);

  }

  .skill-content:hover .back {}

  .introduce {
    height: 200%;
    width: 100%;
    padding: 30px;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    transition: all .3s;
    transition-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
  }

  .back {
    overflow: hidden;
  }

  .back img {
    width: 100%;
    height: 100%;
    /* 原图裁剪有些白边 */
    transform: scale(1.02);
    -webkit-filter: grayscale(85%);
    filter: grayscale(85%);
  }

  .skill-content:hover .back img {
    transform: scale(1.1);
    transition: all .3s;
    transition-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
  }

  .title {
    height: 50%;
    font-size: 55px;
    line-height: 100%;
    width: 100%;
    position: relative;
  }

  .title p {
    width: 100%;
    position: absolute;
    top: 40%;
    text-align: center;
    transform: translateY(-50%);
  }

  .word {
    height: 50%;
    font-size: 15px;
    line-height: 100%;
    width: 100%;
    position: relative;
  }

  .word p {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .word ul {
    text-align: left;
    margin-left: 0;
    padding-left: 0;
  }

  .word ul li {
    margin-top: 30px;
    /* list-style: none; */
  }
</style>