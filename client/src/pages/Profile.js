import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Input, message, Form, Row, Col } from 'antd';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/axios';
import logo from '../resources/PrintingLogo.png';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    axios
      .post(`${BASE_URL}/api/users/akun`, values)
      .then((res) => {
        dispatch({ type: 'hideLoading' });
        message.success('Password Berhasil Diubah');
      })
      .catch(() => {
        dispatch({ type: 'hideLoading' });
        message.error('Terjadi Kesalahan');
      });
  };
  useEffect(() => {
    if (localStorage.getItem('pos-user')) navigate('/profile');
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>User Profile</h3>
      </div>
      <div className='profile'>
        <Row>
          <Col lg={8} xs={22}>
            <Form layout='vertical' onFinish={onFinish}>
              <img src={logo} height='70' width='360' alt='' />
              <hr />
              <h3>User</h3>
              <Form.Item name='name' label='Nama'>
                <Input />
              </Form.Item>
              <Form.Item name='userId' label='User ID'></Form.Item>
              <Form.Item name='password' label='Password'>
                <Input type='password' />
              </Form.Item>
              <Form.Item name='newpassword' label='New Password'>
                <Input type='newpassword' />
              </Form.Item>
              <Form.Item name='newconpassword' label='Confirm New Password'>
                <Input type='newconpassword' />
              </Form.Item>

              <div className='d-flex justify-content-between align-items-center'>
                <Button htmlType='submit' type='primary'>
                  Confirm
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
