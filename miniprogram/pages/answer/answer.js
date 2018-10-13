// miniprogram/pages/answer/answer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "user_avatar": app.globalData.user_avatar,
    "user_nick_name": app.globalData.user_nick_name,
    "score":0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let score = options.score;
    if (app.globalData.user_avatar){
      this.setData({
        user_avatar: app.globalData.user_avatar,
        user_nick_name: app.globalData.user_nick_name
      })
    }else{
      wx.getUserInfo({
        success: res => {
          app.globalData.user_avatar = res.userInfo.avatarUrl;
          app.globalData.user_nick_name = res.userInfo.nickName;
          this.setData({
            user_avatar: res.userInfo.avatarUrl,
            user_nick_name: res.userInfo.nickName
          })
        }
      })
    }
    
    this.setData({
      score:score
    })
  },

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
      return {
        title:`我在邛崃话考试中得了${this.data.score}分，你也来试试吧！`,
        path:'/pages/index/index'
      }
  }
})