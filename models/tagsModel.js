let mongoose = require('mongoose');
let schema = mongoose.Schema;

let tagsModel = new schema({
    name: {type: String, unique: true}
})

module.exports = mongoose.model('tags', tagsModel);