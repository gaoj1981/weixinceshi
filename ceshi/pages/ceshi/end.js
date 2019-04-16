// pages/ceshi/end.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticImg: app.globalData.staticImg,
    view1css: 'need-show',
    view2css: 'need-hide',
    view3css: 'need-hide',
    sharecss: 'need-hide',
    ttName:'',
    ttImg:'',
    tsDesc:'',
    ttId:'',
    ttImgCav: '',
    tsImgCav: '',
    qrImgCav:'',
    resImgCav:'',
    downloadImgNum: 0,
    testList: [],
    curPg: 1,
    colState:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ colState: options.colState});
    console.log('监听页面加载')
    var _this = this;
    this.setData({ttId:options.id,ttName:options.title,ttImg:options.img});
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestRes.srv',
      data: {
        ttId: options.id,
        ttSel:options.res,
        curOpenId: app.getCurOpenId()
      },
      success: function (result) {
        var resObj = result.data.resObj;
        wx.setNavigationBarTitle({
          title: resObj.ttTpl + resObj.ttRes
        })
        _this.setData({ resObj: resObj, tsDesc: app.convertHtmlToText(resObj.tsDesc) });
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
          animation: {
            duration: 2000,
            timingFunc: 'easeIn'
          }
        });

        wx.downloadFile({
          url: app.globalData.staticImg + resObj.tsImg,
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              var downNum = _this.data.downloadImgNum + 1;

              _this.setData({ tsImgCav: res.tempFilePath, downloadImgNum:downNum });
              if (downNum == 3) {
                _this.setData({ view1css: 'need-hide', view2css: 'need-show', view3css: 'need-show', sharecss: 'need-show' });
                _this.initCanvas();
              }
            }
          }
        })
        wx.downloadFile({
          url: _this.data.ttImg,
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              var downNum = _this.data.downloadImgNum + 1;

              _this.setData({ ttImgCav: res.tempFilePath, downloadImgNum: downNum });
              if (downNum == 3) {
                _this.setData({ view1css: 'need-hide', view2css: 'need-show', view3css: 'need-show', sharecss: 'need-show' });
                _this.initCanvas();
              }
            }
          }
        })
        wx.downloadFile({
          url: app.globalData.staticImg + '/weixin/qrcode_68.jpg',
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              var downNum = _this.data.downloadImgNum + 1;

              _this.setData({ qrImgCav: res.tempFilePath, downloadImgNum: downNum });
              if (downNum == 3) {
                _this.setData({ view1css: 'need-hide', view2css: 'need-show',view3css:'need-show',sharecss:'need-show' });
                _this.initCanvas();
              }
            }
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('监听页面初次渲染完成')
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/getTestList.srv',
      data: {
        curOpenId: app.getCurOpenId(),
        fetchPage: _this.data.curPg,
        limit: 10,
        jxFlg:0,
        listType:1,
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

    console.log('监听页面显示')
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

  testAgain:function(){
    wx.redirectTo({
      url: '/pages/ceshi/detail?id='+this.data.ttId,
    })
  },

  initCanvas:function(){
    var curWidth = wx.getSystemInfoSync().windowWidth;
    var cxtRes = wx.createCanvasContext('secondCanvas');
    cxtRes.setFillStyle('#ED0385');
    cxtRes.fillRect(0, 0, curWidth, 30);

    cxtRes.setTextAlign('center');
    cxtRes.setFontSize(16);
    cxtRes.setFillStyle('#FFF');
    cxtRes.fillText(this.data.ttName, curWidth / 2, 20);

    cxtRes.drawImage(this.data.ttImgCav, 0, 30, curWidth, 170)
    
    cxtRes.drawImage(this.data.tsImgCav, 10, 60, 100, 100)

    cxtRes.setGlobalAlpha(0.8);
    cxtRes.setFillStyle('#F2F2F2')
    cxtRes.fillRect(120, 60, curWidth - 130, 100)

    cxtRes.setTextAlign('center');
    cxtRes.setFontSize(18);
    cxtRes.setFillStyle('red');
    cxtRes.fillText(this.data.resObj.ttTpl, 120 + (curWidth - 130) / 2, 100);

    cxtRes.setTextAlign('center');
    cxtRes.setFontSize(16);
    cxtRes.setFillStyle('red');
    cxtRes.fillText(this.data.resObj.ttRes, 120 + (curWidth - 130) / 2, 140);

    cxtRes.setGlobalAlpha(1);
    cxtRes.setFillStyle('#F2F2F2');
    cxtRes.fillRect(0, 200, curWidth, 200);

    var resDesc = app.convertHtmlToText(this.data.resObj.tsDesc);
    var posiX = 0;
    var posiY = 200;
    var rowNum = 1;
    var colNum = 1;
    var posiStep = 15;
    var avgNum = curWidth / 15;
    cxtRes.font = 'italic 14px sans-serif ';
    cxtRes.setFillStyle('#333');
    for (var i = 0; i < resDesc.length; i++) {
      cxtRes.fillText(resDesc.charAt(i), posiX + (rowNum * posiStep), posiY + (colNum * 23));
      rowNum++;
      if (rowNum > (avgNum - 1)) {
        rowNum = 1;
        colNum++;
      }
    }

    cxtRes.setFillStyle('#FFD92C');
    cxtRes.fillRect(0, 400, curWidth, 80);

    cxtRes.setTextAlign('left');
    cxtRes.setFontSize(14);
    cxtRes.setFillStyle('#FF3333');
    cxtRes.fillText(this.data.ttName, 100, 430);

    cxtRes.drawImage(this.data.qrImgCav, 10, 408, 68, 68)

    cxtRes.setFillStyle('#000');
    cxtRes.fillRect(90, 450, 120, 15);

    cxtRes.setTextAlign('center');
    cxtRes.setFontSize(10);
    cxtRes.setFillStyle('#FFF');
    cxtRes.fillText("长按识别二维码来测测吧", 150, 460);

    cxtRes.setTextAlign('right');
    cxtRes.setFontSize(10);
    cxtRes.setFillStyle('#222');
    cxtRes.fillText("——蜗牛吧趣测试", curWidth - 10, 460);

    var _this = this;
    cxtRes.draw(false, function (e) {
      wx.canvasToTempFilePath({
        canvasId: 'secondCanvas',
        success: function (res) {
          console.log(res);
          _this.setData({ resImgCav: res.tempFilePath, view3css:'' });
        }
      })

    });

    return true;
  },

  saveResImg: function () {
    wx.previewImage({
      current: this.data.resImgCav,
      urls: [this.data.resImgCav],
    })
  },

  testDetail: function (event) {
    wx.navigateTo({
      url: '/pages/ceshi/detail?id=' + event.target.id,
      success: function () {
      },
      complete: function () {
      }
    })
  },
  
  goIndex: function (event){
    wx.switchTab({
      url: '/pages/index/idx'
    })
  },

  goTypeIdx: function (event) {
    wx.switchTab({
      url: '/pages/type/typeidx'
    })
  },

  colTest: function (event) {

    var colState = this.data.colState;
    var colFlg = 1;
    if(colState==1){
      colFlg = 0;
    }
    var _this = this;
    wx.request({
      url: 'https://manage.5dwo.com/out/woniu8/colTest.srv',
      data: {
        ttId: this.data.ttId,
        ttName: this.data.ttName,
        colFlg: colFlg,
        curOpenId: app.getCurOpenId()
      },
      success: function (result) {
        _this.setData({colState:colFlg});
        var title = '收藏成功';
        if(colFlg==0){
          title = '已取消收藏';
        }
        wx.showToast({
          title: title,
          icon: 'success',
          duration: 1000
        })
      }
    })
    
  },

  zanTest:function(){
    this.setData({ zanState:1});
  },

  shareTest:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  goComment: function () {
    wx.navigateTo({
      url: '/pages/ceshi/ping?ttId=' + this.data.ttId,
      success: function () {
      },
      complete: function () {
      }
    })
  }

})