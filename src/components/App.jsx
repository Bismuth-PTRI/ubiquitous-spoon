import React from 'react';
import { connect } from 'react-redux';
import '../../node_modules/antd/dist/antd.less';
import '../style/theme.less';
import '../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// imported components
import Nav from './Nav.jsx';
// import SignUp from './SignUp';
import SignupWizard from './SignupWizard';
import Profile from './Profile';
import Homepage from './Homepage';
import Login from './Login';
import Favorites from './Favorites';
import FindFriends from './FindFriends';
import PublicProfile from './PublicProfile';

import { loadDietpreference, loadIntolerances } from '../actions/actions';
import { loadPreferences } from '../api/common';

// map actions for redux to load default
// diet and intolerance options avaibale from BE
const mapDispatchToProps = (dispatch) => ({
  loaddiets: (payload) => dispatch(loadDietpreference(payload)),
  loadintolernace: (payload) => dispatch(loadIntolerances(payload)),
});

const { Header, Content, Footer } = Layout;

const App = (props) => {
  // more to come
  React.useEffect(() => {
    // implemet on component mount to grab all intial data
    const LoadPreferences = async () => {
      try {
        const prfs_d = await loadPreferences('Diet');
        props.loaddiets && props.loaddiets(prfs_d);
      } catch (err) {}
      try {
        const prfs_i = await loadPreferences('Intolerance');
        props.loadintolernace && props.loadintolernace(prfs_i);
      } catch (err) {}
    };
    // invoke this function once the App.jsx component mounts
    // dispatch the state actions to load intolerance and diets
    LoadPreferences();
  }, []);

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Nav />
        </Header>

        <Switch>
          <Route exact path="/">
            <Content>
              <Homepage />
            </Content>
          </Route>

          <Route path="/user/:userID">
            <Content>
              <PublicProfile />
            </Content>
          </Route>

          <Route path="/user">
            <Content>
              <PublicProfile />
            </Content>
          </Route>

          <Route path="/login">
            <Content>
              <Login />
            </Content>
          </Route>

          <Route path="/signup">
            <Content>
              <SignupWizard />
            </Content>
          </Route>

          <Route path="/profile">
            <Content>
              <Profile />
            </Content>
          </Route>

          <Route path="/favorites">
            <Content>
              <Favorites />
            </Content>
          </Route>

          <Route path="/findfriends">
            <Content>
              <FindFriends />
            </Content>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default connect(null, mapDispatchToProps)(App);
