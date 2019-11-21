/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : login.js
 * Author              : lswl66
 * Version             : 1.0.2
 * Date Of Creation    : 2019/11/19 8:50:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

const db = wx.cloud.database()
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onGotUserInfo: function () {
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData)
        // 登陆成功 调用云函数 获取openid 并存入localStorage中
        wx.cloud.callFunction({
          name: 'login',
          success: r => {
            console.log(r.result.openid)
            wx.setStorage({
              key: 'openid',
              data: r.result.openid,
            })
            console.log(res.userInfo)
            // 在数据库查询当前登录用户信息
            db.collection('userInfoList').where({
              _openid: r.result.openid
            }).get({
              success: e => {
                console.log(e)
                // 如果数据库存在当前用户信息 则更新用户信息  并且将_id 存入localStorage
                // 如果不存在则添加用户记录 添加成功后 再根据openid 获取到 _id 存入localStorage
                if (e.data.length != 0){
                  db.collection('userInfoList').doc(r.result.openid).update({
                    data: {
                      avatarUrl: res.userInfo.avatarUrl,
                      nickName: res.userInfo.nickName,
                    },
                    success: s => {
                      console.log(s)
                    }
                  })
                  wx.setStorage({
                    key: 'userid',
                    data: e.data[0]._id,
                  })
                }else{
                  console.log(5464646)
                  db.collection('userInfoList').add({
                    data: {
                      avatarUrl: res.userInfo.avatarUrl,
                      nickName: res.userInfo.nickName,
                      liked: 0,
                      collected: 0,
                      shared: 0,
                      jokenum: 0
                    },
                    success: s => {
                      console.log(s)
                      db.collection('userInfoList').where({
                        _openid: r.result.openid
                      }).get({
                        success: res => {
                          console.log(res.data[0])
                         wx.setStorage({
                           key: 'userid',
                           data: res.data[0]._id
                         })
                        }
                      })
                    }
                  });
                }
              }
            })     
          }
        });
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          console.log('settimeout')
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    });
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