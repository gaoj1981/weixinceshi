// pages/ceshi/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testObj:{},
    testAsks:[],
    question:'',
    answer:{},
    staticImg: "https://s.woniu8.com/img",
    view1css:'need-show',
    view2css:'need-hide',
    talNums:0,
    isScore:0,
    nextVal: 2,
    scoreTal: 0,
    rateVal:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestObj.srv',
      data: {
        ttId: options.id,
        curOpenId: app.getCurOpenId()
      },
      success: function (result) {
        var resObj = result.data.resObj;
        wx.setNavigationBarTitle({
          title: resObj.ttName
        });
        var ttXlist = JSON.parse(resObj.ttXlist);
        var isScore = ttXlist[0].isScore;
        _this.setData({ testObj: resObj, testAsks: ttXlist, talNums:(ttXlist.length-1),isScore:isScore});
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
  
  },
  startTest:function(){
    this.setData({ view1css: 'need-hide',view2css:'need-show' });
    var xlist = this.data.testAsks;
    var isScore = this.data.isScore;
    if (isScore == "0") {
      
    } else if (isScore == "1") {
      this.data.scoreTal = 0;
      this.setData({ question: xlist[1].question, answer: xlist[1].answer})
    }
  },
  nextTest: function (event){
    var nextVal = event.target.dataset.gonext;
    var scoreTal = this.data.scoreTal + event.target.dataset.scval / 1;
    if (!isNaN(nextVal)) {
      this.setData({ question: this.data.testAsks[nextVal].question, answer: this.data.testAsks[nextVal].answer });
      var lenRate = (nextVal / this.data.talNums) * 100;
      if (lenRate > 99) { lenRate = 98; }
      this.setData({rateVal:lenRate,scoreTal:scoreTal});
    }else{
      this.setData({ rateVal: 100 });
      var xlist0Ans = this.data.testAsks[0].answer;
      var iptName = "A";
      for (var item in xlist0Ans) {
        if (scoreTal >= xlist0Ans[item] / 1) {
          iptName = item;
        }
      }
      console.log(scoreTal + ' jump to '+iptName);
      wx.navigateTo({
        url: '/pages/ceshi/end?id=' + this.data.testObj.ttId + '&res=' + iptName
      })
    }
  }
})