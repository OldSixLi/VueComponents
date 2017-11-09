<template>
<div>
      <transition name="fade">
    <div class="modal fade"  :class="isShow?'in':''" :style="{display:isShow?'block':'none'}"   id="" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close()">×</button>
                    <h4 class="modal-title text-left">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <div>
                        <slot></slot>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal" @click="close()">关闭</a>
                </div>
            </div>
        </div>
        
    </div>
    </transition>
    <!-- <div class="modal-backdrop fade in" v-if="isShow"></div> -->
    </div>
</template>
<script>
    export default {
        name: "HtModal",
        props: {
            //对外获取的数据
            title: {
                type: String,
                default: "提示"
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            //组件内数据部分
            return {}
        },
        computed: {
        },
        mounted: function() {
            // 组件生成时调用
            var _self = this; 
        },
        methods: {
            close:function(){
                this.$emit('states')
            },
            toggleState:function(){
                alert('状态切换');
                this.isShow=!this.isShow;
            }
        }
    }
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active{
        transition: all 0.5s ease;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0 ;
    }

</style>