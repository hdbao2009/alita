let mongoose = require('mongoose');
let schema = mongoose.Schema;

let categoriesModel = new schema({
	name: { type: String, enique: true}
});

module.exports = mongoose.model('categories', categoriesModel);