const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getKategoris,
  addKategori,
  editKategori,
  deleteKategori,
} = 
require('../controllers/itemsController');

router.get('/get-all-items', getProducts);
router.post('/add-item', addProduct);
router.post('/edit-item', editProduct);
router.post('/delete-item', deleteProduct);
router.get('/get-all-kategori', getKategoris);
router.post('/add-kategori', addKategori);
router.post('/edit-kategori', editKategori);
router.post('/delete-kategori', deleteKategori);

module.exports = router;
