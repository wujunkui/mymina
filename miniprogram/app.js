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
  getUserInfoApi({ t }) {
    return new Promise((reslove, reject) => {
      if (wx.getStorageSync("sxs_3rd_session")) {
        reqapi.post({
          url: "/mina/api/v2/getuserinfo",
          params: {
            sxs_rd_session: wx.getStorageSync("sxs_3rd_session"),
          },
          t: t,
        }).then(res => {
          if (res.code === 100) {
            this.globalData.cap = res.msg.cap;
            this.globalData.userInfo = res.msg.userinfo;
            reslove(res.msg);
          } else if (res.code === 101 || res.code === 103 || res.code === 104) {
            wx.removeStorageSync("sxs_3rd_session");
            wx.removeStorageSync("sxs_3rd_session_exp");
            if (t) {
              t.setData({
                storeExist: false,
              })
            }
          }
        })
      }
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

  },
  globalData:{
    isClickRepeat: false,       //重复点击参数 false当前可以点击  true 当前不可以点击
  
    user_avatar: '',
    user_nick_name: '不愿意透漏姓名的二狗子',
    loginAlert: false   //是否显示登录手机号弹框
  }
})
