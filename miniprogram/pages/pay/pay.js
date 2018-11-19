// miniprogram/pages/pay/pay.js
const app = getApp();
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:'',
    image:'',
    name:'',
    desc:'',
    old_price:0,
    price:0,
    view_num:0,
    buy_num:0,
    is_login: app.globalData.userinfo?true:false
  },

  getItemDetail(iuuid){
    api.get({
      url:'/item/detail',
      params:{
        iuuid:iuuid
      }
    }).then(res => {
      let data = res.data
      console.log(res)
      if (res.code != 200){
        wx.showToast({
          title: data,
          icon: 'none',
          mask:true
        })
        // setTimeout(()=>{
        //   wx.switchTab({
        //     url: '/pages/index/index'
            
        //   })
        // },1000)
      }else{
        this.setData(data)
      }
    })
  },
  userLogin(e) {
    console.log(e.detail.userInfo);
    app.getUserInfo({t:this}).then(()=>{
      this.setData({
        is_login:true
      })
    })

  },

  CreateOrder() {
    wx.showLoading({
      title: '创建订单中',
    })
    api.post({
      url: '/my/orders',
      params: {
        iuuid: 'item_dsawega'
      }
    }).then(res => {
      console.log(res);
      let data = res.data;
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(rv) {
          console.log(rv)
        },
        fail(rv) {
          console.log(rv)
        },
        complete(rv) {
          console.log(rv);
          wx.hideLoading()
        }
      })
    })
  }
  ,


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let iuuid = options.iuuid;
    console.log(iuuid);
    this.getItemDetail(iuuid)

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

  }
})