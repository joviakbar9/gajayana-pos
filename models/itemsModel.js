const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemsSchema = mongoose.Schema(
  {
    kodeproduk: { type: String, required: true },
    namaproduk: { type: String, required: true },
    harga: { type: Number, required: true },
    kategori: { type: Schema.Types.ObjectId, ref: 'kategori', required: true },
    ket: { type: String },
  },
  { timestamps: true }
);

const itemsModel = mongoose.model('items', itemsSchema);

module.exports = itemsModel;
