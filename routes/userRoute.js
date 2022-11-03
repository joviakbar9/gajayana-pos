const express = require('express');
const router = express.Router();
const {
  login,
  getUser,
  addUser,
  editUser,
  deleteUser,
} = 
require('../controllers/userController');

router.post('/login', login);
router.get('/get-all-user', getUser);
router.post('/add-user', addUser);
router.post('/edit-user', editUser);
router.delete('/:id', deleteUser);

module.exports = router;

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
