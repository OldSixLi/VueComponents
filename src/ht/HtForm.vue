<template>
    <form :class="{
                  'form-inline':inline,
                  'form-horizontal':horizontal
                  }">
        <p style="color:red;text-align:center;">现在剩下的问题是如何自定义多种情景去适应</p>
        <slot></slot>
        <slot name="liehu"></slot>
    </form>
</template>
<script>
    function broadcast(componentName, eventName, params) {
        this.$children.forEach(function(child) {
            var name = child.$options.name;
            if (name === componentName) {
                child.$emit.apply(child, [eventName].concat(params));
            } else {
                //这个地方的意思是一直找他的深层元素 直到找到为止
                broadcast.apply(child, [componentName, eventName].concat([params]));
            }
        });
    }
    export default {
        name: "HtForm",
        props: {
            infoType:{
                type:String,
                default:"info"// 提供info/alert/all三种错误提示(all就是包含前边两种的意思)
                //NOTE 这个参数设计的并不好,因为同一个参数作用在了两个组件中,组件的耦合度比较高,后期需思考如何优化
            }, 
            inline: Boolean,
            horizontal: {
                type:Boolean,default:false
            },

        },
        data: function() {
            //组件内数据部分
            return {
                checkResultList: [],
                errorMessageList: [],
                callbackFun: function() {},
                htFormItemLength:0,
                //校验通过后的结果Object
                ValidatedResult:{}
            }
        },
        mounted: function() {
            //组件生成时调用
            var _self = this;
            //TODO  在此处应编写严谨方法判断到底有多少ht-form-group组件被使用,防止其他组件混入也进入计算
            //获取从子组件传递过来的校验结果
            //BUG: 在这我有个疑问,为毛Pr的name就可以正常显示,但是ht-form-group 使用child.$options.name就无法正常显示( NOTE 问题已解决,是因为在组件内没有定义name)
            // this.htFormItemLength=0; //TODO  这块暂时没有想通要不要多余设置一步0
            this.$children.forEach(function(child) {
               child.$options._componentTag=='ht-form-group'&&this.htFormItemLength++;  
            }, this);

            _self.$on("getresult", function(errorResult,resultValueObj) {
                if (errorResult.hasError && errorResult.errorMessage) {
                    this.errorMessageList.push(errorResult.errorMessage);
                }
                // console.log("TODO"+JSON.stringify(errorResult));
                //这一步主要用处是判断返回的结果长度与子组件的长度是否相同
                
                this.ValidatedResult[resultValueObj.name]=resultValueObj.value;
                this.checkResultList.push(errorResult);
                if (this.checkResultList.length == this.htFormItemLength) { 
                    if((this.infoType=="alert"||this.infoType=="all")&&this.errorMessageList.length>0){
                        //TODO  这个到时候可以替换样式
                        alert(this.errorMessageList.join('\r\n'));
                    }
                    this.callbackFun(this.errorMessageList <= 0, this.errorMessageList,this.errorMessageList>0?{}:this.ValidatedResult);                    
                }
            })
        },
        methods: {
            broadcast(componentName, eventName, params) {
                broadcast.call(this, componentName, eventName, params);
            },
            //校验每个ht-form-group
            checkItem(callback) {
                //这个地方的声明必须在事件传播之前调用
                if (typeof callback == 'function') {
                    this.callbackFun = callback;
                }
                this.broadcast("HtFormGroup", "validate",this.infoType);
                this.checkResultList = [];
                this.errorMessageList = [];
            },
            //清除校验
            clearValidate: function() {
                this.broadcast("HtFormGroup", "clearValidate");
                this.checkResultList = [];
                this.errorMessageList = [];
            }
        }
    }
</script>
<style scoped>

</style>