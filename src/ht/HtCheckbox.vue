//多选框插件 //时间: 2017年11月15日10:21:08
<template>
  <label class="el-checkbox">
    <span class="el-checkbox__input" :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }">
      <!-- 隐藏原来的原生checkbox，更改样式 -->
      <span class="el-checkbox__inner"></span>
      <!-- 有true-label时，显示此插件 -->
      <input v-if="trueLabel || falseLabel" class="el-checkbox__original" type="checkbox" :name="name" :disabled="disabled" :true-value="trueLabel" :false-value="falseLabel" v-model="model" @change="handleChange" @focus="focus = true" @blur="focus = false">
      <input v-else class="el-checkbox__original" type="checkbox" :disabled="disabled" :value="label" :name="name" v-model="model" @change="handleChange" @focus="focus = true" @blur="focus = false">
    </span>
    <span class="el-checkbox__label" v-if="($slots.default || label)&&labelShow">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
</span>
</label>
</template>
<script>
  export default {
    name: "HtCheckbox",
    props: {
      //对外获取的数据
      value: {},
      label: {},
      labelShow: {
        type: Boolean,
        default: true
      },
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number]
    },
    data: function() {
      //组件内数据部分
      return {
        selfModel: false,
        focus: false
      };
    },
    mounted: function() {
      //组件生成时调用
    },
    methods: {
      addToStore() {
        if (
          //判断当前的模型是否为数组，并且
          Array.isArray(this.model) &&
          this.model.indexOf(this.label) === -1
        ) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },
      handleChange(ev) {
        this.$emit("change", ev);
        if (this.isGroup) {
          this.$nextTick(_ => {
            this.dispatch("ElCheckboxGroup", "change", [
              this._checkboxGroup.value
            ]);
          });
        }
      }
    },
    computed: {
      model: {
        get() {
          return this.isGroup ?
            this.store :
            this.value !== undefined ? this.value : this.selfModel;
        },
        set(val) {
          if (this.isGroup) {
            let isLimitExceeded = false;
            this._checkboxGroup.min !== undefined &&
              val.length < this._checkboxGroup.min &&
              (isLimitExceeded = true);

            this._checkboxGroup.max !== undefined &&
              val.length > this._checkboxGroup.max &&
              (isLimitExceeded = true);

            isLimitExceeded === false &&
              this.dispatch("ElCheckboxGroup", "input", [val]);
          } else if (this.value !== undefined) {
            this.$emit("input", val);
          } else {
            this.selfModel = val;
          }
        }
      },

      isChecked() {
        if ({}.toString.call(this.model) === "[object Boolean]") {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },

      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== "ElCheckboxGroup") {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },

      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      }
    },
    created: function() {
      this.checked && this.addToStore();
    }
  };
</script>
<style scoped>
  .el-checkbox {
    margin-right: 15px;
  }
  
  .el-checkbox+.el-checkbox {
    /* margin-right: 15px; */
    margin-left: 0;
  }
</style>