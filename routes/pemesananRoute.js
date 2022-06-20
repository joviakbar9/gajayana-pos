const express = require("express");
const PemesananModel = require("../models/pemesananModel");
const router = express.Router();


router.post("/charge-pemesanan", async (req, res) => {
  try {
    const newpemesanan = new PemesananModel(req.body)
    await newpemesanan.save()
    res.send('Bill charged successfully')
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get("/get-all-pemesanan", async (req, res) => {
  try {
    const pemesanan = await PemesananModel.find()
    res.send(pemesanan)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/delete-pesanan", async (req, res) => {
  try {
    await PemesananModel.findOneAndDelete({_id : req.body.pemesananId})
    res.send('Pesanan Berhasil Dihapus')
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router
