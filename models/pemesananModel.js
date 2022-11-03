const mongoose = require('mongoose');

const pemesananSchema = mongoose.Schema(
  {
    idnota: { type: mongoose.Types.ObjectId, ref: 'GDP' },
    tanggalPemesanan: { type: Date, required: true },
    customerId: { type: mongoose.Types.ObjectId, ref: 'customer' },
    totalHarga: { type: Number },
    uangMuka: { type: Number },
    diskon: { type: Number },
    sisaPembayaran: { type: Number },
    cartItems: { type: Array, required: true },
    statusPembayaran: { type: String, required: true },
    keterangan: { type: String },
    isArchive: {type: Boolean, default: false},
  },
  { timestamps: true }
);

const pemesananModel = mongoose.model('pemesanan', pemesananSchema);

module.exports = pemesananModel;
