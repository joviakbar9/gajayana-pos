const mongoose = require("mongoose");

const pemesananSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhoneNumber : {type:String , required:true},
  totalAmount: { type: Number, required: true },
  // tax: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  paymentMode : {type:String , required:true},
  cartItems : {type:Array , required:true},
  tanggalPemesanan: { type: String, required: true }
}, {timestamps : true});

const pemesananModel = mongoose.model("pemesanan", pemesananSchema);

module.exports = pemesananModel;
