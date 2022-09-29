const mongoose = require('mongoose');

const pegawaiSchema = mongoose.Schema(
  {
    namaPegawai: { type: String, required: true },
    nohpPegawai: { type: String, required: true },
    tugas: { type: String, required: true },
    gajiPokok: { type: Number, required: true },
  },
  { timestamps: true }
);

const pegawaiModel = mongoose.model('pegawai', pegawaiSchema);

module.exports = pegawaiModel;
