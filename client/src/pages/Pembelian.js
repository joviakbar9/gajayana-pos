import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { BASE_URL } from '../constant/axios'

function Pembelian() {
  const [pembelianData, setPembelianData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const getAllPembelian = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/pembelian/get-all-pembelian`)
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
      .post(`${BASE_URL}/api/pembelian/delete-pembelian` , {pembelianId : record._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success('Data Pembelian Berhasil Dihapus')
        getAllPembelian()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi Kesalahan')
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Tanggal Input",
      dataIndex: "tanggalpembelian",
    },
    {
      title: "Kode Produk",
      dataIndex: "kodeproduk",
    },
    {
      title: "Nama Produk",
      dataIndex: "namaproduk",
    },
    {
        title: "Kategori",
        dataIndex: "kategori",
      },
    {
        title: "Jumlah Produk",
        dataIndex: "jumlahproduk",
      },
    {
      title: "Harga",
      dataIndex: "harga",
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
        message.success("Produk berhasil ditambah");
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
        message.success("Data produk berhasil diubah");
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
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null)
            setAddEditModalVisibilty(false)
          }}
          visible={addEditModalVisibilty}
          title={`${editingItem !==null ? 'Ubah Data Pembelian' : 'Tambah Data Pembelian'}`}
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