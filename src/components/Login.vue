<template>
  <div class="container">
    <div class="loginDiv">
      <h2 class="text-center">登陆</h2>
      <div class="inputBlock">
        <ht-form ref="wuqiku" info-type="info" :horizontal="true">
          <ht-form-group label="用户名：" label-width="20" name="username" :require="true" require-message="请输入用户名">
            <input type="text" name="username" v-model="username" class="form-control" @keypress.enter="login">

                    </ht-form-group>
          <ht-form-group label="密码：" label-width="20" name="password" :require="true" require-message="请输入用户名">
            <input type="password" name="password" v-model="password" class="form-control"  @keypress.enter="login">

                    </ht-form-group>
        </ht-form>
      </div>
      <div class="text-center" style="margin-bottom: 30px;">
        <el-button type="primary" style="width: 40%" @click="login()">登陆</el-button>
        <el-button type="primary">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Login",
    data: function () {
      return {
        username: "",
        password: ""
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      }
    },
    methods: {
      login() {
        if (this.username == 'admin' && this.password == '123456') {
          this.$store.commit("loginSuccess");
          console.log("登陆成功..........");
        }
      }
    }
  }
</script>
<style scoped>
  .loginDiv {
    width: 560px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%) translateY(-60%);
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .inputBlock {
    margin: 30px 50px 30px 30px;
  }
</style>