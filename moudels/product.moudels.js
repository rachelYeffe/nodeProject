const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductModelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sale: { type: Boolean, default: false },
},{ versionKey: false });

const productModel = mongoose.model("product", ProductModelSchema);
module.exports = {productModel};





