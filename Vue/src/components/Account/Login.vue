<template>
  <el-container>
    <el-main>
      <el-form label-position="left" :model="form" :rules="rules2" ref="form" label-width="80px"
               style="margin-top: 30%">
        <h3 class="title" style="margin-bottom: 20px;">VuePHP</h3>
        <el-form-item label="帐号" prop="username">
          <el-input placeholder="请输入帐号" type="text" auto-complete="off" class="loginInput"
                    v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" auto-complete="off" class="loginInput"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-button-group style="width:100%">
          <el-button type="success" style="width:50%" @click.native.prevent="submit('form')" v-loading="loading">登录
          </el-button>
          <el-button type="primary" style="width:50%">注册</el-button>
        </el-button-group>

      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  /* eslint-disable semi */

  import http from '../../assets/js/http'

  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      submit: function (form) {
        if (this.loading) return
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            this.loading = !this.loading
            let data = {}
            data.username = this.form.username
            data.password = this.form.password
            this.apiPost('app/Login/login', data).then((res) => {
              if (res.code != 0) {
                this.loading = !this.loading
                let msg;
                if(res.error !== undefined){
                  msg = res.error;
                } else {
                  msg = '暂时无法连接服务器'
                }
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              } else{
                this.loading = !this.loading
                this.resetCommonData(res.data,'hello')
                _g.toastMsg('success', '登录成功')
              }
            })
          }
        })
      }
    },
    mixins: [http]
  }
</script>

<style>
  .loginform {

  }

  .loginInput {

  }
</style>
