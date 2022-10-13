import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constant/axios';
// import { useExcelDownloder } from 'react-xls';

function LaporanPembelian() {
  const [itemsData, setItemsData] = useState([]);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  // const { ExcelDownloder, Type } = useExcelDownloder();

  const getAllPembelian = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get(`${BASE_URL}/api/laporanPembelian/get-total-pembelian`)
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
      title: 'Tanggal Pembelian',
      dataIndex: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: 'Total Pembelian',
      dataIndex: 'totalAmount',
    },
  ];

  useEffect(() => {
    getAllPembelian();
  }, []);
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Laporan Pembelian</h3>
      </div>
      {/* <ExcelDownloder
        data={columns}
        filename={'Laporan Pembelian'}
        type={Type.Button} // or type={'button'}
      >
        Download
      </ExcelDownloder> */}
      <Table 
        columns={columns} 
        dataSource={itemsData} 
        bordered rowKey='_id' 
        pagination={{
          onChange(current) {
            setPage(current);
          }
        }}/>
    </div>
  );
}

export default LaporanPembelian;
