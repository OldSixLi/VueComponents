<template>
    <div class="container">
        <div class="row">
            <!-- 消除外边距 -->
            <div class="col-md-9 col-sm-9">
                <h2 class="text-center">搜索</h2>
                <div class="panel panel-default">
                    <div class="panel-heading" style="padding-bottom: 0;">
                        <b class="search-title">音乐搜索 <span v-show="totalCount">({{totalCount}}个结果)</span></b>
                        <span class="search-block">
                            <!-- <ht-search @search="musicSearch" v-model="word"></ht-search> -->
                             <ajax-search @suggestClick="suggestClick" @search="musicSearch" v-model="word"></ajax-search>
                        </span>
                    </div>
                    <div class="panel-body" style="padding:0;">
                        <table class="table table-hover" style="margin-bottom: 0;">
                            <thead>
                                <tr>
                                    <th width='8%' class="text-center">序号</th>
                                    <th width='25%'>歌曲</th>
                                    <th width='25%'>歌手</th>
                                    <th width='25%'>专辑</th>
                                    <th width='17%'>发布时间</th>
                                </tr>
                            </thead>
                            <tbody id="databody">
                                <tr v-show="songList.length" v-for="(x,index) in songList">
                                    <td class="text-center">{{(pageOption.currentPage-1)*30+(index+1) }}</td>
                                    <td><a href="javascript:;" @click='songDetail(x.id)' :title="x.name">{{x.name}}</a></td>
                                    <td><a :href="x.artists[0].id" :title="x.artists[0].name">{{ x.artists[0].name }}</a></td>
                                    <td><a :href="x.album.id" :title="x.album.name">{{ x.album.name}}</a> </td>
                                    <td>{{shijian(x.album.publishTime)}}</td>
                                </tr>
                                <tr v-show="!songList.length">
                                    <td colspan="20" class="text-center">
                                        <h2>没有相关数据</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ht-page :param="pageOption" class="pull-right" v-show="pageOption.totalPage>1"></ht-page>
                </div>
            </div>
            <!-- 歌曲详情部分 -->
            <div class="col-md-3 col-sm-3" >
                 
                <h2 class="text-center">详情</h2>
                <div class="panel panel-default">
                    <div class="panel-heading"><b>{{dataObj.name?dataObj.name:'歌曲详情'}}</b></div>
                    <div style="padding:10px;">
                        <div v-show="!showLoad">
                            <img :src='dataObj.songImg?dataObj.songImg:"/src/assets/img/nigula.jpg"' class='img-responsive img-thumbnail' alt='头像'>
                            <div class="caption">
                                <h4 v-show="dataObj.name">名称:{{dataObj.name}}</h4>
                                <h4 v-show="dataObj.name">作者:{{dataObj.author}}</h4>
                                <p>
                                    <a :href="dataObj.url" class="btn btn-default" role="button" v-show="dataObj.name" target="_blank"><span class="glyphicon glyphicon-headphones"></span> 点此试听</a>
                                    <a :href="dataObj.url" class="btn btn-primary" role="button" v-show="dataObj.name" :download="dataObj.name+'.mp3'"><span class="glyphicon glyphicon-save"></span> 点此下载</a>
                                </p>
                            </div>
                        </div>
                        <div style="position: relative; height: 400px;" v-show="showLoad">
                            <div class="cssload-loader">
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                                <div class="cssload-side"></div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Music",
        props: {
            //对外获取的数据
        },
        data: function() {
            //组件内数据部分
            return {
                songList: [],
                word: "趁早",
                pageOption: {
                    currentPage: 1,
                    totalPage: 0,
                    showItem: 5,
                    showSkip: false
                },
                totalCount: 0,
                //歌曲详情
                dataObj: {
                    id: "",
                    name: "",
                    author: "",
                    songImg: "",
                    url: "",
                    showDetail: true
                },
                showLoad: false
            }
        },
        mounted: function() {
            //请求第一页的内容
            this.getSongList(1)
        },
        methods: {
            suggestClick: function(state, result) {
                if (state == 'begin') {
                    this.showLoad=true;
                    this.dataObj.id='';
                    this.dataObj.showDetail=false;
                    this.dataObj.name = '获取中...';
                    this.dataObj.author = '';
                    this.dataObj.songImg = '';
                    this.dataObj.url = '';
                   
                } else if (state == 'end') {
                    this.showLoad=false;
                    //歌曲详情
                    this.dataObj.id=result.id;
                    this.dataObj.name = result.name;
                    this.dataObj.author = result.author;
                    this.dataObj.songImg = result.songImg;
                    this.dataObj.url = result.url;
                    this.dataObj.showDetail=true;
                }},
            //获取歌曲详情
            songDetail(id) {
                var _self = this;
                var dataObj = {};
                this.dataObj.id = '';
                this.showLoad = true;
                var step1 = new Promise(function(resolve, reject) {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:9999/music/url",
                        data: {
                            id: id,
                            timestamp: Date.parse(new Date())
                        },
                        async: true,
                        dataType: "json",
                        success: function(data) {
                            if (data.code == 200) {
                                //URL
                                dataObj.url = data.data[0].url;
                            } else {
                                dataObj.url = "";
                            }
                        },
                        error: function(response) {
                            dataObj.url = "";
                        },
                        complete: function(xhr, textStatus) {
                            //NOTE 异步事件完成后需要操作的内容
                            dataObj.urlComplete = true;
                            resolve(true);
                        }
                    });
                });
                //获取歌曲详情 ①步 使用promise
                var step2 = new Promise(function(resolve, reject) {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:9999/song/detail",
                        data: {
                            ids: id,
                            timestamp: Date.parse(new Date())
                        },
                        async: true,
                        dataType: "json",
                        success: function(data) {
                            if (data.code == 200) {
                                dataObj.name = data.songs[0].name;
                                dataObj.author = data.songs[0].ar[0].name;
                                dataObj.songImg = data.songs[0].al.picUrl;
                            } else {
                                dataObj.name = "";
                                dataObj.author = "";
                                dataObj.songImg = "";
                            }
                        },
                        error: function(response) {
                            dataObj.name = "";
                            dataObj.author = "";
                            dataObj.songImg = "";
                        },
                        complete: function(xhr, textStatus) {
                            dataObj.detailComplete = true; //代表详情获取完毕
                            resolve(true);
                        }
                    });
                });
                //执行promsie
                Promise.all([step1, step2]).then(function(result) {
                    setTimeout(() => {
                        _self.dataObj = dataObj;
                        _self.dataObj.id = id;
                        _self.showLoad = false;
                    }, 0);
                });
            },
            //按钮点击 搜索歌曲 
            musicSearch() {
                this.getSongList(1);
            },
            //搜索歌曲AJAX操作
            getSongList(pageindex) {
                var _self = this;
                $.ajax({
                    type: "GET",
                    url: "http://localhost:9999/search",
                    data: {
                        keywords: _self.word,
                        limit: 30,
                        offset: 30 * (pageindex - 1),
                        timestamp: Date.parse(new Date())
                    },
                    dataType: "json",
                    success: function(data) {
                        if (data != null && data != "") {
                            if (data.code == 200) {
                                _self.totalCount = data.result.songCount ? data.result.songCount : 0;
                                _self.songList = data.result.songs;
                                _self.pageOption.currentPage = pageindex;
                                _self.pageOption.totalPage = Math.ceil(data.result.songCount / 30);
                                _self.pageOption.click = function(currentPage) {
                                    _self.getSongList(currentPage);
                                }
                            } else {
                                _self.songList = [];
                                _self.pageOption.totalPage = 1;
                                _self.totalCount = 0;
                            }
                        } else {
                            _self.songList = [];
                        }
                    },
                    error: function(response) {
                        _self.songList = [];
                    }
                });
            },
            //时间戳转化为日期
            shijian: function(shijianchuo) {
                var time = new Date(parseInt(shijianchuo));
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
            }
        }
    }
</script>
<style scoped>
    table {
        /* 表格布局属性,宽度根据设置值设定 */
        table-layout: fixed;
    }
    td {
        /* 字体超出后显示为省略号 */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    td img {
        /* 设置图片大小 */
        width: 30px;
        height: 30px;
    }
    td a {
        color: #444648;
    }
    a:focus,
    a:hover {
        color: #7c858e;
        text-decoration: none;
    }
    .search-block {
        display: inline-block;
        width: 50%;
    }
    .search-title {
        display: inline-block;
        width: 49%;
        line-height: 34px;
        vertical-align: top;
    }
    /* 动画效果 */
    .cssload-loader {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 66.284271247462px;
        height: 66.284271247462px;
        margin-left: -33.142135623731px;
        margin-top: -33.142135623731px;
        border-radius: 100%;
        animation-name: cssload-loader;
        -o-animation-name: cssload-loader;
        -ms-animation-name: cssload-loader;
        -webkit-animation-name: cssload-loader;
        -moz-animation-name: cssload-loader;
        animation-iteration-count: infinite;
        -o-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-timing-function: linear;
        -o-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
        -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
        animation-duration: 4.6s;
        -o-animation-duration: 4.6s;
        -ms-animation-duration: 4.6s;
        -webkit-animation-duration: 4.6s;
        -moz-animation-duration: 4.6s;
    }
    .cssload-loader .cssload-side {
        display: block;
        width: 8px;
        height: 28px;
        background-color: rgb(4, 99, 128);
        margin: 3px;
        position: absolute;
        border-radius: 50%;
        animation-duration: 1.73s;
        -o-animation-duration: 1.73s;
        -ms-animation-duration: 1.73s;
        -webkit-animation-duration: 1.73s;
        -moz-animation-duration: 1.73s;
        animation-iteration-count: infinite;
        -o-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-timing-function: ease;
        -o-animation-timing-function: ease;
        -ms-animation-timing-function: ease;
        -webkit-animation-timing-function: ease;
        -moz-animation-timing-function: ease;
    }
    .cssload-loader .cssload-side:nth-child(1),
    .cssload-loader .cssload-side:nth-child(5) {
        transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        animation-name: cssload-rotate0;
        -o-animation-name: cssload-rotate0;
        -ms-animation-name: cssload-rotate0;
        -webkit-animation-name: cssload-rotate0;
        -moz-animation-name: cssload-rotate0;
    }
    .cssload-loader .cssload-side:nth-child(3),
    .cssload-loader .cssload-side:nth-child(7) {
        transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        animation-name: cssload-rotate90;
        -o-animation-name: cssload-rotate90;
        -ms-animation-name: cssload-rotate90;
        -webkit-animation-name: cssload-rotate90;
        -moz-animation-name: cssload-rotate90;
    }
    .cssload-loader .cssload-side:nth-child(2),
    .cssload-loader .cssload-side:nth-child(6) {
        transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        animation-name: cssload-rotate45;
        -o-animation-name: cssload-rotate45;
        -ms-animation-name: cssload-rotate45;
        -webkit-animation-name: cssload-rotate45;
        -moz-animation-name: cssload-rotate45;
    }
    .cssload-loader .cssload-side:nth-child(4),
    .cssload-loader .cssload-side:nth-child(8) {
        transform: rotate(135deg);
        -o-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        animation-name: cssload-rotate135;
        -o-animation-name: cssload-rotate135;
        -ms-animation-name: cssload-rotate135;
        -webkit-animation-name: cssload-rotate135;
        -moz-animation-name: cssload-rotate135;
    }
    .cssload-loader .cssload-side:nth-child(1) {
        top: 33.142135623731px;
        left: 66.284271247462px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(2) {
        top: 56.213203431093px;
        left: 56.213203431093px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(3) {
        top: 66.284271247462px;
        left: 33.142135623731px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(4) {
        top: 56.213203431093px;
        left: 10.071067816369px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(5) {
        top: 33.142135623731px;
        left: 0px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(6) {
        top: 10.071067816369px;
        left: 10.071067816369px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(7) {
        top: 0px;
        left: 33.142135623731px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    .cssload-loader .cssload-side:nth-child(8) {
        top: 10.071067816369px;
        left: 56.213203431093px;
        margin-left: -4px;
        margin-top: -14px;
        animation-delay: 0;
        -o-animation-delay: 0;
        -ms-animation-delay: 0;
        -webkit-animation-delay: 0;
        -moz-animation-delay: 0;
    }
    @keyframes cssload-rotate0 {
        0% {
            transform: rotate(0deg);
        }
        60% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }
    @-o-keyframes cssload-rotate0 {
        0% {
            -o-transform: rotate(0deg);
        }
        60% {
            -o-transform: rotate(180deg);
        }
        100% {
            -o-transform: rotate(180deg);
        }
    }
    @-ms-keyframes cssload-rotate0 {
        0% {
            -ms-transform: rotate(0deg);
        }
        60% {
            -ms-transform: rotate(180deg);
        }
        100% {
            -ms-transform: rotate(180deg);
        }
    }
    @-webkit-keyframes cssload-rotate0 {
        0% {
            -webkit-transform: rotate(0deg);
        }
        60% {
            -webkit-transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(180deg);
        }
    }
    @-moz-keyframes cssload-rotate0 {
        0% {
            -moz-transform: rotate(0deg);
        }
        60% {
            -moz-transform: rotate(180deg);
        }
        100% {
            -moz-transform: rotate(180deg);
        }
    }
    @keyframes cssload-rotate90 {
        0% {
            transform: rotate(90deg);
            transform: rotate(90deg);
        }
        60% {
            transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
    @-o-keyframes cssload-rotate90 {
        0% {
            -o-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        60% {
            -o-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            -o-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
    @-ms-keyframes cssload-rotate90 {
        0% {
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        60% {
            -ms-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            -ms-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
    @-webkit-keyframes cssload-rotate90 {
        0% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        60% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
    @-moz-keyframes cssload-rotate90 {
        0% {
            -moz-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        60% {
            -moz-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            -moz-transform: rotate(270deg);
            transform: rotate(270deg);
        }
    }
    @keyframes cssload-rotate45 {
        0% {
            transform: rotate(45deg);
            transform: rotate(45deg);
        }
        60% {
            transform: rotate(225deg);
            transform: rotate(225deg);
        }
        100% {
            transform: rotate(225deg);
            transform: rotate(225deg);
        }
    }
    @-o-keyframes cssload-rotate45 {
        0% {
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        60% {
            -o-transform: rotate(225deg);
            transform: rotate(225deg);
        }
        100% {
            -o-transform: rotate(225deg);
            transform: rotate(225deg);
        }
    }
    @-ms-keyframes cssload-rotate45 {
        0% {
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        60% {
            -ms-transform: rotate(225deg);
            transform: rotate(225deg);
        }
        100% {
            -ms-transform: rotate(225deg);
            transform: rotate(225deg);
        }
    }
    @-webkit-keyframes cssload-rotate45 {
        0% {
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        60% {
            -webkit-transform: rotate(225deg);
            transform: rotate(225deg);
        }
        100% {
            -webkit-transform: rotate(225deg);
            transform: rotate(225deg);
        }
    }
    @-moz-keyframes cssload-rotate45 {
        0% {
            -moz-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        60% {
            -moz-transform: rotate(225deg);
            transform: rotate(225deg);
        }
        100% {
            -moz-transform: rotate(225deg);
            transform: rotate(225deg);
        }
    }
    @keyframes cssload-rotate135 {
        0% {
            transform: rotate(135deg);
            transform: rotate(135deg);
        }
        60% {
            transform: rotate(315deg);
            transform: rotate(315deg);
        }
        100% {
            transform: rotate(315deg);
            transform: rotate(315deg);
        }
    }
    @-o-keyframes cssload-rotate135 {
        0% {
            -o-transform: rotate(135deg);
            transform: rotate(135deg);
        }
        60% {
            -o-transform: rotate(315deg);
            transform: rotate(315deg);
        }
        100% {
            -o-transform: rotate(315deg);
            transform: rotate(315deg);
        }
    }
    @-ms-keyframes cssload-rotate135 {
        0% {
            -ms-transform: rotate(135deg);
            transform: rotate(135deg);
        }
        60% {
            -ms-transform: rotate(315deg);
            transform: rotate(315deg);
        }
        100% {
            -ms-transform: rotate(315deg);
            transform: rotate(315deg);
        }
    }
    @-webkit-keyframes cssload-rotate135 {
        0% {
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
        }
        60% {
            -webkit-transform: rotate(315deg);
            transform: rotate(315deg);
        }
        100% {
            -webkit-transform: rotate(315deg);
            transform: rotate(315deg);
        }
    }
    @-moz-keyframes cssload-rotate135 {
        0% {
            -moz-transform: rotate(135deg);
            transform: rotate(135deg);
        }
        60% {
            -moz-transform: rotate(315deg);
            transform: rotate(315deg);
        }
        100% {
            -moz-transform: rotate(315deg);
            transform: rotate(315deg);
        }
    }
    @keyframes cssload-loader {
        0% {
            transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-o-keyframes cssload-loader {
        0% {
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-ms-keyframes cssload-loader {
        0% {
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes cssload-loader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-moz-keyframes cssload-loader {
        0% {
            -moz-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -moz-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>