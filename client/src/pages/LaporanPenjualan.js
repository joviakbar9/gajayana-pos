import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../constant/axios';
import logo from '../resources/PrintingLogo.png';

function LaporanPenjualan() {
  const componentRef = useRef();
  const [itemsData, setItemsData] = useState([]);
  const [printLapPenjualan, setPrintLapPenjualan] = useState(false);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const getAllItems = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/laporanPenjualan/get-sum`)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Tanggal Pemesanan',
      dataIndex: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: 'Total Penjualan',
      dataIndex: 'totalAmount',
    },
  ];

  useEffect(() => {
    // let temp = 0;
    // totalPenjualan.forEach((totalPenjualan) => {
    //   temp = temp + totalAmount;
    // });
    // setTotalPenjualan(temp);
    getAllItems();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <><div>
      <div className='d-flex justify-content-between'>
        <h3>Laporan Penjualan</h3>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered rowKey='_id' />
    </div>
    
    {/* <div className='d-flex justify-content-end'>
      <Button 
        type='primary' 
        onClick={handlePrint}>
        Cetak Laporan
      </Button>
    </div> */}

    <ReactToPrint
      trigger = {() => 
      <><div className='d-flex justify-content-end'>
          <Button type='primary' onClick={handlePrint}>Cetak Laporan</Button>
        </div></>
      }
      content={() => componentRef}
    />

      <div className='laporan-penjualan-model' ref={componentRef}>
        <div className='d-flex justify-content-between laporan-header pb-2'>
          <div>
            <img src={logo} height='70' width='360' />
          </div>
          <div>
            <p>Jl. Gajayana 14A Kav. 2</p>
            <p>Malang</p>
            <p>0341-552080</p>
            <p>E-mail : gajayana.digital@gmail.com</p>
          </div>
        </div>
        <div className='title-laporan'>
          <b>LAPORAN PENJUALAN</b>
        </div>
      
        <Table 
          dataSource={itemsData} 
          columns={columns} 
          rowKey='_id'
          // pagination={false}
          pagination={{
            onChange(current) {
              setPage(current);
            }
          }}
        />
      </div>
    </>
  );
}

export default LaporanPenjualan;
