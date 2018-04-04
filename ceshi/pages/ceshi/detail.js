// pages/ceshi/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testObj:{},
    staticImg: "https://s.woniu8.com/img"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestObj.srv',
      data: {
        ttId: options.id
      },
      success: function (result) {
        var resObj = result.data.resObj;
        wx.setNavigationBarTitle({
          title: resObj.ttName
        });
        _this.setData({ testObj:resObj});
        console.log(resObj);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 150,
      timingFunction: "linear",
      delay: 0
    });
    animation.translateX(20).step();
    animation.translateX(-10).step();
    animation.translateX(20).step();
    animation.translateX(-10).step();
    animation.translateX(20).step();
    animation.translateX(-10).step();
    this.setData({ animation: animation.export() })
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
  
  }
})