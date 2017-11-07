// 说明:数据列表组件:HtTable
// 时间:2017年11月6日09:34:48 

<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <!-- 展示序列号 -->
                    <th v-show="!!showindex">#</th>
                    <!-- 遍历当前的列名，进行展示，同时设置列的style样式 -->
                    <th v-for="(x,index) in rule" :key="index" :width="x.width" :style="{
                                'text-align':x.align,
                                'width':x.width
                                }">
                        {{x.name}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- 搜索结果进行处理 -->
                <tr v-for="(x,index) in valuelist"  v-show="!showLoading&&valuelist!=null&&valuelist.length>0">
                    <td v-show="!!showindex">
                        {{index+1}}
                    </td>
                    <td v-for="y in rule" :style="{
                                'text-align':y.align,
                                'width':y.width
                                }">
                        <!--Begin: If当前的参数为多参数，进行多参数处理操作 -->
                        <span v-if="y.dataKey.split(',').length>1"> 
                                  <!--NOTE 此处的逻辑有点不正常，难描述。每个td中的params参数，先置为空数组，再往数组中逐个添加当前td中的参数。目的是防止其他td中多参数与当前td参数拼接到一起 -->
                                <span v-show='false'>{{x.params=[]}}</span>
                        <span v-for="singleKey in y.dataKey.split(',')" class="hide"> 
                                            {{x.params.push(x[singleKey])}}
                                        </span>
                        <span v-html="render(x.params,y.filter)"> </span>
                        </span>
                        <!-- End:结束多参数判断 -->
                        <!-- Else当前的参数为单个参数，直接进行处理 -->
                        <span v-else v-html="render(x[y.dataKey],y.filter)"> </span>
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
        <div class="pull-right page">
            <ul class="pagination" v-show="valuelist!=null&&valuelist.length>0"></ul>
        </div>
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
                default: function () {
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
                errorInfo: "未获取到数据"
            }
        },
        mounted: function() {
            
        },filter: {
          toGender: function (value) {
            return value == "M" ? "男" : "女";
          }
        },
        methods: {
            toshow: function (e) {
                e.preventDefault();
                this.$emit("chuandi");
            },
            //异步请求数据
            getlist: function () {
                var self = this;
                var params = new Object();
                params = self.searchData;
                var pageindex = params.currentPage;
                self.loadingHeight = 
                $(self.$el).find('tbody').height() ?(($(self.$el).find('tbody').height() - 0 > 300 ? $(self.$el).find('tbody').height() : 300)) : "300";
                $.ajax({
                    type: "POST",
                    url: this.ajaxurl,
                    beforeSend: function (request) {
                        self.showLoading = true;
                    },
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data != "") {
                            try {
                                if (data.success) {
                                    self.valuelist = data.bean.data ? data.bean.data : [];
                                    for (var i = 0; i < self.valuelist.length; i++) {
                                        var element = self.valuelist[i];
                                        element["params"] = [];
                                    }
                                    // BootStrap分页控件的声明
                                    if (self.valuelist.length > 0) {
                                        var $page = $(self.$el.children[2]).find("ul");
                                        self.initPageDiv($page, pageindex, data.bean.pageCount, 5, $page, function() {
                                            self.searchData.currentPage = $page.data("page");
                                        });
                                    }
                                } else {
                                    self.valuelist = [];
                                    self.errorInfo = data.message;
                                }
                            } catch (error) {
                                self.valuelist = [];
                                self.showLoading = false;
                            }
                        }
                    },
                    error: function (response) {
                        self.valuelist = [];
                        if (response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {} else {}
                    },
                    complete: function () {
                        self.showLoading = false;
                    }
                });
            },
            render: function (tdData, rule) {
                if (!rule) {
                    return tdData;
                } else {
                    var filter = rule;
                    return window.HtmlFun && window.HtmlFun[filter] ? Object.prototype.toString.call(tdData) == '[object Array]' ? window.HtmlFun[filter].apply(this, tdData) : window.HtmlFun[filter](tdData) : tdData;
                }
            },
            // 分页方法初始化
            initPageDiv: function ($dom, now, all, each, $dom2, change) {
                if (parseInt(now) > parseInt(all)) {
                    return;
                }
                var options = {
                    bootstrapMajorVersion: 3,
                    currentPage: now, // 当前页
                    totalPages: all, // 共几页
                    numberOfPages: each, // 每次显示几页
                    itemTexts: function (type, page, current) {
                        // 修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "<";
                            case "next":
                                return ">";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    },
                    //单击事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        // 异步换页
                        $dom2.data("page", page);
                        change();
                    }
                };
                $dom.bootstrapPaginator(options);
            },
            parseText: function (str) {
                if (str.indexOf(0) == "{" || str.indexOf(0) == "[") {
                    str = str.replace(/'/g, "\"");
                    str = str.replace(/(\s?\{\s?)(\S)/g, "$1" + "\"" + "$2");
                    str = str.replace(/(\s?,\s?)(\S)/g, "$1" + "\"" + "$2");
                    str = str.replace(/(\S\s?):(\s?\S)/g, "$1" + "\":" + "$2");
                    str = str.replace(/,"\{/g, ",{");
                    str = str.replace(/""/g, "\"");
                    str = str.replace(/\s/g, "");
                    try {
                        str = JSON.parse(str);
                    } catch (e) {}
                }
                return str;
            }
        },
        computed: {
            searchDatas: function () {
                this.getlist(0);
                return this.searchData;
            }
        },
        //在组件加载完成后的钩子
        mounted: function () {
            var self = this;
            var _this = this;
            _this.$slots.default.forEach(function(child) {
                var obj = {};
                for (var p in child.componentOptions.propsData) {
                    obj[p] = child.componentOptions.propsData[p];
                }
                _this.rule.push(obj);
            });
        }
    }
</script>
<style scoped>
    .hide {
        display: none;
    }
</style>