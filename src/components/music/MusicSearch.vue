<template>

  <div class="container">
    <transition name="userRouter" mode="">
      <router-view></router-view>
    </transition>
    <div class="row">
      <ht-tabs active="网易云搜索"> 
        <ht-tab title="网易云搜索">
          <!-- 列表部分 -->
          <div class="col-md-9 col-sm-12 col-xs-12">
            <h2 class="text-center">搜索</h2>
            <div class="panel panel-default">
              <div class="panel-heading" style="padding-bottom: 0;">
                <b class="search-title">音乐搜索
                  <span v-show="totalCount">({{totalCount}}个结果)</span>
                </b>
                <span class="search-block">
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
                      <th width='17%' class="text-center">时长</th>
                    </tr>
                  </thead>
                  <tbody id="databody">
                    <tr v-show="songList.length" v-for="(x,index) in songList">
                      <td class="text-center">{{(pageOption.currentPage-1)*30+(index+1) }}</td>
                      <td>
                        <a href="javascript:;" @click='songDetail(x.id)' :title="x.name">{{x.name}}</a>
                      </td>
                      <td>
                        <!-- <a :href="x.artists[0].id" :title="x.artists[0].name">{{ x.artists[0].name }}</a> -->

                        <!-- <router-view name="path"></router-view> -->
                        <router-link :to="'/music/user/'+ x.artists[0].id" >{{ x.artists[0].name }}</router-link>
                      </td>
                      <td>
                        <a :href="x.album.id" :title="x.album.name">{{ x.album.name}}</a>
                      </td>
                      <!-- 此处是针对时长的计算 -->
                      <td class="text-center">
                        {{x.duration | songDuration}}
                      </td>
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
          <div class="col-md-3 col-sm-12 col-xs-12">
            <h2 class="text-center">详情</h2>
            <div class="panel panel-default">
              <div class="panel-heading">
                <b>{{dataObj.name?dataObj.name:'歌曲详情'}}</b>
              </div>
              <div style="padding:10px;">
                <div v-show="!showLoad">
                  <img :src='dataObj.songImg?dataObj.songImg:"https://i.loli.net/2018/12/10/5c0e363f1e78b.jpg"'  class='img-responsive img-thumbnail' alt='头像'>
                  <div class="caption">
                    <h4 v-show="dataObj.name">名称:{{dataObj.name}}</h4>
                    <h4 v-show="dataObj.name">作者:{{dataObj.author}}</h4>
                    <p>
                      <a :href="dataObj.url" class="btn btn-default" role="button" v-show="dataObj.name" target="_blank">
                        <span class="glyphicon glyphicon-headphones"></span> 点此试听
                      </a>
                      <a target="_blank" :href="'http://music.163.com/song/media/outer/url?id='+dataObj.id+'.mp3'" class="btn btn-primary" role="button" v-show="dataObj.name" :download="dataObj.name+'.mp3'">
                        <span class="glyphicon glyphicon-save"></span> 点此下载
                      </a> 
                    </p>
                  </div>
                </div>
                <div style="position: relative; height: 400px;" v-show="showLoad">
                  <loading></loading>
                </div>
              </div>
            </div>
          </div>
        </ht-tab>
      </ht-tabs>
    </div>
  </div>
</template>
<script>
  import router from "./../../router/index.js";
  export default {
    router,
    name: "Music",
    data: function() {
      //组件内数据部分
      return {
        songList: [],
        word: "苏阳",
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
      };
    },
    mounted: function() {
      this.getSongList(1);
    },
    filters: {
      songDuration(duration) {
        return (Math.floor((Math.floor(duration / 1000)) / 60) > 9 ? Math.floor((Math.floor(duration / 1000)) / 60) : ('0' + Math.floor((Math.floor(duration / 1000)) / 60))) + ':' + ((Math.floor(duration / 1000) % 60) > 9 ? (Math.floor(duration / 1000) % 60) : ('0' + (Math.floor(duration / 1000) % 60)));
      }
    },
    methods: {
      cancel() {
        alert('s')
      },
      result(data) {
        alert(JSON.stringify(data))
        console.log(JSON.stringify(data));
      },
      suggestClick: function(state, result) {
        if (state == "begin") {
          this.showLoad = true;
          this.dataObj.id = "";
          this.dataObj.showDetail = false;
          this.dataObj.name = "获取中...";
          this.dataObj.author = "";
          this.dataObj.songImg = "";
          this.dataObj.url = "";
        } else if (state == "end") {
          this.showLoad = false;
          //歌曲详情
          this.dataObj.id = result.id;
          this.dataObj.name = result.name;
          this.dataObj.author = result.author;
          this.dataObj.songImg = result.songImg;
          this.dataObj.url = result.url;
          this.dataObj.showDetail = true;
        } else if (state == "user") {
          router.push({
            path: "/music/user/" + result
          });
        }
      },
      //获取歌曲详情
      songDetail(id) {
        var _self = this;
        var dataObj = {};
        this.dataObj.id = "";
        this.showLoad = true;
        var step1 = new Promise(function(resolve, reject) {
          $.ajax({
            type: "GET",
            url: "http://dev-ws.htyfw.com.cn:18888/music/url",
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
            url: "http://dev-ws.htyfw.com.cn:18888/song/detail",
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
          url: "http://dev-ws.htyfw.com.cn:18888/search",
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
                _self.totalCount = data.result.songCount ?
                  data.result.songCount :
                  0;
                _self.songList = data.result.songs;
                _self.pageOption.currentPage = pageindex;
                _self.pageOption.totalPage = Math.ceil(
                  data.result.songCount / 30
                );
                _self.pageOption.click = function(currentPage) {
                  _self.getSongList(currentPage);
                };
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
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
      }
    }
  };
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
</style>