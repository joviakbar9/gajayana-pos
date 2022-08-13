const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();

router.post('/login', async (req, res) => {
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
});

router.get('/get-all-user', async (req, res) => {
  try {
    const user = await UserModel.find();
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/add-user', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send('User Baru Berhasil Ditambah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/edit-user', async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.send('User Berhasil Diubah');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/delete-user', async (req, res) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.body.userId });
    res.send('User Berhasil Dihapus');
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.post('/register', async (req, res) => {
//   try {
//     const newuser = new UserModel({ ...req.body, verified: false });
//     await newuser.save();
//     res.send('User Registered successfully');
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

module.exports = router;
