<template>
  <div> 
    <ul class="nav nav-tabs" role="tablist"> 
      <li 
        role="presentation" 
        v-for="(x,$index) in childArr" 
        :class="{'active':x.title==currentActiveTabTitle}" 
        @click="changeIndex(x.title)">
          <a :href="'#'+x.name" role="tab" data-toggle="tab">
            {{x.title}}
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
function broadcast(componentName, eventName, params) {
  this.$children.forEach(function(child) {
    var name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  name: "HtTabs",
  props: {
    active:String
  },
  data: function() {
    return {
      currentActiveTabTitle: this.active,
      childArr: []
    };
  },
  mounted: function() {
    let self = this; 
    let child_length = 0;
    this.$children.forEach(child => {
      if (child.$options.name === "HtTab") {
        if(!self.currentActiveTabTitle&&child_length==0){
        self.currentActiveTabTitle=child.$options.propsData.title;
        }
        self.childArr.push(child.$options.propsData);
        child_length++;
      }
      this.broadcast("HtTab", "changeActiveTab", self.currentActiveTabTitle);
    });
  },
  methods: {
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    changeIndex(title) {
      this.broadcast("HtTab", "changeActiveTab", title);
      this.changeActiveTab = title;
    }
  }
};
</script>
<style scoped>

</style>