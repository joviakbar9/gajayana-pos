import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row, Table, Button } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { BASE_URL } from '../constant/axios'

function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  
  const dispatch = useDispatch();
  function addTocart(item){
    dispatch({type:'addToCart' , payload : {...item, quantity:1}})
  }
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios.get(`${BASE_URL}/api/items/get-all-items`).then((response) => {
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
      title: "Kode Produk",
      dataIndex: "kodeproduk",
    },
    {
      title: "Nama",
      dataIndex: "nama",
    },
    {
      title: "Harga",
      dataIndex: "harga",
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <Button onClick={()=>addTocart(record)}>Tambah</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
     

      <div className="d-flex justify-content-between">
        <h3>Produk</h3>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />


      {/* <div className="d-flex categories">
            {categories.map((category)=>{
              return <div onClick={()=>setSelectedCategoty(category.name)}
              className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                <h4>{category.name}</h4>
                <img src={category.imageURL} height='60' width='80' />
              </div>
            })}
      </div> */}

      {/* <Row gutter={20}>
        {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row> */}
    </DefaultLayout>
  );
}

export default Homepage;
