// pages/user/user.js
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
      key: 'key',
      success: (res) => {
        console.log(res.data);
        this.setData({
          isLogin: JSON.parse(res.data)[0]
        })
        console.log(this.data.isLogin);
        wx.getUserInfo({
          success: (res) => {
            this.setData({
              userInfo: res.userInfo
            });
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