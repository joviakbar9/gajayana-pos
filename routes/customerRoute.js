const express = require('express');
const CustomerModel = require('../models/customerModel');
const router = express.Router();

router.get('/get-all-customer', async (req, res) => {
  try {
    const customer = await CustomerModel.find();
    res.send(customer);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/add-customer', async (req, res) => {
  try {
    const newCustomer = new CustomerModel(req.body);
    await newCustomer.save();
    res.send('Customer added successfully');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/edit-customer', async (req, res) => {
  try {
    await CustomerModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.send('Customer updated successfully');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/delete-customer', async (req, res) => {
  try {
    await CustomerModel.findOneAndDelete({ _id: req.body.itemId });
    res.send('Customer deleted successfully');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
