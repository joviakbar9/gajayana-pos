const express = require('express');
const router = express.Router();
const {
  getPembelian,
  addPembelian,
  editPembelian,
  deletePembelian,
} = 
require('../controllers/pembelianController');

router.get('/get-all-pembelian', getPembelian);
router.post('/add-pembelian', addPembelian);
router.post('/edit-pembelian', editPembelian);
router.delete('/:id', deletePembelian);

module.exports = router;
