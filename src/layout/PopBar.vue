<template>
    <transition name="notify">
        <div class="notify" v-if="visible" :class="direction" :style="{
        }">
            <p class="n-title">
                <b>{{title}}</b>
            </p>
            <span class="n-close-btn" @click="close()">&times;</span>
            <div class="n-content">
                <slot></slot>
                <span v-html="message"></span>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: "PopBar",
        props: {
            //对外获取的数据
            msg: String
        },
        data: function() {
            //组件内数据部分
            return {
                visible: false,
                message: this.msg || "",
                title:"提示",
                direction: "right"
            }
        },
        mounted: function() {
        },
        methods: {
            close() {
                this.visible = false;
            }
        }
    }
</script>
<style scoped>
    /* notify */
    /* 进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除； */
    .notify-enter-active {
        -webkit-transform: translateX(0) scaleY(1);
        transform: translateX(0) scaleY(1);
        transition: all .3s cubic-bezier(0.19, 1, 0.22, 1);
    }
    /* 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除； */
    
    .notify-leave-active {
        opacity: 0;
        transition: all .3s ease;
    }
    .notify-enter.right,
    .notify-leave-active.right {
        opacity: 0;
        -webkit-transform: translateX(100%) scaleY(.3);
        transform: translateX(100%) scaleY(.3);
    }
    .notify-enter.left,
    .notify-leave-active.left {
        opacity: 0;
        -webkit-transform: translateX(-100%) scaleY(.3);
        transform: translateX(-100%) scaleY(.3);
    }
    .notify {
        position: relative;
        z-index: 1000;
        width: 330px; 
        margin-top: 15px;
        padding: 14px 26px 14px 13px;
        background-color: #fff;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.22);
        box-sizing: border-box;
    }
    .notify.right {
        left: -340px;
    }
    .notify.left {
        left: 10px;
    }
    .n-title {
        padding-left: 10px;
        font-weight: 700;
        font-size: 16px;
        color: #303133;
        margin: 0;
    }
    .n-content {
        margin-top: 6px;
        margin-left: 10px;
        color: #606266;
    }
    .n-close-btn {
        position: absolute;
        top: 10px;
        right: 21px;
        cursor: pointer;
        color: #909399;
        font-size: 16px;
        font-weight: 200;
    }
    /* .n-close-btn:before{
        content: "&times;";
        } */
</style>