const express = require('express');
const KategoriModel = require('../models/kategoriModel');
const router = express.Router();

router.get('/get-all-kategori', async (req, res) => {
  try {
    const kategori = await KategoriModel.find();
    res.send(kategori);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/add-kategori', async (req, res) => {
  try {
    const newkategori = new KategoriModel(req.body);
    await newkategori.save();
    res.send('Kategori Baru Berhasil Ditambah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/edit-kategori', async (req, res) => {
  try {
    await KategoriModel.findOneAndUpdate(
      { _id: req.body.kategoriId },
      req.body
    );
    res.send('Kategori Berhasil Diubah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/delete-kategori', async (req, res) => {
  try {
    await KategoriModel.findOneAndDelete({ _id: req.body.kategoriId });
    res.send('Kategori Berhasil Dihapus');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
