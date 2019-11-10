// pages/addjoke/addjoke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    text: '',
    label: ['内涵段子','冷笑话','传统笑话','经典笑话','其他笑话'],
    selectedLabel: [],
    select : 0
  },

  bindinputtext: function(a){
    console.log(a.detail.value)
    this.setData({
      text: a.detail.value
    })
    console.log(this.data.text)
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
  },

  // chooseImage: function (e) {
  //   var that = this;
  //   console.log(222)
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       console.log(1)
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       });
  //     }
  //   })
  // },
  // previewImage: function (e) {
  //   console.log(this.data)
  //   wx.previewImage({
  //     current: e.currentTarget.id, // 当前显示图片的http链接
  //     urls: this.data.files // 需要预览的图片http链接列表
  //   })
  // },
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
    this.setData({
      image: e.detail.urls
    })
  },

  tosubmit: function(){
    console.log(this.data)
    if (this.data.text){
      wx.showToast({
        title: '发布成功',
        icon: 'none',
        duration: 1500
      })
      console.log('tosubmiitaftershowtoast')
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