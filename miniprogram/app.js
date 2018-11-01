//app.js
const settings = require('./utils/settings.js');
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: settings.cloud_env,
        traceUser: true,
      })
    }

    this.globalData = {
      user_avatar:'',
      user_nick_name:'不愿意透漏姓名的二狗子'
    }
  }
})
