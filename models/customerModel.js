const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    namaCustomer: { type: String, required: true },
    noHpCustomer: { type: String, required: true },
    isArchive: {type: Boolean, default: false},
  },
  { timestamps: true }
);

const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;
