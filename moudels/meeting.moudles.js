const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  Description: { type: String, required: true },
},{ versionKey: false });
const MeetingModel = mongoose.model("meeting", meetingSchema);
module.exports = {MeetingModel};





