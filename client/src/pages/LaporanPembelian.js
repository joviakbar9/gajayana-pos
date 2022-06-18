import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Button, Row, Table } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { BASE_URL } from '../constant/axios'

function LaporanPembelian() {

    const [itemsData, setItemsData] = useState([]);
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

    const columns = [
        {
            title: "Tanggal Pembelian",
            dataIndex: "tanggalpembelian",
        },
        {
            title: "Total Pembelian",
            dataIndex: "totalpembelian",
        },
    ];

    useEffect(() => {
        getAllItems();
    }, []);
    return (
        <DefaultLayout>
            <Row>{itemsData.map(() => {

            })}</Row>
            <div className="d-flex justify-content-between">
                <h3>Laporan Pembelian</h3>
            </div>
            <Table columns={columns} dataSource={itemsData} bordered />
        </DefaultLayout>
    )
}

export default LaporanPembelian