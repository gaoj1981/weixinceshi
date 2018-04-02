App({
  onLaunch: function (options) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://manage.5dwo.com/out/wx/onLogin.srv',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  onShow: function (options) {
    console.log('======Do something when show.');
  },
  onHide: function () {
    console.log('======Do something when hide.');
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})