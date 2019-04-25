//system.js
const util = require('../../utils/util.js')
const app = getApp()
import api from "../../api/api.js"

Page({
  data: {
    parent:[],
    children:[],
    // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
  },

  onLoad: function () {
    wx.showLoading({
      title: 'Loading',
    })
    api.getSystemList()
    .then(
      res=>{
        console.log(res.data)
        this.setData({
          parent:res.data
        })
        wx.hideLoading()
      }
    )
  },

  tagClick(event){
    const index = event.currentTarget.dataset.index
    wx.setStorageSync("system", this.data.parent[index].children)
    
    wx.navigateTo({
    
      url: '/pages/content/content?title=' + this.data.parent[index].name,

    })
  },
})
