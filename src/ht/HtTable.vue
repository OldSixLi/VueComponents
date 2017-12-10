// 说明:数据列表组件:HtTable
// 时间:2017年11月6日09:34:48 

<template>
    <div>
        <table class="table table-hover ht-table">
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
                <tr v-for="(x,index) in valuelist" v-show="!showLoading&&valuelist!=null&&valuelist.length>0">
                    <td v-show="!!showindex">
                        {{index+1}}
                    </td>
                    <td v-for="y in rule" style="vertical-align: middle;" :style="{
                            'text-align':y.align,
                            'width':y.width
                            }">
                        <!--Begin: If当前的参数为多参数，进行多参数处理操作 -->
                        <span v-if="y.dataKey&&y.dataKey.split(',').length>1"> 
                        <!--NOTE 此处的逻辑有点不正常，难描述。每个td中的params参数，先置为空数组，再往数组中逐个添加当前td中的参数。目的是防止其他td中多参数与当前td参数拼接到一起 -->
                        <span v-show='false'>{{x.params=[]}}</span>
                        <span v-for="singleKey in y.dataKey.split(',')" class="hide"> 
                            {{x.params.push(x[singleKey])}}
                        </span>
                        <span v-html="renderHtml(x.params,y.filter)" > </span>
                        </span>
                        <!-- End:结束多参数判断 -->

                        <!-- Else当前的参数为单个参数，直接进行处理 -->
                        <span v-else v-html="renderHtml(x[y.dataKey],y.filter)" v-tooltip.top="'向上提示'"> </span>
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
            }
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
                self.loadingHeight =
                    $(self.$el).find('tbody').height() ? (($(self.$el).find('tbody').height() - 0 > 300 ? $(self.$el).find('tbody').height() : 300)) : "300";
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
                                    }
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
            renderHtml: function(tdData, rule) {
                if (!rule) {
                    return tdData;
                } else {
                    var filter = rule;
                    if (this[filter]) {
                        return this[filter](tdData);
                    }
                    return window.HtmlFun && window.HtmlFun[filter] ? Object.prototype.toString.call(tdData) == '[object Array]' ? window.HtmlFun[filter].apply(this, tdData) : window.HtmlFun[filter](tdData) : tdData;
                }
            }, 
            parseText: function(str) {
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
            searchDatas: function() {
                this.getlist(0);
                return this.searchData;
            }
        },
        //在组件加载完成后的钩子
        mounted: function() {
            var self = this;
            var _this = this;
            
            console.log(_this.$slots);
            console.log(_this.$slots.default);
            _this.$slots.default.forEach(function(child) {
                var obj = {};
                if(child&&child.componentOptions&&child.componentOptions.propsData){

                for (var p in child.componentOptions.propsData) {
                    obj[p] = child.componentOptions.propsData[p];
                }
                }
                _this.rule.push(obj);
            });
        }, 
    }
</script>
<style>
    .hide {
        display: none;
    }  
    .ht-table {
        margin-bottom: 0;
    }
     .ht-table td img{
          width: 30px;
        height: 30px;
     }
</style>