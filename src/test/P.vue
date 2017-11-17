<template>
    <p>
        <slot></slot>
        <b :class="{
                'has-error':hasError
            }" v-if="hasError">{{message}}</b>
    </p>
</template>
<script>
    export default {
        name: "Pr",
        props: {
            //对外获取的数据
            min: String,
            
            length: String,
             
        },
        data: function() {
            //组件内数据部分
            return {
                hasError:false,
                message: "",
            }
        },
        mounted: function() {
            //组件生成时调用  
            // this.check();
            this.$on('alerts',function(){
                this.alerts();
                this.check();
            });
        },
        methods: {
            getRule: function() {
            },
            alerts: function() {
                // alert("点击事件")
            },
            check(){
                console.log(this.$el)
               if(this.$el.innerText.length>this.length){
                   this.hasError=true;
                   this.message="当前值不符合验证规则";
               }else{
                   this.hasError=true;
                   this.message="当前值通过验证";
               }
            }
        }
    }
</script>
<style scoped>
     .has-error {
         color: red;
     }
</style>