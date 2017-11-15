<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">初始页</h1>
                <p class="text-center lead">Vue-Router及组件开发</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (1).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (7).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (2).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (2).png" class="img-responsive  img-thumbnail"></a>
            </div>
        </div>
        <div class="row" style="margin-top: 15px;">
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (3).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (4).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (5).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
            <div class="col-md-3">
                <a><img src="/src/assets/img/usericon/userIcon (6).jpg" class="img-responsive  img-thumbnail"></a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Begin",
        props: {
            //对外获取的数据
        },
        data: function() {
            //组件内数据部分
            return {}
        },
        mounted: function() {
            //组件生成时调用
        },
        methods: {}
    }
</script>
<style scoped>
    .col-md-3:hover img{
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
</style>