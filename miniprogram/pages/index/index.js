// pages/index/index.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "lock":false,
    "myName": "",
    "qIndex": 0,
    "pre": 0,
    "question": [],
    "historyQ": {}, //历史题目答案,
    "answer_score":0,
    "is_finish":false
  },
  chooseAnswer(e){
    if(this.data.lock){
      return
    }
    let score = e.target.dataset.score;

    let _m1 = "historyQ." + this.data.qIndex;
    // let _m2 = "question." + next + ".preIndex"

    this.setData({
      [_m1]: e.target.dataset.select,
      // [_m2]: this.data.qIndex
    });
    this.setData({
      answer_score: this.data.answer_score + score
    })
    
    setTimeout(this.toNext,600)

  },
  // 去下一个题
  toNext() {
    
    // 判断是否是答的最后一题
    if (this.data.qIndex >= this.data.question.length - 1) {
      this.setData({
        is_finish: true,
      })
    } else {
      this.setData({
        qIndex: this.data.qIndex + 1,
      });
    }
    this.data.lock = false;

  },
  // 去上一个题目
  toPre(e) {
    this.setData({
      qIndex: this.data.qIndex - 1
    })
  },
  // 查看得分
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    let user_info = e.detail.userInfo;
    if (user_info){
      app.globalData.user_avatar = user_info.avatarUrl;
      app.globalData.user_nick_name = user_info.nickName;
    }
    console.log(app.globalData.user_avatar)
    wx.navigateTo({
      url: `/pages/answer/answer?score=${this.data.answer_score}`,
    })
  },
  // 去首页
  toIndex(e) {
    wx.showModal({
      title: '提示',
      content: '你还没有做完题目，确定去首页？',
      confirmColor: "#eacb54",
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '问题加载中',
      mask:true
    })
    wx.cloud.callFunction({
      name: 'getQuestions'
    }).then(res=>{
      console.log(res)
      let data = res.result.data;
      this.setData({
        question:data
      });
      wx.hideLoading();
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
      title: '你的邛崃话好多分？来告一哈嘛！',
      // path: '/pages/index/index',
      success: (res) => { },
      fail: function () { }
    }
  }
})