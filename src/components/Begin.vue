<template>
    <div class="container" >
        <div class="row">
            <div class="col-md-12">
                <div class="night-hotel">GET START</div>
                <!-- TODO 添加文件到本地 -->
                <link async href="http://fonts.googleapis.com/css?family=Monoton" data-generated="http://enjoycss.com" rel="stylesheet" type="text/css"
                />
                <link async href="http://fonts.googleapis.com/css?family=Nova%20Flat" data-generated="http://enjoycss.com" rel="stylesheet"
                    type="text/css" />
                <link async href="http://fonts.googleapis.com/css?family=Open%20Sans" data-generated="http://enjoycss.com" rel="stylesheet"
                    type="text/css" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src='http://om6fr85l4.bkt.clouddn.com/userIcon%20%284%29.jpg' class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src='http://om6fr85l4.bkt.clouddn.com/userIcon%20%281%29.jpg' class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src='http://om6fr85l4.bkt.clouddn.com/userIcon%20%286%29.jpg' class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src='http://om6fr85l4.bkt.clouddn.com/userIcon%20%285%29.jpg' class="img-responsive  img-thumbnail"></a>
            </div>
        </div>
        <div class="row" style="margin-top: 15px;">
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src="http://om6fr85l4.bkt.clouddn.com/userIcon%20%287%29.jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src="http://om6fr85l4.bkt.clouddn.com/userIcon%20%283%29.jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src="http://om6fr85l4.bkt.clouddn.com/userIcon%20%282%29.png" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <a><img src="http://om6fr85l4.bkt.clouddn.com/userIcon%20%282%29.png" class="img-responsive  img-thumbnail"></a>
            </div>
        </div>

    </div>
</template>
<script>
  //  import 'http://use.edgefonts.net/carter-one.js';
  export default {
    name: "Begin",
    methods: {
      alerts() {
        alert('aa')
      }
    }
  };
</script>
<style scoped>
  .col-md-3:hover img {
    -webkit-transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
    -moz-transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
    -o-transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
    transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  
  .col-md-3 img {
    -webkit-transition: all 2s cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -moz-transition: all 2s cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -o-transition: all 2s cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    transition: all 2s cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  
  .night-hotel {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    padding: 20px;
    border: none;
    font: normal 60px/1 "Monoton", Helvetica, sans-serif;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 20px rgb(255, 255, 255), 0 0 30px rgb(255, 255, 255), 0 0 40px rgb(255, 17, 119), 0 0 70px rgb(255, 17, 119), 0 0 80px rgb(255, 17, 119), 0 0 100px rgb(255, 17, 119), 0 0 150px rgb(255, 17, 119);
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
  }
  
  .night-hotel:hover {
    text-shadow: 0 0 5px rgb(255, 255, 255), 0 0 10px rgb(255, 255, 255), 0 0 15px rgb(255, 255, 255), 0 0 20px rgb(255, 17, 119), 0 0 35px rgb(255, 17, 119), 0 0 40px rgb(255, 17, 119), 0 0 50px rgb(255, 17, 119), 0 0 75px rgb(255, 17, 119);
  }
</style>