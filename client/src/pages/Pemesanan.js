import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EyeOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Form } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../constant/axios';
import logo from "../resources/PrintingLogo.png";
import e from "cors";

function Pemesanan() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const componentRef = useRef();
  const [pemesananData, setPemesananData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false);
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [editingBill, setEditingBill] = useState(null);
  const [setDeleteBill, deleteBill] = useState(null);
  const dispatch = useDispatch();

  const getAllPemesanan = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/pemesanan/get-all-pemesanan`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        data.reverse();
        setPemesananData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deletePemesanan = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post(`${BASE_URL}/api/pemesanan/delete-pemesanan`, { pemesananId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success('Data Pemesanan Berhasil Dihapus')
        getAllPemesanan()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi Kesalahan')
        console.log(error);
      });
  };

  //date formatting
  pemesananData.map(e => {
    var date = new Date(e.tanggalPemesanan)
    var sdate = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    e.newtanggalPemesanan = date.toLocaleDateString("id-ID", sdate);

    var ldate = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    e.tanggalNota = date.toLocaleDateString("id-ID", ldate);
    // e.newtanggalPemesanan = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
  })
  
  const columns = [
    {
      title: "Tanggal Pemesanan",
      dataIndex: "newtanggalPemesanan",
      sorter: (a, b) => a.newtanggalPemesanan.localeCompare(b.newtanggalPemesanan)
    },
    {
      title: "No. Nota",
      dataIndex: "_id",
    },
    {
      title: "Nama",
      dataIndex: "namaCustomer",
    },
    {
      title: "No. HP",
      dataIndex: "nohpCustomer",
    },
    {
      title: "DP",
      dataIndex: "uangMuka",
    },
    {
      title: "Sisa Pembayaran",
      dataIndex: "sisaPembayaran",
    },
    {
      title: "Total Harga",
      dataIndex: "totalHarga",
    },
    {
      title: "Status Pembayaran",
      dataIndex: "statusPembayaran",
      render: (v) => v === "dp" ? "Belum Lunas" : "Lunas",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined className="mx-2" onClick={() => {
            setSelectedBill(record);
            setPrintBillModalVisibility(true);
          }}
          />
          <EditTwoTone className="mx-2" onClick={() => {
            setEditingBill(record);
            setAddEditModalVisibility(true);
          }}
          />
          <DeleteTwoTone twoToneColor="#eb2f96" className="mx-2" onClick={() => {
            setDeleteBill(record);
            setDeleteModalVisibility(true);
          } }/>
        </div>
      ),
    },
  ];

  const cartcolumns = [
    {
      title: "Nama Produk",
      dataIndex: "namaproduk",
    },
    {
      title: "Harga",
      dataIndex: "harga",
    },
    {
      title: "Jumlah",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "Total Harga",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.harga}</b>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPemesanan();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if(editingBill===null)
    {
      axios
      .post(`${BASE_URL}/api/pemesanan/add-pemesanan`, values)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Pemesanan Berhasil Ditambah");
        setAddEditModalVisibility(false);
        getAllPemesanan();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
    else{
      axios
      .post(`${BASE_URL}/api/pemesanan/edit-pemesanan`, {...values , billId : editingBill._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Data Pemesanan Berhasil Siubah");
        setEditingBill(null)
        setAddEditModalVisibility(false);
        getAllPemesanan();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Terjadi Kesalahan");
        console.log(error);
      });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Daftar Pemesanan</h3>
      </div>

      <div className="d-flex">
      <Search
        placeholder="search pemesanan"
        onSearch={onSearch}
        style={{
          width: 240,
        }}
      />
      </div>

      <Table columns={columns} dataSource={pemesananData} bordered />

      {addEditModalVisibility && (
        <Modal
          onCancel={() => {
            setEditingBill(null)
            setAddEditModalVisibility(false)
          }}
          visible={addEditModalVisibility}
          title={`${editingBill !==null ? 'Ubah Data Pemesanan' : 'Tambah Pemesanan'}`}
          footer={false}
        >
          <Form
            initialValues={editingBill}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="namaCustomer" label="Nama Customer">
              <Input />
            </Form.Item>
            <Form.Item name="nohpCustomer" label="No. HP Customer">
              <Input />
            </Form.Item>
            <Form.Item name="harga" label="Harga">
              <Input />
            </Form.Item>
            <Form.Item name="kategori" label="Kategori">
              <Select>
                <Select.Option value="banner">Banner</Select.Option>
                <Select.Option value="poster">Poster</Select.Option>
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

      {deleteModalVisibility && (
      <Modal 
       onCancel={() => {
        setDeleteModalVisibility(false);
      }}
      visible= {deleteModalVisibility} 
      title="Hapus Pemesanan"
      footer={false}
      width
      >
        Lorem ipsum
      </Modal>
      )}

      {printBillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibility(false);
          }}
          visible={printBillModalVisibility}
          title="Nota Pemesanan"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <img src={logo} height="70" width="360" />
              </div>
              <div>
                <p>Jl. Gajayana 14A Kav. 2</p>
                <p>Malang</p>
                <p>0341-552080</p>
                <p>E-mail : gajayana.digital@gmail.com</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <table>
                <tr>
                  <td><b>Tanggal Pemesanan</b></td>
                  <td> : {" "}{selectedBill.tanggalNota}</td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td> : {selectedBill.namaCustomer}</td>
                </tr>
                <tr>
                  <td><b>Nomor Handphone</b></td>
                  <td> : {selectedBill.nohpCustomer}</td>
                </tr>
              </table>
            </div>
            <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false} />

            <div className="dotted-border">
              <table>
                <tr>
                  <td><b>DP</b></td>
                  <td> : Rp {selectedBill.uangMuka}</td>
                </tr>
                <tr>
                  <td><b>SISA PEMBAYARAN</b></td>
                  <td> : Rp {selectedBill.totalHarga + - selectedBill.uangMuka}</td>
                  {/* <p><b>Sisa</b> : {selectedPemesanan--uangMuka}</p> */}
                </tr>
              </table>
            </div>

            <div>
              <h2><b>GRAND TOTAL : Rp {selectedBill.totalHarga}</b></h2>
            </div>
            <div className="dotted-border"></div>

            <div className="text-center">
              <p>Nota harap dibawa untuk pengambilan pesanan</p>
              <p>Pengambilan TANPA NOTA tidak dilayani</p>
              <p>Terimakasih</p>
            </div>

            <div className="text-left">
              <p>Ket : </p>
              {selectedBill.keterangan}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type='primary' onClick={handlePrint}>Cetak Nota</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Pemesanan;