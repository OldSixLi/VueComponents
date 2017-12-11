<template>
    <div id="">
        <h3 class="text-center">会员信息父级页面</h3>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "User",
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