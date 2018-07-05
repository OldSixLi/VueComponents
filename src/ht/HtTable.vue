// 说明:数据列表组件:HtTable // 时间:2017年11月6日09:34:48

<template>
  <div>
    <table class="table table-hover ht-table">
      <thead>
        <tr>
          <!-- 展示序列号 -->
          <th v-show="!!showindex">#</th>
          <th 
          v-for="(x,index) in rule" 
          :key="index" 
          :class="x.class" 
          :style="[{cursor:x.sort?'pointer':'default'},x.style]"
          :data-issort="x.sort" @click="dataSort(x)">
            {{x.name}}
            <span class="glyphicon glyphicon-resize-vertical" :class="x.sortObj.active?'blue':''" 
            v-if="x.sort&&x.sortObj.sortState==0" title="点击排序" ></span>
            <span class="glyphicon glyphicon-chevron-down" :class="x.sortObj.active?'blue':''" 
            v-if="x.sort&&x.sortObj.sortState==1" title="逆序" ></span>
            <span class="glyphicon glyphicon-chevron-up" :class="x.sortObj.active?'blue':''" 
            v-if="x.sort&&x.sortObj.sortState==2" title="正序" ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 搜索结果进行处理 -->
        <tr v-for="(x,index) in valuelist" v-show="!showLoading&&valuelist!=null&&valuelist.length>0">
          <td v-show="!!showindex">
            {{index+1}}
          </td>
          <td v-for="y in rule" 
          style="vertical-align: middle;" 
          :class="y.class" 
          :style="y.style"
          >
            <span v-html="renderHtml(y.filter,y.dataKey,x)"></span>
            <!-- v-tooltip.top="'向上提示'" -->
          </td>
        </tr>
        <!-- 当前搜索结果为空时，提示没有搜索结果 -->
        <tr v-show="!showLoading&&(valuelist==null||valuelist.length==0)">
          <td colspan="100">
            <h2 class="text-center" style="color:#a78989;">{{errorInfo}}</h2>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 加载动画区域 NOTE: 通过修改样式 .cssload-loader 相关参数可以更改动画-->
    <div v-show="showLoading" :style="{'height':loadingHeight+'px'}" class="relative">
      <loading></loading>
    </div>
    <!-- 分页控件模块 -->
    <ht-page :param="pageOption" class="pull-right"></ht-page>
    <!-- 搜索参数 -->
    <span class="hide">{{searchDatas}}</span>
  </div>
</template>

<script>
  export default {
    name: "HtTable",
    props: {
      ajaxurl: {
        required: true
      },
      searchData: {
        default: function() {
          return {
            currentPage: 1
          };
        }
      },
      showindex: {
        default: true
      }
    },
    data: function() {
      return {
        valuelist: [],
        backUpValueList: [],
        rule: [],
        showLoading: false,
        loadingHeight: "300",
        errorInfo: "未获取到数据",
        pageOption: {
          currentPage: 1,
          totalPage: 0
        }
      };
    },
    methods: {
      /**
       * 复制备份文件 
       * @returns 
       */
      copyValue(data) {
        return JSON.parse(JSON.stringify(data));
      },
      /**
       *  获取排序
       *  @x 单列的rule
       */
      dataSort(x) {
        //如果不是排序字段,默认返回不处理
        if (!x.sortObj || !x.sort) {
          return;
        }
        this.rule.forEach(element => {
          // 存在排序字段,将其他排序字段置为不排序状态
          if (element.sort && element.sortObj && element.dataKey != x.dataKey) {
            element.sortObj.active = false;
            element.sortObj.sortState = 0;
          }
        });
        //排序字段点击事件处理逻辑
        if (x.sort && x.sortObj) {
          x.sortObj.active = true;
          // 状态操作
          x.sortObj.sortState += 1; //状态每次加1
          x.sortObj.sortState = x.sortObj.sortState == 3 ? 0 : x.sortObj.sortState; //状态在0 1 2 中重复

          // 排序具体方法
          // TODO 后期添加根据字段类型排序
          if (x.sortObj.sortState === 0) {
            //该字段取消排序
            this.valuelist = this.copyValue(this.backUpValueList);
          } else {
            this.valuelist.sort((a, b) => {
              return x.sortObj.sortState == 1 ?
                a[x.dataKey].localeCompare(b[x.dataKey], 'zh') :
                b[x.dataKey].localeCompare(a[x.dataKey], 'zh');
            })
          }
        }
      },
      /**
       * 每次分页时 重置排序规则 
       * @returns 
       */
      resetSort() {
        this.rule.forEach(element => {
          if (element.sort && element.sortObj) {
            element.sortObj.active = false;
            element.sortObj.sortState = 0;
          }
        });
      },
      //异步请求数据
      getlist: function() {
        let self = this;
        let params = self.searchData;
        let pageindex = params.currentPage || 1;
        self.resetSort(); //重置排序规则
        self.loadingHeight = $(self.$el).find("tbody").height() ?
          $(self.$el).find("tbody").height() - 0 > 300 ?
          $(self.$el).find("tbody").height() : 300 : "300";
        //请求数据
        $.ajax({
          type: "POST",
          url: self.ajaxurl,
          beforeSend: function(request) {
            self.showLoading = true;
          },
          data: params,
          dataType: "json",
          success: function(data) {
            if (data != null && data != "") {
              try {
                if (data.success) {
                  self.valuelist = data.bean.data ? data.bean.data : [];
                  self.backUpValueList = self.copyValue(data.bean.data ? data.bean.data : []);
                  self.pageOption.currentPage = pageindex;
                  self.pageOption.totalPage = data.bean.pageCount;
                  self.pageOption.click = function(index) {
                    self.searchData.currentPage = index;
                  };
                  //对外暴露事件对象
                  self.$emit("result", self.valuelist);
                } else {
                  self.valuelist = [];
                  self.errorInfo = data.message;
                }
              } catch (error) {
                console.error(error);
                self.valuelist = [];
                self.showLoading = false;
              }
            }
          },
          error: function(response) {
            self.valuelist = [];
            self.showLoading = false;
          },
          complete: function() {
            self.showLoading = false;
          }
        });
      },
      renderHtml: function(rule, keys, obj) {
        let valArr = [];
        keys.split(",").forEach(element => {
          valArr.push(obj[element]);
        });
        let fns = this.fns;
        // NOTE 在 2017年12月18日15:45:34 终于从html中循环生成改成了在方法中生成具体数据
        // 原来的形式 需要在表格中生成很多的空span标签  现在直接获取到多参数数据  然后返回数据
        // 避免了Vue的无限循环的提醒,就是在循环中修改循环对象
        // 我有时候就在想 是不是我太菜了  为什么改个BUG就叫超级大BUG   - -!

        return window.HtmlFun && window.HtmlFun[rule] ?
          window.HtmlFun[rule].apply(HtmlFun, valArr) : valArr.join(",");
      }
    },
    computed: {
      searchDatas: function() {
        this.getlist(0);
        return this.searchData;
      }
    },
    //在组件加载完成后的钩子
    mounted: function() {
      let _this = this;
      //遍历子组件
      _this.$slots.default.forEach(function(child) {
        if (child.tag) {
          let obj = new Object();
          // 获取prop数据
          if (child && child.componentOptions && child.componentOptions.propsData) {
            for (let p in child.componentOptions.propsData) {
              obj[p] = child.componentOptions.propsData[p];
            }
          }
          // 样式的处理
          obj.class = child.data && child.data.staticClass ? child.data.staticClass : "";
          obj.style = child.data && child.data.staticStyle ? child.data.staticStyle : {};
          obj.style.textAlign = obj.align;
          obj.style.width = obj.width;
          // 排序字段的处理
          if (obj.sort && obj.sort != "0") {
            if (obj.dataKey.indexOf(',') >= 0) {
              console.error(`Ht_Table组件中,【${obj.name}】列包含多个字段,不允许启用排序功能`);
              obj.sort = false;
            } else {
              obj.sortObj = {
                active: false,
                sortState: 0 //0正常字段,1正序,2逆序
              }
            }
          }
          //收集规则
          _this.rule.push(obj);
        }
      });

    }
  };
</script>
<style>
  .ht-table {
    margin-bottom: 0;
  }
  
  .ht-table td img {
    width: 30px;
    height: 30px;
  }
  
  .blue {
    color: blue;
  }
</style>