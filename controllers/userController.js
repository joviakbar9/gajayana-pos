const UserModel = require('../models/userModel');

module.exports = {
    login: async (req, res) => {
        try {
          const user = await UserModel.findOne({
            userId: req.body.userId,
            password: req.body.password,
          });
          if (user) {
            res.send(user);
          } else {
            res.status(400).json({ message: 'Login Gagal', user });
          }
        } catch (error) {
          res.status(400).json(error);
        }
      },
    getUser: async (req, res) => {
        try {
          const user = await UserModel.find({isArchive:false});
          res.send(user);
        } catch (error) {
          res.status(400).json(error);
        }
      },
    addUser: async (req, res) => {
        try {
          const newUser = new UserModel(req.body);
          await newUser.save();
          res.send('User Baru Berhasil Ditambah');
        } catch (error) {
          res.status(400).json(error);
        }
      },
    editUser: async (req, res) => {
        try {
          await UserModel.findOneAndUpdate(
            { _id: req.body.usersId },
            req.body
          );
          res.send('User Berhasil Diubah');
        } catch (error) {
          res.status(400).json(error);
        }
      },
      
      deleteUser: async (req, res) => {
        try {
          await UserModel.findOneAndUpdate({ _id: req.params.id}, {isArchive: true});
          res.send('User Berhasil Dihapus');
        } catch (error) {
          res.status(400).json(error);
        }
      },
  };