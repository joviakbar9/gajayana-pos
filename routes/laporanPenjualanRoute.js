const express = require('express');
const PemesananModel = require('../models/pemesananModel');
const router = express.Router();

router.get('/get-sum', async (req, res) => {
  try {
    const data = [
      {
        $match: { statusPembayaran: 'lunas' },
      },
      {
        $project: {
          yearMonthDay: {
            $dateToString: { format: '%d-%m-%Y', date: '$tanggalPemesanan' },
          },
          time: {
            $dateToString: { format: '%H:%M:%S:%L', date: '$tanggalPemesanan' },
          },
          totalHarga: '$totalHarga',
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          totalAmount: { $sum: '$totalHarga' },
        },
      },
    ];
    const kategori = await PemesananModel.aggregate(data);
    res.send(kategori);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
