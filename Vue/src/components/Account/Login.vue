<template>
  <el-container style="background-color: #c6d1de;height: 100%">
    <el-main>
      <img src="../../assets/logo.png">
      <el-form label-position="left" :model="form" :rules="rules2" ref="form" label-width="80px">
        <h3 class="title" style="margin-bottom: 20px;">VuePHP</h3>
        <el-form-item label="帐号" prop="username">
          <el-input placeholder="请输入帐号" type="text" auto-complete="off" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" auto-complete="off" v-model="form.password"></el-input>
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
              this.loading = !this.loading
              if(_g.handleRes(res)){
                this.resetCommonData(res.data,'Home/apiList')
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

