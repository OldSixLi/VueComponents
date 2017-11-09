// 说明:Bootstrap panel面板组件
// 时间:2017年11月8日11:25:58 


<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            {{title}}
            <slot name="header"></slot>
        </div>
        <div class="panel-body">
            <slot></slot>
        </div>
        <slot name="outer"></slot>
        <div class="panel-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Panel",
        props: {
            title: String
        }
    }
</script>
<style scoped>
     .panel-footer:empty {
         border: none;
         padding: 0;
     }
     .panel {
         margin-top: 15px;
     }
     .panel-heading {
         font-weight: bold;
     }
     .panel-body:empty {
         padding: 0;
     }
</style>