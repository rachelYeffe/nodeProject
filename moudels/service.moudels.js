const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
},{ versionKey: false });

// קריאה ל- mongoose.model ולא ל servicetModel
const serviceModel = mongoose.model("service", serviceSchema);

module.exports =  serviceModel ;  // לא servicetModel כפי שנראה שהיתה לך פה בשורה כאשר
