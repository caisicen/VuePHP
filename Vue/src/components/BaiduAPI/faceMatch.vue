<template>
  <el-form id="myform" :action="fileWeb" method="post">
    <el-upload ref="upload"
               :action="fileWeb"
               :on-change="handleChange"
               :onError="handleError"
               :onSuccess="handleSuccess"
               :before-upload="beforeUpload"
               :before-remove="beforeRemove"
               :on-exceed="handleExceed"
               :limit="limit"
               :file-list="fileList3"
               :headers="myHeaders"
               :data="requestData">
      <el-button size="big" type="primary">选择图片</el-button>
      <div class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
    <el-form-item style="margin-top: 30px">
      <el-button size="big" type="primary" @click="faceMatch()" v-loading="loading">比对</el-button>
      <el-button size="big" type="info" @click="resetUpload()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import http from '../../assets/js/http'

  export default {
    data () {
      return {
        apiUrl: '', // API的请求地址
        fileList3: [], // 图片信息
        fileWeb: '', // 图片上传的url
        myHeaders: {}, // 请求头
        requestData: {'type': 'img'}, // 请求体的数据
        limit: 3, // 限制的文件个数
        remove: false, // 是否移除，供校验不通过时自动移除使用，否则还是会出法移除方法的提示
        loading: false, // 提交按钮的加载状态
      }
    },
    methods: {
      // 上传文件之前的处理方法，校验方法
      beforeUpload (file) {
        try {
          let limitSize = 2 // 运行单个文件的大小,M
          const isIMG = (file.type === 'image/png' || file.type === 'image/jpeg' )
          const isLtSize = (file.size / 1024 / 1024 < 2)
          if (!isIMG) {
            throw '只能上传jpg或者png格式图片'
          }
          if (!isLtSize) {
            throw '文件大小不能超过' + limitSize + 'M'
          }
          return true
        } catch (msg) {
          if (typeof(msg) == 'string') {
            this.$message.error(msg)
          } else {
            this.$message.error('上传的图片有误，请重新上传')
          }
          this.remove = true
          return false
        }
      },
      // 移除文件时处理方法
      beforeRemove (file, fileList) {
//        if (this.remove) { // 校验不通过进行移除文件，不触发提示
//          this.remove = false
//          return true
//        }
        this.fileList3 = fileList
        return true
//        return this.$confirm(`确定移除 ${ file.name }？`, '提示')
      },
      // 上传文件错误时处理方法
      handleError () {
        this.$message.warning('无法连接服务器，请稍后重试')
      },
      // 上传文件成功后回调方法
      handleSuccess (response, file, fileList) {
        if (!_g.handleRes(response)) {
          this.remove = true
          this.$refs.upload.handleRemove(file)
          return
        }
      },
      // 选择文件改变时触发方法
      handleChange (file, fileList) {
        this.fileList3 = fileList
      },
      // 超过限制时处理方法
      handleExceed (file, fileList) {
        this.$message.warning('一次最多只能比对' + this.limit + '张照片')
      },
      // 重置已选文件方法
      resetUpload () {
        this.$refs.upload.clearFiles()
        this.loading = false
      },
      // 根据列表中的图片，访问后台进行比对
      faceMatch () {
        if (this.loading) {
          this.$message.warning('正在比对中，请勿重复提交')
          return
        }
        if (this.fileList3.length > 1) {
          this.loading = !this.loading
          let matchImg = []
          this.fileList3.forEach((value, index) => {
            matchImg.push({fileSrc: value.response.data.fileSrc, name: value.name})
          })
          let data = {matchImg: matchImg}
          this.apiPost('app/baiduapi/faceMatch', data).then((res) => {
            this.loading = !this.loading
            if(_g.handleRes(res)){

            }
          })
        } else {
          this.$message.warning('最少需要两张照片进行比对')
        }
      }
    },
    mounted () {
      this.fileWeb = axios.defaults.baseURL + '/app/FileAPI/upload'
      this.myHeaders = {'authKey': Lockr.get('authKey')}
    },
    mixins: [http]
  }
</script>

<style>
  .el-message-box {
    width: 90%
  }

  #myform {
    margin-top: 50%;
  }
</style>
