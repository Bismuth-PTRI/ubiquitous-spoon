import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form, Input, Tooltip, Checkbox, Button, Divider, Alert } from 'antd';
import { connect } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as actions from '../actions/actions';
import * as api from '../api/common';

import DietPrefs from './DietPrefs';
import Intolerances from './Intolerances';

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
  diet: state.food.diets,
  intolerance: state.food.intolerances,
  foodPreference: state.user.foodPreference,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUserPrefs: async (prfs) => {
      await dispatch(actions.setUserPrefs(prfs));
    },
    updatePreference: async (pref) => {
      await dispatch(actions.setUserPreference(pref));
    },
  };
};

const Profile = (props) => {
  const [notice, setNotice] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [form] = Form.useForm();

  const setTolerances = (e) => {
    props.updatePreference({ intolerance: e });
  };
  const setPrefs = (e) => {
    props.updatePreference({ diet: e });
  };

  // on change clears out notices
  const onChange = () => {
    setNotice('');
    setSuccessNotice('');
  };

  // when user presses update profile
  const onFinish = async (values) => {
    const data = {
      username: props.username,
      name: values.fullName,
      email: values.email,
    };

    const prefs = {};
    // convert array of user selected preferences (values) into array of ids using the global
    // values of diets and intolerances in state.
    prefs.diet = api.identifyPreferences(props.diet, [...props.foodPreference.diet]);
    prefs.intolerance = api.identifyPreferences(props.intolerance, [
      ...props.foodPreference.intolerance,
    ]);
    // invoke the signUp User api
    const rsp = await api.updateUserProfile(data, prefs);
    if (rsp && rsp.status === 'success') {
      setSuccessNotice('Your profile has been updated!');
    } else {
      rsp && rsp.message ? setNotice(rsp.message) : null;
    }
  };

  // pull in the user's data on mount or update
  useEffect(() => {
    if (props.username) {
      const data = { username: props.username };
      const updateSetPrefs = async (prefs) => {
        await props.setUserPrefs(prefs);
      };

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

          const prefs = {
            email: resData.userInfo.email,
            name: resData.userInfo.name,
          };

          updateSetPrefs(prefs);

          // populate the form with user's settings
          form.setFieldsValue({
            email: resData.userInfo.email,
            fullName: resData.userInfo.name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="site-layout-content">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Divider orientation="left">{`${
          props.username ? props.username + "'s profile" : ''
        }`}</Divider>
        <Form {...formItemLayout} form={form} name="preferences" onFinish={onFinish}>
          {/* conditionally render the alert if an error notice has occured */}
          {notice && (
            <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />
          )}
          {successNotice && (
            <Alert
              style={{ marginBottom: 24 }}
              message={successNotice}
              type="success"
              showIcon
              closable
            />
          )}

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

          <Intolerances updateIntolerances={setTolerances}></Intolerances>
          <br></br>
          <DietPrefs pushPrefs={setPrefs}></DietPrefs>

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
