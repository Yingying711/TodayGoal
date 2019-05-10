//app.js


App({
  globalData: {
    user_id: '',
    datasetUrl: 'https://test.zsran.com',
    todayDate: '',
    nextDate: ''
  },
  onLaunch: function () {
    var _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取当日日期
    _this.globalData.todayDate = _this.getDate();
    _this.globalData.nextDate = _this.getTomorrowDate();

    this.checkUser();
    

    /*
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },

  checkUser:function(){
    var _this = this;
    if(_this.globalData.user_id && _this.globalData.user_id != ''){
      //console.info("openid 有值")
      wx.request({
        url: _this.globalData.datasetUrl + '/checkUser/',

        data: {
          userID: _this.globalData.user_id,
          //date: _this.globalData.todayDate
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          //console.log("test1");
          console.log(res.data)
        }
      })
    }else{
      //console.info("openid 无值")
      _this.onLogin()
      _this.user_idCallback = user_id =>{
        if(user_id != ''){
          console.info("app中Callback " + _this.globalData.user_id)
          wx.request({
            url: _this.globalData.datasetUrl + '/checkUser/',

            data: {
              userID: _this.globalData.user_id,
              //date: _this.globalData.todayDate
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              //console.log("test1");
              console.log(res.data)
            }
          })
        }
      }
    }
  },

  //用户登陆函数
  onLogin: function(){
    var _this = this;
    wx.login({
      success: res => {
        //console.log("test")
        wx.request({
          url: 'https://tech.zsran.com/getuid.php',
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            _this.globalData.user_id = res.data.openid;
            if(_this.user_idCallback){
              _this.user_idCallback(res.data.openid);
              //console.log(_this.globalData.user_id)
            }
            
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  getDate: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);

    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + '.' + M + '.' + D);
  },

  getTomorrowDate: function () {
    var date = new Date();
    date.setDate(date.getDate() + 1);

    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + '.' + M + '.' + D);
  }
})