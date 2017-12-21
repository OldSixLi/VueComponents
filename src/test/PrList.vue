<template>
  <p :data-test="dataTest">
    <slot></slot>
    <span style="color:red;">
      <slot name="red"></slot>
    </span>
    <b v-for="x in errorList" v-if="errorList.length>0">
      {{x}}
    </b>
    <button type="button" class="btn btn-default" @click="check()">PrList验证Pr</button>
  </p>
</template>
<script>
// import Pr from './P.vue';

function broadcast(componentName, eventName, params) {
  this.$children.forEach(function(child) {
    console.log(child.$options);
    var name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  name: "PrList",
  props: {
    //对外获取的数据
  },
  data: function() {
    //组件内数据部分
    return {
      ruleArr: [],
      errorList: [],
      dataTest: ""
    };
  },
  mounted: function() {
    //组件生成时调用
    var _self = this;

    this.$on("valite", function() {
      _self.broadcast("Pr", "alerts");
    });
    console.log(_self);
    var ruleArr = [];

    //NOTE 以下写法获取到对象中所有的属性(也可以遍历propsData属性进行赋值操作)
    _self.$slots.default.forEach(function(child) {
      //声明校验对象的属性
      var ruleObj = {
        length: "",
        min: "",
        message: "",
        errors: "",
        hasError: ""
      };
      //遍历对象的属性
      for (var key in ruleObj) {
        if (
          ruleObj.hasOwnProperty(key) &&
          child.componentOptions &&
          child.componentOptions.propsData != undefined
        ) {
          var value = child.componentOptions.propsData[key];
          if (value && value != undefined && value != "") {
            ruleObj[key] = value;
          }
        }
      }
      _self.ruleArr.push(ruleObj);
    });
    //输出配置
    console.log(JSON.stringify(_self.ruleArr));
  },
  methods: {
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    check: function() {
      var _self = this;
      _self.broadcast("Pr", "alerts");
      var ruleList = _self.ruleArr;
      //此处难点在于如何一对一的配置相关的规则
      for (var index = 0; index < ruleList.length; index++) {
        var rule = ruleList[index];
        var element = _self.$slots.default[index].elm;
        // if(element.value){
        // alert(element.value)
        // }
        if (element && element.innerText) {
          if (rule.length < element.innerText.length) {
            // _self.errorList.push('字符串长度超出限制');
            // console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            // console.log(1);
            // console.log(_self.$slots.default[index].componentOptions.propsData);
            // console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            // _self.$slots.default[index].componentOptions.propsData["hasError"]=true;
            // _self.$slots.default[index].componentOptions.propsData["message"]="这个东西现在出错了";
          } else {
            // console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            // console.log(2);
            // console.log(_self.$slots.default[index].componentOptions.propsData);
            // console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            //  _self.$slots.default[index].componentOptions.propsData["hasError"]=false;
            // // _self.errorList.push("");
            // _self.dataTest=Math.random();
          }
        }
      }
    }
  }
};
</script>
<style scoped>

</style>