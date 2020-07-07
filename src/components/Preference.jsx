import React from 'react';
import { Form } from 'antd';

import Intolerances from './Intolerances';
import DietPrefs from './DietPrefs';

const FoodPreferences = (props) => {
  const setTolerances = (e) => {
    props.updatePreference({ intolerance: e });
  };
  const setPrefs = (e) => {
    props.updatePreference({ diet: e });
  };

  return (
    <Form>
      <Form.Item>
        <Intolerances updateIntolerances={setTolerances}></Intolerances>
        <br></br>
        <DietPrefs pushPrefs={setPrefs}></DietPrefs>
      </Form.Item>
    </Form>
  );
};

export default FoodPreferences;
