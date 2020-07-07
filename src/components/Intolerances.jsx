import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox } from 'antd';

// map intolerance key from redux state to component's state
// to ensure changes made globally are reflected locally to component
const mapStateToProps = (state) => {
  return {
    items: state.food.intolerances,
  };
};

const Intolerances = (props) => {
  // map items/intolerances array object to an array of values (removeing the id key) as thats
  // what will be shown to the user in the Checkbox.Group component
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
