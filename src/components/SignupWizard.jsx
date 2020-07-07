import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Steps, Button } from 'antd';
import FoodPreferences from './Preference';
import SignUp from './SignUp';
import * as actions from '../actions/actions';
import * as api from '../api/common';

const Step = Steps.Step;

const mapStateToProps = (state) => {
  return {
    diet: state.food.diets,
    intolerance: state.food.intolerances,
    userinfo: state.user.userInfo,
    foodPrefrence: state.user.foodPrefrence,
    signupstate: state.user.signUpState,
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
  signupUser: async (rsp) => await dispatch(actions.signUpUser(rsp)),
});

class SignupWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      toMain: false,
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

  stateReset() {
    this.setState({ current: 0 });
  }

  async onFinish() {
    const prefs = {};
    // convert array of user selected preferences (values) into array of ids using the global
    // values of diets and intolerances in state.
    prefs.diet = api.identifyPreferences(this.props.diet, [...this.props.foodPrefrence.diet]);
    prefs.intolerance = api.identifyPreferences(this.props.intolerance, [
      ...this.props.foodPrefrence.intolerance,
    ]);
    // invoke the signUp User api
    const rsp = await api.signupUserApi(this.props.userinfo, prefs);
    // call redux state action to set user keys in state in readiness for use
    // as a valid user and login user in
    this.props.signupUser(rsp);
    if (rsp.status === 'success') {
      this.setState({ toMain: true });
    } else {
      this.setState({ current: 0 });
    }
  }

  render() {
    const { current, toMain } = this.state;
    if (toMain) {
      return <Redirect to={'/'} />;
    }

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
            <Button
              type="primary"
              onClick={() => {
                this.onFinish();
              }}
            >
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
