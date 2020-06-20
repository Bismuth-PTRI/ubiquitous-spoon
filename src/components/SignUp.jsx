import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Alert } from 'antd';
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
    dispatch(actions.setUsername(username));
  },
});

const SignUp = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [notice, setNotice] = useState('');
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);

    //["gluten free", "vegetarian", "vegan"]
    const glutenFree = values['checkbox-group'] ? values['checkbox-group'].includes('gluten free') : false;
    const vegetarian = values['checkbox-group'] ? values['checkbox-group'].includes('vegetarian') : false;
    const vegan = values['checkbox-group'] ? values['checkbox-group'].includes('vegan') : false;

    const data = {
      username: values.username,
      password1: values.password,
      password2: values.confirm,
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
        if (resData.err === 'Username already exists') {
          // display the error as a notice in state
          setNotice(resData.err);
          form.setFieldsValue({ username: '' });
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
    <div className="site-layout-content SignUp_Container">
      <PageHeader>
        <h1>Sign Up</h1>
      </PageHeader>
      <Form
        {...formItemLayout}
        form={form}
        name="signup"
        onFinish={onFinish}
        // scrollToFirstError
      >
        {/* conditionally render the alert if an error notice has occured */}
        {notice && <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />}

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
          <Input onChange={() => setNotice('')} />
        </Form.Item>

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
              <Col span={24}>
                <Checkbox value="gluten free" style={{ lineHeight: '32px' }}>
                  Gluten Free
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="vegan" style={{ lineHeight: '32px' }}>
                  Vegan
                </Checkbox>
              </Col>
              <Col span={24}>
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
