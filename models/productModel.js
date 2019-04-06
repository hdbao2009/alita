const mongoose = require('mongoose');
const schema = mongoose.Schema;

var min = [1, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'];
var max = [5, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];

const productModel = new schema({
  name: {type: String, unique: true},
  price: {type: String, required: true},
  info: {type: String, default: null},
  description: {type: String, default: null},
  salePrice: {type: Number, default: null},
  saleTime: {type: String, default: null},
  createDate: {type: String, required: true},
  updateDate: {type: String, default: null},
  idAuthor: {type: String, required: true},
  idCategory: {type: String, required: true},
  checkEdit: {type: Boolean, default: false},
  imageName: {type: String, default: null},
  rate: {type: Number, default: null},
  desImageName: [],
  listRate: [{
    idAuthorRate: {type: String, unique: true, required: true, default: null},
    rate: {type: Number, required: true, min: min, max: max, default: null}
  }],
})

module.exports = mongoose.model('product', productModel);