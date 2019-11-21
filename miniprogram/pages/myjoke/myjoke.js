/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : myjoke.js
 * Author              : lswl66
 * Version             : 1.0.02
 * Date Of Creation    : 2019/11/18 12:58:00
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
    jokeInfoList: {},
    userInfo:{
    },
    isLogin: 0
  },

  tologin: function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toback: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
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
    let userInfoArr;
    wx.getStorage({
      key: 'userid',
      success: (res) => {
        console.log(this.data)
        this.setData({
          isLogin: 1
        });
        db.collection('userInfoList').where({
          _id: res.data
        }).get({
          success: res => {
            console.log(res.data[0])
            this.setData({
              userInfo: res.data[0]
            })
            console.log(res.data[0].liked, res.data[0].collected, res.data[0].jokenum)
            if (
              res.data[0].liked < 100 ||
              res.data[0].collected < 20 ||
              res.data[0].jokenum < 5) {
              this.setData({
                lv: 1,
                liked: res.data[0].liked,
                needliked: 100,
                collected: res.data[0].collected,
                needcollected: 20,
                jokenum: res.data[0].jokenum,
                needjoke: 5
              })
            } else if (
              res.data[0].liked < 500 ||
              res.data[0].collected < 50 ||
              res.data[0].jokenum < 20) {
              this.setData({
                lv: 2,
                liked: res.data[0].liked,
                needliked: 500,
                collected: res.data[0].collected,
                needcollected: 50,
                jokenum: res.data[0].jokenum,
                needjoke: 20
              })
            } else if (
              res.data[0].liked < 2000 ||
              res.data[0].collected < 200 ||
              res.data[0].jokenum < 50) {
              this.setData({
                lv: 3,
                liked: res.data[0].liked,
                needliked: 2000,
                collected: res.data[0].collected,
                needcollected: 200,
                jokenum: res.data[0].jokenum,
                needjoke: 50
              })
            } else {
              this.setData({
                lv: 4,
                liked: res.data[0].liked,
                needliked: 10000,
                collected: res.data[0].collected,
                needcollected: 2000,
                jokenum: res.data[0].jokenum,
                needjoke: 200
              })
            }
          }
        })
        db.collection('jokeInfoList').where({
          userid: res.data
        }).get({
          success: res => {
            console.log(res.data)
            this.setData({
              jokeInfoList: res.data,
            })
          }
        })
        console.log(this.data)
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