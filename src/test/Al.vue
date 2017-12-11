<template>
    <div class="alert alert-success" role="alert">
        <button type="button" class="btn btn-primary btn-block" @click="randomStr">改变父组件数据</button>
        <br>
        {{message}}  
    </div>
</template>
<script>
    export default {
        name: "Al",
        props: {  
            message:String
        }, 
        methods:{
            randomStr(){
                // <comp :foo.sync="bar"></comp>
                // <comp :foo="bar" @update:foo="val => bar = val"></comp>
                //如果要修改父组件的值  只能通过$emit方法
                 this.$emit('update:message',Math.floor(Math.random()*10) +""+this.message);
            }
        } 
    }
</script> 