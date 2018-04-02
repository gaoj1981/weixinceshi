App({
  onLaunch: function (options) {
    console.log(options.scene);
    console.log('======Do something initial when launch.');
  },
  onShow: function (options) {
    console.log('======Do something when show.');
  },
  onHide: function () {
    console.log('======Do something when hide.');
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})