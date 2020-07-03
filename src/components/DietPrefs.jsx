import React, { useState, useEffect } from 'react';

import { Form, Checkbox } from 'antd';

// https://spoonacular.com/food-api/docs#Diets
// Pescetarian
// Paleo
// Primal
// Whole30
// Ketogenic

const DietPrefs = ({ prefsList, pushPrefs, ...props }) => {
  const [checkOptions] = useState(Object.values(props).map((m) => m.value));
  return (
    <div>
      <Form.Item name="checkbox-group" label="Food Preferences">
        <Checkbox.Group options={checkOptions} onChange={(e) => pushPrefs(e)} />
      </Form.Item>
    </div>
  );
};

export default DietPrefs;
