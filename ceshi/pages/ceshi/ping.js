// pages/ceshi/ping.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingList: [],
    ttId: '',
    curPg: 1,
    isHavePage: true,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ "ttId": options.ttId})
    wx.setNavigationBarTitle({
      title: '网友评论',
    })
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestPingList.srv',
      data: {
        curOpenId: app.getCurOpenId(),
        ttId: options.ttId,
        fetchPage: 1,
        limit:20
      },
      success: function (result) {
        var resObj = result.data.resObj;
        _this.setData({ pingList: resObj });
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
    if (this.data.isHavePage) {

      var _this = this;
      wx.showLoading({
        title: '',
        success: function () {
          var nextPg = _this.data.curPg + 1;
          wx.request({
            url: 'https://manage.5dwo.com/out/woniu8/getTestPingList.srv',
            data: {
              curOpenId: app.getCurOpenId(),
              fetchPage: nextPg,
              limit: 20,
            },
            success: function (res) {
              if (res.data.resObj.length > 0) {
                var testList = _this.data.testList;
                testList = testList.concat(res.data.resObj);
                _this.setData({ testList: testList, curPg: nextPg });
                wx.hideLoading();
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '已经到底啦',
                  icon: 'none',
                  duration: 1000
                })
                _this.setData({ isHavePage: false, curPg: nextPg });
              }
            }
          })

        }
      })

    } else {
      wx.showToast({
        title: '“蜗”是有底线的',
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

  bindFormSubmit: function (e) {
    var advise = e.detail.value.advise;
    if (advise.length < 1) {
      wx.showToast({
        title: '请说点什么吧',
        icon: 'none',
        duration: 2000,
      })
    } else if (advise.lenth > 140) {
      wx.showToast({
        title: '你说的有点多',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var _this = this;
      wx.request({
        url: 'https://manage.5dwo.com/out/woniu8/insTestPing.srv',
        data: {
          curOpenId: app.getCurOpenId(),
          ttId: this.data.ttId,
          pingNote: advise,
        },
        success: function (res) {
          if(res.data.state == 1){
            wx.showToast({
              title: '成功，待审核',
              icon: 'success',
              duration: 1000,
              complete: function () {
                setTimeout(
                  function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  },
                  1000
                )
              }
            })
          } else if (res.data.state == 0){
            wx.showToast({
              title: res.data.resMsg,
              icon: 'none',
            })
          }
        },
        fail:function(res){

        },
        complete: function () {
        }
      })
    }
  }

})