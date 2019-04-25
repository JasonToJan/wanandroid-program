import baseAPI from "./baseApi.js";
import interfaces from "./interfaces.js";

export default {
  
  getHomeBanner(params){
    const result = baseAPI.request(interfaces.INTERFACE_GET_BANNER, params, "GET");
    return result;
  },

  getHomeArticle(page,params){
    const result = baseAPI.request("/article/list/" + page + "/json", params, "GET");
    return result;
  },

  getHotKey(params){
    const result = baseAPI.request(interfaces.INTERFACE_HOT_KEY, params, "GET");
    return result;
  },

  toLogin(params){
    const result = baseAPI.request(interfaces.INTERFACE_USER_LOGIN,params,"POST");
    return result;
  },

  toRegister(params){
    const result = baseAPI.request(interfaces.INTERFACE_REGISTER,params,"POST");
    return result;
  },

  collect(id, params){
    const result = baseAPI.request("/lg/collect/" + id + "/json", params, "POST");
    return result;
  },

  uncollect(id, params) {
    const result = baseAPI.request("/lg/uncollect_originId/" + id + "/json", params, "POST");
    return result;
  },

  queryArticle(page, params) {
    const result = baseAPI.request("/article/query/" + (page - 1) + "/json", params, "POST");
    return result;
  },

  getSystemList(params){
    const result = baseAPI.request("/tree/json",params,"GET");
    return result;

  },

  getSystemArticleList(page,cid,params){
    const result = baseAPI.request("/article/list/" + (page - 1) + "/json?cid=" + cid,params,"GET");
    return result;
  },

  getFriendList(params){
    const result = baseAPI.request("/friend/json", params, "GET");
    return result;
  },

  getcollectList(page,params) {
    const result = baseAPI.request("/lg/collect/list/"+(page-1)+"/json", params, "GET");
    return result;
  },
  addTodoList(params){
    const result = baseAPI.request(interfaces.INTERFACE_ADDTODO, params, "POST");
    return result;
  },

  getTodoList(type,page,params){
    const result = baseAPI.request("/lg/todo/listnotdo/"+type+"/json/"+(page-1), params, "POST");
    return result;
  },
  
  updateTodo(id,params){
    const result = baseAPI.request("/lg/todo/update/" + id + "/json", params, "POST");
    return result;
  },

  finishTodo(id, params) {
    const result = baseAPI.request("/lg/todo/done/" + id + "/json", params, "POST");
    return result;
  },

  deleteTodo(id,params){
    const result = baseAPI.request("/lg/todo/delete/" + id + "/json", params, "POST");
    return result;
  }
}