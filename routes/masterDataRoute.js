const express = require('express');
const router = express.Router();
const {
  getProduk,
  addProduk,
  editProduk,
  deleteProduk,
  getKategoris,
  addKategori,
  editKategori,
  deleteKategori,
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
  getPegawai,
  addPegawai,
  editPegawai,
  deletePegawai,
} = 
require('../controllers/masterDataController');

router.get('/get-all-items', getProduk);
router.post('/add-item', addProduk);
router.post('/edit-item', editProduk);
router.delete('/:id', deleteProduk);

router.get('/get-all-kategori', getKategoris);
router.post('/add-kategori', addKategori);
router.post('/edit-kategori', editKategori);
router.delete('/:id', deleteKategori);

router.get('/get-all-customer', getCustomer);
router.post('/add-customer', addCustomer);
router.post('/edit-customer', editCustomer);
router.delete('/:id', deleteCustomer);

router.get('/get-all-pegawai', getPegawai);
router.post('/add-customer', addPegawai);
router.post('/edit-customer', editPegawai);
router.delete('/:id', deletePegawai);

module.exports = router;
