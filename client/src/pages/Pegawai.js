import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { BASE_URL } from '../constant/axios'

function Pegawai() {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const [pegawaiData, setPegawaiData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingPegawai, setEditingPegawai] = useState(null);
  const dispatch = useDispatch();

  const getAllPegawai = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/pegawai/get-all-pegawai`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setPegawaiData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deletePegawai = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post(`${BASE_URL}/api/pegawai/delete-pegawai` , {pegawaiId : record._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success('Data Pegawai Berhasil Dihapus')
        getAllPegawai()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi Kesalahan')
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Nama Pegawai",
      dataIndex: "namaPegawai",
    },
    {
        title: "Nomor HP",
        dataIndex: "nohpPegawai",
      },
    {
        title: "Tugas",
        dataIndex: "tugas",
      },
    {
      title: "Gaji Pokok",
      dataIndex: "GajiPokok",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditTwoTone className="mx-2" onClick={() => {
              setEditingPegawai(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteTwoTone twoToneColor="#eb2f96" className="mx-2" onClick={() => deletePegawai(record)}/>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPegawai();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if(editingPegawai===null)
    {
      axios
      .post(`${BASE_URL}/api/pegawai/add-pegawai`, values)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Pegawai Berhasil Ditambah");
        setAddEditModalVisibilty(false);
        getAllPegawai();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
    else{
      axios
      .post(`${BASE_URL}/api/pegawai/edit-pegawai`, {...values , pegawaiId : editingPegawai._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Pegawai Berhasil Diubah");
        setEditingPegawai(null)
        setAddEditModalVisibilty(false);
        getAllPegawai();
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
        <h3>Pegawai</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Tambah Pegawai
        </Button>
      </div>
      <Table columns={columns} dataSource={pegawaiData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingPegawai(null)
            setAddEditModalVisibilty(false)
          }}
          visible={addEditModalVisibilty}
          title={`${editingPegawai !==null ? 'Ubah Data Pegawai' : 'Tambah Data Pegawai'}`}
          footer={false}
        >
          <Form
            initialValues={editingPegawai}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="namaPegawai" label="Nama Pegawai">
              <Input />
            </Form.Item>
            <Form.Item name="nohpPegawai" label="Nomor HP">
              <Input />
            </Form.Item>            
            <Form.Item name="tugas" label="Tugas">
              <Input />
            </Form.Item>
            <Form.Item name="gajiPokok" label="Gaji Pokok">
              <Input />
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

export default Pegawai;