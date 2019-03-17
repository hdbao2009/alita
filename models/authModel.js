let mongoose = require('mongoose');
let schema = mongoose.Schema;

let authModel = new schema({
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    fullname: {type: String},
    role: {type: Number}
})

module.exports = mongoose.model('auth', authModel);