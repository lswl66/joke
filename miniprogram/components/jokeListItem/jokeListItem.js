/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : jokeListItem.js
 * Author              : lswl66
 * Version             : 1.0.2
 * Date Of Creation    : 2019/11/21 19:58:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

const db = wx.cloud.database()
const _ = db.command;



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    jokeInfo: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    fold: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tomyjoke: function(){
    //   wx.navigateTo({
    //     url: '/pages/myjoke/myjoke',
    //   })
    // },
    topreviewimage: function(){
      wx.previewImage({
        urls: [this.data.jokeInfo.image],
      })
    },
    tofold: function(res){
      console.log(res)
      if(this.data.fold == 0){
        this.setData({
          fold: 1
        })
      }else{
        this.setData({
          fold: 0
        })
      }
    },
    tocollect: function(res){
      console.log('tocollect')
      console.log(res)//有意思的东西
      let arr = this.data.jokeInfo;
      if(this.data.jokeInfo.collected == 0){
        console.log(this.properties.jokeInfo)
        arr.collected += 1
        this.setData({
          jokeInfo: arr
        })
        console.log(this.data.userid, this.data.jokeInfo._id, this.data.openid)
        wx.cloud.callFunction({
          name: 'database',
          data: {
            action: 'changeCollectNum',
            userid: this.data.userid,
            jokeid: this.data.jokeInfo._id,
            openid: this.data.openid
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 1500
            });
          },
          fail: res => {
            console.log(res)
          }
        })
      }else{
        arr.collected -= 1
        this.setData({
          jokeInfo: arr
        })
        wx.cloud.callFunction({
          name: 'database',
          data: {
            action: 'changeCollectNum',
            userid: this.data.userid,
            jokeid: this.data.jokeInfo._id,
            openid: this.data.openid
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: '已取消收藏',
              icon: 'none',
              duration: 1500
            });
          },
          fail: res => {
            console.log(res)
          }
        })
        console.log(this.data.collect)
      }
    },
    tolike: function(){
      console.log(this.data);
      let arr = this.data.jokeInfo;
      console.log(arr)
      if (arr.liked == 0){
        arr.likednum += 1
        arr.liked += 1
        console.log(arr)
        this.setData({
          jokeInfo: arr
        })
        wx.cloud.callFunction({
          name: 'database',
          data: {
            action: 'changeLikeNum',
            userid: this.data.userid,
            jokeid: this.data.jokeInfo._id,
            openid: this.data.openid
          },
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      }else{
        arr.likednum -= 1
        arr.liked -= 1
        this.setData({
          jokeInfo: arr
        })
        wx.cloud.callFunction({
          name: 'database',
          data: {
            action: 'changeLikeNum',
            userid: this.data.userid,
            jokeid: this.data.jokeInfo._id,
            openid: this.data.openid
          },
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    },
    tocommit: function(){
      wx.showToast({
        title: '评论功能暂未开放',
        icon: 'none',
        duration: 1500
      });
    }
  },
  
  lifetimes: {
    attached: function(){
      console.log('life.attached')
      let arr = this.data.jokeInfo
      arr.likednum = this.data.jokeInfo.hasliked.length
      this.setData({
        jokeInfo: arr
      })
      wx.getStorage({
        key: 'openid',
        success: (res) => {
          console.log(res.data)
          this.setData({
            openid: res.data
          })
          console.log(this.data.openid)
          console.log(arr.hasliked.indexOf(this.data.openid))
          if (arr.hasliked.indexOf(this.data.openid) != -1) {
            arr.liked = 1
            this.setData({
              jokeInfo: arr
            })
            console.log(this.data.jokeInfo.liked)
          } else {
            arr.liked = 0
            this.setData({
              jokeInfo: arr
            })
            console.log(this.data.jokeInfo.liked)
          }
          if (arr.hascollected.indexOf(this.data.openid) != -1) {
            arr.collected = 1
            this.setData({
              jokeInfo: arr
            })
          } else {
            arr.collected = 0
            this.setData({
              jokeInfo: arr
            })
          }
         
          console.log(this.data.jokeInfo)
          console.log(this.data.jokeInfo.liked)
        },
        fail: res => {
          console.log('unlogin')
          arr.liked = 0
          arr.collected = 0
          this.setData({
            jokeInfo: arr
          })
        }
      });
      wx.getStorage({
        key: 'userid',
        success: (res) => {
          this.setData({
            userid: res.data
          })
        },
      })
    }
  },
  pageLifetimes: {
    show: function() {
      console.log('page.show')
      let arr = this.data.jokeInfo
      arr.likednum = this.data.jokeInfo.hasliked.length
      this.setData({
        jokeInfo: arr
      })
      wx.getStorage({
        key: 'openid',
        success: (res) => {
          console.log(res.data)
          this.setData({
            openid: res.data
          })
          console.log(this.data.openid)
          console.log(arr.hasliked.indexOf(this.data.openid))
          if (arr.hasliked.indexOf(this.data.openid) != -1) {
            arr.liked = 1
            this.setData({
              jokeInfo: arr
            })
            console.log(this.data.jokeInfo.liked)
          } else {
            arr.liked = 0
            this.setData({
              jokeInfo: arr
            })
            console.log(this.data.jokeInfo.liked)
          }
          if (arr.hascollected.indexOf(this.data.openid) != -1) {
            arr.collected = 1
            this.setData({
              jokeInfo: arr
            })
          } else {
            arr.collected = 0
            this.setData({
              jokeInfo: arr
            })
          }

          console.log(this.data.jokeInfo)
          console.log(this.data.jokeInfo.liked)
        },
        fail: res => {
          console.log('unlogin')
          arr.liked = 0
          arr.collected = 0
          this.setData({
            jokeInfo: arr
          })
        }
      });
      wx.getStorage({
        key: 'userid',
        success: (res) => {
          this.setData({
            userid: res.data
          })
        },
      })
    }
  }
})
