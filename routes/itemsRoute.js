const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/itemsController');

router.get('/get-all-items', getProducts);
router.post('/add-item', addProduct);
router.post('/edit-item', editProduct);
router.post('/delete-item', deleteProduct);

module.exports = router;
