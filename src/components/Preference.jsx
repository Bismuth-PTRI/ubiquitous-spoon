import React from 'react';
import { Form } from 'antd';

import Intolerances from './Intolerances';
import DietPrefs from './DietPrefs';

const FoodPreferences = (props) => {
  const setTolerances = (e) => {
    props.updatePreference({ intolenrance: e });
  };
  const setPrefs = (e) => {
    props.updatePreference({ diet: e });
  };
  return (
    <Form>
      <Form.Item>
        <Intolerances updateIntolerances={setTolerances} {...props.intolerance}></Intolerances>
        <br></br>
        <DietPrefs pushPrefs={setPrefs} {...props.diet}></DietPrefs>
      </Form.Item>
    </Form>
  );
};

export default FoodPreferences;
