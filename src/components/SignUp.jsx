import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Alert,
} from 'antd';
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

const mapDispatchToProps = () => ({});

// const mapDispatchToProps = (dispatch) => ({
//   setUsername: (username) => {
//     dispatch(actions.setUsername(username));
//   },
// });

const SignUp = ({ ...props }, ref) => {
  const [notice, setNotice] = useState('');
  const [uname, setUname] = useState('');
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const data = {
      username: uname,
      password1: pwd1,
      password2: pwd2,
      name: name,
      email: email,
    };
    props.updateInfo(data);
  }, [uname, name, email, pwd1, pwd2]);

  return (
    <div className="site-layout-content SignUp_Container">
      <PageHeader>
        <h1>Sign Up</h1>
      </PageHeader>
      <Form
        {...formItemLayout}
        form={form}
        name="signup"
        // onFinish={onFinish}
        // scrollToFirstError
      >
        {/* conditionally render the alert if an error notice has occured */}
        {notice && (
          <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />
        )}

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
          <Input onChange={(e) => setUname(e.target.value)} />
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
          <Input onChange={(e) => setEmail(e.target.value)} />
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
          <Input.Password onChange={(e) => setPwd1(e.target.value)} />
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
          <Input.Password onChange={(e) => setPwd2(e.target.value)} />
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
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        {/* <Form.Item name="checkbox-group" label="Food Preferences">
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
        </Form.Item> */}

        {/* <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp;
