import React, { useState, useEffect } from 'react';
import { Card, Switch, Radio, Avatar, Space, Divider, AutoComplete, Input } from 'antd';
import { DeleteOutlined, MehOutlined, LinkOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const { Meta } = Card;

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {};

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const FindFriends = (props) => {
  // On mount, fetch the users favorites from the DB
  useEffect(() => {
    const url = '';
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        // TBD
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Functions from Ant Design for 'AutoComplete - Basic Usage'
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <div className="site-layout-content">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Divider orientation="left">Find Your Friends Recipes</Divider>
        <>
          <AutoComplete
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete>
        </>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
