//app.js
const settings = require('./utils/settings.js');
const api = require('./utils/api.js');
App({
  getUserInfo({ t }) {
    // 防止重复点击 false 可以执行操作  true 不可以操作
    if (this.globalData.isClickRepeat) return;
    this.globalData.isClickRepeat = true;
    return new Promise((reslove, reject) => {
      wx.login({
        success: (resLogin) => {
          let code = resLogin.code;
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: (resInfo) => {
              api.post({
                url: "/wx/login",
                params: {
                  code: code,
                  encryptedData: resInfo.encryptedData,
                  iv: resInfo.iv,
                },
              }).then(res => {
                if (res.code === 100) {
                  // this.globalData.cap = res.msg.cap;
                  // this.globalData['sxs_3rd_session'] = res.msg;
                  // wx.setStorageSync('sxs_3rd_session', res.msg);
                  // wx.setStorageSync("sxs_3rd_session_exp", (new Date().getTime() + 2505600000));  //29天过期  
                  // this.globalData.userInfo = res.msg.msg;
                  // this.globalData.isClickRepeat = false;  //恢复点击
                  // t.setData({
                  //   storeExist: this.globalData.sxs_3rd_session,
                  // })
                  this.globalData.isClickRepeat = false;  //恢复点击
                  // t.setData({
                  //   loginAlert: true,
                  // })
                  wx.hideLoading();
                  wx.setStorageSync('auth_token', res.access_token);
                  // this.globalData.ssoinfo = res.msg;
                  // this.getUserInfoApi({});
                  wx.hideLoading();
                  // reslove();
                } else if (res.code === 208) {
                  this.globalData.isClickRepeat = false;  //恢复点击
                  t.setData({
                    loginAlert: true,
                  })
                  wx.hideLoading();

                  this.globalData.ssoinfo = res.msg;
                } else {
                  this.globalData.isClickRepeat = false;  //恢复点击
                }
                
              })
            },
            fail: (res) => {
              this.globalData.isClickRepeat = false;  //恢复点击
              wx.hideLoading();
              reject();
            }
          })
        },
        fail: (res) => {
          console.log("wx.login失败", res);
          this.globalData.isClickRepeat = false;  //恢复点击
          wx.hideLoading();
          reject();
        }
      })
    })


  },
  // 调用本地接口 获取用户信息
  getUserInfoApi() {
    return new Promise((reslove, reject) => {
      
        api.get({
          url: "/userinfo"
        }).then(res => {
          if (res.code === 200) {
            this.globalData.userInfo = res.data.userinfo;
            reslove(res.msg);
          } 
          
        }).catch(res=>{
          wx.clearStorageSync('auth_token');
          reject(res)
        })
      
    })


  },


  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: settings.cloud_env,
        traceUser: true,
      })
    }

    // 获取用户登陆信息
    this.getUserInfoApi().then().catch(
      res => {
        console.log('unloggined')
      }
    );

  },
  globalData:{
    isClickRepeat: false,       //重复点击参数 false当前可以点击  true 当前不可以点击
    userinfo: {},
    user_avatar: '',
    user_nick_name: '不愿意透漏姓名的二狗子',
    loginAlert: false   //是否显示登录手机号弹框
  }
})
