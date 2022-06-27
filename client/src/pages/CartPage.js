import { Button, Form, Input, message, Modal, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { BASE_URL } from '../constant/axios'

import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
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
      })
      .catch(() => {
        message.error("Terjadi kesalahan");
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
            SUB TOTAL : <b>Rp {subTotal}</b>
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

          <Form.Item name="paymentMode" label="Pembayaran">
            <Select>
              <Select.Option value="cash">Lunas</Select.Option>
              <Select.Option value="card">DP</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="uangMuka" label="DP">
            <Input />
          </Form.Item>
          <Form.Item label="Sisa">
            <Input />
          </Form.Item>
          <Form.Item name="keterangan" label="Keterangan">
            <Input.TextArea />
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              Sub Total : <b>Rp {subTotal}</b>
            </h5>
            {/* <h5>
              Sisa : <b>{(subTotal - dp)}</b>
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