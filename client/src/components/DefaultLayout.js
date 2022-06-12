import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content, Footer } = Layout;

const DefaultLayout = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate()
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div
          class="spinner-border"
          role="status"
        >
        </div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? 'GDP' : 'Gajayana Digital Printing'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/pemesanan" icon={<ShoppingCartOutlined />}>
            <Link to="/pemesanan">Pemesanan</Link>
          </Menu.Item>
          <Menu.Item key="/daftarpemesanan" icon={<CopyOutlined />}>
            <Link to="/daftarpemesanan">Daftar Pemesanan</Link>
          </Menu.Item>
          <Menu.Item key="/produk" icon={<UnorderedListOutlined />}>
            <Link to="/produk">Produk</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/laporan" icon={<BarChartOutlined />}>
            <Link to='/laporanpenjualan'>Laporan</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={()=>{
            localStorage.removeItem('pos-user')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              {" "}
              <p className="mt-3 mr-2">{cartItems.length}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "10px",
            padding: 24,
            minHeight:'80vh'
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gajayana Digital Printing ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
