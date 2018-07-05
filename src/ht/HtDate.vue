//日期组件
<template>
  <div class="input-group date form_date" data-date="" data-link-field="dtp_input2" ref="dateInput" style="width:100%;">
    <input class="form-control settime-input" type="text" v-bind:value="setTime" readonly :placeholder="placeholder" :disabled="isDisable"
      :class="{'disabled':isDisable}" :name="name" :id="id">
    <span class="input-group-addon">
      <span class="glyphicon glyphicon-calendar"></span>
    </span>
  </div>
</template>
<script>
  import "./../assets/js/datetimepicker/bootstrap-datetimepicker.min.js";
  import "./../assets/js/datetimepicker/bootstrap-datetimepicker.zh-CN";
  export default {
    name: "HtDate",
    props: {
      name: "",
      id: "",
      //对外获取的数据
      value: String,
      option: Object,
      minDate: String,
      maxDate: String,
      placeholder: String,
      disabled: [String, Boolean]
    },
    data: function () {
      //组件内数据部分
      return {
        setTime: this.value,
        isDisable: (this.disabled === "true" || this.disabled === "disabled" || this.disabled) || false,
        minDates: this.minDate
      };
    },
    mounted: function () {
      if (this.minDates === "today") {
        this.minDates = this.getNowFormatDate('date');
      }
      //组件生成时调用
      this.dateDefind();
    },
    methods: {
      /**
       * 获取当天日期
       * @param {规定只返回日期还是返回日期时间} dates
       * @returns {}
       */
      getNowFormatDate(dates) {
        var date = new Date(),
          seperator1 = "-",
          seperator2 = ":",
          month = date.getMonth() + 1,
          strDate = date.getDate();
        if (month >= 1 && month <= 9)
          month = "0" + month;
        if (strDate >= 0 && strDate <= 9)
          strDate = "0" + strDate;
        //返回当前的日期（时间）
        var currentdate = dates !== 'date' ? date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +
          date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds() : date.getFullYear() +
          seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      /**
       * 声明 
       * @returns 
       */
      dateDefind() {
        var _self = this;
        if (!_self.isDisable) {
          var options = _self.option || {
            language: "zh-CN",
            format: "yyyy-mm-dd",
            minView: 2,
            weekStart: 1,
            autoclose: true,
            pickerPosition: "bottom-left"
          };

          $(_self.$refs.dateInput).datetimepicker(options);

          //如果输入的值合法,则设置起始时间
          if (
            _self.minDates &&
            new Date(_self.minDates) != "Invalid Date" &&
            isNaN(_self.minDates)
          ) {
            $(_self.$refs.dateInput).datetimepicker("setStartDate", _self.minDates);
          }
          if (
            _self.maxDate &&
            new Date(_self.maxDate) != "Invalid Date" &&
            isNaN(_self.maxDate)
          ) {
            $(_self.$refs.dateInput).datetimepicker("setEndDate", _self.maxDate);
          }

          //先移除事件  在重新注册事件,否则会涉及到事件的多次注册
          $(_self.$refs.dateInput)
            .datetimepicker()
            .unbind("hide");
          //选择完毕后通知父组件
          $(_self.$refs.dateInput)
            .datetimepicker()
            .on("hide", function (e) {
              _self.setTime = $(e.target)
                .find(".settime-input")
                .val();
              _self.$emit(
                "input",
                _self.setTime
              );
              _self.$emit(
                "select",
                _self.setTime
              );
            });
        }
      }
    },
    watch: {
      minDate: function () {
        if (this.minDate === "today") {
          this.minDates = this.getNowFormatDate('date');
        }else{
          this.minDates =this.minDate;
        }
        
        if (new Date(this.setTime) < new Date(this.minDates)) {
          this.setTime = this.minDates;
          this.$emit("input", this.minDates);
        }
        
        this.dateDefind();
        return this.minDates;
      },
      maxDate: function () {
        this.dateDefind();
        if (new Date(this.setTime) > new Date(this.maxDate)) {
          this.setTime = this.maxDate;
          this.$emit("input", this.maxDate);
        }
        return this.maxDate;
      },
      value: function () {
        this.setTime = this.value;
      }
    }
  };
</script>
<style scoped>
  @import "./../assets/js/datetimepicker/bootstrap-datetimepicker.min.css";
  .input-group {
    width: 100%;
  }

  .form-control[readonly] {
    background-color: #fff;
    opacity: 1;
  }
</style>