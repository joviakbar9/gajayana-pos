const ItemModel = require("../models/itemsModel");
const KategoriModel = require("../models/kategoriModel");
const CustomerModel = require("../models/customerModel");
const PegawaiModel = require("../models/pegawaiModel");

module.exports = {
  getProduk: async (req, res) => {
    try {
      const items = await ItemModel.find({ isArchive: false }).populate("kategori");
      res.send(items);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addProduk: async (req, res) => {
    try {
      const newitem = new ItemModel(req.body);
      await newitem.save();
      res.send("Produk Berhasil Ditambah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editProduk: async (req, res) => {
    try {np
      await ItemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
      res.send("Produk Berhasil Diubah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProduk: async (req, res) => {
    try {
      await ItemModel.findOneAndUpdate(
        { _id: req.params.id },
        { isArchive: true }
      );
      res.send("Produk Berhasil Dihapus");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getKategori: async (req, res) => {
    try {
      const kategori = await KategoriModel.find({ isArchive: false });
      res.send(kategori);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addKategori: async (req, res) => {
    try {
      const newkategori = new KategoriModel(req.body);
      await newkategori.save();
      res.send("Kategori Baru Berhasil Ditambah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editKategori: async (req, res) => {
    try {
      await KategoriModel.findOneAndUpdate({ _id: req.body.kategoriId }, req.body );
      res.send("Kategori Berhasil Diubah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteKategori: async (req, res) => {
    try {
      await KategoriModel.findOneAndUpdate(
        { _id: req.params.id },
        { isArchive: true }
      );
      res.send("Kategori Berhasil Dihapus");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getCustomer: async (req, res) => {
    try {
      const customer = await CustomerModel.find({ isArchive: false });
      res.send(customer);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addCustomer: async (req, res) => {
    try {
      const newCustomer = new CustomerModel(req.body);
      await newCustomer.save();
      res.send("Customer added successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editCustomer: async (req, res) => {
    try {
      await CustomerModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
      res.send("Customer updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // router.delete('/:id', async (req, res) => {
  deleteCustomer: async (req, res) => {
    try {
      await CustomerModel.findOneAndUpdate(
        { _id: req.params.id },
        { isArchive: true }
      );
      res.send("Customer deleted successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getPegawai: async (req, res) => {
    try {
      const pegawai = await PegawaiModel.find({ isArchive: false });
      res.send(pegawai);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addPegawai: async (req, res) => {
    try {
      const newPegawai = new PegawaiModel(req.body);
      await newPegawai.save();
      res.send("Data Pegawai Berhasil Ditambah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editPegawai: async (req, res) => {
    try {
      await PegawaiModel.findOneAndUpdate(
        { _id: req.body.pegawaiId },
        req.body
      );
      res.send("Data Pegawai Berhasil Diubah");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deletePegawai: async (req, res) => {
    try {
      await PegawaiModel.findOneAndUpdate(
        { _id: req.params.id },
        { isArchive: true }
      );
      res.send("Data Pegawai Berhasil Dihapus");
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
