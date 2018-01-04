<template>
  <div>
    <div>
      <el-table
        :data="apiRes"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="结果"
        >
        </el-table-column>
      </el-table>
    </div>
    <div v-if="matchFace">
      <el-button-group style="margin: 20px">
        <el-button type="primary" @click="redictFaceMatch()">人脸比对</el-button>
        <el-button type="primary" @click="redictAPIList()">功能列表</el-button>
      </el-button-group>
    </div>
    <div v-else>
      <el-button-group style="margin: 20px">
        <el-button type="primary" @click="redictAPIList()">功能列表</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import http from '../../assets/js/http'

  export default {
    data () {
      return {
        apiRes: [],
        matchFace: false
      }
    },
    methods: {
      redictFaceMatch(){
        this.$router.replace("/Home/faceMatch")
      },
      redictAPIList(){
        this.$router.replace("/Home/apiList")
      }
    },
    mounted () {
      if (this.$route.params.type == 'matchFace') {
        this.apiRes = this.$store.state.matchFace
        this.matchFace = true
      }
    },
    mixins: [http]
  }
</script>
