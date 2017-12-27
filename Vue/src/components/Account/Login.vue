<template>
  <el-container>
    <el-main>
      <el-form label-position="left" label-width="80px" style="margin-top: 30%">
        <h3 class="title" style="margin-bottom: 20px;">VuePHP</h3>
        <el-form-item label="帐号">
          <el-input placeholder="请输入帐号" type="text" auto-complete="off" class="loginInput"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" type="password" auto-complete="off" class="loginInput"></el-input>
        </el-form-item>
        <el-button-group style="width:100%">
          <el-button type="success" style="width:50%">登录</el-button>
          <el-button type="primary" style="width:50%">注册</el-button>
        </el-button-group>

      </el-form>
    </el-main>
  </el-container>
</template>

<style>
  .loginform {
    margin-top: 30%;
  }
  .loginInput {

  }
</style>
