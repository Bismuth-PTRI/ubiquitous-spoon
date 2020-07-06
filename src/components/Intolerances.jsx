import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'antd';

// https://spoonacular.com/food-api/docs#Intolerances
// Dairy
// Egg
// Gluten
// Grain
// Peanut
// Seafood
// Sesame
// Shellfish
// Soy
// Sulfite
// Tree Nut
// Wheat

const mapStateToProps = (state) => {
  return {
    items: state.food.intolerances,
  };
};

const Intolerances = (props) => {
  const [intoleranceOptions] = useState(Object.values(props.items).map((m) => m.value));

  return (
    <div>
      <Form.Item name="intolerance-group" label="Intolerances">
        <Checkbox.Group
          options={intoleranceOptions}
          onChange={(e) => props.updateIntolerances(e)}
        />
      </Form.Item>
    </div>
  );
};

export default connect(mapStateToProps)(Intolerances);
