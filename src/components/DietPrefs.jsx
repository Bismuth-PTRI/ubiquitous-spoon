import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'antd';

// https://spoonacular.com/food-api/docs#Diets
// Pescetarian
// Paleo
// Primal
// Whole30
// Ketogenic

const mapStateToProps = (state) => {
  return {
    items: state.food.diets,
  };
};

const DietPrefs = (props) => {
  const [checkOptions] = useState(Object.values(props.items).map((m) => m.value));
  return (
    <div>
      <Form.Item name="checkbox-group" label="Food Preferences">
        <Checkbox.Group options={checkOptions} onChange={(e) => props.pushPrefs(e)} />
      </Form.Item>
    </div>
  );
};

export default connect(mapStateToProps)(DietPrefs);
