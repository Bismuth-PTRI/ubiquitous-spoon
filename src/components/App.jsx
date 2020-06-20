import React from 'react';
import '../../node_modules/antd/dist/antd.less';
import '../style/theme.less';
import '../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// imported components
import Nav from './Nav.jsx';
import SignUp from './SignUp';
import Profile from './Profile';
import Homepage from './Homepage';
import Login from './Login';
import Favorites from './Favorites';

const { Header, Content, Footer } = Layout;

const App = () => {
  // more to come
  console.log('hi!!');
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

          <Route path="/login">
            <Content>
              <Login />
            </Content>
          </Route>

          <Route path="/signup">
            <Content>
              <SignUp />
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
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
