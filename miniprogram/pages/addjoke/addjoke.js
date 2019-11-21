/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : addjoke.js
 * Author              : lswl66
 * Version             : 1.0.2
 * Date Of Creation    : 2019/11/19 09:16:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

const db = wx.cloud.database()
const _ = db.command
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    inner: '',
    label: ['内涵段子','冷笑话','传统笑话','经典笑话','其他笑话'],
    selectedLabel: '内涵段子',
    select : 0,
    image: 'cloud://joke-i6c9f.6a6f-joke-i6c9f-1300682531/jokeimage/123123.jpg',
    userInfo: {
      avatarUrl: 'cloud://joke-i6c9f.6a6f-joke-i6c9f-1300682531/jokeimage/u=198453759,1675004051&fm=26&gp=0.jpg',
      nickName: '冷笑话精选'
    }
  },

  bindinputtext: function(a){
    console.log(a.detail.value)
    this.setData({
      inner: a.detail.value
    })
    console.log(this.data.inner)
  },
  toaddlabel: function(a){
    console.log(a.target.id)
    let arr = this.data.selectedLabel
    this.setData({
      select: a.target.id,
      selectedLabel: this.data.label[a.target.id]
    })
    console.log(this.data.select)
    console.log(this.data.selectedLabel)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        db.collection('userInfoList').where({
          _openid: res.data
        }).get({
          success: r => {
            console.log(r.data[0])
            this.setData({
              userInfo: r.data[0]
            })
          }
        })
      },
    })
  },

  selectFile(files) {
    console.log('files', files);
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({urls: files.tempFilePaths})
      }, 1000)
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
    wx.showToast({
      title: '上传失败',
      icon: 'none',
      duration: 1500
    })
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    console.log(e.detail.urls)
    // 使用云存储 利用上传图片后的临时路径 上传图片至云存储 可以得到一个永久路径 
    let imageFilePath = 
      'jokeimage/' + e.detail.urls[0].substring(
        e.detail.urls[0].length - 15, e.detail.urls[0].length);
    console.log(imageFilePath)
    wx.cloud.uploadFile({
      cloudPath: imageFilePath,
      filePath: e.detail.urls[0],
      success: res => {
        console.log(res.fileID)
        this.setData({
          image: res.fileID
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  tosubmit: function(){
    console.log(this.data)
    if (this.data.inner){
      let time = util.formatTime(new Date());
      console.log(time.substring(time.length - 17, time.length - 3))
      wx.getStorage({
        key: 'userid',
        success: res => {
          console.log(res.data)
          db.collection('userInfoList').doc(res.data).update({
            data: {
              jokenum: _.inc(1)
            },
            success: r => {
              console.log('jokenum +1')
            }
          })
          db.collection('jokeInfoList').add({
            data: {
              inner: this.data.inner,
              image: this.data.image,
              label: this.data.selectedLabel,
              photo: this.data.userInfo.avatarUrl,
              author: this.data.userInfo.nickName,
              userid: res.data,
              submitTime: time.substring(time.length - 17, time.length - 3),
              hasliked: [],
              hascollected: [],
              commentnum: 2,
              sharenum: 0
            },
            success: r => {
              wx.showToast({
                title: '发布成功',
                icon: 'none',
                duration: 1500
              })
            }
          })
        },
        fail: res => {
          db.collection('jokeInfoList').add({
            data: {
              inner: this.data.inner,
              image: this.data.image,
              label: this.data.selectedLabel,
              photo: this.data.userInfo.avatarUrl,
              author: this.data.userInfo.nickName,
              userid: res.data,
              submitTime: time.substring(time.length - 17, time.length - 3),
              hasliked: [],
              hascollected: [],
              commentnum: 2,
              sharenum: 0
            },
            success: r => {
              wx.showToast({
                title: '发布成功',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      })
      console.log('tosubmitaftershowtoast')
      setTimeout(() => {
        console.log('settimeout')
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }else{
      wx.showToast({
        title: '请把笑话写完',
        icon: 'none',
        duration: 1500
      })
    }
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
    console.log(this.data)
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