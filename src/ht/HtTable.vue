// 说明:数据列表组件:HtTable
// 时间:2017年11月6日09:34:48 

<template>
  <div>
    <table class="table table-hover ht-table">
      <thead>
        <tr>
          <!-- 展示序列号 -->
          <th v-show="!!showindex">#</th>
          <th v-for="(x,index) in rule" :key="index" :class="x.class" :style="x.style">
            {{x.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 搜索结果进行处理 -->
        <tr v-for="(x,index) in valuelist" v-show="!showLoading&&valuelist!=null&&valuelist.length>0">
          <td v-show="!!showindex">
            {{index+1}}
          </td>
          <td v-for="y in rule" style="vertical-align: middle;" :class="x.class" :style="y.style">
            <span v-html="renderHtml(y.filter,y.dataKey,x)"> </span>
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
      <div class="cssload-loader"></div>
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
    //对外获取的数据
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
    //组件内数据部分
    return {
      valuelist: [],
      rule: [],
      nameurl: "李三丰",
      showLoading: false,
      loadingHeight: "300",
      errorInfo: "未获取到数据",
      pageOption: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },
  filter: {
    toGender: function(value) {
      return value == "M" ? "男" : "女";
    },
    toImg: function(value) {
      return "<img src='" + value + "'/>";
    }
  },
  methods: {
    toshow: function(e) {
      e.preventDefault();
      this.$emit("chuandi");
    },
    //异步请求数据
    getlist: function() {
      var self = this;
      var params = new Object();
      params = self.searchData;
      var pageindex = params.currentPage;
      self.loadingHeight = $(self.$el)
        .find("tbody")
        .height()
        ? $(self.$el)
            .find("tbody")
            .height() -
            0 >
          300
          ? $(self.$el)
              .find("tbody")
              .height()
          : 300
        : "300";
      $.ajax({
        type: "POST",
        url: this.ajaxurl,
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
                for (var i = 0; i < self.valuelist.length; i++) {
                  var element = self.valuelist[i];
                  element["params"] = [];
                }
                self.pageOption.currentPage = pageindex;
                self.pageOption.totalPage = data.bean.pageCount;
                self.pageOption.click = function(index) {
                  self.searchData.currentPage = index;
                };
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
      var valArr = [];
      keys.split(",").forEach(element => {
        valArr.push(obj[element]);
      });
      // NOTE 在 2017年12月18日15:45:34 终于从html中循环生成改成了在方法中生成具体数据
      // 原来的形式 需要在表格中生成很多的空span标签  现在直接获取到多参数数据  然后返回数据
      // 避免了Vue的无限循环的提醒,就是在循环中修改循环对象
      // 我有时候就在想 是不是我太菜了  为什么改个BUG就叫超级大BUG   - -!
      return window.HtmlFun && window.HtmlFun[rule]
        ? window.HtmlFun[rule].apply(HtmlFun, valArr)
        : valArr.join(",");
    },
    parseText: function(str) {
      if (str.indexOf(0) == "{" || str.indexOf(0) == "[") {
        str = str.replace(/'/g, '"');
        str = str.replace(/(\s?\{\s?)(\S)/g, "$1" + '"' + "$2");
        str = str.replace(/(\s?,\s?)(\S)/g, "$1" + '"' + "$2");
        str = str.replace(/(\S\s?):(\s?\S)/g, "$1" + '":' + "$2");
        str = str.replace(/,"\{/g, ",{");
        str = str.replace(/""/g, '"');
        str = str.replace(/\s/g, "");
        try {
          str = JSON.parse(str);
        } catch (e) {}
      }
      return str;
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
    var self = this;
    var _this = this;
    _this.$slots.default.forEach(function(child) {
      var obj = {};
      if (child && child.componentOptions && child.componentOptions.propsData) {
        for (var p in child.componentOptions.propsData) {
          obj[p] = child.componentOptions.propsData[p];
        }
      }
      obj.class = child.data.staticClass ? child.data.staticClass : "";
      obj.style = child.data.staticStyle ? child.data.staticStyle : {};
      if (child.data.staticStyle != undefined) {
        obj.style.textAlign = obj.align;
        obj.style.width = obj.width;
      }
      _this.rule.push(obj);
    });
  }
};
</script>
<style>
.hide {
  display: none;
}
.ht-table {
  margin-bottom: 0;
}
.ht-table td img {
  width: 30px;
  height: 30px;
}
</style>