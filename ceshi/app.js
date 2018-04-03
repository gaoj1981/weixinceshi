App({
  onLaunch: function (options) {
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
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
        }) 
      }
    });
    var _this = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              _this.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(_this.globalData.userInfo)
            }
          })
        }
      });
    }
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
  globalData: {userInfo:null}
})