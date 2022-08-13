const express = require('express');
const PegawaiModel = require('../models/pegawaiModel');
const router = express.Router();

router.get('/get-all-pegawai', async (req, res) => {
  try {
    const pegawai = await PegawaiModel.find();
    res.send(pegawai);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/add-pegawai', async (req, res) => {
  try {
    const newPegawai = new PegawaiModel(req.body);
    await newPegawai.save();
    res.send('Data Pegawai Berhasil Ditambah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/edit-pegawai', async (req, res) => {
  try {
    await PegawaiModel.findOneAndUpdate({ _id: req.body.pegawaiId }, req.body);
    res.send('Data Pegawai Berhasil Diubah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/delete-pegawai', async (req, res) => {
  try {
    await PegawaiModel.findOneAndDelete({ _id: req.body.pegawaiId });
    res.send('Data Pegawai Berhasil Dihapus');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
