//说明:Radio组件
//时间:2017年11月15日10:01:11

<template>
  <label class="el-radio">
    <span class="el-radio__input" :class="{
          'is-disabled': isDisabled,
          'is-checked': model === label,
          'is-focus': focus
        }">
      <span class="el-radio__inner"></span>
      <input class="el-radio__original" :value="label" type="radio" v-model="model" @focus="focus = true" @blur="focus = false" @click="click()" @change="change()" :name="name" :disabled="isDisabled">
    </span>
    <span class="el-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}
      </template>
    </span>
  </label>
</template>
<script>
import Emitter from "./../mixins/emitter.js";
export default {
  name: "HtRadio",
  props: {
    //对外获取的数据
    value: {},
    label: {},
    disabled: Boolean,
    name: String
  },
  mixins: [Emitter],
  data: function() {
    //组件内数据部分
    return {
      focus: false
    };
  },
  mounted: function() {
    //组件生成时调用
  },
  methods: {
    //当下点击
    click: function click() {
      this.$emit("click");
    },
    change: function change() {
      this.$emit("change");
    }
  },
  computed: {
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get: function get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.dispatch("ElRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      }
    },
    isDisabled: function isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled
        : this.disabled;
    }
  },
  watch: {
    label: function label(val) {
      alert("23131");
    }
  }
};
</script>
<style scoped>
.el-radio {
  -webkit-user-select: none;
  -ms-user-select: none;
}
.el-radio {
  color: #1f2d3d;
  cursor: pointer;
  white-space: nowrap;
  -moz-user-select: none;
}
.el-radio + .el-radio {
  margin-left: 15px;
}
.el-radio {
  position: relative;
  display: inline-block;
}
.el-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
}
.el-radio-button__inner,
.el-radio-group,
.el-radio__input {
  line-height: 1;
  vertical-align: middle;
}
.el-radio,
.el-radio__inner,
.el-radio__input {
  position: relative;
  display: inline-block;
}
.el-radio__inner {
  border: 1px solid #bfcbd9;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;
}
.el-radio__inner,
.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #fff;
}
.el-radio__inner::after {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}
.el-radio__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.el-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
}
.el-radio__label {
  font-size: 14px;
  padding-left: 5px;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #20a0ff;
  background: #20a0ff;
}
.el-radio__input.is-checked .el-radio__inner::after {
  -ms-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
}
</style>