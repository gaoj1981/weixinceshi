// pages/my/advise/iupage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '蜗牛吧留言',
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

  bindFormSubmit:function(e){
    var advise = e.detail.value.advise;
    if(advise.length<1){
      wx.showToast({
        title: '请说点什么吧',
        icon: 'none',
        duration: 2000,
      })
    } else if (advise.lenth > 500){
      wx.showToast({
        title: '你说的有点多',
        icon: 'none',
        duration: 2000,
      })
    }else{
      var _this = this;
      wx.request({
        url: 'https://manage.5dwo.com/out/wx/insAdvise.srv',
        data: {
          curOpenId: app.getCurOpenId(),
          advise: advise,
        },
        success: function (res) {
        },
        complete:function(){
          wx.showToast({
            title: '留言成功',
            icon: 'success',
            duration: 1000,
            complete:function(){
              setTimeout(
                function () {
                  wx.switchTab({
                    url: '/pages/my/myidx',
                  })
                },
                1000
              )
            }
          })
        }
      })
    }
    console.log(e)
    console.log(e.detail.value.textarea)
  },

})