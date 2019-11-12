/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : login.js
 * Author              : lswl66
 * Version             : 1.0.01
 * Date Of Creation    : 2019/11/11 19:58:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/images/user-unlogin.png',
      nickName: ''
    },
    isLogin: 0
  },

  onGotUserInfo: function () {
    console.log(1)
    let storageArr = [];
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          isLogin: 1
        });
        console.log(this.data.isLogin);
        storageArr.push(this.data.isLogin);
        console.log(storageArr);
        wx.setStorage({
          key: 'key',
          data: JSON.stringify(storageArr),
        });
        wx.navigateBack({
          delta: 1
        })
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

  }
})