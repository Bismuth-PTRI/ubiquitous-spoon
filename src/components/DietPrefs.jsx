import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'antd';

// https://spoonacular.com/food-api/docs#Diets
// Pescetarian
// Paleo
// Primal
// Whole30
// Ketogenic

// map diets key from redux state to component's state
// to ensure changes made globally are reflected locally to component
const mapStateToProps = (state) => {
  return {
    items: state.food.diets,
    userPreferences: state.user.foodPreference,
  };
};

const DietPrefs = (props) => {
  // map items/diets array object to an array of values (removing the id key) as thats
  // what will be shown to the user in the Checkbox.Group component
  const [checkOptions] = useState(Object.values(props.items).map((m) => m.value));
  const [itemsSelected, setitemsSelected] = useState(
    props.userPreferences && props.userPreferences.diet ? props.userPreferences.diet : []
  );

  return (
    <div>
      <Form.Item name="checkbox-group" label="Food Preferences" initialValue={itemsSelected}>
        <Checkbox.Group options={checkOptions} onChange={(e) => props.pushPrefs(e)} />
      </Form.Item>
    </div>
  );
};

export default connect(mapStateToProps)(DietPrefs);
