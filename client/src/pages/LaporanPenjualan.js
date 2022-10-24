import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { BASE_URL } from "../constant/axios";
import logo from "../resources/PrintingLogo.png";
import { useExcelDownloder } from "react-xls";

function LaporanPenjualan() {
  const [itemsData, setItemsData] = useState([]);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const { ExcelDownloder, Type } = useExcelDownloder();

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/laporanPenjualan/get-sum`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    no: [
      {
      title: "No.",
      key: "index",
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      }
    ],
    tanggalPemesanan: [
      {
      title: "Tanggal Pemesanan",
      dataIndex: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
      }
    ],
    totalPenjualan: [
      {
      title: "Total Penjualan",
      dataIndex: "totalAmount",
      }
    ],
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  console.log(columns);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Laporan Penjualan</h3>
        <ExcelDownloder
          data={columns}
          filename={"Laporan Penjualan"}
          type={Type.Button}
        >
          Download
        </ExcelDownloder>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered rowKey="_id" />
    </div>
  );
}

export default LaporanPenjualan;
