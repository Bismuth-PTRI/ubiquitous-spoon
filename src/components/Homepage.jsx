import React, { useState } from 'react';
import { Form, Input, Button, Card, Switch, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SecurityScanTwoTone } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const Homepage = () => {
  //console.log
  const [shopping, setShopping] = useState('Pre Shopping');

  const onFinish = (values) => {
    console.log('Received values of form:', values);

    // create ingredients comma seperated list for query params
    let ingredientsList = '';
    values.ingredients.forEach((el, index) => {
      if (index === 0) {
        ingredientsList += el;
      } else {
        ingredientsList += `,${el}`;
      }
    });

    // Ranking Parameter
    // 1: recipes that maximize used ingredients in the query
    // 2: recipes that minimize missing ingredients
    const ranking = shopping === 'Pre Shopping' ? 1 : 0;

    // Matt Digel's Trail API Key for https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
    const apiKey = '7598ea483f4a4386ab7c47949df3fee4';
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&number=10&ranking=${ranking}&apiKey=${apiKey}`;

    //fetch request to spoonacular
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => console.log('spoonacular fetch err', err));
  };

  const onToggleChange = (checked) => {
    checked ? setShopping('Pre Shopping') : setShopping('Post Shopping');
  };

  return (
    <div className="site-layout-content search-background">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Form
          name="dynamic_form_item"
          // {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
          size="large"
        >
          <Form.List name="ingredients">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <h2> What's in your fridge?</h2>

                  <Switch
                    defaultChecked
                    onChange={onToggleChange}
                    style={{ margin: '8px 0px 8px' }}
                    checkedChildren="Pre Shopping"
                    unCheckedChildren="Post Shopping"
                    size="large"
                    name="shoppingStage"
                  />

                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Ingredients' : ''}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Input ingredients name or delete this field.',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Ingredient name" style={{ width: '60%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '66%' }}
                    >
                      <PlusOutlined /> Add Ingredient
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search For Recipes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Homepage;
