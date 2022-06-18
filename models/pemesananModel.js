const mongoose = require("mongoose");

const pemesananSchema = mongoose.Schema({
  namaCustomer: { type: String, required: true },
  nohpCustomer : { type:String , required:true },
  totalHarga: { type: Number, required: true },
  tipePembayaran : { type:Boolean , required:true },
  uangMuka: { type: Number, required: true },
  cartItems : { type:Array , required:true },
  tanggalPemesanan: { type: Date, required: true },
  statusPembayaran: { type: Boolean, required: true },
  keterangan: { type: String, required: true }
}, {timestamps : true});

const pemesananModel = mongoose.model("pemesanan", pemesananSchema);

module.exports = pemesananModel;
