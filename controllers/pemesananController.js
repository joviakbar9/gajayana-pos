const PemesananModel = require('../models/pemesananModel');

module.exports = {
  addPemesanan: async (req, res) => {
    try {
      const newpemesanan = new PemesananModel(req.body);
      await newpemesanan.save();
      res.send('Pemesanan Berhasil Ditambah');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getPemesanan: async (req, res) => {
    try {
      const pemesanan = await PemesananModel.find().populate('customerId');
      res.send(pemesanan);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editPemesanan: async (req, res) => {
    try {
      await PemesananModel.findOneAndUpdate(
        { _id: req.body.pemesananId },
        req.body
      );
      res.send('Data Pemesanan Berhasil Diubah');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deletePemesanan: async (req, res) => {
    try {
      await PemesananModel.findOneAndUpdate({ _id: req.params.id}, {isArchive: true});
      res.send('Data Pemesanan Berhasil Dihapus');
    } catch (error) {
      res.status(400).json(error);
    }
  },
}