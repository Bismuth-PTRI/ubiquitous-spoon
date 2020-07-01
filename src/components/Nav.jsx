import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import * as actions from '../actions/actions';
import auth from '../utlis/auth';

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {
  clearUser: actions.clearUser,
};

const Nav = (props) => {
  const logout = () => auth.logout(props);

  return (
    <>
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Search Recipes</Link>
          </Menu.Item>
          {props.username && (
            <Menu.Item key="2">
              <Link to="/profile">My Profile</Link>
            </Menu.Item>
          )}
          {props.username && (
            <Menu.Item key="3">
              <Link to="/favorites">Saved Recipes</Link>
            </Menu.Item>
          )}
          {props.username && (
            <Menu.Item key="4">
              <Link to="/findfriends">Find Friends</Link>
            </Menu.Item>
          )}
          {!props.username && (
            <Menu.Item style={{ float: 'right' }} key="5">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {!props.username && (
            <Menu.Item style={{ float: 'right' }} key="4">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          )}

          {props.username && (
            <Menu.Item style={{ float: 'right' }} key="6" onClick={logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
