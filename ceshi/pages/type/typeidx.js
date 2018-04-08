// pages/type/typeidx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticImg: app.globalData.staticImg,
    curHeight: wx.getSystemInfoSync().windowHeight,
    curWidth: wx.getSystemInfoSync().windowWidth,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    curPg: 1,
    tplObj: {
      testList: [],
      staticImg: app.globalData.staticImg,
      curWidth: wx.getSystemInfoSync().windowWidth
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTestList4Type(0,1);
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
  
  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    var _datasetId = e.target.dataset.id;
    console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });

    this.getTestList4Type(_datasetId,1);
  },

  getTestList4Type: function (typeId,curPg){

    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestList.srv',
      data: {
        curOpenId: app.getCurOpenId(),
        fetchPage: curPg,
        typeId:typeId,
        limit:20,
      },
      success: function (res) {
        _this.setData({ tplObj: { testList: res.data.resObj, staticImg: app.globalData.staticImg, curWidth: wx.getSystemInfoSync().windowWidth} });
      }
    })

  },

  testDetail: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/ceshi/detail?id=' + event.target.id,
      success: function () {
      },
      complete: function () {
      }
    })
  },
  
  scrollBottom:function(){
    console.log(111111111111)
  }
})