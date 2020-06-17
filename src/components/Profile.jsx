import React, { useState, useEffect } from 'react';
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
  setUserPrefs: actions.setUserPrefs,
};

const Profile = (props) => {
  const [checkOptions] = useState(['Gluten Free', 'Vegan', 'Vegetarian']);
  const [checkList, setCheckList] = useState([]);
  const [form] = Form.useForm();

  // handles changes to checkboxes
  const checkChange = (checkedList) => {
    setCheckList(checkedList);
  };

  // when user presses update profile
  const onFinish = (values) => {
    console.log('values is ->', values);
  };

  // pull in the user's data on mount or update
  useEffect(() => {
    console.log('use effect');
    const data = { username: props.user };

    // fetch('/api/user/info', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((resData) => {
    //     // populate user data into state
    //     const foodPrefs = {
    //       glutenFree: resData.glutenFree,
    //       vegan: resData.vegan,
    //       vegetarian: resData.vegetarian,
    //     };

    //     const prefs = {
    //       email: resData.email,
    //       name: resData.name,
    //       foodPrefs: foodPrefs,
    //     };

    //     props.setUserPrefs(prefs);

    //     // populate the form too
    //     form.setFieldsValue({
    //       email: resData.email,
    //       fullName: resData.name,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    form.setFieldsValue({
      email: 'test@test.com',
      fullName: 'John Smith',
    });
  }, []);

  return (
    <div className="site-layout-content">
      <Form
        {...formItemLayout}
        form={form}
        name="preferences"
        onFinish={onFinish}
        // scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fullName"
          label={
            <span>
              Full Name&nbsp;
              <Tooltip title="What is your full name?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="checkbox-group" label="Food Preferences">
          <Checkbox.Group options={checkOptions} value={checkList} onChange={checkChange}></Checkbox.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
