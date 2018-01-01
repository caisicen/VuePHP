<template>
  <el-row>
    <el-col :span="12" v-for="item in apilist" :key="item.id">
      <el-card :body-style="{ padding: '0px' }">
        <img src="/src/assets/images/background.png" class="image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  import http from '../../assets/js/http'

  export default {
    data() {
      return {
        apilist: [{id: '', name: '网络问题，暂无数据'}],
        currentDate: new Date()
      }
    },
    mounted() {
      this.apiPost('app/BaiduAPI/apiList').then((res) => {
        if (res.code != 0) {
          let msg;
          if (res.error !== undefined) {
            msg = res.error;
          } else {
            msg = '暂时无法连接服务器'
          }
          this.$message({
            message: msg,
            type: 'warning'
          })
          setTimeout(()=>{
            router.replace('/')
          },1000)
        } else {
          this.apilist = res.data.list
        }
      });
    },
    mixins: [http]
  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
