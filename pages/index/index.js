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


Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokeInfoList: [
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '邻居大爷和大妈吵起来了，最后大爷摔门而出。他儿子追出来，拉着他劝：“爸，妈就那样，气下了就没事，跟我回去吧。” 大爷：“儿啊，是时候教你一手了。今晚约了人打牌，要不这样怎么出门？今晚通宵……”',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 1
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '邻居大爷和大妈吵起来了，最后大爷摔门而出。他儿子追出来，拉着他劝：“爸，妈就那样，气下了就没事，跟我回去吧。” 大爷：“儿啊，是时候教你一手了。今晚约了人打牌，要不这样怎么出门？今晚通宵……”',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 2
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '邻居大爷和大妈吵起来了，最后大爷摔门而出。他儿子追出来，拉着他劝：“爸，妈就那样，气下了就没事，跟我回去吧。” 大爷：“儿啊，是时候教你一手了。今晚约了人打牌，要不这样怎么出门？今晚通宵……”',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 3
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '邻居大爷和大妈吵起来了，最后大爷摔门而出。他儿子追出来，拉着他劝：“爸，妈就那样，气下了就没事，跟我回去吧。” 大爷：“儿啊，是时候教你一手了。今晚约了人打牌，要不这样怎么出门？今晚通宵……”',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 4
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '一只老鼠在路边翻着垃圾，我揪起店里正在熟睡的花猫，使劲向老鼠扔去。猫和老鼠都愣住了，对视了不到一秒，各自扭头就跑。。。',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 5
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '老王一辈子窝囊废，行将就木之际就渴望被人夸一次。这份执念感动了老天爷，他派了一个大夫过来说：你这病吧，老厉害了。',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 6
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '去食堂打饭，见着一个叫不出名字的菜。手一指：“阿姨，这是什么菜啊？”隔着透明窗户，那位胖胖的打菜阿姨用穿透玻璃的声音回应道：“腊鸡！你要吗？！ ”我。。。',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 7
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '去食堂打饭，见着一个叫不出名字的菜。手一指：“阿姨，这是什么菜啊？”隔着透明窗户，那位胖胖的打菜阿姨用穿透玻璃的声音回应道：“腊鸡！你要吗？！ ”我。。。',
        image: 
          'http://img1.imgtn.bdimg.com/it/u=164112967,341725062&fm=26&gp=0.jpg',
        likenum: 28,
        comment: 2,
        id: 8
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '或许这就叫医者不能自医吧…',
        image: 
          'http://inews.gtimg.com/newsapp_bt/0/10717075391/1000/0',
        likenum: 28,
        comment: 2,
        id: 9
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '四个人如何用一把伞的教程',
        image: 
          'http://inews.gtimg.com/newsapp_bt/0/10717075392/1000/0',
        likenum: 28,
        comment: 2,
        id: 10
      },
      {
        photo: 
          'http://img2.imgtn.bdimg.com/it/u=198453759,1675004051&fm=26&gp=0.jpg',
        author: '冷笑话精选',
        userId: '1',
        inner: 
          '不行！！！',
        image:               'http://imgsrc.baidu.com/forum/w%3D580/sign=04d01f1700b30f24359aec0bf894d192/9107fff50ad162d98d8ad66a1edfa9ec8a13cd75.jpg',
        likenum: 28,
        comment: 2,
        id: 11
      },
    ]
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
    console.log('indexonshow')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})