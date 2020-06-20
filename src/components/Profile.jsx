import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form, Input, Tooltip, Checkbox, Button, Divider, Alert } from 'antd';
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
  username: state.user.username,
});

const mapDispatchToProps = {
  setUserPrefs: actions.setUserPrefs,
};

const Profile = (props) => {
  const [checkOptions] = useState(['Gluten Free', 'Vegan', 'Vegetarian']);
  const [checkList, setCheckList] = useState([]);
  const [notice, setNotice] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [form] = Form.useForm();

  // handles changes to checkboxes
  const checkChange = (checkedList) => {
    setCheckList(checkedList);
    onChange();
  };

  // on change clears out notices
  const onChange = () => {
    setNotice('');
    setSuccessNotice('');
  };

  // when user presses update profile
  const onFinish = (values) => {
    //["gluten free", "vegetarian", "vegan"]
    const glutenFree = values['checkbox-group'] ? values['checkbox-group'].includes('Gluten Free') : false;
    const vegetarian = values['checkbox-group'] ? values['checkbox-group'].includes('Vegetarian') : false;
    const vegan = values['checkbox-group'] ? values['checkbox-group'].includes('Vegan') : false;

    const data = {
      username: props.username,
      name: values.fullName,
      email: values.email,
      glutenFree,
      vegan,
      vegetarian,
    };

    fetch('/api/user/info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.err !== undefined) {
          setNotice(resData.err);
        } else {
          setSuccessNotice('Your profile has been updated!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // pull in the user's data on mount or update
  useEffect(() => {
    const data = { username: props.username };

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
        const foodPrefs = {
          glutenFree: resData.userInfo.gluten_free,
          vegan: resData.userInfo.vegan,
          vegetarian: resData.userInfo.vegetarian,
        };

        const prefs = {
          email: resData.userInfo.email,
          name: resData.userInfo.name,
          foodPrefs: foodPrefs,
        };

        props.setUserPrefs(prefs);

        const defaultChecks = [];
        if (foodPrefs.glutenFree) defaultChecks.push('Gluten Free');
        if (foodPrefs.vegan) defaultChecks.push('Vegan');
        if (foodPrefs.vegetarian) defaultChecks.push('Vegetarian');

        // populate the form with user's settings
        form.setFieldsValue({
          email: resData.userInfo.email,
          fullName: resData.userInfo.name,
          ['checkbox-group']: defaultChecks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="site-layout-content">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Divider orientation="left">{`${props.username}'s profile`}</Divider>
        <Form
          {...formItemLayout}
          form={form}
          name="preferences"
          onFinish={onFinish}
          // scrollToFirstError
        >
          {/* conditionally render the alert if an error notice has occured */}
          {notice && <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />}
          {successNotice && <Alert style={{ marginBottom: 24 }} message={successNotice} type="success" showIcon closable />}

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
            <Input onChange={onChange} />
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
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item name="checkbox-group" label="Food Preferences">
            <Checkbox.Group options={checkOptions} onChange={checkChange}></Checkbox.Group>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
