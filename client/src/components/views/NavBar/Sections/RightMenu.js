/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login'>Sign-in</a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Sign-up</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu
        mode={props.mode}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Menu.Item key='upload'>
          <a href='/product/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item key='Cart' style={{ padding: 0 }}>
          <Badge count={5} style={{ marginRight: 20 }}>
            <a href='/user/cart' className='head-example'>
              <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
