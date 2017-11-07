// 说明:分页组件
// 时间:2017年11月7日11:30:40

<template>
<p style="margin:15px 0;width:100%;" class="text-right">
  <nav aria-label="Page navigation" :data-option="lists" class="page-nav">
    <ul class="pagination">
      <li v-if="currentPage!=1" @click="currentPage--;pageClick()">
        <a href="javascript:;" aria-label="Previous" :title="'上一页:第'+(currentPage-1)+'页'">
          <span aria-hidden="true">{{prevText}}</span>
        </a>
      </li>
      <!-- 额外添加首页和省略号 -->
      <li @click="currentPage=1;pageClick()" v-if="(pageList[0]-1)>0"><a href="javascript:;" title="第1页">1</a></li>
      <li @click="currentPage=2;pageClick()" v-if="(pageList[0]-1)==2"><a href="javascript:;" title="第2页">2</a></li>
      <li  v-if="(pageList[0]-1)>2"><a href="javascript:;">...</a></li>
      <!-- END:额外添加首页和省略号 -->

      <li v-for="(x,index) in pageList" :key="index" :class="{'active':x==currentPage}" @click="currentPage=x;pageClick()">
        <a href="javascript:;" :title="'第'+x+'页'">{{x}}</a>
      </li>

      <!-- 额外添加尾页和省略号 -->
      <li  v-if="(totalPage-pageList[pageList.length-1])>2">
        <a href="javascript:;">...</a>
      </li>
      <li @click="currentPage=totalPage-1;pageClick()" v-if="(totalPage-pageList[pageList.length-1])==2">
        <a href="javascript:;" :title="'第'+(totalPage-1)+'页'">{{totalPage-1}}</a>
      </li>
      <li @click="currentPage=totalPage;pageClick()" v-if="(totalPage-pageList[pageList.length-1])>0">
        <a href="javascript:;" :title="'第'+totalPage+'页'">{{totalPage}}</a>
      </li>
      <!-- END:额外添加尾页和省略号 -->
      
      <li v-if="currentPage<totalPage" @click="currentPage++;pageClick()">
        <a href="javascript:;" aria-label="Next" :title="'下一页:第'+(currentPage+1)+'页'">
          <span aria-hidden="true">{{nextText}}</span>
        </a>
      </li> 
    </ul>
  </nav>

  <input v-if="showSkip" type="text" class="form-control page-input" style="width:50px;" v-model="PageNum" placeholder="页码">
  <button v-if="showSkip" type="button" @click="toPage(PageNum)" class="btn btn-primary btn-skip">跳转</button>
  </p>
</template>
<script>
  export default {
    name: "HtPage",
    props: {
      //对外获取的数据
      param: {
        type: Object,
        default:{
        }
      }
    },
    data: function() {
      //组件内数据部分
      return {
        PageNum:"",
        currentPage: this.param.currentPage || 1,
        totalPage: this.param.totalPage || 0,
        showItem: this.param.showItem || 9,
        clickFun: this.param.click || function() {},
        prevText:this.param.prevText||"«",
        nextText:this.param.nextText||"»",
        //是否显示跳页按钮
        showSkip:this.param.showSkip==undefined?true:this.param.showSkip
        // pageList:[]//列表数据项
      }
    },
    mounted: function() {
    },
    computed: {
      lists:function(){
        this.currentPage=this.param.currentPage;
        this.totalPage= this.param.totalPage || 0;
        this.showItem= this.param.showItem || 9;
        this.clickFun= this.param.click || function() {};
        this.prevText=this.param.prevText||"«";
        this.nextText=this.param.nextText||"»";
      },
      pageList: function() {
        var _self = this; 
        var pageList = [];  

        if (_self.currentPage > _self.totalPage) {
          _self.currentPage = _self.totalPage;
        }
        if (_self.totalPage <= _self.showItem) {
          //如果总页数小于显示条数
          for (var index = 1; index <= _self.totalPage; index++) {
            pageList.push(index);
          }
        } else {
          //总页数大于显示条数
          if (_self.currentPage <= Math.ceil(_self.showItem / 2)) {
            for (var index = 1; index <= _self.showItem; index++) {
              pageList.push(index);
            }
          }
          if (_self.currentPage > Math.ceil(_self.showItem / 2)) {
            if ((_self.totalPage - _self.currentPage) >= Math.floor(_self.showItem / 2)) {
              for (
                //NOTE 此处一个为floor,一个为ceil 是为了控制showItem 奇偶数的问题
                var index = _self.currentPage - Math.floor(_self.showItem / 2); index < _self.currentPage + Math.ceil(_self.showItem / 2); index++) {
                pageList.push(index);
              }
            } else {
              for (
                var index = _self.totalPage - _self.showItem + 1; index <= _self.totalPage; index++) {
                pageList.push(index);
              }
            }
          }
        } 
        return pageList;
      }
    },
    watch: {
      param:function(){
        this.currentPage=this.param.currentPage;
      }
    },
    methods: {
      toPage: function(index) {
        //组件内部实现跳转到某页码的方法 
        if(!isNaN(index)&&(index-0)!=this.currentPage) {
          index= index==0?1:index;
          this.currentPage=(index-0)>this.totalPage?this.totalPage:(index-0);
          this.PageNum=(index-0)>this.totalPage?this.totalPage:(index-0);
          this.clickFun(this.currentPage);
        }else{
          this.PageNum="";
        }
      },
      pageClick:function(){
        this.clickFun(this.currentPage);
      } 
    }
  }
</script>
<style scoped>
   .page-nav{
     display: inline-block; 
     
   }
   .page-nav>ul{
      margin: 0;
   }
   .page-input{
      display: inline-block;
      margin-left: 15px;
      padding: 6px 6px;
      vertical-align: top;
   }
   .btn-skip{
      vertical-align: top;
   }
</style>