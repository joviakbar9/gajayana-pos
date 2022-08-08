import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { BASE_URL } from '../constant/axios'

function Pembelian() {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const [pembelianData, setPembelianData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editingPembelian, setEditingPembelian] = useState(null);
  const [getdeletePembelian, setDeletePembelian] = useState(null);
  const dispatch = useDispatch();

  const getAllPembelian = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/pembelian/get-all-pembelian`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setPembelianData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deletePembelian = (record) => {
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
      title: "Tanggal Pembelian",
      dataIndex: "tanggalpembelian",
    },
    {
      title: "Nama Produk",
      dataIndex: "namaproduk",
    },
    {
        title: "Jumlah",
        dataIndex: "jumlah",
    },
    {
      title: "Total Harga",
      dataIndex: "hargaPembelian",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditTwoTone className="mx-2" onClick={() => {
              setEditingPembelian(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteTwoTone twoToneColor="#eb2f96" className="mx-2" onClick={() => deletePembelian(record)}/>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPembelian();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if(editingPembelian===null)
    {
      axios
      .post(`${BASE_URL}/api/pembelian/add-pembelian`, values)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Pembelian Berhasil Ditambah");
        setAddEditModalVisibilty(false);
        getAllPembelian();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
    else{
      axios
      .post(`${BASE_URL}/api/pembelian/edit-pembelian`, {...values , pembelianId : editingPembelian._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Pembelian Berhasil Diubah");
        setEditingPembelian(null)
        setAddEditModalVisibilty(false);
        getAllPembelian();
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
        <h3>Pembelian</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Tambah Pembelian
        </Button>
      </div>
      <Table columns={columns} dataSource={pembelianData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingPembelian(null)
            setAddEditModalVisibilty(false)
          }}
          visible={addEditModalVisibilty}
          title={`${editingPembelian !==null ? 'Ubah Data Pembelian' : 'Tambah Data Pembelian'}`}
          footer={false}
        >
          {" "}
          <Form
            initialValues={editingPembelian}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="tanggalPembelian" label="Tanggal Pembelian">
              <DatePicker defaultValue={moment()} format={dateFormatList} />
            </Form.Item>
            <Form.Item name="namaproduk" label="Nama Produk">
              <Input />
            </Form.Item>
            <Form.Item name="jumlah" label="Jumlah">
              <Input />
            </Form.Item>
            <Form.Item name="hargaPembelian" label="Total Harga">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SIMPAN
              </Button>
            </div>
          </Form>{" "}
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Pembelian;