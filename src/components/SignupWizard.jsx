import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Steps, Button } from 'antd';
import FoodPreferences from './Preference';
import SignUp from './signup';
import * as actions from '../actions/actions';

const Step = Steps.Step;

const mapStateToProps = (state) => {
  return {
    diet: state.food.diets,
    intolerance: state.food.intolerances,
    userinfo: state.user.userInfo,
    foodPrefrence: state.user.foodPrefrence,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => {
    dispatch(actions.setUsername(username));
  },
  updateUserRegInfo: async (info) => {
    await dispatch(actions.setUserInfo(info));
  },
  updateUserPreferences: async (pref) => {
    await dispatch(actions.setUserPreference(pref));
  },
  signupUser: async () => {
    await dispatch(actions.signUpUser());
  },
});

class SignupWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.onFinish = this.onFinish.bind(this);
    this.steps = [
      {
        title: 'User Information',
        content: <SignUp updateInfo={this.saveinfo.bind(this)}></SignUp>,
      },
      {
        title: 'Preferences',
        content: <FoodPreferences updatePreference={this.saveprefs.bind(this)}></FoodPreferences>,
      },
    ];
  }

  async saveprefs(prf) {
    await this.props.updateUserPreferences(prf);
  }

  async saveinfo(data) {
    await this.props.updateUserRegInfo(data);
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  redirect(state) {
    if (state) {
      //Redirect upon successful sign up
      return <Redirect to="/" />;
    }
  }

  async onFinish() {
    console.log('Received values of form: ', this.props);
    const signupResponse = await this.props.signupUser();
    //   const data = {
    //     username: values.username,
    //     password1: values.password,
    //     password2: values.confirm,
    //     name: values.name,
    //     email: values.email,
    //     glutenFree,
    //     vegetarian,
    //     vegan,
    //   };

    //   const userCheck = this;

    //   // fetch request to create a user
    //   fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((resData) => {
    //       if (resData.err === 'Username already exists') {
    //         // display the error as a notice in state
    //         setNotice(resData.err);
    //         form.setFieldsValue({ username: '' });
    //       } else if (resData.success) {
    //         // change redirect in local state to true
    //         props.setUsername(resData.username);
    //         setRedirect(true);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          {current < this.steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === this.steps.length - 1 && (
            <Button type="primary" onClick={this.onFinish}>
              Sign Up
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWizard);
