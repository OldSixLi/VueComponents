<template>
    <div id="" class="text-center well">
        <h3>用户详细信息,当前传入的参数为{{$route.params.id}}</h3>
        <p>
            <router-link to="/user/list" class="btn btn-link">返回列表</router-link>
        </p>
    </div>
</template>
<script>
    export default {
        name: "UserInfo",
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