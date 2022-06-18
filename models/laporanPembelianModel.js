const mongoose = require("mongoose");

const laporanPembelianSchema = mongoose.Schema({
  tanggal: { type: Date, required: true },
  jumlahPembelian: { type: Number, required: true },
  totalPembelian: { type: Number, required: true }
}, {timestamps : true});

const laporanPembelianModel = mongoose.model("laporanPembelian", laporanPembelianSchema);

module.exports = laporanPembelianModel;
