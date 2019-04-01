let postsModel = require('../models/postsModel');

exports.LoadAll = async function (req, res, page) {
  try {
    let totalPosts = await postsModel.collection.find().count();
    let posts = await postsModel.find().skip(((page-1)*10)).limit(10);

    // var check = (posts.length == 3);
    // if (check) {
    //   posts.pop();
    // }
    return res.json({ 
      posts,
      totalPosts
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Get Posts Error"
    })
  }
}