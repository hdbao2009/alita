const productModel = require('../models/productModel');
const moment = require('moment');
const _ = require('lodash');
const currencyFormatter = require('currency-formatter');
const lazyLoad = require('../repo/lazyLoad');

const handleGetPointRate = (data) => {
  let getListRateOnlyNumber = data.listRate.map(e => (e.rate));
  data.totalRate = (_.sum(getListRateOnlyNumber) / getListRateOnlyNumber.length);
  return data.save();
}

module.exports = {
  list: async (req, res) => {
    let pages = req.query.pages;
    pages = pages ? pages.substring(0, pages.length - 1) : 1;
		return lazyLoad.LoadAll(req, res, +pages, 'products');
  },

  getProByID: async (req, res) => {
    try {
      let id = req.params.id;
      let data = await productModel.findOne({_id: id});
      res.status(200).json({
        data,
        status: 1,
        messages: "Get Product by ID completed"
      })
    } catch (error) {
      res.status(500).json({
        err: error
      })
    }
  },

  create: async (req, res) => {
    try {
      req.body.createDate = moment(new Date()).format('DD/MM/YYYY, h:mm:ss');
      // req.body.price = currencyFormatter.format(req.body.price, { code: 'VND' });
      let data = new productModel(req.body);
      let created = await data.save();
      return res.status(200).json({
        created,
        status: 1,
        messages: "Created new product"
      })
    } catch (error) {
      res.status(500).json({
        err: error
      })
    }
  },

  update: async (req, res) => {
    try {
      let id = req.params.id;
      req.body.updateDate = moment(new Date()).format('DD/MM/YYYY, h:mm:ss');
      req.body.checkEdit = true;
      let data = await productModel.updateOne({_id: id}, {$set: req.body});
      res.status(200).json({
        data,
        status: 1,
        messages: "Updated new product"
      })
    } catch (error) {
      res.status(500).json({
        err: error
      })
    }
  }, 
  
  addRate: async (req, res) => {
    try {
      const id = req.params.id;
      let getProduct = await productModel.findOne({_id: id});
      const location = _.findIndex(getProduct.listRate, (o) => (o.idAuthor == req.body.idAuthor));
      if (location !== -1) {
        getProduct.listRate[location].rate = req.body.rate;
        let updated = await getProduct.save();
        // let updatedRate = await handleGetPointRate(getProduct);
        return res.status(200).json({
          updated,
          status: 1,
          messages: "Updated current rate product"
        })
      }
      getProduct.listRate.push(req.body);
      let updated = await getProduct.save();
      // let updatedRate = await handleGetPointRate(getProduct);
      res.status(200).json({
        updated,
        status: 1,
        messages: "Updated new rate product"
      })
    } catch (error) {
      res.status(500).json({
        err: error
      })
    }
  },

  // Delete product by Id
	deleteProductById: async (req, res) => {
		try {
			let id = req.params.id;
			let result = await productModel.deleteOne({_id: id}).exec();
			res.status(200).json({
				message: 'Deleted Product Successfully',
				success: result,
				status: 1
			})
		} catch (error) {
			res.status(500).json({
				message: '',
				error: error
			})
		}
	}
}