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
     .panel:hover{
        -webkit-box-shadow: 3px 3px 6px 1px rgba(0,0,0,0.2) ;
        box-shadow: 3px 3px 6px 1px rgba(0,0,0,0.2) ;
        -webkit-transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
        -moz-transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
        -o-transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
        transition: all 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 10ms;
        -webkit-transform:   translateY(-5px) ;
        transform:   translateY(-5px) ;
     }
     .panel-heading {
         font-weight: bold;
     }
     .panel-body:empty {
         padding: 0;
     }
</style>