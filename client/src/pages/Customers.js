import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { BASE_URL } from '../constant/axios';

function Items() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [customerData, setCustomerData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [delItem, setDelItem] = useState(null);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const getAllCustomer = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/customer/get-all-customer`)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setCustomerData(response.data);
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
      title: 'Nama Customer',
      dataIndex: 'namaCustomer',
      sorter: (a, b) => a.namaCustomer.localeCompare(b.namaCustomer),
    },
    {
      title: 'No. HP',
      dataIndex: 'noHpCustomer',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <EditTwoTone
            className='mx-2'
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteTwoTone
            twoToneColor='#eb2f96'
            className='mx-2'
            onClick={() => {
              setDelItem(record);
              setDeleteModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllCustomer();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    if (editingItem === null) {
      axios
        .post(`${BASE_URL}/api/customer/add-customer`, values)
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success('Customer Berhasil Ditambah');
          setAddEditModalVisibilty(false);
          getAllCustomer();
        })
        .catch((error) => {
          dispatch({ type: 'hideLoading' });
          message.error('Terjadi Kesalahan');
          console.log(error);
        });
    } else {
      axios
        .post(`${BASE_URL}/api/customer/edit-customer`, {
          ...values,
          itemId: editingItem._id,
        })
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success('Data Customer Berhasil Diubah');
          setEditingItem(null);
          setAddEditModalVisibilty(false);
          getAllCustomer();
        })
        .catch((error) => {
          dispatch({ type: 'hideLoading' });
          message.error('Terjadi Kesalahan');
          console.log(error);
        });
    }
  };

  const deleteItem = (values) => {
    dispatch({ type: 'showLoading' });
    axios
      .post(`${BASE_URL}/api/customer/delete-customer`, {
        ...values,
        itemId: delItem._id,
      })
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        message.success('Customer berhasil Dihapus');
        setDelItem(null);
        setDeleteModalVisibility(false);
        getAllCustomer();
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
        <h3>Customer</h3>
        <Button type='primary' onClick={() => setAddEditModalVisibilty(true)}>
          Tambah Customer
        </Button>
      </div>

      <div className='d-flex'>
        <Search
          placeholder='search customer'
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={customerData} 
        bordered rowKey='_id' 
        pagination={{
          onChange(current) {
            setPage(current);
          }
        }}
      />
        
      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisibilty(false);
          }}
          visible={addEditModalVisibilty}
          title={`${
            editingItem !== null ? 'Ubah Customer' : 'Tambah Costumer'
          }`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item name='namaCustomer' label='Nama Customer'>
              <Input />
            </Form.Item>
            <Form.Item name='noHpCustomer' label='No. HP'>
              <Input />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='primary'>
                SIMPAN
              </Button>
            </div>
          </Form>
        </Modal>
      )}
      {deleteModalVisibility && (
        <Modal
          onCancel={() => {
            setDelItem(null);
            setDeleteModalVisibility(false);
          }}
          visible={deleteModalVisibility}
          title='Hapus Customer'
          footer={false}
        >
          <Form initialValues={delItem} layout='vertical' onFinish={deleteItem}>
            <div className='text-left'>
              <p>Apakah anda yakin ingin menghapus customer ini? </p>
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

export default Items;
