import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table, DatePicker } from 'antd';
import { BASE_URL } from '../constant/axios';

function Pembelian() {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [pembelianData, setPembelianData] = useState([]);
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editingPembelian, setEditingPembelian] = useState(null);
  const [delPembelian, setDelPembelian] = useState(null);
  const dispatch = useDispatch();

  const getAllPembelian = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/pembelian/get-all-pembelian`)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setPembelianData(response.data);
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  //date formatting
  pembelianData.map((e) => {
    var date = new Date(e.tanggalPembelian);
    var sdate = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    e.newtanggalPembelian = date.toLocaleDateString('id-ID', sdate);
  });

  const columns = [
    {
      title: 'Tanggal Pembelian',
      dataIndex: 'newtanggalPembelian',
      sorter: (a, b) =>
        a.newtanggalPembelian.localeCompare(b.newtanggalPembelian),
    },
    {
      title: 'Nama Produk',
      dataIndex: 'namaProduk',
      sorter: (a, b) => a.namaProduk.localeCompare(b.namaProduk),
    },
    {
      title: 'Jumlah',
      dataIndex: 'jumlah',
    },
    {
      title: 'Total Harga',
      dataIndex: 'hargaPembelian',
      sorter: (a, b) => a.hargaPembelian - b.hargaPembelian,
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <EditTwoTone
            className='mx-2'
            onClick={() => {
              setEditingPembelian(record);
              setAddEditModalVisibility(true);
            }}
          />
          <DeleteTwoTone
            twoToneColor='#eb2f96'
            className='mx-2'
            onClick={() => {
              setDelPembelian(record);
              setDeleteModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPembelian();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    if (editingPembelian === null) {
      axios
        .post(`${BASE_URL}/api/pembelian/add-pembelian`, values)
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success('Data Pembelian Berhasil Ditambah');
          setAddEditModalVisibility(false);
          getAllPembelian();
        })
        .catch((error) => {
          dispatch({ type: 'hideLoading' });
          message.error('Terjadi Kesalahan');
          console.log(error);
        });
    } else {
      axios
        .post(`${BASE_URL}/api/pembelian/edit-pembelian`, {
          ...values,
          pembelianId: editingPembelian._id,
        })
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success('Data Pembelian Berhasil Diubah');
          setEditingPembelian(null);
          setAddEditModalVisibility(false);
          getAllPembelian();
        })
        .catch((error) => {
          dispatch({ type: 'hideLoading' });
          message.error('Terjadi Kesalahan');
          console.log(error);
        });
    }
  };

  const deletePembelian = (values) => {
    dispatch({ type: 'showLoading' });
    axios
      .post(`${BASE_URL}/api/pembelian/delete-pembelian`, {
        ...values,
        pembelianId: delPembelian._id,
      })
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        message.success('Produk berhasil Dihapus');
        setDelPembelian(null);
        setDeleteModalVisibility(false);
        getAllPembelian();
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        message.error('Terjadi Kesalahan');
        console.log(error);
      });
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Pembelian</h3>
        <Button type='primary' onClick={() => setAddEditModalVisibility(true)}>
          Tambah Pembelian
        </Button>
      </div>

      <div className='d-flex'>
        <Search
          placeholder='search pembelian'
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </div>

      <Table columns={columns} dataSource={pembelianData} bordered />

      {addEditModalVisibility && (
        <Modal
          onCancel={() => {
            setEditingPembelian(null);
            setAddEditModalVisibility(false);
          }}
          visible={addEditModalVisibility}
          title={`${
            editingPembelian !== null ? 'Ubah Data Pembelian' : 'Tambah Data Pembelian'
          }`}
          footer={false}
        >
          {' '}
          <Form
            initialValues={editingPembelian}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item name='tanggalPembelian' label='Tanggal Pembelian'>
              <DatePicker defaultValue={moment()} format={dateFormatList} />
            </Form.Item>
            <Form.Item name='namaProduk' label='Nama Produk'>
              <Input />
            </Form.Item>
            <Form.Item name='jumlah' label='Jumlah'>
              <Input />
            </Form.Item>
            <Form.Item name='hargaPembelian' label='Total Harga'>
              <Input />
            </Form.Item>
            <Form.Item name='keterangan' label='Keterangan'>
              <Input.TextArea />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='primary'>
                SIMPAN
              </Button>
            </div>
          </Form>{' '}
        </Modal>
      )}

      {deleteModalVisibility && (
        <Modal
          onCancel={() => {
            setDelPembelian(null);
            setDeleteModalVisibility(false);
          }}
          visible={deleteModalVisibility}
          title='Hapus Data Pembelian'
          footer={false}
        >
          <Form
            initialValues={delPembelian}
            layout='vertical'
            onFinish={deletePembelian}
          >
            <div className='text-left'>
              <p>Apakah anda yakin ingin menghapus data pembelian ini? </p>
            </div>
            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='danger'>
                HAPUS
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default Pembelian;
