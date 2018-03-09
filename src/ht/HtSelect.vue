<template>
  <select class="form-control">
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
      default: function() {
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
    }
  },
  mounted: function() {
    var _self = this; 
    this.options.minimumResultsForSearch = this.search ? 0 : -1;
    this.options.width =this.options.width|| "100%";//此处设置默认为100%的宽度
    $(this.$el)
      .select2(this.options)
      .val(this.value)
      .trigger("change")
      .on("change", function() {
        _self.$emit("input", this.value);
      });
  },
  watch: {
    value: function(value) {
      // 更新值
      $(this.$el)
        .val(value)
        .trigger("change");
    },
    options: function(options) {
      // 更新设置
      $(this.$el).select2(options);
    }
  },
  destroyed: function() {
    //删除配置
    $(this.$el)
      .off()
      .select2("destroy");
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

.select2-container--default.select2-container--focus
  .select2-selection--multiple {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.select2-container--default.select2-container--focus
  .select2-selection--single {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.select2-container .select2-selection--single .select2-selection__rendered {
  padding-left: 12px;
}

.select2-container .select2-selection--single {
  padding-top: 3px;
  height: 34px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  top: 4px;
}

.select2-dropdown {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
.select2-container .select2-selection--single {
  padding-top: 0;
}
.has-error .select2-container--default .select2-selection--single {
  border-color: #a94442;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.has-error
  .select2-container--default.select2-container--focus
  .select2-selection--single {
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