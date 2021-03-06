const mongoose = require("mongoose");

const pemesananSchema = mongoose.Schema({
  tanggalPemesanan: { type: Date, required: true },
  namaCustomer: { type: String, required: true },
  nohpCustomer : { type: String, required: true },
  totalHarga: { type: Number },
  uangMuka: { type: Number },
  sisaPembayaran: { type: Number },
  cartItems : { type:Array, required: true },
  statusPembayaran: { type:String, required: true },
  keterangan: { type: String }
}, {timestamps : true});

const pemesananModel = mongoose.model("pemesanan", pemesananSchema);

module.exports = pemesananModel;
