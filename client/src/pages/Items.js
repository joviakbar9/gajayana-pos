import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { BASE_URL } from '../constant/axios'

function Items() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/items/get-all-items`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post(`${BASE_URL}/api/items/delete-item` , {itemId : record._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success('Produk berhasil Dihapus')
        getAllItems()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi Kesalahan')
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Kode Produk",
      dataIndex: "kodeproduk",
      sorter: (a, b) => a.kodeproduk.localeCompare(b.kodeproduk),
    },
    {
      title: "Nama Produk",
      dataIndex: "namaproduk",
      sorter: (a, b) => a.namaproduk.localeCompare(b.namaproduk),
    },
    {
      title: "Harga",
      dataIndex: "harga",
      sorter: (a, b) => a.harga - b.harga,
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditTwoTone className="mx-2" onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteTwoTone twoToneColor="#eb2f96" className="mx-2" onClick={() => deleteItem(record)}/>
        </div>
      ),
    },
  ];
  
  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if(editingItem===null)
    {
      axios
      .post(`${BASE_URL}/api/items/add-item`, values)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Produk Berhasil Ditambah");
        setAddEditModalVisibilty(false);
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
    else{
      axios
      .post(`${BASE_URL}/api/items/edit-item`, {...values , itemId : editingItem._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Produk Berhasil Diubah");
        setEditingItem(null)
        setAddEditModalVisibilty(false);
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Produk</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Tambah Produk
        </Button>
      </div>

      <div className="d-flex">
        <Search
          placeholder="search produk"
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />
      
      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null)
            setAddEditModalVisibilty(false)
          }}
          visible={addEditModalVisibilty}
          title={`${editingItem !==null ? 'Ubah Produk' : 'Tambah Produk'}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="kodeproduk" label="Kode Produk">
              <Input />
            </Form.Item>
            <Form.Item name="namaproduk" label="Nama Produk">
              <Input />
            </Form.Item>
            <Form.Item name="harga" label="Harga">
              <Input />
            </Form.Item>
            <Form.Item name="kategori" label="Kategori">
              <Select>
                <Select.Option value="banner">Banner</Select.Option>
                <Select.Option value="poster">Poster</Select.Option>
                <Select.Option value="map">Map</Select.Option>
                <Select.Option value="jilid">Jilid</Select.Option>
                <Select.Option value="print">Print</Select.Option>
                <Select.Option value="stempel">Stempel</Select.Option>
                <Select.Option value="idcard">ID Card</Select.Option>
                <Select.Option value="accidcard">Aksesoris ID Card</Select.Option>
                <Select.Option value="blocknote">Blocknote</Select.Option>
                <Select.Option value="yasin">Yasin</Select.Option>
                <Select.Option value="umbul">Umbul Umbul</Select.Option>
                <Select.Option value="nota">Nota</Select.Option>
                <Select.Option value="kalender">Kalender</Select.Option>
                <Select.Option value="ganci">Gantungan Kunci</Select.Option>
                <Select.Option value="nametag">Nametag</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SIMPAN
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;