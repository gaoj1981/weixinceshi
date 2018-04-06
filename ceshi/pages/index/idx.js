// pages/index/idx.js
var app = getApp();
Page({
  testDetail: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/ceshi/detail?id=' +event.target.id,
      success:function(){
      },
      complete:function(){
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    focusImg: 'http://s.woniu8.com/img/weixin/wxtest.jpg',
    testList:[],
    curPg:1,
    isHavePage:true,
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getCarousel.srv',
      data: {
        curOpenId: app.getCurOpenId()
      },
      success: function (res) {
        _this.setData({ imgUrls: res.data.resObj });
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestList.srv',
      data: {
        curOpenId: app.getCurOpenId(),
        fetchPage: _this.data.curPg
      },
      success: function (res) {
        _this.setData({ testList: res.data.resObj });
      }
    })
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
    if(this.data.isHavePage){

      var _this = this;
      wx.showLoading({
        title: '',
        success: function () {
          var nextPg = _this.data.curPg + 1;
          wx.request({
            url: 'https://manage.5dwo.com/out/woniu8/getTestList.srv',
            data: {
              curOpenId: app.getCurOpenId(),
              fetchPage: nextPg
            },
            success: function (res) {
              if (res.data.resObj.length > 0){
                var testList = _this.data.testList;
                testList = testList.concat(res.data.resObj);
                _this.setData({ testList: testList, curPg: nextPg });
                wx.hideLoading();
              }else{
                wx.hideLoading();
                wx.showToast({
                  title: '没有了',
                  icon: 'none',
                  duration: 1000
                })
                _this.setData({ isHavePage: false, curPg: nextPg });
              }
            }
          })

        }
      })

    }else{
      wx.showToast({
        title: '没有了',
        icon: 'none',
        duration: 1000
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  searchTest:function(){
    wx.showToast({
      title: '暂无相应内容',
      icon: 'loading',
      duration: 2000
    })
  }

})