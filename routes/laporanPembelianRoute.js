const express = require('express');
const PembelianModel = require('../models/pembelianModel');
const router = express.Router();

router.get('/get-total-pembelian', async (req, res) => {
  try {
    const data = [
      {
        $project: {
          yearMonthDay: {
            $dateToString: { format: '%d-%m-%Y', date: '$tanggalPembelian' },
          },
          time: {
            $dateToString: { format: '%H:%M:%S:%L', date: '$tanggalPembelian' },
          },
          totalHarga: '$hargaPembelian',
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          totalAmount: { $sum: '$hargaPembelian' },
        },
      },
    ];
  }
});

module.exports = router;
