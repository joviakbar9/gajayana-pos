import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Input } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constant/axios';

function Homepage() {
  const { Search } = Input;
  const onSearch = (value) => {
    if (value === '') {
      setItemsData(itemsDataOri);
      return;
    }

    const searched = itemsData.filter((v) => {
      return v.kodeproduk === value;
    });
    setItemsData(searched);
  };

  const [itemsData, setItemsData] = useState([]);
  const [itemsDataOri, setItemsDataOri] = useState([]);

  const dispatch = useDispatch();
  function addTocart(item) {
    dispatch({ type: 'addToCart', payload: { ...item, quantity: 1 } });
  }
  const getAllItems = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/items/get-all-items`)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setItemsData(response.data);
        setItemsDataOri(response.data);
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'Kode Produk',
      dataIndex: 'kodeproduk',
      sorter: (a, b) => a.kodeproduk.localeCompare(b.kodeproduk),
    },
    {
      title: 'Nama Produk',
      dataIndex: 'namaproduk',
      sorter: (a, b) => a.namaproduk.localeCompare(b.namaproduk),
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
    },
    {
      title: 'Kategori',
      dataIndex: 'kategori',
      render: (v) => v.namaKategori,
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <Button onClick={() => addTocart(record)} type='primary'>
            Tambah
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Produk</h3>
      </div>
      <div className='d-flex'>
        <Search
          placeholder='search produk'
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </div>

      <Table columns={columns} dataSource={itemsData} rowKey='_id' bordered />
    </div>
  );
}

export default Homepage;
