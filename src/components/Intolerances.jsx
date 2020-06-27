import React, { useState, useEffect } from 'react';

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

const Intolerances = ({ intoleranceList, updateIntolerances }) => {
  const [intoleranceOptions] = useState([
    'Dairy',
    'Egg',
    // 'Gluten',
    // 'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    // 'Wheat',
  ]);

  return (
    <div>
      <Form.Item name="intolerance-group" label="Intolerances">
        <Checkbox.Group options={intoleranceOptions} onChange={(e) => updateIntolerances(e)} />
      </Form.Item>
    </div>
  );
};

export default Intolerances;
