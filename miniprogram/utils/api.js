'use strict'
const host = 'http://127.0.0.1:5000';

class Request{


  get({ url, params }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${host}${url}`,
        data: Object.assign({}, params),
        header: {
          'Content-Type': 'application/json;'
        },
        dataType: 'json',
        success: res => {
          console.log(res);
          resolve(res.data)
        },
        fail:res => {
          reject(res)
        }
      })
    })
  }
  post({ url, params }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${host}${url}`,
        data: Object.assign({}, params),
        method: 'POST',
        dataType: 'json',
        header: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;'
        },
        success: res => {
          console.log(res);
          resolve(res.data)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }

}
let request = new Request();
module.exports = {
  get:request.get,
  post:request.post
}