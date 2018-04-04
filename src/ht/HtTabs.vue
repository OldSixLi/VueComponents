<template>
  <div> 
    <ul class="nav nav-tabs" role="tablist"> 
      <li 
        role="presentation" 
        v-for="(x,$index) in childArr" 
        :class="{'active':x.title==currentActiveTabTitle}" 
        @click="changeIndex(x.title)">
          <a class="pointer" role="tab" data-toggle="tab" v-html="x.title">
            
          </a>
      </li>
    </ul>
    <!-- 展示的详细内容 -->
    <div class="tab-content">
      <slot></slot> 
    </div> 
  </div>
</template>
<script> 
import Emitter from "./../mixins/emitter";
export default {
  name: "HtTabs",
   mixins: [Emitter],
  props: {
    active:String
  },
  data: function() {
    return {
      currentActiveTabTitle: this.active,
      childArr: []
    };
  },
  mounted() {
    log(54456456)
    log(this)
    let self = this; 
    let child_length = 0;
    self.$children.forEach(child => { 
      if (child.$options.name&& child.$options.name=== "HtTab") {
        //如果没有指定激活的模块 默认设置第一个组件显示
        if(!self.currentActiveTabTitle && child_length==0){
        self.currentActiveTabTitle=child.$options.propsData.title;
        }
        self.childArr.push(child.$options.propsData);
        child_length++;
      }
      self.broadcast("HtTab", "changeActiveTab", self.currentActiveTabTitle);
    });
  },
  methods: { 
    changeIndex(title) {
      this.broadcast("HtTab", "changeActiveTab", title);
      this.changeActiveTab = title;
    }
  }
};
</script>
<style scoped>
.pointer{
  cursor: pointer;
}
</style>