const mongoose = require("mongoose");

const pembelianSchema = mongoose.Schema({
  tanggalPembelian: { type: Date, required: true },
  kodeproduk: { type: String, required: true },
  namaproduk: { type: String, required: true },
  kategori: { type: String, required: true },
  jumlahStok: { type: Number, required: true },
  hargaPembelian: { type: Number, required: true }
}, {timestamps : true});

const pembelianModel = mongoose.model("pembelian", pembelianSchema);

module.exports = pembelianModel;
