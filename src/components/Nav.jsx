import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user.username,
});

const mapDispatchToProps = {};

const Nav = (props) => {
  return (
    <>
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {props.user && (
            <Menu.Item key="2">
              <Link to="/profile">My Profile</Link>
            </Menu.Item>
          )}
          {props.user && (
            <Menu.Item key="3">
              <Link to="/favorites">Saved Recipes</Link>
            </Menu.Item>
          )}
          {!props.user && (
            <Menu.Item key="4">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {!props.user && (
            <Menu.Item key="5">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          )}
          {props.user && <Menu.Item key="6">Logout Placeholder</Menu.Item>}
        </Menu>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
