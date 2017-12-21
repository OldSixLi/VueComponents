<template>
  <div class="form-group" :class="{'has-error':validateError}">
    <template v-if="!isHorizontal">
      <label class="control-label text-left" :for="name">{{label}}</label>
      <p :data-a="isHorizontal">
        <slot></slot>
      </p>
      <transition name="errorinfo">
        <span class="help-block" v-if="!isHorizontal">{{errorMessage}}</span>
      </transition>
    </template>
    <template v-if="isHorizontal">
      <label class="control-label text-right" :for="name" :style="{'width':labelWidth+'%'}" v-if="isHorizontal">{{label}}</label>
      <div class="control-block" :style="{'width':(99-labelWidth)+'%'}" v-if="isHorizontal">
        <p :data-a="isHorizontal">
          <slot></slot>
        </p>
        <transition name="errorinfo" mode="">
          <span class="help-block" v-show="validateError">{{errorMessage}}</span>
        </transition>
      </div>
    </template>
  </div>
</template>
<script>
import Emitter from "./../mixins/emitter.js";
export default {
  name: "HtFormGroup",
  mixins: [Emitter],
  props: {
    //对外获取的数据
    label: String,
    labelWidth: String,
    name: {
      type: String,
      required: true
    }, //字段name值
    isCheck: {
      //是否进行检查
      type: Boolean,
      default: false
    },
    // 是否存在错误
    // 错误信息
    errorMessages: {
      type: String,
      default: "您的输入有误,请修改"
    },
    min: String,
    max: String,
    maxlength: String,
    minlength: String,
    require: Boolean, //TODO 改进为字符串
    pattern: String,
    //相关错误提示
    requireMessage: String,
    patternMessage: String,
    minMessage: String,
    maxMessage: String,
    maxlengthMessage: String,
    minlengthMessage: String
  },
  data: function() {
    return {
      validateError: false,
      errorMessage: this.errorMessages,
      errorMessageList: [],
      isHorizontal: false,
      inputType: ""
    };
  },
  mounted: function() {
    //TODO  在此处就应该校验用户输入的规则
    //NOTE  特殊长度字符等相当于默认填写内容  需用到requireMessage进行显示

    //从父组件获取值horizontal,从而判断isHorizontal
    this.isHorizontal = this.$parent.$options.propsData["horizontal"];
    this.$on("validate", function(infoType) {
      // console.log("表单[" + this.name + "]进行验证↓↓↓↓↓");
      this.validate(infoType);
    });
    this.$on("clearValidate", function() {
      this.clearValidate();
    });
  },
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    //清除校验状态
    clearValidate: function() {
      var _self = this;
      _self.validateError = false;
    },
    /**
             * 根据NAME获取当前组件内input的值(严格来说这个模式并不严谨,适应性不是很强,但目前想不到其他好的办法)
             * NOTE 后期如果项目需要,则引入sync特性,但是现在添加会增加组件使用的复杂度
             * @returns
             */
    getDomValue(name) {
      var _self = this;
      var $modelDom = $(_self.$el).find("[name='" + name + "']");
      var type = $modelDom.prop("type");
      _self.inputType = type;
      switch (type) {
        case "radio":
          return $(_self.$el)
            .find("[name='" + name + "']:checked")
            .val();
          break;
        case "checkbox":
          var item = [];
          $('[name="' + name + '"]').each(function() {
            if ($(this).is(":checked")) {
              item.push($(this).val());
            }
          });
          return item; //此处需要注意是返回带 , 的字符串还是返回数组
          break;
        default:
          return $.trim($modelDom.val());
          break;
      }
    },
    /**
             * 校验本字段
             * @returns
             */
    validate: function(infoType) {
      var _self = this;
      _self.validateError = false;
      _self.errorMessage = "";
      _self.errorMessageList = [];
      var value = _self.getDomValue(_self.name); //获取值
      console.log("[当前" + _self.name + "的值是]:" + value);
      //验证非空输入
      if (_self.require) {
        if (!value || value.length == 0) {
          _self.validateError = true;
          _self.errorMessageList.push(
            _self.requireMessage ? _self.requireMessage : "请输入内容"
          );
        }
      }
      //验证最小值
      if (_self.min) {
        if (!isNaN(_self.min)) {
          if (_self.inputType != "checkbox") {
            //如果不是checkbox类型
            if (!isNaN(value)) {
              if (Number(value) < Number(_self.min)) {
                _self.validateError = true;
                _self.errorMessage = _self.minMessage
                  ? _self.minMessage
                  : "输入的值不能小于" + _self.min;
                _self.errorMessageList.push(_self.errorMessage);
              }
            } else {
              _self.validateError = true;
              _self.errorMessageList.push("请输入数字");
            }
          } else {
            if (value == [] || value.length < Number(_self.min)) {
              _self.validateError = true;
              _self.errorMessage = _self.minMessage
                ? _self.minMessage
                : "请至少选择" + _self.min + "项";
              _self.errorMessageList.push(_self.errorMessage);
            }
          }
        } else {
          console.error("ERROR:[表单项目" + _self.name + "的min值需输入数字]");
          return false;
        }
      }
      //验证最大值
      if (_self.max) {
        if (!isNaN(_self.max)) {
          if (_self.inputType != "checkbox") {
            if (!isNaN(value)) {
              if (Number(value) > Number(_self.max)) {
                _self.validateError = true;
                _self.errorMessageList.push(
                  _self.maxMessage ? _self.maxMessage : "输入的值不能大于" + _self.max
                );
              }
            } else {
              _self.validateError = true;
              _self.errorMessageList.push("请输入数字");
            }
          } else {
            if (value == [] || value.length > Number(_self.max)) {
              _self.validateError = true;
              _self.errorMessage = _self.maxMessage
                ? _self.maxMessage
                : "最多选择" + _self.max + "项";
              _self.errorMessageList.push(_self.errorMessage);
            }
          }
        } else {
          console.error("ERROR:[表单项目" + _self.name + "的max值需输入数字]");
          return false;
        }
      }
      //验证长度
      if (_self.minlength) {
        if (!isNaN(_self.minlength)) {
          if (value.length < Number(_self.minlength)) {
            _self.validateError = true;
            _self.errorMessageList.push(
              _self.minlengthMessage ? _self.minlengthMessage : "输入长度小于最小值"
            );
          }
        } else {
          console.error("ERROR:[表单项目" + _self.name + "的minlength值需输入数字]");
          return false;
        }
      }
      //最大长度
      if (_self.maxlength) {
        if (!isNaN(_self.maxlength)) {
          if (value.length > Number(_self.maxlength)) {
            _self.validateError = true;
            _self.errorMessageList.push(
              _self.maxlengthMessage ? _self.maxlengthMessage : "输入长度大于最大值"
            );
          }
        } else {
          console.error("ERROR:[表单项目" + _self.name + "的maxlength值需输入数字]");
          return false;
        }
      }
      //正则表达式
      if (_self.pattern) {
        var reg = new RegExp(_self.pattern);
        if (!reg.test(value)) {
          _self.validateError = true;
          _self.errorMessageList.push(
            _self.patternMessage ? _self.patternMessage : "您输入的格式有误,请修改"
          );
        }
      }
      //处理错误
      _self.errorMessage = _self.errorMessageList[0] || "";
      var checkResultObj = {
        itemName: _self.name,
        hasError: _self.validateError,
        errorMessage: _self.errorMessage
      };
      var resultObj = {
        name: _self.name,
        value: value
      };
      //如果是提示的方式,那么就不再显示样式和其他错误信息
      if (infoType == "alert") {
        _self.errorMessage = "";
        _self.validateError = false;
      }
      //向父组件通知
      _self.dispatch("HtForm", "getresult", [checkResultObj, resultObj]);
    }
  }
};
</script>
<style scoped>
/* 完成状态 */
.errorinfo-enter-active,
.errorinfo-leave-active {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  opacity: 1;
  transition: all 0.5s ease;
}
/* 初始状态 */
.errorinfo-enter,
.errorinfo-leave-active {
  transform: translate3d(0, -50%, 0);
  -webkit-transform: translate3d(0, -50%, 0);
  opacity: 0;
}
.form-horizontal .control-label {
  display: inline-block;
  width: 25%;
  vertical-align: top;
  padding-top: 0;
}
.control-block {
  display: inline-block;
  width: 75%;
  padding: 0 15px;
}
.help-block {
  display: none;
  margin: 0;
}
.has-error .help-block,
.has-success .help-block {
  display: block;
}
.has-error .el-checkbox {
  color: #a94442;
}
p {
  margin-bottom: 0;
}
</style>