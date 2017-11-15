<template>
    <div class="form-group" :class="{'has-error':validateError}">
        <!-- 普通样式 -->
        <label class="control-label text-left" :for="name" v-if="!isHorizontal">
                {{label}}
        </label>
        <slot v-if="!isHorizontal"></slot>
        <span class="help-block" v-if="!isHorizontal">{{errorMessage}}</span>
        <!-- 横向布局样式 -->
        <label class="control-label text-right" :for="name" :style="{'width':labelWidth+'%'}" v-if="isHorizontal">
            {{label}}
        </label>
        <div class="control-block" :style="{'width':(99-labelWidth)+'%'}" v-if="isHorizontal">
            <slot></slot>
            <span class="help-block">{{errorMessage}}</span>
        </div>
        <!-- TODO 支持inline样式 -->
    </div>
</template>
<script>
    export default {
        name: "HtFormGroup",
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
            }
        },
        mounted: function() {
            //TODO  在此处就应该校验用户输入的规则
            //NOTE  特殊长度字符等相当于默认填写内容  需用到requireMessage进行显示
            
            //从父组件获取值horizontal,从而判断isHorizontal
            this.isHorizontal=this.$parent.$options.propsData["horizontal"];
            this.$on('validate', function(infoType) {
                // console.log("表单[" + this.name + "]进行验证↓↓↓↓↓");
                this.validate(infoType);
            });
            this.$on('clearValidate', function() {
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
            clearValidate: function() {
                var _self = this;
                _self.validateError = false;
            },
            validate: function(infoType) {
                var _self = this;
                _self.validateError = false;
                _self.errorMessage = "";
                _self.errorMessageList = [];
                var value = $.trim($(_self.$el).find("[name='" + _self.name + "']").val()); //获取值
                // console.log('[当前' + _self.name + '的值是]:' + value);
                if (_self.require) {
                    if (!value) {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.requireMessage ? _self.requireMessage : "请输入内容");
                        // return false;
                    }
                }
                //NOTE 校验需要进行各种情况仔细判断
                if (_self.min) {
                    if (value) {
                        if (!isNaN(_self.min)) {
                            if (!isNaN(value)) {
                                if (Number(value) < Number(_self.min)) {
                                    _self.validateError = true;
                                    _self.errorMessage = _self.minMessage ? _self.minMessage : "输入的值不能小于" + _self.min;
                                    return false;
                                }
                            } else {
                                _self.validateError = true;
                                _self.errorMessageList.push("请输入数字");
                                // return false;
                            }
                        } else {
                            console.error('ERROR:[表单项目' + _self.name + '的min值需输入数字]');
                            return false;
                        }
                    } else {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.requireMessage ? _self.requireMessage : "请输入内容");
                        // return false;
                    }
                }
                if (_self.max) {
                    if (Number(value) > Number(_self.max)) {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.maxMessage ? _self.maxMessage : "输入的值不能大于" + _self.max);
                        // return false;
                    }
                }
                if (_self.minlength) {
                    if (value.length < Number(_self.minlength)) {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.minlengthMessage ? _self.minlengthMessage : "输入长度小于最小值");
                        // return false;
                    }
                }
                if (_self.maxlength) {
                    if (value.length > Number(_self.maxlength)) {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.maxlengthMessage ? _self.maxlengthMessage : "输入长度大于最大值");
                        // return false;
                    }
                }
                if (_self.pattern) {
                    var reg = new RegExp(_self.pattern)
                    if (!(reg.test(value))) {
                        _self.validateError = true;
                        _self.errorMessageList.push(_self.patternMessage ? _self.patternMessage : "您输入的格式有误,请修改");
                        // return false;
                    }
                }
                _self.errorMessage = _self.errorMessageList[0] || "";
                var checkResultObj = {
                    itemName: _self.name,
                    hasError: _self.validateError,
                    errorMessage: _self.errorMessage
                }
                //如果是提示的方式,那么就不再显示样式和其他错误信息
                if (infoType == "alert") {
                    _self.errorMessage = "";
                    _self.validateError = false;
                }
                _self.dispatch('HtForm', 'getresult', checkResultObj);
            }
        }
    }
</script>
<style scoped> 
   .form-horizontal .control-label {
        display: inline-block;
        /* line-height: 30px; */
        width: 25%;
        vertical-align: top;
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
</style>