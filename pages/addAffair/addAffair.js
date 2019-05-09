// pages/addAffair/addAffair.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputValue:''
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },


  addAffair(e) {
    //console.log(app.globalData.user_id);
    wx.request({
      url: app.globalData.datasetUrl +'/addNewAffair/',
      data: {
        userID: app.globalData.user_id,
        date: app.globalData.todayDate,
        content: this.data.inputValue
      },
      method: "POST",
      header: {
        'content-type': 'application/json'// 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
    /*//提交成功后清空输入框
    this.setData({
      result_time: '',
      result_msg: ''
    })*/
    wx.navigateBack({
      delta: 2
    })
  }

})