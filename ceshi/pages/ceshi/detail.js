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
    this.setData({ question: xlist[1].question, scoreTal:0 });
    this.answerView4Img(1);
    this.imgAskView(1);
  },
  nextTest: function (event){
    var nextVal = event.target.dataset.gonext;
    var scoreTal = 0;
    var isScore = this.data.isScore;
    if (isScore == "1") {
      scoreTal = this.data.scoreTal + event.target.dataset.scval / 1;
    }

    if (!isNaN(nextVal)) {
      this.setData({ question: this.data.testAsks[nextVal].question});
      this.answerView4Img(nextVal);
      this.imgAskView(nextVal);
      var lenRate = (nextVal / this.data.talNums) * 100;
      if (lenRate > 99) { lenRate = 98; }
      this.setData({rateVal:lenRate,scoreTal:scoreTal});
    }else{
      this.setData({ rateVal: 100 });
      var xlist0Ans = this.data.testAsks[0].answer;
      var iptName = "A";
      if (isScore == "1") {
        for (var item in xlist0Ans) {
          if (scoreTal >= xlist0Ans[item] / 1) {
            iptName = item;
            break;
          }
        }
      }else if(isScore == "0"){
        iptName = nextVal;
      }
      
      wx.redirectTo({
        url: '/pages/ceshi/end?id=' + this.data.testObj.ttId + '&res=' + iptName + '&title=' + this.data.testObj.ttName + '&img=' + app.globalData.staticImg + this.data.testObj.ttImg
      })
    }
  },

  imgAskView:function(index){
    var xlist = this.data.testAsks;
    if (xlist[index].img.length > 1) {
      var imgAsk = [{
        name: 'img',
        attrs: {
          class: '',
          style: 'width:100%;',
          src: xlist[index].img
        }
      }]
      this.setData({ imgAsk: imgAsk });
    }else{
      this.setData({ imgAsk: [] });
    }
  },

  answerView4Img:function(index){
    var xlist = this.data.testAsks;
    var answer = xlist[index].answer;
    var title = "";
    var imgStr = "";
    for (var item in answer) {
      title = answer[item].title;
      if(title.indexOf('<img') == 0){
        imgStr = title.substring(title.indexOf('http'));
        imgStr = imgStr.substring(0,imgStr.indexOf("'>"));
        answer[item].imgAns = imgStr;
      }
    }
    this.setData({ answer: answer });
  }
})