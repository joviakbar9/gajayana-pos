const express = require('express');
const router = express.Router();
const {
  getPemesanan,
  addPemesanan,
  editPemesanan,
  deletePemesanan,
} = 
require('../controllers/pemesananController');

router.get('/get-all-pemesanan', getPemesanan);
router.post('/add-pemesanan', addPemesanan);
router.post('/edit-pemesanan', editPemesanan);
router.delete('/:id', deletePemesanan);

module.exports = router;
