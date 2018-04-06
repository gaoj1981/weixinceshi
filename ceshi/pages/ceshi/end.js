// pages/ceshi/end.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view1css: 'need-show',
    view2css: 'need-hide',
    ttName:'',
    ttImg:'',
    tsDesc:'',
    ttId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: "linear",
      delay: 0
    });
    animation.scale(0.5, 0.5).scale(2, 2).scale(0.5, 0.5).scale(2, 2).scale(0.5, 0.5).scale(2, 2).step();
    this.setData({ animation: animation.export() })

    var _this = this;
    this.setData({ttId:options.id,ttName:options.title,ttImg:options.img});
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestRes.srv',
      data: {
        ttId: options.id,
        ttSel:options.res,
        curOpenId: app.getCurOpenId()
      },
      success: function (result) {
        var resObj = result.data.resObj;
        wx.setNavigationBarTitle({
          title: resObj.ttTpl + resObj.ttRes
        })
        _this.setData({ resObj: resObj, tsDesc: app.convertHtmlToText(resObj.tsDesc)});
        setTimeout(function () {
          _this.setData({ view1css: 'need-hide', view2css: 'need-show' });
        }, 2000)
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
          animation: {
            duration: 2000,
            timingFunc: 'easeIn'
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  testAgain:function(){
    wx.redirectTo({
      url: '/pages/ceshi/detail?id='+this.data.ttId,
    })
  }
})