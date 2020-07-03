// w3School on Autocomplete: https://www.w3schools.com/howto/howto_js_autocomplete.asp
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
  // value: [str.repeat(repeat)],
  value: ['matt', 'dulio', 'lanre', 'rob'],
});

const FindFriends = (props) => {
  // Functions from Ant Design for 'AutoComplete - Basic Usage'
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);

  // On mount, fetch the users favorites from the DB
  useEffect(() => {
    const url = '/api/user/info/usernames';
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        const temp = resData.users.map((el) => {
          return `${el.username} - ${el.name}`;
        });

        setAllOptions(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearch = (searchText) => {
    // if nothing typed in then don't show any options
    if (!searchText) setOptions([]);

    // create the array of the options if searchText has characters
    if (searchText) {
      // filter for usernames that start with searchText
      const autoCompleteValues = allOptions.filter((el) => {
        return el.startsWith(searchText);
      });

      // create array with structure required for Ant Autocomplete
      const searchResults = autoCompleteValues.map((el) => {
        const obj = {};
        obj.value = [el];
        return obj;
      });

      // set state for options -> fills in autocomplete values
      setOptions(searchResults);
    }
  };

  // const onSelect = (data) => {
  // // will need later
  // };

  // const onChange = (data) => {
  // // might need this later
  // };

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
            // onSelect={onSelect}
            onSearch={onSearch}
            // onChange={onChange}
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete>
        </>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
