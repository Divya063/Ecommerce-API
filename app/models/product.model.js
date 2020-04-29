const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);