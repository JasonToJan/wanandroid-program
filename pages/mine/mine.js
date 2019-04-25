// pages/mine/mine.js
var initData = 'this is first line\nthis is second line'
var extraLine = [];
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine_items: ["我的收藏", "添加待办", "待办清单", "关于我们"],
    img_source: ["../../images/mycollect.png", "../../images/knowledge.png", "../../images/todo.png", "../../images/about.png"],
    loginBean:wx.getStorageSync("loginBean"),
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
    
    this.setData({
      loginBean:wx.getStorageSync("loginBean")
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
   * 登录
   */
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 退出登录
   */
  loginOut:function(){
    var my = this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录?',
      success:function(res){
        if(res.confirm){
          wx.clearStorageSync()
          my.setData({
            loginBean: wx.getStorageSync("loginBean")
          })
        }
      }
    })
    
  },

  itemClick(event){
    const index = event.currentTarget.dataset.index
    if(app.isLogin()){
      if(index==0){
        wx.navigateTo({
          url: '/pages/collect/collect',
        })
      } else if (index == 1){
        wx.navigateTo({
          url: '/pages/addtodo/addtodo',
        })
      } else if (index == 2) {
        wx.navigateTo({
          url: '/pages/todo/todo',
        })
      }else if(index==3){
        wx.navigateTo({
          url: '/pages/about/about',
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
     
  
})