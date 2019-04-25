// pages/todo/todo.js
import api from "../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['重要', '工作', '学习', '生活'],
    type:0,
    contentList:[],
    page: 1,
    isover: false,
    isLoadingMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodoList(1)
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
    this.getTodoList(1)
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
      this.getTodoList(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getTodoList(page){
    api.getTodoList(this.data.type, page)
      .then(
        res => {
          console.log(res.data)
          if (this.data.page == 1) {
            this.setData({
              contentList: res.data.datas,
              page: 1,
              isover: res.data.over,
              isLoadingMore: false,
            })

          }else{
            this.setData({
              contentList: this.data.contentList.concat(res.data.datas),
              isover: res.data.over,
              isLoadingMore: false,
            })
          }
        }
      )
  },

  click(event){
    this.setData({
      type:event.currentTarget.dataset.index,
      contentList: [],
      page: 1,
    })
    this.getTodoList(1)
  },

  edit(event){
    const index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/addtodo/addtodo?bean=' + JSON.stringify(this.data.contentList[index]),
    })

  },
  finish(event) {
    const index = event.currentTarget.dataset.index;
    api.finishTodo(this.data.contentList[index].id, {status:1})
      .then(
        res => {
          this.getTodoList(1)
        }
      )
  },

  delete(event) {
    const index = event.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success: function (res) {
        if(res.confirm) {
          api.deleteTodo(that.data.contentList[index].id)
            .then(
              res => {
                console.log(res.data)
                that.getTodoList(1)
              }
            )
        }
      }
    })
  
  },

})