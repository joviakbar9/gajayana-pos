const express = require('express');
const router = express.Router();
const {
  getSum,
} = 
require('../controllers/laporanController');

router.get('/get-sum', getSum);

module.exports = router;