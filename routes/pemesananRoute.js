const express = require('express');
const PemesananModel = require('../models/pemesananModel');
const router = express.Router();

router.post('/charge-pemesanan', async (req, res) => {
  try {
    const newpemesanan = new PemesananModel(req.body);
    await newpemesanan.save();
    res.send('Pemesanan Berhasil Ditambah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/get-all-pemesanan', async (req, res) => {
  try {
    const pemesanan = await PemesananModel.find().populate('customerId');
    res.send(pemesanan);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/edit-pemesanan', async (req, res) => {
  try {
    await PemesananModel.findOneAndUpdate(
      { _id: req.body.pemesananId },
      req.body
    );
    res.send('Data Pemesanan Berhasil Diubah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/delete-pemesanan', async (req, res) => {
  try {
    await PemesananModel.findOneAndDelete({ _id: req.body.pemesananId });
    res.send('Data Pemesanan Berhasil Dihapus');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
