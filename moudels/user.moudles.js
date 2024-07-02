const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  name:{type: String, required: true },
  type:{type: String, required: true },
},{ versionKey: false });

// קריאה ל- mongoose.model ולא ל servicetModel
const userModel = mongoose.model("user", userSchema);

module.exports =  userModel;