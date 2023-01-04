const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isArchive: {type: Boolean, default: false},
  },
  { timestamps: true }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
