//日期组件
<template>
   
    <div class="time">
          <span class="select-box-title">选择发送时间：</span>
          <input class="form-control select-box-input"  v-model="time" type="text"
                   id="messageSendTime">
        </div>
  </div>
</template>
<script>
    import './../assets/js/datetimepicker/bootstrap-datetimepicker.min.js';
    import './../assets/js/datetimepicker/bootstrap-datetimepicker.zh-CN';
    export default {
       
        name: "HtDate",
        props: {  
        //对外获取的数据
        },
        data: function() {
        //组件内数据部分
        return {  
            time:''
        }
        },
        mounted: function() {  
        //组件生成时调用
        this.dateDefind();
        },
        methods:{
            dateDefind () {
        var d, s;
        var self = this;
        d = new Date();
        s = d.getFullYear() + "-";             //取年份
        s = s + (d.getMonth() + 1) + "-";//取月份
        s += d.getDate() + " ";         //取日期
        s += d.getHours() + ":";       //取小时
        s += d.getMinutes() + ":";    //取分
        s += d.getSeconds();         //取秒
        self.time = s;
        //初始化
        $('#messageSendTime').datetimepicker({
          startDate: s,
          minView: "hour", //选择日期后，不会再跳转去选择时分秒
          language: 'zh-CN',
          format: 'yyyy-mm-dd hh:ii:ss',
          todayBtn: 1,
          autoclose: 1
        });
        //当选择器隐藏时，讲选择框只赋值给data里面的time
        $('#messageSendTime').datetimepicker()
          .on('hide', function (ev) {
            var value = $("#messageSendTime").val();
            self.time = value;
          });
      }
        } 
    }
</script>
<style> 
    @import './../assets/js/datetimepicker/bootstrap-datetimepicker.min.css';
</style>