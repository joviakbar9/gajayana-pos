import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constant/axios';

function LaporanPembelian() {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();

  const getAllPembelian = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/laporanPembelian/get-sum`)
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
      title: 'Tanggal Pembelian',
      dataIndex: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: 'Total Pembelian',
      dataIndex: 'totalAmount',
    },
  ];

  useEffect(() => {
    getAllPembelian();
  }, []);
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Laporan Pembelian</h3>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered rowKey='_id' />
    </div>
  );
}

export default LaporanPembelian;
