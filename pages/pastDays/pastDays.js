// pages/pastDays/pastDays.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:[
      {day:'', completion:''}
    ],
    completion:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var _this = this;

    _this.setData({
      display: [
        { day: '', completion: '' }
      ],
      completion: []
    })
    wx.request({
      url: app.globalData.datasetUrl + '/queryPastDays/',
      data: {
        userID: app.globalData.user_id
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        //console.log(res.data.result.length)
        for (var i = 0; i < res.data.result.length; i++) {
          var temp = "display[" + i + "].day"
          _this.setData({
            [temp]: res.data.result[i]
          })
        }
        if (_this.displayCallback) {
          _this.displayCallback(res.data.result)
        }
      }
    })

    _this.degreeOfCompletion();

    _this.completionCallback = completion => {
      if (completion != '') {
        for (var i = 0; i < _this.data.completion.length; i++) {
          var temp = "display[" + i + "].completion"
          _this.setData({
            [temp]: _this.data.completion[i]
          })
        }
      }
    }

    console.log(_this.data.display)
  },

  degreeOfCompletion: function(){
    var _this = this;
    _this.displayCallback = display => {
      //console.log("test")
      if(display != ''){
        for (var len=0; len<display.length; len++){
          var aff = display[len]._id
          //console.log(aff)
          wx.request({
            url: app.globalData.datasetUrl + '/pastDaysDetails/',
            data: {
              dayID: aff,
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log(res.data)
              var affairs = res.data.result
              var j=0;
              var i=0;
              for(;i<affairs.length;i++){
                if(affairs[i].finishedOrNot) j++;
              }
              if(i==0){
                var com = '0'
              }else{
                var com = j/i*100;
              }
              
              _this.data.completion.push(com)
              if (_this.completionCallback) {
                _this.completionCallback(_this.data.completion)
              }
              /*
              var temp = "display[" + len + "].completion"
              _this.setData({
                [temp]: com
              })*/
              
            }
          })
        }
      }
    }
    //console.log(_this.data.completion)
  },

  showDetails: function (e) {
    wx.navigateTo({
      url: '../pastDaysDetails/pastDaysDetails?dayID='+e.currentTarget.dataset.id+'&date='+e.currentTarget.dataset.date,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})