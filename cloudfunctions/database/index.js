/***************************************************************************************
 * Copyright           : 2019 - 2022
 * FileName            : index.js
 * Author              : lswl66
 * Version             : 1.0.2
 * Date Of Creation    : 2019/11/21 11:50:00
 * Description         : 爸爸讲段子
 *                     :
 *                     :
 * Function List       :
 **************************************************************************************/

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/**
 * 更新数据库 用户信息表以及段子信息表
 */
async function changeLikeNum(jokeid, userid, openid){
  let arr = []
  let res 
  res = await db.collection('jokeInfoList').where({
    _id: jokeid
  }).get()
  arr = res.data[0].hasliked
  if (arr.indexOf(openid) == -1) {
    arr.push(openid)
    await db.collection('jokeInfoList').doc(jokeid).update({
      data: {
        hasliked: arr
      }
    })
    await db.collection('userInfoList').doc(userid).update({
      data: {
        liked: _.inc(1)
      }
    })
  } else {
    arr.splice(arr.indexOf(openid), 1)
    await db.collection('jokeInfoList').doc(jokeid).update({
      data: {
        hasliked: arr
      }
    })
    await db.collection('userInfoList').doc(userid).update({
      data: {
        liked: _.inc(-1)
      }
    })
  }
}

async function changeCollectNum(jokeid, userid, openid){
  let arr = []
  let res
  console.log(jokeid, userid, openid)
  console.log(jokeid + userid + openid)
  try{
    res = await db.collection('jokeInfoList').where({
      _id: jokeid
    }).get()
  }catch(err){
    console.log(err)
  }
  console.log(res.data)
  arr = res.data[0].hascollected
  if (arr.indexOf(openid) == -1) {
    arr.push(openid)
    await db.collection('jokeInfoList').doc(jokeid).update({
      data: {
        hascollected: arr
      }
    })
    await db.collection('userInfoList').doc(userid).update({
      data: {
        collected: _.inc(1)
      }
    })
  } else {
    arr.splice(arr.indexOf(openid), 1)
    await db.collection('jokeInfoList').doc(jokeid).update({
      data: {
        hascollected: arr
      }
    })
    await db.collection('userInfoList').doc(userid).update({
      data: {
        collected: _.inc(-1)
      }
    })
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.action){
    case 'changeLikeNum' :{
      try{
        await changeLikeNum(event.jokeid, event.userid, event.openid)
     }catch(res){
       console.log(res)
     }
      break
    }
    case 'changeCollectNum' :{
      try {
        console.log('gfasgsdfafsgdfasgasdtgrewg')
        await changeCollectNum(event.jokeid, event.userid, event.openid)
      } catch (res) {
        console.log(res)
      }
      break
    }
  }
}