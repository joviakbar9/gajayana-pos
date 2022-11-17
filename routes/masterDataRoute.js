const express = require('express');
const router = express.Router();
const {
  getProduk,
  addProduk,
  editProduk,
  deleteProduk,
  getKategori,
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
router.delete('/delete-item/:id', deleteProduk);

router.get('/get-all-kategori', getKategori);
router.post('/add-kategori', addKategori);
router.post('/edit-kategori', editKategori);
router.delete('/delete-kategori/:id', deleteKategori);

router.get('/get-all-customer', getCustomer);
router.post('/add-customer', addCustomer);
router.post('/edit-customer', editCustomer);
router.delete('/delete-customer/:id', deleteCustomer);

router.get('/get-all-pegawai', getPegawai);
router.post('/add-pegawai', addPegawai);
router.post('/edit-pegawai', editPegawai);
router.delete('/delete-pegawai/:id', deletePegawai);

module.exports = router;
