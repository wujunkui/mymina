// pages/active/strategy/strategy.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "myName": "",
    "qIndex": 1,
    "pre": 0,
    "question": {
      "1": {
        "preIndex": "",
        "number": "一",
        "q": "有一天，你魏璎珞在深宫中的床榻上醒来，身边的宫女告诉你，你昏迷了三天三夜，你想问的一个问题是？",
        "an": {
          "A": {
            text: "现在是何时？",
            next: 2
          },
          "B": {
            text: "我为何会昏迷？",
            next: 2
          },
          "C": {
            text: "傅恒呢？",
            next: 2
          },
          "D": {
            text: "皇上呢？",
            next: 2
          }
        }
      },
      "2": {
        "preIndex": "",
        "number": "二",
        "q": "宫女告诉你，你是被一位黑衣人击倒并丢入水里，你觉得是何人指使？",
        "an": {
          "A": {
            text: "纯妃",
            next: 4
          },
          "B": {
            text: "娴妃",
            next: 3
          },
          "C": {
            text: "尔晴",
            next: 4
          },
          "D": {
            text: "小嘉嫔",
            next: 3
          }
        }
      },
      "3": {
        "preIndex": "",
        "number": "三",
        "q": "这时有宫女禀报，皇上即将会赶来你的住所，你准备？",
        "an": {
          "A": {
            text: "更衣装扮，以最美的姿态迎接皇上",
            next: 6
          },
          "B": {
            text: "不动声色",
            next: 5
          },
          "C": {
            text: "安排宫女为皇上沏好茶",
            next: 6
          },
          "D": {
            text: "假装熟睡",
            next: 5
          }
        }
      },
      "4": {
        "preIndex": "",
        "number": "四",
        "q": "你认为她这样做的目的是什么？",
        "an": {
          "A": {
            text: "嫉妒你荣受圣宠",
            next: 6
          },
          "B": {
            text: "想给你一个警告恐吓",
            next: 6
          },
          "C": {
            text: "想置你于死地",
            next: 6
          },
          "D": {
            text: "嫉妒你的美貌",
            next: 6
          }
        }
      },
      "5": {
        "preIndex": "",
        "number": "五",
        "q": "由于皇上太久没来，你睡着了，睡梦中你梦见一个宫女在哭，你认为？",
        "an": {
          "A": {
            text: "与自己的被害有关",
            next: "A"
          },
          "B": {
            text: "自己将面临危险",
            next: "B"
          },
          "C": {
            text: "这位宫女需要自己的帮助",
            next: "E"
          },
          "D": {
            text: "与自己无关",
            next: "C"
          }
        }
      },
      "6": {
        "preIndex": "",
        "number": "六",
        "q": "这时皇上来到你的住所，并为你带来了各种点心，你将选择？",
        "an": {
          "A": {
            text: "坐下来和皇上一起吃点心",
            next: "A"
          },
          "B": {
            text: "把自己的猜测告诉皇上",
            next: "G"
          },
          "C": {
            text: "询问皇上这些天发生了什么有趣的事",
            next: "D"
          },
          "D": {
            text: "从皇上口中套路出自己被害的信息",
            next: "F"
          }
        }
      }
    },
    "historyQ": {} //历史题目答案
  },
  // 去下一个题
  toNext(e) {
    let next = e.target.dataset.next;
    if (typeof next != "number") {
      wx.redirectTo({
        url: '/pages/active/strategyResult/strategyResult?result=' + next + '&myName=' + this.data.myName,
      });
    } else {
      let _m1 = "historyQ." + this.data.qIndex;
      let _m2 = "question." + next + ".preIndex"

      this.setData({
        [_m1]: e.target.dataset.select,
        [_m2]: this.data.qIndex
      });

      this.setData({
        qIndex: next
      });
    }

  },
  // 去上一个题目
  toPre(e) {
    this.setData({
      qIndex: this.data.question[this.data.qIndex].preIndex
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