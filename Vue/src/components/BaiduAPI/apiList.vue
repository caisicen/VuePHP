<template>
  <el-row>
    <el-col :span="12" v-for="item in apilist" :key="item.id">
      <router-link :to=item.url>
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/test.png" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
          </div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>

</template>

<script>
  import http from '../../assets/js/http'

  export default {
    data() {
      return {
        apilist: [{id: '', name: '网络问题，暂无数据', url: ''}],
        currentDate: new Date()
      }
    },
    mounted() {
      this.apiPost('app/BaiduAPI/apiList').then((res) => {
        if(_g.handleRes(res)){
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
