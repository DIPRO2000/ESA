const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  name: { type: String,
     required: true },

  enrollment_number: { type: Number,
     required: true,
    unique:true },

  department: { type: String },

  year:{ type:String }
});

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
