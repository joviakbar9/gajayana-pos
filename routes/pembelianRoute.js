const express = require("express");
const PembelianModel = require("../models/pembelianModel");
const router = express.Router();

router.get("/get-all-pembelian", async (req, res) => {
  try {
    const pembelian = await PembelianModel.find();
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-pembelian", async (req, res) => {
  try {
    const newPembelian = new PembelianModel(req.body)
    await newPembelian.save()
    res.send('Data Pembelian Berhasil Ditambah')
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/edit-pembelian", async (req, res) => {
  try {
    await PembelianModel.findOneAndUpdate({_id : req.body.pembelianId} , req.body)
    res.send('Data Pembelian Berhasil Diubah')
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/delete-pembelian", async (req, res) => {
  try {
    await PembelianModel.findOneAndDelete({_id : req.body.pembelianId})
    res.send('Data Pembelian Berhasil Dihapus')
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router
