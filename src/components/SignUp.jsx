import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => {
    console.log('in setUsername in MapDispatchToProps');
    dispatch(actions.setUser(username));
  },
});

const SignUp = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    //["gluten free", "vegetarian", "vegan"]

    const glutenFree = values['checkbox-group'].includes('gluten free');
    const vegetarian = values['checkbox-group'].includes('vegetarian');
    const vegan = values['checkbox-group'].includes('vegan');

    const data = {
      username: values.username,
      password: values.password,
      name: values.name,
      email: values.email,
      glutenFree,
      vegetarian,
      vegan,
    };

    const userCheck = this;

    // fetch request to create a user
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        if (resData.err === 'Username already exists') {
          // change usernameCheck --> display error
          setUsernameCheck(true);
        } else if (resData.success) {
          // change redirect in local state to true
          props.setUsername(resData.username);
          setRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Redirect upon successful sign up
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="site-layout-content">
      <Form
        {...formItemLayout}
        form={form}
        name="signup"
        onFinish={onFinish}
        // scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
          <Input onChange={() => setUsernameCheck(false)} />
        </Form.Item>

        {usernameCheck && <p style={{ color: 'red' }}> Username already exists</p>}

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
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
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
          <Checkbox.Group>
            <Row>
              <Col span={12}>
                <Checkbox value="gluten free" style={{ lineHeight: '32px' }}>
                  Gluten Free
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="vegan" style={{ lineHeight: '32px' }}>
                  Vegan
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="vegetarian" style={{ lineHeight: '32px' }}>
                  Vegetarian
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
