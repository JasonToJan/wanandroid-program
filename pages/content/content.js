// pages/content/content.js
import api from "../../api/api.js";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemList:[],
    selected: 0,
    articleList:[],
    page: 1,
    isover: false,
    pageCount: 0,
    isLoadingMore: false,
    id:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      systemList: wx.getStorageSync("system"),
     
    })
    this.setData({
      id: this.data.systemList[0].id,
    })

    this.getArticleList(this.data.page)
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
    if(!this.data.isover){
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

  click(event){
    const index = event.currentTarget.dataset.index
    this.setData({
      selected: index,
      articleList: [],
      page:1,
      id: this.data.systemList[index].id,
    })
    this.getArticleList(this.data.page)
  },

  getArticleList(page){
  
    wx.showLoading({
      title: 'Loading',
    })
    api.getSystemArticleList(page,this.data.id)
    .then(
      res=>{
        if(this.data.page==1){
          this.setData({
            articleList:res.data.datas,
            page: 1,
            isover: res.data.over,
            isLoadingMore: false,
          })

        }else{
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
 * 条目点击
 */
  onItemClick(event) {
    wx.navigateTo({
      url: '/pages/web/web?url=' + event.currentTarget.dataset.url,
    })
  },

  /**
   * 收藏
   */
  collect(event) {
    const id = event.currentTarget.dataset.id
    const index = event.currentTarget.dataset.index
    const zan = event.currentTarget.dataset.zan
    if (app.isLogin()) {
      if (zan) {
        api.uncollect(id).then(
          res => {
            this.data.articleList[index].collect = false
            this.setData({
              articleList: this.data.articleList
            })
            wx.showToast({
              title: '取消收藏成功',
            })
          }
        )

      } else {
        api.collect(id).then(
          res => {
            this.data.articleList[index].collect = true
            this.setData({
              articleList: this.data.articleList
            })
            wx.showToast({
              title: '收藏成功',
            })
          }
        )
      }

    } else {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
})