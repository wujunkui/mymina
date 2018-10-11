// pages/active/strategy/strategy.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "myName": "",
    "qIndex": 0,
    "pre": 0,
    "question": [
      {
        "preIndex": "",
        "number": "一",
        "q": "请选出以下不是动物的一个。",
        "an": {
          "A": {
            text: "麻浪子",
            score: 0
          },
          "B": {
            text: "迷窝子",
            score: 0
          },
          "C": {
            text: "摆牌子",
            score: 5
          },
          "D": {
            text: "偷腔子",
            score: 0
          }
        }
      },
      {
        "preIndex": "",
        "number": "二",
        "q": "宫女告诉你，你是被一位黑衣人击倒并丢入水里，你觉得是何人指使？",
        "an": {
          "A": {
            text: "纯妃",
            score: 0
          },
          "B": {
            text: "娴妃",
            score: 0
          },
          "C": {
            text: "尔晴",
            score: 0
          },
          "D": {
            text: "小嘉嫔",
            score: 0
          }
        }
      }, 
    ],
    "historyQ": {}, //历史题目答案,
    "answer_score":0
  },
  // 去下一个题
  toNext(e) {
    let score = e.target.dataset.score;
    
    let _m1 = "historyQ." + this.data.qIndex;
    // let _m2 = "question." + next + ".preIndex"

    this.setData({
      [_m1]: e.target.dataset.select,
      // [_m2]: this.data.qIndex
    });

    this.setData({
      qIndex: this.data.qIndex+1,
      answer_score: this.data.answer_score + score
    });
    

  },
  // 去上一个题目
  toPre(e) {
    this.setData({
      qIndex: this.data.qIndex - 1
    })
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
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
      title: '职场中的你，会是《延禧宫略》里的谁',
      path: '/pages/active/langTest',
      imageUrl: "http://sxsimg.xiaoyuanzhao.com/E4/08/E4949421DE2FE85ADEFD0EA0816A5108.jpg",
      success: (res) => { },
      fail: function () { }
    }
  }
})