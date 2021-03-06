<template>
  <select class="form-control" :vlaue="value" :name="name">
    <slot></slot>
  </select>
</template>
<script>
  import "./../assets/css/select2.min.css";
  import "./../assets/js/select2.min.js";
  export default {
    name: "HtSelect",
    props: {
      options: {
        type: Object,
        default: function () {
          //NOTE:在prop设置默认值为对象时,需用方法返回值(不能直接设置值)
          return {
            tags: false,
            minimumResultsForSearch: -1
          };
        }
      },
      value: String,
      search: {
        type: Boolean,
        default: false
      },
      name: String
    },
    data: function () {
      return {
        currentSlot: []
      };
    },
    methods: {
      //马少博 2018年4月11日10:18:37
      //NOTE 此处添加延时执行,是因为slot无法立即添加到DOM结构中时无法进行值绑定,只能通过延时执行等待slot内容传入后进行绑定
      //NOTE 此处如果options异步请求时间过长,会存在无法绑定select2的情况,所以在有异步获取option列表时,利用ref="sltName"  this.$refs.sltName.bindSelect()方法进行重新绑定(暂时解决办法不影响使用,后期优化)
      bindSelect() {
        var _self = this;
        this.options.minimumResultsForSearch = this.search ? 0 : -1;
        this.options.width = this.options.width || "100%"; //此处设置默认为100%的宽度
        setTimeout(() => {
          $(this.$el)
            .select2(this.options)
            .val(this.value)
            .trigger("change")
            .on("change", function () {
              _self.$emit("input", this.value);
            });
        }, 0);
      },
      /**
       * 判断当前slot中的option是否改变(用于ajax获取下拉列表的情况) 
       * @returns T/F NOTE: true代表options有变化,需要重新绑定,false代表无变化
       */
      testSlotChange() {
        // NOTE 解决异步请求时无法触发重新绑定的问题 2018年7月9日14:12:24
        let len = this.currentSlot.length;
        let slotDefault = this.$slots.default;
        if (len != slotDefault.length) {
          return true;
        } else {
          let sum = 0;
          for (let index = 0; index < len; index++) {
            let item1 = this.currentSlot[index] && this.currentSlot[index].elm;
            let item2 = slotDefault[index] && slotDefault[index].elm;
            !item1.isEqualNode(item2) && sum++;
          }
          return sum != 0;
        }
      }
    },

    watch: {
      value: function (value) {
        // 更新值
        $(this.$el)
          .val(value);
        this.bindSelect();
      },
      options: function (options) {
        // 更新设置
        $(this.$el).select2(options);
      }
    },
    destroyed: function () {
      //删除配置
      $(this.$el).off().select2("destroy");
    },
    updated: function () {
      //检测slot是否有变化
      if (this.testSlotChange()) {
        this.currentSlot = this.$slots.default;
        this.$nextTick(function () {
          this.bindSelect();
        });
      }
    }
  };
</script>
<style>
  /*修改select2控件默认样式*/

  .select2-container--default .select2-selection--multiple {
    border: 1px solid #ccc;
  }

  .select2-container--default .select2-selection--single {
    border: 1px solid #ccc;
  }

  .select2-container--default.select2-container--focus .select2-selection--multiple {
    border-color: #f5c4f7;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }

  .select2-container--default.select2-container--focus .select2-selection--single {
    border-color: #e97566;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }

  .select2-container .select2-selection--single .select2-selection__rendered {
    padding-left: 12px;
  }

  .select2-container .select2-selection--single {
    padding-top: 3px;
    height: 34px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    -moz-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .select2-container--default .select2-selection--single .select2-selection__arrow {
    top: 4px;
  }

  .select2-dropdown {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }

  .select2-container .select2-selection--single {
    padding-top: 0;
  }

  .has-error .select2-container--default .select2-selection--single {
    border-color: #a94442;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  }

  .has-error .select2-container--default.select2-container--focus .select2-selection--single {
    border-color: #843534;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  }

  .has-error .select2-dropdown {
    border-color: #843534;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  }
</style>