const PembelianModel = require('../models/pembelianModel');

module.exports = {
  getPembelian: async (req, res) => {
    try {
      const pembelian = await PembelianModel.find({isArchive:false});
      res.send(pembelian);
    } catch (error) {
      res.status(400).json(error);
    }
  },
      
      addPembelian: async (req, res) => {
        try {
          const newPembelian = new PembelianModel(req.body);
          await newPembelian.save();
          res.send('Data Pembelian Berhasil Ditambah');
        } catch (error) {
          res.status(400).json(error);
        }
      },
      
      editPembelian: async (req, res) => {
        try {
          await PembelianModel.findOneAndUpdate(
            { _id: req.body.pembelianId },
            req.body
          );
          res.send('Data Pembelian Berhasil Diubah');
        } catch (error) {
          res.status(400).json(error);
        }
      },
      
      deletePembelian: async (req, res) => {
        try {
          await PembelianModel.findOneAndUpdate({ _id: req.params.id}, {isArchive: true});
          res.send('Data Pembelian Berhasil Dihapus');
        } catch (error) {
          res.status(400).json(error);
        }
      },
}