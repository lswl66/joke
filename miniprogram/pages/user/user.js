/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : user.js
 * Author              : lswl66
 * Version             : 1.0.01
 * Date Of Creation    : 2019/11/11 19:58:00
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
    userInfo:{
      avatarUrl:'/images/user-unlogin.png',
      nickName:''
    },
    isLogin: 0
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
    console.log('onshow')
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({
          isLogin: 1,
        });
        db.collection('userInfoList').where({
          _openid: res.data
        }).get({
          success: r => {
            this.setData({
              userInfo: r.data[0]
            })
            if (
              r.data[0].liked < 100 ||
              r.data[0].collected < 20 ||
              r.data[0].jokenum < 5) {
              this.setData({
                lv: 'LV1  初出茅庐',
              })
            } else if (
              r.data[0].liked < 500 ||
              r.data[0].collected < 50 ||
              r.data[0].jokenum < 20) {
              this.setData({
                lv: 'LV2  小有成就',
              })
            } else if (
              r.data[0].liked < 2000 ||
              r.data[0].collected < 200 ||
              r.data[0].jokenum < 50) {
              this.setData({
                lv: 'LV3  名震江湖',
              })
            } else {
              this.setData({
                lv: 'LV4  天下无敌',
              })
            }
          }
        })
      },
      fail: (res) => {
        console.log('fail')
      }
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