<template>
  <div class="container">
    <div class="col-md-8 col-md-offset-2">
      <panel title="表单设计">
        <h2 class="text-center">表单</h2>
        <ma-form :horizontal="true" ref="userInfo" label-width="20">
          <ma-form-group name="userName" label="用户名称：" :require="true" require-message="请输入用户名称">
            <input type="text" name="userName" v-model="userName" placeholder="用户名称" class="form-control">
          </ma-form-group>

          
          <ma-form-group name="dates" label="注册日期：" :require="true" require-message="请选择日期">
            <ht-date min-date="today" placeholder="请选择日期" name="dates" required></ht-date>
          </ma-form-group>

          <ma-form-group name="word" label="自我介绍：" :require="true" require-message="请输入自我介绍内容">
            <input type="text" name="word" placeholder="请输入您的自我介绍" required class="form-control">
          </ma-form-group>

          <ma-form-group name="age" label="年龄：" :require="true" require-message="年龄为必填项" min="18" max="80" min-message="未满十八岁不予注册"
            max-message="超过八十岁不予注册">
            <input type="text" name="age" placeholder="请输入年龄" class="form-control">
          </ma-form-group>

          <ma-form-group name="area" label="选择目的地：" min="4" min-message="请至少选择四项">
            <ht-checkbox v-model="areas" :label="1" name="area">天津市</ht-checkbox>
            <ht-checkbox v-model="areas" :label="2" name="area">河东市</ht-checkbox>
            <ht-checkbox v-model="areas" :label="3" name="area">河西市</ht-checkbox>
            <ht-checkbox v-model="areas" :label="4" name="area">河男市</ht-checkbox>
            <ht-checkbox v-model="areas" :label="5" name="area">河女市</ht-checkbox>
            <ht-checkbox v-model="areas" :label="6" name="area">河绿市</ht-checkbox><br>
          </ma-form-group>

          <ma-form-group name="sex" label="选择性别：" :require="true" require-message="请选择性别">
            <ht-radio v-model="sex" name="sex" label="M" :disabled="areas.length>2">男</ht-radio>
            <ht-radio v-model="sex" name="sex" label="W" :disabled="areas.length>2">女</ht-radio>
          </ma-form-group> 

          <ma-form-group name="advice" label="意见/建议：" :require="true" require-message="请对我们提出宝贵的建议">
            <textarea name="advice" cols="30" rows="10" v-model="advice" class="form-control"></textarea>
          </ma-form-group>

          <div class="text-right">
            <button type="button" class="btn btn-default" @click="cancelCheckForm('userInfo')">取消</button>
            <button type="button" class="btn btn-large btn-primary" @click="submitForm('userInfo')">保存</button>
          </div>
        </ma-form>
      </panel>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NewForm",
    props: {
      //对外获取的数据
    },
    data: function () {
      //组件内数据部分
      return {
        userName: "",
        areas: [1, 2],
        sex: "",
        advice: ""
      }
    },
    mounted: function () {
      //组件生成时调用
    },
    methods: {
      cancelCheckForm: function (formName) {
        this.$refs[formName].clearValidate();
      },
      submitForm: function (formName) {
        this.$refs[formName].checkItem(function (isPass, errorList, result) {
          if (isPass) {
            this.$alert(
              "提示",
              "添加成功",
              function ($content) {},
              function ($content) {}
            );
            console.log("通过");
          } else {
            this.$confirm(
              "<b>请修改您的输入内容</b>",
              errorList.join("<br>")
            ); 
          }
        });
      },
    }
  }
</script>
<style scoped>
</style>