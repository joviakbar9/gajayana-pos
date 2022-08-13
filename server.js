const express = require('express');
const dbConnect = require('./dbConnect');
const cors = require('cors');

const app = express();
const itemsRoute = require('./routes/itemsRoute');
const usersRoute = require('./routes/userRoute');
const pemesananRoute = require('./routes/pemesananRoute');
const kategoriRoute = require('./routes/kategoriRoute');
const pembelianRoute = require('./routes/pembelianRoute');
const customerRoute = require('./routes/customerRoute');
const pegawaiRoute = require('./routes/pegawaiRoute');
const laporanPenjualanRoute = require('./routes/laporanPenjualanRoute');
// const laporanPembelianRoute = require('./routes/laporanPembelianRoute');

app.use(cors());

app.use(express.json());

app.use('/api/items/', itemsRoute);
app.use('/api/users/', usersRoute);
app.use('/api/pemesanan/', pemesananRoute);
app.use('/api/kategori/', kategoriRoute);
app.use('/api/pembelian/', pembelianRoute);
app.use('/api/customer/', customerRoute);
app.use('/api/pegawai/', pegawaiRoute);
app.use('/api/laporanPenjualan/', laporanPenjualanRoute);
// app.use('/api/laporanPembelian/', laporanPembelianRoute);

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World! from home api'));
app.listen(port, () => console.log(`Node JS Server Running at port ${port}`));
