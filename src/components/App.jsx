import React from 'react';
import '../../node_modules/antd/dist/antd.css';
import '../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav.jsx';

const { Header, Content, Footer } = Layout;

const App = () => {
  // more to come
  console.log('hi!!');
  return (
    <Router>
      <Layout>
        <Header>
          <Nav />
        </Header>
        <Switch>
          <Route exact path="/">
            <Content>Home</Content>
          </Route>
          <Route path="/login">
            <Content>login</Content>
          </Route>
          <Route path="/profile">
            <Content>profile</Content>
          </Route>
          <Route path="/favorites">
            <Content>favorites</Content>
          </Route>
        </Switch>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
};

export default App;
