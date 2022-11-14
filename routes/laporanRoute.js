const express = require('express');
const router = express.Router();
const {
  getTotalPenjualan,
  getTotalPembelian,
} = 
require('../controllers/laporanController');

router.get('/get-total-penjualan', getTotalPenjualan);
router.get('/get-total-pembelian', getTotalPembelian);

module.exports = router;