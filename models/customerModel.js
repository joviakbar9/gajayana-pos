const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = mongoose.Schema(
  {
    namaCustomer: { type: String, required: true },
    noHpCustomer: { type: String, required: true },
  },
  { timestamps: true }
);

const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;
