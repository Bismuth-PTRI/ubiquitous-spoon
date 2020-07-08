import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'antd';

// map intolerance key from redux state to component's state
// to ensure changes made globally are reflected locally to component
const mapStateToProps = (state) => {
  return {
    items: state.food.intolerances,
    userPreferences: state.user.foodPreference,
  };
};

const Intolerances = (props) => {
  // map items/intolerances array object to an array of values (removeing the id key) as thats
  // what will be shown to the user in the Checkbox.Group component
  const [intoleranceOptions] = useState(Object.values(props.items).map((m) => m.value));
  const [itemsSelected, setitemsSelected] = useState(
    props.userPreferences && props.userPreferences.intolerance
      ? props.userPreferences.intolerance
      : []
  );

  return (
    <div>
      <Form.Item name="intolerance-group" label="Intolerances" initialValue={itemsSelected}>
        <Checkbox.Group
          options={intoleranceOptions}
          onChange={(e) => props.updateIntolerances(e)}
        />
      </Form.Item>
    </div>
  );
};

export default connect(mapStateToProps)(Intolerances);
