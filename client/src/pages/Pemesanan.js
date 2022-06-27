import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../constant/axios';
import logo from "../resources/PrintingLogo.png";

function Pemesanan() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const componentRef = useRef();
  const [pemesananData, setPemesananData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibilty] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
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
        message.success('Produk berhasil dihapus')
        getAllPemesanan()
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error('Terjadi Kesalahan')
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Tanggal Pemesanan",
      dataIndex: "tanggalPemesanan",
    },
    {
      title: "No. Nota",
      dataIndex: "_id",
    },
    {
      title: "Nama Customer",
      dataIndex: "namaCustomer",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "DP",
      dataIndex: "uangMuka",
    },
    {
      title: "Total",
      dataIndex: "totalHarga",
    },
    {
      title: "Status Pembayaran",
      dataIndex: "statusPembayaran",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined className="mx-2" onClick={() => {
            setSelectedBill(record);
            setPrintBillModalVisibilty(true);
          }}
          />
          <DeleteTwoTone twoToneColor="#eb2f96" className="mx-2" onClick={() => deletePemesanan(record)} />
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

      {printBillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibilty(false);
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
                <p>Jl. Gajayana 14A Kav.2</p>
                <p>Malang</p>
                <p>0341 552080</p>
                <p>E-mail : gajayana.digital@gmail.com</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <table>
                <tr>
                  <td><b>Tanggal Pemesanan</b></td>
                  <td> : {" "}{selectedBill.createdAt.toString().substring(0, 10)}</td>
                </tr>
                <tr>
                  <td><b>Nama</b></td>
                  <td> : {selectedBill.customerName}</td>
                </tr>
                <tr>
                  <td><b>Nomor Handphone</b></td>
                  <td> : {selectedBill.customerPhoneNumber}</td>
                </tr>
              </table>
            </div>
            <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false} />

            <div className="dotted-border">
              <table>
                <tr>
                  <td><b>DP</b></td>
                  <td> : Rp {selectedBill.subTotal}</td>
                </tr>
                <tr>
                  <td><b>SISA</b></td>
                  <td> : Rp {selectedBill.uangMuka}</td>
                  {/* <p><b>Sisa</b> : {selectedPemesanan--uangMuka}</p> */}
                </tr>
                <tr>
                  <td><b>SUB TOTAL</b></td>
                  <td> : Rp {selectedBill.subTotal}</td>
                </tr>
              </table>
            </div>

            <div>
              <h2><b>GRAND TOTAL : Rp {selectedBill.totalAmount}</b></h2>
            </div>
            <div className="dotted-border"></div>

            <div className="text-center">
              <p>Nota harap dibawa untuk pengambilan pesanan</p>
              <p>Pengambilan TANPA NOTA tidak dilayani</p>
              <p>Terimakasih</p>
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