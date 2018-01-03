const commonFn = {
  j2s (obj) {
    return JSON.stringify(obj)
  },
  shallowRefresh (name) {
    router.replace({path: '/refresh', query: {name: name}})
  },
  closeGlobalLoading () {
    setTimeout(() => {
      store.dispatch('showLoading', false)
    }, 0)
  },
  openGlobalLoading () {
    setTimeout(() => {
      store.dispatch('showLoading', true)
    }, 0)
  },
  cloneJson (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  toastMsg (type, msg) {
    switch (type) {
      case 'normal':
        bus.$message(msg)
        break
      case 'success':
        bus.$message({
          message: msg,
          type: 'success'
        })
        break
      case 'warning':
        bus.$message({
          message: msg,
          type: 'warning'
        })
        break
      case 'error':
        bus.$message.error(msg)
        break
    }
  },
  clearVuex (cate) {
    store.dispatch(cate, [])
  },
  getHasRule (val) {
    const moduleRule = 'admin'
    let userInfo = Lockr.get('userInfo')
    if (userInfo.id == 1) {
      return true
    } else {
      let authList = moduleRule + Lockr.get('authList')
      return _.includes(authList, val)
    }
  },
  handleRes (response) { // 处理返回的http响应结果
    if (response.code != 0) {
      let msg
      if (response.error !== undefined && response.error != '') {
        msg = response.error
      } else {
        msg = '暂时无法连接服务器'
      }
      bus.$message({
        message: msg,
        type: 'warning'
      })
      if (response.code == 3002) { // 302设置重定向跳转到首页
        let url = '/'
        if (response.data.redirectURL !== undefined) {
          url = response.data.redirectURL
        }
        setTimeout(() => {
          router.replace(url)
        }, 1000)
      }
      if (response.code == 3003) {
        setTimeout(() => {
          router.go(0)
        }, 1000)
      }
      return false
    }
    return true
  }
}

export default commonFn
