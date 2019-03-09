let mongoose = require('mongoose');
let schema = mongoose.Schema;

let authModel = new schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: {type: String, unique: true},
    telephone: {type: Number, unique: true},
    role: {type: Number}
})

module.exports = mongoose.model('auth', authModel);