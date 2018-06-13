<template>
  <div>
    <h1>歌手信息
      <button class="btn btn-success pull-right" @click="back()">返回</button>
    </h1>
    <!-- <h2>用户ID:{{userId}}</h2> -->
    <div style="overflow:auto;">
      <img :src="info.img1v1Url" alt="" class="img-thumbnail" style="width:200px;height:200px;float:left;">
      <div style="margin-left:220px;">
        <h4>{{info.name}}</h4>
        <p>单曲数：
          <b>{{info.musicSize}}</b>
        </p>
        <p>专辑数：
          <b>{{info.albumSize}}</b>
        </p>
        <p>MV数：
          <b>{{info.mvSize}}</b>
        </p>
        <p>
          <b>简介：</b>{{info.briefDesc}}
        </p>
      </div>
    </div>
    <hr style="clear:both;">
    <div>

      <ht-tabs>
        <ht-tab title="<b>热门歌曲</b>">
          <ol>
            <li v-for="(x,$index) in hot">{{x.name}}</li>
          </ol>
        </ht-tab>
        <ht-tab title="<b>热门MV</b>">
          <div class="row">
            <br>
            <template v-for="(x,$index) in similarList">
              <div class="col-md-3">
                <div class="thumbnail" style="position: relative;">
                  <img :src="x.imgurl" class="img-responsive img-thumbnail" alt="">
                  <div class="caption" style="position: absolute;
                      border-bottom-left-radius: 4px;
                      border-bottom-right-radius: 4px;
                      bottom: 0;
                      width: 100%;
                      background: #ddd;
                      box-sizing: border-box;
                      left: 0;
                      padding-bottom: 5px;
                      background-color: #000000;
                      background-color: rgba(0,0,0,0.5);">
                    <h5 style="color:#fff;"><b>{{x.name.length>7?x.name.slice(0,7)+'...':x.name}}</b> </h5>
                    <h6 style="color:#fff;">播放次数:{{x.playCount}}</h6>
                  </div>
                </div>
              </div>
               <template v-if="$index%4==3">
                <div style="clear:both;"></div>
              </template>
</template>
</div>
</ht-tab>
<ht-tab title="<b>歌手详情</b>">
  <br>
  <p>
    <b>{{info.name}}简介</b>
  </p>
  <p class="p-word">{{detail.briefDesc}}</p>
  <hr>
  <template v-for="(x,$index) in detail.introduction">
            <p>
              <b>{{x.ti}}</b>
            </p>
            <p class="p-word">{{x.txt}}</p>
          </template>

</ht-tab>
</ht-tabs>
</div>
<hr>

</div>
</template>
<script>
  import router from "./../../router/index.js";
  export default {
    name: "MusicUser",
    router,
    data: function() {
      return {
        userId: "",
        // 歌手信息
        info: {},
        // 热门歌曲
        hot: [],
        // 相似歌手
        similarList: [],
        detail: {}
      };
    },
    mounted: function() {
      this.userId = this.$route.params.id;
      this.getUser(this.userId);
      this.getMV(this.userId);
      this.getDetail(this.userId);
    },
    methods: {
      result(data) {
        console.log(JSON.stringify(data));
      },
      getUser(userId) {
        let self = this;
        $.ajax({
          type: "GET",
          url: "http://localhost:9999/artists",
          data: {
            id: userId
          },
          dataType: "json",
          success: function(data, textStatus, jqXHR) {
            if (data != null && data != "") {
              if (data.code == 200) {
                self.info = data.artist;
                self.hot = data.hotSongs;
              } else {}
            } else {}
          }
        });
      },
      getMV(userId) {
        let self = this;
        $.ajax({
          type: "GET",
          url: "http://localhost:9999/artist/mv",
          data: {
            id: userId
          },
          dataType: "json",
          success: function(data, textStatus, jqXHR) {
            if (data != null && data != "") {
              self.similarList = data.mvs;
            }
          }
        });
      },
      getDetail(userId) {
        let self = this;
        $.ajax({
          type: "GET",
          url: "http://localhost:9999/artist/desc",
          data: {
            id: userId
          },
          dataType: "json",
          success: function(data, textStatus, jqXHR) {
            if (data != null && data != "") {
              if (data.code == 200) {
                self.detail = data;
              }
            }
          }
        });
      },
      back() {
        // router.push({
        this.$router.back()
          //   path: "/music"
          // });
      }
    },
    beforeRouteEnter: (to, from, next) => {
      const userid = to.params.id;
      next();
    }
  };
</script>
<style scoped>
  .p-word {
    line-height: 28px;
    text-indent: 2em;
  }
</style>