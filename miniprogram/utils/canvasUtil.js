// 绘制图片公用函数
function drawImg({ c, img, x, y, w, h, r }) {
  c.drawImage(img, x * r, y * r, w * r, h * r);
}

// 绘制文字公用函数
function drawText({ c, t, co, f, w, x, y, r }) {
  c.setFillStyle(co);
  c.setFontSize(f * r);
  c.fillText(t, x * r, (y + f) * r);
}

// 当前文字绘制是否换行
function textBr({ t, c, w, f , r}){
  var chr = t, temp = "", row = [];
  for (var a = 0; a < chr.length; a++) {
    c.setFontSize(f * r);
    var ml = c.measureText(temp);
    if (ml.width < (w * r)) {

    } else {
      row.push(temp);
      temp = "";
    }
    temp += chr[a];
  }
  row.push(temp);
  return row;
}

// 下载网络资源图片
function drawBefore(t,src, temp) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: src,
      success: (res) => {
        if (res.statusCode == 200) {
          t.setData({
            [temp]: res.tempFilePath
          })
          resolve();
        } else {
          console.log("图片下载临时路径报错11111");
          reject();
        }

      },
      fail: (res) => {
        console.log("图片下载临时路径失败");
        reject();
      }
    })
  })
}
//绘制圆角图片 
/**
 * x 圆的中心点
 * y 圆的中心点位置
 * r 半径
 */
function circleImg({ctx, img, x, y, r,ra}) {
  ctx.save();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.beginPath();
  ctx.arc(cx*ra, cy*ra, r*ra, 0, 2 * Math.PI);
  ctx.fill();
  ctx.setStrokeStyle('#efefef');
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(img, x*ra, y*ra, d*ra, d*ra);
  ctx.restore();
}


module.exports = {
  drawImg: drawImg,
  drawText: drawText,
  textBr: textBr,
  drawBefore: drawBefore,
  circleImg: circleImg
}