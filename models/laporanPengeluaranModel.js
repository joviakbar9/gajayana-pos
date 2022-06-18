const mongoose = require("mongoose");

const pengeluaranSchema = mongoose.Schema({
  tanggal: { type: Date, required: true },
  jumlahPemesanan: { type: Number, required: true },
  totalPenjualan: { type: Number, required: true },
  totalPegawai: { type: Number, required: true },
  totalGaji: { type: Number, required: true }
}, {timestamps : true});

const pengeluaranModel = mongoose.model("pengeluaran", pengeluaranSchema);

module.exports = pengeluaranModel;
