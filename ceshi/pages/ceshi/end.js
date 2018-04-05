// pages/ceshi/end.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    view1css: 'need-show',
    view2css: 'need-hide',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(2, -2).scale(-2, 2).scale(2, -2).scale(-2, 2).step()
    animation.rotateY(-180).rotateY(180).rotateY(-180).rotateY(180).step()
    this.setData({
      animationData: animation.export()
    })

    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestRes.srv',
      data: {
        ttId: options.id,
        ttSel:options.res,
        curOpenId: app.getCurOpenId()
      },
      success: function (result) {
        var resObj = result.data.resObj;
        console.log(resObj);
        wx.setNavigationBarTitle({
          title: resObj.tsNote
        });
        _this.setData({resObj: resObj});
        setTimeout(function () {
          _this.setData({ view1css: 'need-hide', view2css: 'need-show' });
        }, 3000)
        
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