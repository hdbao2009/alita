let postsModel = require('../models/postsModel');
let productModel = require('../models/productModel');

const lazyLoad = async (res, DB, page) => {
  try {
    let total = await DB.collection.find().count();
    let result = await DB.find().skip(((page-1)*10)).limit(10);
    return res.json({ 
      result,
      total
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Get Posts Error"
    })
  }
} 

exports.LoadAll = async function (req, res, page, DB = null) {
  switch (DB) {
    case 'products':
      lazyLoad(res, productModel, page);
      break;
    default:
      lazyLoad(res, postsModel, page);
      break;
  }
  
}