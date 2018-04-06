App({
  onLaunch: function (options) {
    console.log('aaaaaaaaaaaaaa');
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
  globalData: { userInfo: null, staticImg:"https://s.woniu8.com/img"},
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
  },
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },

})