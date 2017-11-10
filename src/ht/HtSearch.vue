<template>
    <div class="input-group">
        <input type="text" class="form-control" :value="currentValue" @input="handleInput" :placeholder="placeholder" @keypress.enter="searchClick">
        <span class="input-group-btn">
            <button class="btn btn-primary" :class="{
                'btn-default':type=='default',
                'btn-success':type=='success',
                'btn-info':type=='info',
                'btn-warning':type=='warning',
                'btn-danger':type=='danger', 
           
            }" type="button" @click="searchClick"><span class="glyphicon glyphicon-search"></span>&nbsp;搜索</button>
        </span>
    </div>
</template>
<script>
    export default {
        name: "HtSearch",
        props: {
            //对外获取的数据
            placeholder: String,
            value: String,
            type:String
        },
        data: function() {
            //组件内数据部分
            return {
                currentValue: this.value
            }
        },
        methods: {
            searchClick: function() {
                this.$emit('search', this.value);
            },
            handleInput(event) {
                var value = event.target.value;
                this.$emit('input', value); //触发 input 事件，并传入新值
            }
        }
    }
</script>
<style scoped>
     
</style>