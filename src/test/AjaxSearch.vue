<template>
  <div class="input-group">
    <!-- //输入框部分 -->
    <input type="text" class="form-control" :value="currentValue" @input="handleInput" @focus="handleInput" @keypress.enter="searchClick" :placeholder="placeholder" ref="inputs">
    <!-- @blur="blurFn" 失去焦点时如何处理-->
    <!-- //AJAX部分 -->
    <transition name="panel">
      <div class="resultPanel" :style="{'width':'50%'}" style="position:absolute;left:0;top:110%;background-color:#fff;box-shadow:0 0 7px 2px rgba(38,28,28,0.2);border-radius: 4px;" v-show="((resultList&&resultList.length)||(authorList&&authorList.length))&&isFocus">
        <ul style="padding:0;">
          <li v-for="(x,index) in resultList" :key="index" :data-song-id="x.id" :data-song-name="x.name" @click="itemClick($event,x.id)">{{x.name+(x.artists[0]?' - '+x.artists[0].name:'')}}</li>
          <hr>
          <li v-for="(y,i) in authorList" :key="i" :data-author-id="y.id" :data-song-name="y.name" @click="itemClick($event,y.id,'user')"><img :src="y.picUrl" alt="" class="img-author">{{" "+y.name}}</li>
        </ul>
      </div>
    </transition>
    <!-- //按钮部分 -->
    <span class="input-group-btn">
      <button class="btn btn-primary" :class="{
                'btn-default':type=='default',
                'btn-success':type=='success',
                'btn-info':type=='info',
                'btn-warning':type=='warning',
                'btn-danger':type=='danger', 
            }" type="button" @click="searchClick">
        <span class="glyphicon glyphicon-search"></span>&nbsp;搜索</button>
    </span>
  </div>
</template>
<script>
  export default {
    name: "AjaxSearch",
    props: {
      //对外获取的数据
      placeholder: String,
      value: String,
      type: String
    },
    data: function() {
      //组件内数据部分
      return {
        currentValue: this.value,
        resultList: [],
        authorList: [],
        isFocus: false

      };
    },
    methods: {
      searchClick: function() {
        this.isFocus = false;
        this.resultList = [];
        this.authorList = [];
        this.$refs.inputs.blur();
        this.$emit("search", this.value);
      },
      /**
       * 点击用户
       * @returns
       */
      authorClick(event, authorId) {},
      handleInput(event) {
        //NOTE:这个方法不能用中文参数
        let _self = this;
        let value = event.target.value;
        this.isFocus = true;
        if (value) {
          Promise.all([
            _self.$ajax({
              type: "GET",
              url: "http://localhost:9999/search/suggest",
              data: {
                keywords: value,
                type: '1',
                limit: 10
              }
            }),
            _self.$ajax({
              type: "GET",
              url: "http://localhost:9999/search/suggest",
              data: {
                keywords: value,
                type: '100',
                limit: 10
              },
            })
          ]).then(arr => {
            let data1 = arr[0];
            let data2 = arr[1];
            if (data1.code == 200) {
              _self.resultList = (data1.result && data1.result.songs) || [];
            } else {
              _self.resultList = [];
            }

            if (data2.code == 200) {
              _self.authorList = (data2.result && data2.result.artists) || [];
            } else {
              _self.authorList = [];
            }
          }, err => {
            _self.resultList = [];
            _self.authorList = [];
          })

        } else {
          _self.resultList = [];
          _self.authorList = [];
        }
        this.currentValue = value;
        this.$emit("input", value);
      },

      itemClick(event, id, user) {
        this.resultList = [];
        this.authorList = [];
        let _self = this;
        let node = event.target;
        let dataObj = {};
        this.currentValue = $(node).text();
        this.$emit("input", $(node).text());
        if (user == "user") {
          _self.$emit("suggestClick", "user", id);
        } else {
          //BEGIN 开始获取音乐信息 并传递给父组件
          _self.$emit("suggestClick", "begin", dataObj);
          dataObj.id = id;
          //TODO 妈蛋 完犊子 这块不能用同步  得用promise
          //获取MP3链接 ②步 使用promise
          //NOTE promise的用法需要注意
          let step1 = new Promise(function(resolve, reject) {
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
                dataObj.urlComplete = true; //代表链接获取完毕
                // if(dataObj.detailComplete){
                //     // _self.$emit('suggestClick','end', dataObj);
                //     setTimeout(() => {
                //         _self.$emit('suggestClick','end', dataObj);
                //     },0);
                // }
                resolve(true);
              }
            });
          });
          //获取歌曲详情 ①步 使用promise
          let step2 = new Promise(function(resolve, reject) {
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
          //此处因为涉及到两个AJAX请求,所以必须等待两个都执行完毕才可以回调,所以利用promise
          //2017年11月21日14:15:59 更改为promise
          //执行promsie
          Promise.all([step1, step2]).then(function(result) {
            setTimeout(() => {
              _self.$emit("suggestClick", "end", dataObj);
            }, 0);
          });
        }

        //END 执行完毕
      },
      blurFn: function() {
        this.resultList = [];
        this.authorList = [];
      },
      keyUp() {},
      keyDown() {}
    },
    created() {
      // https://segmentfault.com/q/1010000007444595
      // 点击其他不在的区域触发事件
      document.addEventListener("click", e => {
        //NOTE 此处会在其他组件中也触发,这个暂时不清楚怎么处理
        // console.log(this.$el.contains(e.target));
        if (!this.$el.contains(e.target)) {
          this.resultList = [];
          this.authorList = [];
        }
      });
    }
  };
</script>
<style scoped>
  hr {
    margin: 7px 0;
  }
  
  .img-author {
    width: 30px;
    height: 30px;
  }
  
  .input-group {
    position: relative;
  }
  
  .resultPanel {
    z-index: 5;
  }
  
  .resultPanel ul {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .resultPanel li {
    padding: 0 20px;
    margin: 0;
    line-height: 34px;
    cursor: pointer;
    color: #5a5e66;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .resultPanel li:hover {
    background-color: #f5f7fa;
  }
  /* panel */
  /* 完成状态 */
  
  .panel-enter-active {
    transform: translate(0, 0) scaleY(1);
    transition: all 0.3s ease;
  }
  /* 初始状态 */
  
  .panel-enter,
  .panel-leave-active {
    transform: translate(0, -50%) scaleY(0.2);
    height: 0;
  }
  
  .panel-leave-active {
    /* 隐藏缩短时间 */
    /* transition: all 0.01s ease; */
  }
</style>
</style>