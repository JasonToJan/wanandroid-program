// pages/register/register.js
import api from "../../api/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",

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

  },

  inputusername:function(e){
    this.setData({
      username:e.detail.value
    })
  },

  inputpassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  register:function(){

    api.toRegister({username:this.data.username, password:this.data.password, repassword:this.data.password})
    .then(
      res=>{
        console.log(res.data)
        wx.setStorageSync("loginBean", res.data)
        wx.navigateBack({
          delta:2
        })
      }
    )
    .catch(
      e=>{
        console.log(e.errorMsg)
        wx.showToast({
          title: e.errorMsg,
          icon:'none'
        })
      }
    )
  },
})