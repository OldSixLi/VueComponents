// 说明:HtTable组件下子组件:column,父组件必须是HtTable,使用时需使用slot
// 时间:2017年11月6日09:38:08 

<template>
  <span style="display: none;"></span>
</template>
<script>
export default {
  name: "Column",
  props: {
    dataKey: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    align: {
      type: String,
      default: "left"
    },
    filter: [String, Array],
    style: String,
    width: String,
    action: [String, Array, Object]
  },
  data: function() {
    return {};
  },
  mounted: function() {
    // 把{key:1}变成object
    // console.log("↓↓↓↓↓↓↓↓↓↓↓↓cloumn的值是↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    // console.log(this);
    // console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    var filter = this.filter;
    if (filter && !$.isPlainObject(filter)) {
      this.filter = this.parseText(filter);
    }
    var action = this.action;
    if (action && !$.isPlainObject(action)) {
      this.action = this.parseText(action);
      if ($.isPlainObject(this.action)) {
        this.action = [this.action];
      }
    }
  },
  methods: {}
};
</script>
<style scoped>

</style>