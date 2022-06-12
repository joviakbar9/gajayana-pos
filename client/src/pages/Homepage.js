import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row, Table, Button } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";
function Homepage(item) {
  const [itemsData, setItemsData] = useState([]);
  // const [selectedCategory, setSelectedCategoty] = useState("banner");
  // const categories = [
  //   {
  //     name: "banner",
  //     imageURL:
  //       "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
  //   },
  //   {
  //     name: "vegetables",
  //     imageURL:
  //       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg",
  //   },
  //   {
  //     name: "meat",
  //     imageURL:
  //       "https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive",
  //   },
  // ];
  const dispatch = useDispatch();
  function addTocart(){
    dispatch({type:'addToCart' , payload : {...item , quantity:1}})
  }
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios.get("/api/items/get-all-items").then((response) => {
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
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (image, record) => (
    //     <img src={image} alt="" height="60" width="60" />
    //   ),
    // },
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
          <Button onClick={()=>addTocart()}>Tambah</Button>
        </div>
      ),
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
