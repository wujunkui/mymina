// miniprogram/pages/answer/answer.js
const app = getApp();
const canvasUtil = require("../../utils/canvasUtil.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_avatar: app.globalData.user_avatar,
    user_nick_name: app.globalData.user_nick_name,
    score:0,
    tempPathBg:"../../images/bg.jpg",
    tempPath: "",      //临时头像图片路径
    canvasTempPath: "", //临时生成图片路径
    drawShow:true

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
  saveImg(){
    canvasUtil.drawBefore(this, app.globalData.user_avatar,"tempPath").then(res => {
      console.log(this.data.tempPath);
      this.drawImg()
    })


  },

  drawImg() {
    var ctx = wx.createCanvasContext('shareCanvas');
    wx.getSystemInfo({ //获取屏幕宽度的wx方法
      success: (res) => {
        var wid = res.windowWidth;
        let w = wid;
        let ratio = w / 750;
        let height = 1334;
        let d = 'test';
        ctx.clearRect(0, 0, w, height * ratio);
        ctx.setFillStyle('#ffffff');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, height * ratio);
        // 绘制背景图片
        canvasUtil.drawImg({
          c: ctx,
          img: this.data.tempPathBg,
          x: 0,
          y: 0,
          w: 750,
          h: height,
          r: ratio
        });
        console.log('bg done')
        // 绘制头像
        // canvasUtil.drawImg({
        //   c: ctx,
        //   img: this.data.tempPath,
        //   x: 225,
        //   y: 80,
        //   w: 100,
        //   h: 100,
        //   r: ratio
        // });
        canvasUtil.circleImg({
          ctx:ctx,
          img:this.data.tempPath,
          x: 300,
          y:80,
          r:75,
          ra:ratio
        })
        console.log('avatar done')
        // 绘制名字
        ctx.setTextAlign('center');
        ctx.setFontSize(32 * ratio);
        ctx.fillText(this.data.user_nick_name, wid * ratio, 280 * ratio);

        

        // 绘制短评
        ctx.fillText("我在邛崃话考试中的得分是：", wid * ratio, 330 * ratio);
        // 绘制分数
        ctx.setFontSize(130)
        ctx.fillText(this.data.score, wid * ratio, 600 * ratio);
        // ctx.setTextAlign('left');
        // canvasUtil.drawText({
        //   c: ctx,
        //   t: "你的日常：",
        //   co: "#ffffff",
        //   f: 32,
        //   w: wid,
        //   x: 64,
        //   y: 580,
        //   r: ratio
        // });
        let hp = 640;
        ctx.fillRect(64 * ratio, hp * ratio, 630 * ratio, 1);
        ctx.setFontSize(16)
        ctx.fillText("看来你的邛崃话还不太及格哦~", wid * ratio, 700 * ratio);
        ctx.fillText("多听听嬢嬢些摆哈子嘛~", wid * ratio, 780 * ratio);
        
        // canvasUtil.drawText({
        //   c: ctx,
        //   t: "看来你的邛崃话还不太及格哦~多听听嬢嬢些摆哈子嘛~",
        //   co: "#ffffff",
        //   f: 32,
        //   w: wid,
        //   x: 64,
        //   y: 650,
        //   r: ratio
        // });
        // for (let i = 0; i < d.des.length; i++) {
        //   canvasUtil.drawText({
        //     c: ctx,
        //     t: '哦，看来你还不是标准的邛崃人',
        //     co: "#ffffff",
        //     f: 22,
        //     w: wid,
        //     x: 64,
        //     y: hp,
        //     r: ratio
        //   });
        //   hp = hp + 40
        // }

        // 绘制横线
        // hp = hp + 20;
        // ctx.fillRect(64 * ratio, hp * ratio, 632 * ratio, 1);

        hp = hp + 30;
        // canvasUtil.drawText({
        //   c: ctx,
        //   t: "评价：",
        //   co: "#ffffff",
        //   f: 32,
        //   w: wid,
        //   x: 64,
        //   y: hp,
        //   r: ratio
        // });
        hp = hp + 60;
        console.log(hp);
        // for (let i = 0; i < d.evaluate.length; i++) {
        //   canvasUtil.drawText({
        //     c: ctx,
        //     t: "test",
        //     co: "#ffffff",
        //     f: 22,
        //     w: wid,
        //     x: 64,
        //     y: hp,
        //     r: ratio
        //   });

        //   hp = hp + 40;
        // }

        // for (let i = 0; i < this.data.end.length; i++) {
        //   canvasUtil.drawText({
        //     c: ctx,
        //     t: "",
        //     co: "#ffffff",
        //     f: 20,
        //     w: wid,
        //     x: 64,
        //     y: 1100 + ((18 + 18) * i),
        //     r: ratio
        //   });
        // }

        // 绘制二维码
        // canvasUtil.drawImg({
        //   c: ctx,
        //   img: "../../images/qr.jpg",
        //   x: 560,
        //   y: 1100,
        //   w: 130,
        //   h: 130,
        //   r: ratio
        // });
        canvasUtil.circleImg({
          ctx:ctx,
          img:"../../images/qr.jpg",
          x:560,
          y:1100,
          r:65,
          ra:ratio
        })

        ctx.setTextAlign('left');

        //扫码测试你的职场人设
        canvasUtil.drawText({
          c: ctx,
          t: "长 按 保 存 图 片",
          co: "#ffffff",
          f: 20,
          w: wid,
          x: 550,
          y: 1240,
          r: ratio
        });
        canvasUtil.drawText({
          c: ctx,
          t: "分 享 朋 友 圈",
          co: "#ffffff",
          f: 20,
          w: wid,
          x: 560,
          y: 1280,
          r: ratio
        });

        ctx.draw(true, () => {
          setTimeout(() => {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              canvasId: 'shareCanvas',
              success: (res) => {
                wx.hideLoading();
                this.setData({
                  canvasTempPath: res.tempFilePath
                });
                wx.previewImage({
                  urls: [this.data.canvasTempPath]
                })
                this.setData({
                  drawShow: true
                });
              },
              fail: (res) => {
                wx.hideLoading();
                this.setData({
                  drawShow: true
                });
                wx.showModal({
                  title: '提示',
                  content: '图片生成失败,请重试',
                });
              }
            })
          }, 500)

        });

      }
    })
  },
  toIndex(){
    wx.navigateTo({
      url: '/pages/index/index',
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