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
    
    this.showTodaysAffair()
  },

  //查询用户今日事务
  showTodaysAffair:function(){
    var _this = this;
    if (app.globalData.user_id && app.globalData.user_id != '') {
      //console.info("openid 有值")
      _this.queryTodaysAffair();
    } else{
      //console.info("query中openid 无值");
      app.onLogin();
      app.user_idCallback = user_id => {
        if (user_id != ''){
          //console.info("query中Callback " + app.globalData.user_id);
          _this.queryTodaysAffair();
        }
      }
    }
    /*
    //确认用户登陆状态
    wx.checkSession({
      success: function(){

      },
      fail: function(){
        app.onLogin()
      }
    })*/
    
  },

  queryTodaysAffair: function(){
    var _this = this;
    wx.request({
      url: app.globalData.datasetUrl + '/queryTodaysAffair/',
      data: {
        userID: app.globalData.user_id,
        date: app.globalData.todayDate
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
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