const express = require('express');
const PembelianModel = require('../models/pembelianModel');
const router = express.Router();

router.get('/get-sum', async (req, res) => {
  try {
    const data = [
      {
        $project: {
          yearMonthDay: {
            $dateToString: { format: '%Y-%m-%d', date: '$tanggalPemesanan' },
          },
          time: {
            $dateToString: { format: '%H:%M:%S:%L', date: '$tanggalPemesanan' },
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
