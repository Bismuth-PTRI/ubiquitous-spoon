import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

const Nav = () => {
  return (
    <>
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/favorites">Saved Recipes</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/login">Login/Logout</Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Nav;
