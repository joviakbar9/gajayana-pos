const mongoose = require('mongoose');

const kategoriSchema = mongoose.Schema(
  {
    namaKategori: { type: String, required: true },
    satuan: { type: String, required: true },
    isArchive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const kategoriModel = mongoose.model('kategori', kategoriSchema);

module.exports = kategoriModel;
