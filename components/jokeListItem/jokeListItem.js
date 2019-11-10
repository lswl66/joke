// components/jokeListItem/jokeListItem.js
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
    collect: 1,
    like: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tomyjoke: function(){
      wx.navigateTo({
        url: '/pages/myjoke/myjoke',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    tocollect: function(res){
      console.log('tocollect')
      console.log(res)//有意思的东西
      let storageArr = [];
      if(this.data.collect == 1){
        console.log(this.properties.jokeInfo)
        //知道点的是哪一个   前面index每次循环传一个对象进入组件
        wx.getStorage({
          key: 'jokeinfo',
          success: (res) => {
            console.log(res);
            storageArr = JSON.parse(res.data);
            storageArr.push(this.properties.jokeInfo);
            wx.setStorage({
              key: 'jokeinfo',
              data: JSON.stringify(storageArr),
            })
          },
          fail: res => {
            console.log(res)
            storageArr.push(this.properties.jokeInfo);
            wx.setStorage({
              key: 'jokeinfo',
              data: JSON.stringify(storageArr),
            })
          }
        })
        this.setData({
          collect: 2
        })
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          duration: 1500
        });
        console.log(this.data.collect)
      }else{
        wx.getStorage({
          key: 'jokeinfo',
          success: (res) =>{
            storageArr = JSON.parse(res.data)
            storageArr.map((item,index) => {
              if(item.id == this.properties.jokeInfo.id){
                storageArr.splice(index,1);
              }
              wx.setStorage({
                key: 'jokeinfo',
                data: JSON.stringify(storageArr),
              })
            })
          },
        })
        this.setData({
          collect: 1
        })
        wx.showToast({
          title: '已取消收藏',
          icon: 'none',
          duration: 1500
        });
        console.log(this.data.collect)
      }
    },
    tolike: function(){
      console.log(this.data);
      let arr = this.data.jokeInfo;
      console.log(arr)
      if (this.data.like == 1){
        arr.likenum += 1
        console.log(arr.likenum)
        console.log(arr)
        this.setData({
          like: 2,
          jokeInfo: arr
        })
      }else{
        arr.likenum -= 1
        this.setData({
          like: 1,
          jokeInfo: arr
        })
      }
    }
  },
  
  lifetimes: {
    attached: function(){
      console.log('life.attached')
      wx.getStorage({
        key: 'jokeinfo',
        success: (res) => {
          for (let i = 0; i < JSON.parse(res.data).length; i++) {
            if (JSON.parse(res.data)[i].id == this.properties.jokeInfo.id) {
              this.setData({
                collect: 2
              })
            }
          };
        },
      })
    }
  },
  pageLifetimes: {
    show: function() {
      console.log('life.show')
      this.setData({
        collect: 1
      })
      wx.getStorage({
        key: 'jokeinfo',
        success: (res) => {
          for (let i = 0; i < JSON.parse(res.data).length; i++) {
            if (JSON.parse(res.data)[i].id == this.properties.jokeInfo.id) {
              this.setData({
                collect: 2
              })
            }
          };
        },
      })
    }
  }
})
