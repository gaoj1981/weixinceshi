App({
  onLaunch: function (options) {
    console.log('aaaaaaaaaaaaaa');
    this.setCurUserInfo();
    this.getCurOpenId();
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
  globalData: { userInfo: null},
  getCurOpenId: function () {
    try {
      var curOpenId = wx.getStorageSync('stor_openId');
      if(curOpenId){
      } else {
        this.userWxLogin();
        curOpenId = wx.getStorageSync('stor_openId');
      }
      return curOpenId;
    }catch(e){

    }
  },
  setCurUserInfo:function(){
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
  userWxLogin:function(){
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://manage.5dwo.com/out/wx/onLogin.srv',
            data: {
              code: res.code
            },
            success: function (result) {
              wx.setStorageSync('stor_openId', result.data.curOpenId);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})