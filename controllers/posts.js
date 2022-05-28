const { successHandle, errorHandle } = require("../service/responseHandle");
const Post = require("../models/posts");

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    successHandle(res, allPosts);
  },
  async createPosts(req, res) {
    try{
      const { body } = req; // 既然名字一樣，就選擇使用解構的方式
      const newPost = await Post.create({
        name: body.name,
        content: body.content
      });
      successHandle(res, newPost);
    }catch(err){
      errorHandle(res, err.message);
    }
  },
  async deleteAllPosts(req, res) {
    await Post.deleteMany({});
    successHandle(res, Post);
  },
  async deleteOnePost(req, res) {
    try{
      const id = req.params.id;
      if (await Post.findById(`${id}`) !== null){
        await Post.findByIdAndDelete(`${id}`);
        successHandle(res, "刪除成功");
      }else{
        errorHandle(res, "無此筆資料");
      }
    }catch(err){
      console.log(err);
    }
  },
  async updatePosts(req, res) {
    try{
      const { body } = req; // 既然名字一樣，就選擇使用解構的方式
      const id = req.params.id;
      if (await Post.findById(`${id}`) !== null){
        if(body.content || body.name){
          const updatePost = await Post.findByIdAndUpdate(`${id}`, data);
          successHandle(res, updatePost);
        }else{
          errorHandle(res, "請至少填寫姓名或內容");
        }
      }else{
        errorHandle(res, "無此筆資料");
      }
    }catch(err){
      errorHandle(res, err.message);
    }
  }
};

module.exports = posts;