<template>
    <!-- 修复组件第二个slot不显示的问题 -->
    <div class="form-group" :class="{'has-error':validateError}" style="font-size:0;">
      <!--根据横向或者纵向显示class与style -->
      <label class="control-label form-group-label" :class="{
            'text-right':isHorizontal,
            'text-left':!isHorizontal
          }" :for="name" :style="{
            'width':isHorizontal?labelWidth+'%':'auto'
          }">
          {{label}}
        </label>
  
      <div :class="{
        'control-block':isHorizontal
      }" :style="{
        'width':(isHorizontal?(100-labelWidth):100)+'%'
      }">
        <!--传入的内容 -->
        <p :data-a="isHorizontal">
          <slot></slot>
        </p>
        <transition name="errorinfo">
          <span class="help-block" v-show="validateError">{{errorMessage}}</span>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
    // NOTE 之前的版本中,有两处<slot>,利用v-if进行判断.这种写法,在development环境下可以正常显示,但是在compress之后,在网页端打开,却无法显示v-else时的<slot> 内容.关于此现象的原因暂未找到,只能将模板代码更改为只使用一处<slot>来解决此问题.
    import Emitter from "./../mixins/emitter.js";
    export default {
      name: "HtFormGroup",
      mixins: [Emitter],
      props: {
        //对外获取的数据
        label: String,
        width: String,
        name: {
          type: String,
          required: true
        }, //字段name值
        isCheck: {
          //是否进行检查
          type: Boolean,
          default: false
        },
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
      data: function () {
        return {
          validateError: false,
          errorMessage: this.errorMessages,
          errorMessageList: [],
          isHorizontal: true,
          inputType: "",
          labelWidth: this.width
        };
      },
      mounted: function () {
        //TODO  在此处就应该校验用户输入的规则
        //NOTE  特殊长度字符等相当于默认填写内容  需用到requireMessage进行显示
  
        //从父组件获取值horizontal,从而判断isHorizontal
        this.isHorizontal = this.$parent.$options.propsData["horizontal"];
        //统一设置宽度
        this.labelWidth = this.width || this.$parent.$options.propsData["labelWidth"];
        this.$on("validate", function (infoType) {
          // console.log("表单[" + this.name + "]进行验证↓↓↓↓↓");
          this.validate(infoType);
        });
        this.$on("clearValidate", function () {
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
        clearValidate: function () {
          let _self = this;
          _self.validateError = false;
        },
        /**
         * 根据NAME获取当前组件内input的值(严格来说这个模式并不严谨,适应性不是很强,但目前想不到其他好的办法)
         * NOTE 后期如果项目需要,则引入sync特性,但是现在添加会增加组件使用的复杂度
         * @returns
         */
        getDomValue(name) {
          let _self = this;
          let $modelDom = $(_self.$el).find("[name='" + name + "']");
          let type = $modelDom.prop("type");
          _self.inputType = type;
          switch (type) {
            case "radio":
              return $(_self.$el)
                .find("[name='" + name + "']:checked")
                .val();
              break;
            case "checkbox":
              let item = [];
              $('[name="' + name + '"]').each(function () {
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
        validate: function (infoType) {
          let _self = this;
          _self.validateError = false;
          _self.errorMessage = "";
          _self.errorMessageList = [];
          //获取值
          let value = _self.getDomValue(_self.name);
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
                    //添加错误信息
                    _self.validateError = true;
                    _self.errorMessage =
                      _self.minMessage ?
                      _self.minMessage :
                      "输入的值不能小于" + _self.min;
                    _self.errorMessageList.push(_self.errorMessage);
                  }
                } else {
                  _self.validateError = true;
                  _self.errorMessageList.push("请输入数字");
                }
              } else {
                // 如果是checkbox类型
                if (value == [] || value.length < Number(_self.min)) {
                  _self.validateError = true;
                  _self.errorMessage =
                    _self.minMessage ?
                    _self.minMessage :
                    "请至少选择" + _self.min + "项";
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
                      _self.maxMessage ?
                      _self.maxMessage :
                      "输入的值不能大于" + _self.max
                    );
                  }
                } else {
                  _self.validateError = true;
                  _self.errorMessageList.push("请输入数字");
                }
              } else {
                if (value == [] || value.length > Number(_self.max)) {
                  _self.validateError = true;
                  _self.errorMessage = _self.maxMessage ?
                    _self.maxMessage :
                    "最多选择" + _self.max + "项";
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
                  _self.minlengthMessage ?
                  _self.minlengthMessage :
                  "输入长度小于最小值"
                );
              }
            } else {
              console.error(`ERROR:[表单项目${_self.name }的minlength值需输入数字]`);
              return false;
            }
          }
          //最大长度
          if (_self.maxlength) {
            if (!isNaN(_self.maxlength)) {
              if (value.length > Number(_self.maxlength)) {
                _self.validateError = true;
                _self.errorMessageList.push(
                  _self.maxlengthMessage ?
                  _self.maxlengthMessage :
                  "输入长度大于最大值"
                );
              }
            } else {
              console.error(
                `ERROR:[表单项目${_self.name }的maxlength值需输入数字]`
              );
              return false;
            }
          }
  
          //正则表达式
          if (_self.pattern) {
            let reg = new RegExp(_self.pattern);
            if (!reg.test(value)) {
              _self.validateError = true;
              _self.errorMessageList.push(
                _self.patternMessage ?
                _self.patternMessage :
                "您输入的格式有误,请修改"
              );
            }
          }
          //处理错误
          _self.errorMessage = _self.errorMessageList[0] || "";
          let checkResultObj = {
            itemName: _self.name,
            hasError: _self.validateError,
            errorMessage: _self.errorMessage
          };
          let resultObj = {
            name: _self.name,
            value: value
          };
          //如果是提示的方式,那么就不再显示样式和其他错误信息
          if (infoType == "alert") {
            _self.errorMessage = "";
            _self.validateError = false;
          }
          // TODO 添加禁用或者readonly时  不校验的功能
          //向父组件通知
          _self.dispatch("HtForm", "getresult", [checkResultObj, resultObj]);
        }
      }
    };
  </script>
  <style scoped>
    .form-group *{
      font-size: 14px;
    }
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
      font-size: 12px;
      margin: 0;
    }
  
    .has-error .help-block,
    .has-success .help-block {
      display: block;
    }
  
    .has-error .el-checkbox {
      color: #a94442;
    }
    .has-error .el-radio{
      color: #a94442;
    }
  
    p {
      margin-bottom: 0;
    }
  
    .form-group-label {
      font-size: 14px;
    }
  
    .form-horizontal .form-group-label {
      padding-top: 7px;
      /* vertical-align: baseline; */
    }
    .control-block .el-checkbox, .control-block .el-radio{
      margin-top: 7px;
    }
    
  </style>