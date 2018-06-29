<template>
  <div role="tabpanel" 
  class="tab-pane" 
  :class="{
          'active':title==activeTabTitile
          }">
          
    <slot></slot>
    
  </div>
</template>
<script>
  // 标签页
  export default {
    name: "HtTab",
    props: {
      //对外获取的数据
      title: ""
    },
    data: function() {
      return {
        activeTabTitile: ""
      };
    },
    mounted: function() {
      let self = this;
      self.$on("getSelfIndex", index => {
        self.selfIndex = index;
      });
      self.$on("changeActiveTab", title => {
        self.activeTabTitile = title;
      });
    },
    watch: {
      activeTabTitile() {
        let self = this;
        if (self.activeTabTitile == self.title) {
          self.$emit("show");
        }
      }
    }
  };
</script>
<style scoped>

</style>