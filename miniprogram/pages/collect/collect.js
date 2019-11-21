/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : collect.js
 * Author              : lswl66
 * Version             : 1.0.01
 * Date Of Creation    : 2019/11/18 10:58:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokeInfoList: [],
    isLogin: 0
  },

  tologin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(554635643643564135643)
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
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({
          isLogin: 1
        });
        console.log(res.data)
        db.collection('jokeInfoList').where({
          hascollected: res.data
        }).get({
          success: r => {
            console.log(r.data)
            this.setData({
              jokeInfoList: r.data
            })
          }
        })
      },
    })
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