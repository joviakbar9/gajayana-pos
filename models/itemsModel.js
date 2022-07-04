const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  kodeproduk: { type: String, required: true },
  namaproduk: { type: String, required: true },
  harga: { type: Number, required: true },
  kategori: { type: String, required: true }
}, {timestamps : true});

const itemsModel = mongoose.model("items", itemsSchema);

module.exports = itemsModel;
