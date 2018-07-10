<template>
    <form :class="{
                    'form-inline':inline,
                    'form-horizontal':horizontal
                    }">
      <slot></slot>
    </form>
  </template>
  <script>
    import Emitter from "./../mixins/emitter";
    export default {
      name: "HtForm",
      mixins: [Emitter],
        props: {
          infoType: {
            type: String,
            default: "info" // 提供 'info'/'alert'/'all'三种错误提示
          },
          inline: Boolean,
          horizontal: {
            type: Boolean,
            default: false
          },
          labelWidth: String
        },
        data: function () {
          //组件内数据部分
          return {
            checkResultList: [],
            errorMessageList: [],
            callbackFun: function () {},
            htFormItemLength: 0,
            ValidatedResult: {}
          };
        },
        mounted: function () {
          //组件生成时调用
          var _self = this;
          this.htFormItemLength = 0;
          this.$children.forEach(function (child) {
            child.$options._componentTag == "ht-form-group" && this.htFormItemLength++;
          }, this);
    
          _self.$on("getresult", function (errorResult, resultValueObj) {
            if (errorResult.hasError && errorResult.errorMessage) {
              // 判断返回的结果长度与子组件的长度是否相同
              this.errorMessageList.push(errorResult.errorMessage);
            }
            //赋值
            this.ValidatedResult[resultValueObj.name] = resultValueObj.value;
            //错误列表
            this.checkResultList.push(errorResult);
    
            if (this.checkResultList.length == this.htFormItemLength) {
              this.callbackFun(
                this.errorMessageList <= 0, //是否通过基础校验
                this.errorMessageList, //错误列表信息
                this.errorMessageList > 0 ? {} : this.ValidatedResult //成功后返回的信息||{}
              );
            }
          });
        },
        methods: {
          checkItem(callback) {
            //这个地方的声明必须在事件传播之前调用
            if (typeof callback == "function") {
              this.callbackFun = callback;
            }
            this.broadcast("HtFormGroup", "validate", this.infoType);
            this.checkResultList = [];
            this.errorMessageList = [];
          },
          //清除校验
          clearValidate: function () {
            this.broadcast("HtFormGroup", "clearValidate");
            this.checkResultList = [];
            this.errorMessageList = [];
          }
        }
      };
  </script> 