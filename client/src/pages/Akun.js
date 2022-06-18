import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Button, Input } from "antd";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { BASE_URL } from '../constant/axios'

function Akun() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish=(values)=>{
           dispatch({type:'showLoading'})
           axios.post(`${BASE_URL}/api/users/akun` , values).then((res)=>{
            dispatch({type:'hideLoading'})
             message.success('Password Berhasil Diubah')
           }).catch(()=>{
            dispatch({type:'hideLoading'})
             message.error('Terjadi Kesalahan')
           })
    }
    useEffect(() => {
      if(localStorage.getItem('pos-user'))
      navigate('/akun')
  }, [])

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Produk</h3>
      </div>
      <div className='akun'>
        <Row>
          <Col lg={8} xs={22}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <img src={logo} height="70" width="360"/>
            <hr />
            <h3>Akun</h3>
            <Form.Item name="name" label="Nama">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password'/>
            </Form.Item>
            <Form.Item name="newpassword" label="New Password">
              <Input type='newpassword'/>
            </Form.Item>
            <Form.Item name="newconpassword" label="Confirm New Password">
              <Input type='newconpassword'/>
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Button htmlType="submit" type="primary">
                Confirm
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
    </div>
    </DefaultLayout>
  );
}

export default Akun;
