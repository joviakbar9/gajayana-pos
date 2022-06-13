import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { BASE_URL } from '../constant/axios'

function Items() {
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
        message.success('Produk berhasil dihapus')
        getAllItems()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi kesalahan')
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Kode Produk",
      dataIndex: "kodeproduk",
    },
    {
      title: "Nama",
      dataIndex: "nama",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (image, record) => (
    //     <img src={image} alt="" height="60" width="60" />
    //   ),
    // },
    {
      title: "Harga",
      dataIndex: "harga",
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
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=>deleteItem(record)}/>
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
        message.error("Terjadi kesalahan");
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
        message.error("Terjadi kesalahan");
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
          title={`${editingItem !==null ? 'Ubah Produk' : 'Tambah Produk'}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="nama" label="Nama">
              <Input />
            </Form.Item>
            <Form.Item name="harga" label="Harga">
              <Input />
            </Form.Item>
            {/* <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item> */}

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