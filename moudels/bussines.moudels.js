const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const businessSchema = new Schema({
    Description: { type: String, required: true },
}, { versionKey: false });

const Business = mongoose.model('business', businessSchema);
module.exports = Business;
