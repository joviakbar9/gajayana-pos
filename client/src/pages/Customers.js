import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../constant/axios'

function Customers() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const componentRef = useRef();
  const [pemesananData, setPemesananData] = useState([]);

  const dispatch = useDispatch();
  const getAllPemesanan = () => {
    dispatch({ type: "showLoading" });
    axios
      .get(`${BASE_URL}/api/pemesanan/get-all-pemesanan`)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.reverse()
        setPemesananData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Nama Customer",
      dataIndex: "customerName",
    },
    {
      title: "Nomor HP",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render :(value)=><span>{value.toString().substring(0,10)}</span>
    }, 
  ];

  useEffect(() => {
    getAllPemesanan();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <div className="d-flex">
        <Search
          placeholder="search customer"
          onSearch={onSearch}
          style={{
            width: 240,
          }}
        />
      </div>
      <Table columns={columns} dataSource={pemesananData} bordered />
    </DefaultLayout>
  );
}

export default Customers;