/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : index.js
 * Author              : lswl66
 * Version             : 1.0.01
 * Date Of Creation    : 2019/11/11 19:58:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

const db = wx.cloud.database()
let num = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokeInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
    var openid = 0;
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        console.log(res.data)
        openid = res.data
      },
    });

    db.collection('jokeInfoList').get({
      success: res =>{
        console.log(res.data)
        console.log(openid)

        this.setData({
          jokeInfoList: res.data
        })
      }
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
    console.log('onshow')
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
    console.log('onPullDownRefresh');
    wx.showNavigationBarLoading();
    setTimeout(() => {
      console.log('settimeout')
      wx.hideNavigationBarLoading();
      // 取消页面刷新动画
      wx.stopPullDownRefresh();
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    num += 10
    let arr = this.data.jokeInfoList
    console.log(arr) 
    db.collection('jokeInfoList')
      .skip(num) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条
      .get()
      .then(res => {
        console.log(res.data)
        this.setData({
          jokeInfoList: arr.concat(res.data)
        })
      })
      .catch(err => {
        console.error(err)
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})