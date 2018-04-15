// pages/my/resp/search.js
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
    searchWord: '',
    focus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchTestInit(options.searchWord);
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
            url: 'https://manage.5dwo.com/out/woniu8/searchTestList.srv',
            data: {
              curOpenId: app.getCurOpenId(),
              fetchPage: nextPg,
              searchWord: _this.data.searchWord,
              limit: 20,
            },
            success: function (res) {
              if (res.data.resObj) {
                var testList = _this.data.testList;
                testList = testList.concat(res.data.resObj);
                _this.setData({ testList: testList, curPg: nextPg });
                wx.hideLoading();
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '“蜗”是有底线的',
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

  searchTest: function (e) {
    console.log(e);
    var searchWord = e.detail.value;
    if (searchWord.length < 1) {
      wx.showToast({
        title: '请输入要查询的内容',
        icon: 'none',
        duration: 1000
      })
    } else {
      this.searchTestInit(searchWord);
    }
  },

  searchTestInit:function(keyword){
    this.setData({ searchWord: keyword });
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/searchTestList.srv',
      data: {
        searchWord: keyword,
        fetchPage: 1,
        limit: 20,
        curOpenId: app.getCurOpenId()
      },
      success: function (res) {
        if (res.data.resObj) {
          _this.setData({ testList: res.data.resObj, curPg: 1 });
        } else {
          wx.showToast({
            title: '无对应的搜索结果',
            icon: 'none',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          _this.setData({ testList: [], curPg: 1,focus:true });
        }
      }
    })

  }

})