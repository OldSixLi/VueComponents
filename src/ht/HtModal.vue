<template >
    <div> 
        <transition name="fade">
            <div class="modal fade" :class="{'in':isShow}" v-show="isShow">
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
        methods: {
            close: function() {
                this.$emit('states')
            },
            toggleState: function() {
                alert('状态切换');
                this.isShow = !this.isShow;
            }
        }
    }
</script>
<style scoped>
    .in {
        display: block;
    }
    /* 完成状态 */
    .fade-enter-active,
    .fade-leave-active {
        transform: translate(0, 0);
        transition: all 0.5s ease;
    }
    /* 初始状态 */
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
        transform: translate(0, -25%);
    }
    .modal {
        overflow-y: auto;
    } 
</style>