//播放器组件  暂未编写
<template>
    <label>
        <audio src="/src/assets/audio/backgroundMusic.mp3" controls="controls" autoplay="true">
            您的浏览器暂不支持
        </audio>
    </label>
</template>
<script>
    export default {
        name: "Music",
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

</style>