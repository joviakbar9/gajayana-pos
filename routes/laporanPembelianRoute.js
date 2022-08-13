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
          hargaPembelian: '$hargaPembelian',
        },
      },
      {
        $group: {
          _id: '$yearMonthDay',
          totalAmount: { $sum: '$hargaPembelian' },
        },
      },
    ];
    const kategori = await PembelianModel.aggregate(data);
    res.send(kategori);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
