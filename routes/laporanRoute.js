const express = require('express');
const router = express.Router();
const {
  getSum,
  getTotalPembelian,
} = 
require('../controllers/laporanController');

router.get('/get-sum', getSum);
router.get('/get-total-pembelian', getTotalPembelian);

module.exports = router;