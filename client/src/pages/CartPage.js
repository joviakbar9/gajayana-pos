import { Button, Form, Input, message, Modal, Select, Table, Tag, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import moment from "moment"
import { BASE_URL } from '../constant/axios';

import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [sisa, setSisa] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity + -1 },
      });
    }
  };

  const calculateRemaining = (event) => {
    setSisa(subTotal - event.target.value);
  };

  const columns = [
    {
      title: "Kode Produk",
      dataIndex: "kodeproduk",
    },
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
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.harga * item.quantity;
    });
    setSubTotal(temp);
    setSisa(temp);
  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      totalAmount: (
        subTotal.toFixed(2)
      ),
      userId: JSON.parse(localStorage.getItem("pos-user"))._id,
    };

    axios
      .post(`${BASE_URL}/api/pemesanan/charge-pemesanan`, reqObject)
      .then(() => {
        message.success("Pemesanan Berhasil");
        navigate('/daftarpemesanan')
        dispatch({ type: "clearCart" })
      })
      .catch(() => {
        message.error("Terjadi Kesalahan");
      });
  };

  return (
    <DefaultLayout>
      <h3>Pemesanan</h3>
      <Table columns={columns} dataSource={cartItems} bordered pagination={false} />
      <hr />

      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            TOTAL HARGA : <b>Rp {subTotal}</b>
          </h3>
        </div>

        <Button type="primary" onClick={() => setBillChargeModal(true)}>
          SUBMIT PEMESANAN
        </Button>
      </div>

      <Modal
        title="Nota Pemesanan"
        visible={billChargeModal}
        footer={false}
        onCancel={() => setBillChargeModal(false)}
      >
        {" "}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="namaCustomer" label="Nama Customer">
            <Input />
          </Form.Item>
          <Form.Item name="nohpCustomer" label="Nomor HP">
            <Input />
          </Form.Item>
          <Form.Item name="tanggalPemesanan" label="Tanggal Pemesanan">
            <DatePicker defaultValue={moment()} format={dateFormatList} />
          </Form.Item>
          <Form.Item name="tipePembayaran" label="Pembayaran">
            <Select>
              <Select.Option value="lunas">Lunas</Select.Option>
              <Select.Option value="dp">DP</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="uangMuka" label="DP">
            <Input onChange={(e)=>{
              form.setFieldsValue({sisaPembayaran: subTotal - e.target.value});
            }}/>
          </Form.Item>
          <Form.Item disabled name="sisaPembayaran" label="Sisa">
            <Input disabled={true} sisaPembayaran/>
          </Form.Item>
          <Form.Item name="keterangan" label="Keterangan">
            <Input.TextArea />
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              Total Harga : <b>Rp {subTotal}</b>
            </h5>
            {/* <h5>
              Sisa : <b>{(subTotal - uangmuka)}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
            </h2> */}
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              CONFIRM PEMESANAN
            </Button>
          </div>
        </Form>{" "}
      </Modal>
    </DefaultLayout>
  );
}

export default CartPage;