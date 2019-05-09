var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:' ',
    todayDate: app.globalData.todayDate
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log('查询测试'+app.globalData.user_id);
    var _this = this;
    
    wx.request({
      url: app.globalData.datasetUrl + '/checkUser/',
      
      data: {
        userID: app.globalData.user_id,
        //date: _this.globalData.todayDate
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("test1");
        console.log(res.data)
      }
    })

    wx.request({
      url: app.globalData.datasetUrl+'/queryTodaysAffair/',
      data:{
        userID: app.globalData.user_id,
        date:app.globalData.todayDate
      },
      method:"POST",
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
        _this.setData({
          display: res.data.result
        })
      }
    })
  },

  //修改单条记录
  modifyAffair: function(e){
    wx.navigateTo({
      url: '../modifyAffair/modifyAffair?affairID='+e.currentTarget.dataset.id+'&originContent='+e.currentTarget.dataset.text,
    })
  },

  //删除单条记录
  deleteAffair:function(e){
    var _this = this;
    var msg_id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.datasetUrl+'/deleteAffair/',
      data:{
        affairID: msg_id,
        userID: app.globalData.user_id,
        date: app.globalData.todayDate
      },
      method:"POST",
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(res.data)
        _this.onShow()
      }
    })
  },


  //归档单条记录
  finishAffair:function(e){
    var _this = this;
    var affair_id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.datasetUrl+'/finishAffair',
      data: {
        affairID: affair_id
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        _this.onShow()
      }
    })
  },

  //将记录平移到下一天
  moveToNextday: function(e){
    var _this = this;
    var affair_id = e.currentTarget.dataset.id;
    
    wx.request({
      url: app.globalData.datasetUrl+'/moveToNextDay/',
      data:{
        affairID: affair_id,
        userID: app.globalData.user_id,
        todayDate: app.globalData.todayDate,
        nextDate: app.globalData.nextDate
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        _this.onShow()
      }
    })
  },

  addPlan:function(){
    wx.navigateTo({
      url: '../addAffair/addAffair',
    })
  }
})