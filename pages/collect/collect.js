// pages/collect/collect.js
import api from "../../api/api.js";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    page: 1,
    isover: false,
    isLoadingMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList(1) 
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
    if (!this.data.isover) {
      this.setData({
        isLoadingMore: true,
        page: this.data.page + 1
      })
      this.getArticleList(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getArticleList(page) {

    wx.showLoading({
      title: 'Loading',
    })
    api.getcollectList(page, this.data.id)
      .then(
        res => {
          console.log(res.data)
          if (this.data.page == 1) {
            this.setData({
              articleList: res.data.datas,
              page: 1,
              isover: res.data.over,
              isLoadingMore: false,
            })

          } else {
            this.setData({
              articleList: this.data.articleList.concat(res.data.datas),
              isover: res.data.over,
              isLoadingMore: false,
            })
          }
          wx.hideLoading()
        }
      )
  },

  /**
  * 收藏
  */
  collect(event) {
    const id = event.currentTarget.dataset.id
    const index = event.currentTarget.dataset.index
    const zan = event.currentTarget.dataset.zan
   
        api.uncollect(id).then(
          res => {
            this.data.articleList.splice(index,1)
         
            this.setData({
              articleList: this.data.articleList
            })
            wx.showToast({
              title: '取消收藏成功',
            })
          }
        )


  },
})