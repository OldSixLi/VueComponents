<template>
    <div id="">
        <h3 class="text-center">会员信息父级页面</h3>
        <transition name="userRouter" mode="">
            <router-view></router-view>
        </transition>
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
            return {}
        },
        mounted: function() {
            //组件生成时调用
        },
        methods: {}
    }
</script>
<style scoped>
     .userRouter-enter-active,
     .userRouter-leave-active {
         transform: scale(1);
         opacity: 1;
         transition: all .8s ease;
     }
     .userRouter-enter,
     .userRouter-leave-active {
         opacity: 0;
         transform: scale(0.5);
         transition: all .3s ease;
     }
</style>