import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Alert } from 'antd';
import { connect } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as actions from '../actions/actions';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  setFoodPrefs: actions.setFoodPrefs,
  setEmail: actions.setEmail,
  setFullName: actions.setFullName,
  setPassword: actions.setPassword,
};

const Profile = () => {
  // pull in the user's data on mount or update
  useEffect(() => {
    const data = { username: props.user };

    fetch('/api/user/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        // populate user data into state
        const foodPrefs = [resData.glutenFree, resData.vegan, resData.vegetarian];

        props.setEmail(resData.email);
        props.setFullName(resData.name);
        props.setPassword(resData.password);
        props.setFoodPrefs(foodPrefs);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <div className="site-layout-content">Profile</div>;
};

export default Profile;
