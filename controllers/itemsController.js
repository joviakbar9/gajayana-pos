const ItemModel = require('../models/itemsModel');
const KategoriModel = require('../models/kategoriModel');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const items = await ItemModel.find().populate('kategori');
      console.log(items);
      res.send(items);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addProduct: async (req, res) => {
    try {
      const newitem = new ItemModel(req.body);
      await newitem.save();
      res.send('Produk Berhasil Ditambah');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editProduct: async (req, res) => {
    try {
      await ItemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
      res.send('Produk Berhasil Diubah');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await ItemModel.findOneAndDelete({ _id: req.body.itemId });
      res.send('Produk Berhasil Dihapus');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getKategoris: async (req, res) => {
    try {
      const kategori = await KategoriModel.find();
      res.send(kategori);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addKategori: async (req, res) => {
    try {
      const newkategori = new KategoriModel(req.body);
      await newkategori.save();
      res.send('Kategori Baru Berhasil Ditambah');
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editKategori: async (req, res) => {
    try {
      await KategoriModel.findOneAndUpdate({ _id: req.body.kategoriId }, req.body);
      res.send('Kategori Berhasil Diubah');
    } catch (error) {
      res.status(400).json(error);
    }
  };
  deleteKategori: async (req, res) => {
    try {
      await KategoriModel.findOneAndDelete({ _id: req.body.kategoriId });
      res.send('Kategori Berhasil Dihapus');
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
