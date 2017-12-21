//做个展示页面
<template>
<div class="back-block">
sss
</div>
    <!-- <img src='' class="bgc-img" alt='背景'> -->
</template>
<script>
    export default {
        name: "Show",
        props: {  
        //对外获取的数据
        },
        data: function() {
        //组件内数据部分
        return {  
        }
        },
        mounted: function() {  
        //组件生成时调用
        },
        methods:{
        } 
    }
</script>
<style scoped> 
.back-block{
    background-image: url(http://om6fr85l4.bkt.clouddn.com/bgc.jpg);
    background-size: 100% 100%;/*背景图片的尺寸*/
}
</style>