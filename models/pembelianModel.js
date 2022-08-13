const mongoose = require('mongoose');

const pembelianSchema = mongoose.Schema(
  {
    tanggalPembelian: { type: Date, required: true },
    namaProduk: { type: String, required: true },
    jumlah: { type: Number, required: true },
    hargaPembelian: { type: Number, required: true },
    keterangan: { type: String },
  },
  { timestamps: true }
);

const pembelianModel = mongoose.model('pembelian', pembelianSchema);

module.exports = pembelianModel;
