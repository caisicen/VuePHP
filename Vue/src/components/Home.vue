<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import http from '../assets/js/http'

  export default {
    data() {
      return {
        msg: '功能列表'
      }
    },
    method() {

    }
  }
</script>
