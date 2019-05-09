var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ' ',
    affairID: '',
    originValue:''
  },

  onLoad: function (options) {
    this.setData({
      affairID: options.affairID,
      originValue: options.originContent
    })
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  confirmModify() {
    var _this = this;
    //var affair_id = e.currentTarget.dataset.text
    //console.log(_this.data.inputValue)
    wx.request({
      url: app.globalData.datasetUrl +'/modifyAffair/',
      data: {
        affairID: _this.data.affairID,
        content: _this.data.inputValue
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      }
    })
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

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