// pages/my/test/mytest.js
var app = getApp();
Page({
  testDetail: function (event) {
    wx.navigateTo({
      url: '/pages/ceshi/detail?id=' + event.target.id,
      success: function () {
      },
      complete: function () {
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    staticImg: app.globalData.staticImg,
    testList: [],
    curPg: 1,
    isHavePage: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getMyTestList.srv',
      data: {
        col0test1: 1,
        fetchPage: _this.data.curPg,
        limit: 20,
        curOpenId: app.getCurOpenId()
      },
      success: function (res) {
        _this.setData({ testList: res.data.resObj });
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
  
  }
})