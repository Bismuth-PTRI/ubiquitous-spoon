import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {
  clearUser: actions.clearUser,
};

const Nav = (props) => {
  const logout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          props.clearUser();
          return <Redirect to="/" />;
        } else {
          console.log('logout is returning a request but does not have 200 code');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
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
          {!props.username && (
            <Menu.Item key="4">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {!props.username && (
            <Menu.Item key="5">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          )}
          {props.username && (
            <Menu.Item key="6" onClick={logout}>
              Logout
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
