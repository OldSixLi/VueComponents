<template>
    <div class="container">
        
        
        
        <h4>此处生成正方形IMG</h4>
        <div class="row">
            <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img.square class="img-thumbnail"></div>
        </div>
        <h4>此处生成长方形图片</h4>
        <div class="row">
            <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
            <div class="col-md-3"><img v-random-img class="img-thumbnail"></div>
        </div>
    </div>
</template>
<script>
    import store from './../store/index';
    export default {
        name: "Point",
        store,
        props: {
            //对外获取的数据
        },
        data: function() {
            //组件内数据部分
            return {}
        },
        mounted: function() {
            //组件生成时调用
            store.commit('changeName'); 
        },
        methods: {
            changeName(){
                store.commit('changeName');
            }
        }
    }
</script>
<style scoped>

</style>