import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../constant/axios';
import logo from '../resources/PrintingLogo.png';

function LaporanPenjualan() {
  const [itemsData, setItemsData] = useState([]);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const getAllItems = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/laporanPenjualan/get-sum`)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Tanggal Pemesanan',
      dataIndex: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: 'Total Penjualan',
      dataIndex: 'totalAmount',
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Laporan Penjualan</h3>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered rowKey='_id' />
    </div>
  );
}

export default LaporanPenjualan;
