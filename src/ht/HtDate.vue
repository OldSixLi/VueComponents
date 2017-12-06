//日期组件
<template>
    <div class="input-group date form_date" data-date="" data-link-field="dtp_input2" ref="dateInput" :dataMin="min" :dataMax="max">
        <input class="form-control settime-input" type="text" v-bind:value="setTime" readonly >
        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
    </div>
</template>
<script>
    import './../assets/js/datetimepicker/bootstrap-datetimepicker.min.js';
    import './../assets/js/datetimepicker/bootstrap-datetimepicker.zh-CN';
    export default {
        name: "HtDate",
        props: {
            //对外获取的数据
            value: String,
            option:Object,
            minDate:String,
            maxDate:String 
        },
        data: function() {
            //组件内数据部分
            return {
                setTime: this.value
            }
        },
        mounted: function() {
            //组件生成时调用
            this.dateDefind();
        },
        methods: {
            dateDefind() {
                var _self = this;
                var options=_self.option||{
                        language: 'zh-CN',
                        format: 'yyyy-mm-dd',
                        minView: 2,
                        weekStart: 1,
                        autoclose: true,
                        pickerPosition: "bottom-left" 
                }
                $(_self.$refs.dateInput).datetimepicker(options);
                //如果输入的值合法,则设置起始时间
                if(_self.minDate&&new Date(_self.minDate)!='Invalid Date'&&isNaN(_self.minDate)){
                   $(_self.$refs.dateInput).datetimepicker("setStartDate", _self.minDate);
                    
                }
                if(_self.maxDate&&new Date(_self.maxDate)!='Invalid Date'&&isNaN(_self.maxDate)){
                    $(_self.$refs.dateInput).datetimepicker("setEndDate", _self.maxDate);
                }

                //先移除事件  在重新注册事件,否则会涉及到事件的多次注册
                $(_self.$refs.dateInput).datetimepicker().unbind('hide');
                //选择完毕后通知父组件
                $(_self.$refs.dateInput).datetimepicker()    
                .on('hide', function(e) {
                    _self.setTime = $(e.target).find('.settime-input').val();
                    _self.$emit('input', $(e.target).find('.settime-input').val());
                    _self.$emit('select', $(e.target).find('.settime-input').val());
                });
            },
        },
        computed:{
            min:function(){
                this.dateDefind();
                if(new Date(this.setTime)<new Date(this.minDate)){
                    this.setTime=this.minDate;
                    this.$emit('input',this.minDate);
                }
                return this.minDate;
            },
            max:function(){
                this.dateDefind();
                if(new Date(this.setTime)>new Date(this.maxDate)){
                    this.setTime=this.maxDate;
                    this.$emit('input',this.maxDate);
                }
                return this.maxDate;
            }
        }

    }
</script>
<style scoped>
     @import './../assets/js/datetimepicker/bootstrap-datetimepicker.min.css';
</style>