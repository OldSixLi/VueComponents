<template>
  <input :type="type" class="form-control" :value="currentValue" @input="handleChange" @blur="blurMoney" />
</template>
<script>
  function isValueNumber(value) {
    return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value);
  }

  function isMoney(value) {
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(
      value
    );
  }
  export default {
    name: "InputNum",
    props: {
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {
        type: [Number, String],
        default: ""
      },
      type: {
        type: String,
        default: "text"
      }
    },
    data: function () {
      // Vue组件是单向数据流，无法直接修改prop中的值
      var currentValue = "";
      if (this.value > this.max) {
        currentValue = this.max;
      } else if (this.value < this.min) {
        currentValue = this.min;
      } else {
        currentValue = this.value;
      }
      return {
        currentValue: currentValue
      };
    },
    methods: {
      handleChange: function (event) {
        var val = event.target.value.trim();
        if (val != "") {
          switch (this.type) {
            //正整数
            case "numbers":
              if (isValueNumber(val)) {
                var max = this.max;
                var min = this.min;
                val = Number(val);
                this.currentValue = val;
                if (val > max) this.currentValue = max;
                if (val < min) this.currentValue = min;
              } else {
                event.target.value = this.currentValue;
              }
              break;

            case "money":
              if (isMoney(val)) {
                var max = this.max;
                var min = this.min;
                val = Number(val);
                this.currentValue = val;
                if (val > max) this.currentValue = max;
                if (val < min) this.currentValue = min;
              } else {
                if (val.indexOf(".") != 0 && val.indexOf(".") == val.length - 1) {
                  //判断小数点的情况
                  this.currentValue = val;
                }
                if (val.length == 1) {
                  this.currentValue = event.target.value = "";
                } else {
                  event.target.value = this.currentValue;
                }
              }
              break;
            default:
              break;
          }
        } else {
          this.currentValue = event.target.value = "";
        }
      },
      // 处理失去焦点时最后一位为小数的情况
      blurMoney(event) {
        var val = event.target.value.trim();
        if (this.type == "money") {
          if (val.indexOf(".") != 0 && val.indexOf(".") == val.length - 1) {
            this.currentValue = event.target.value = val.slice(0, val.length - 1)
          }
        }
      }

    },
    watch: {
      currentValue: function (val) {
        this.$emit("input", val);
      },
      value() {
        this.currentValue = this.value;
      }
    }
  };
</script> 