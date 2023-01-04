const mongoose = require('mongoose');

const pemesananSchema = mongoose.Schema(
  {
    tanggalPemesanan: { type: Date, required: true },
    customerId: { type: mongoose.Types.ObjectId, ref: 'customer', required: true },
    totalHarga: { type: Number, required: true },
    uangMuka: { type: Number, required: true },
    diskon: { type: Number, required: true},
    sisaPembayaran: { type: Number, required: true },
    cartItems: { type: Array, required: true },
    statusPembayaran: { type: String, required: true },
    keterangan: { type: String },
    isArchive: {type: Boolean, default: false},
  },
  { timestamps: true }
);

const pemesananModel = mongoose.model('pemesanan', pemesananSchema);

module.exports = pemesananModel;
