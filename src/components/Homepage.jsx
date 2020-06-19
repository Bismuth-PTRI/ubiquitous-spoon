import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Switch, Radio, Avatar, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SecurityScanTwoTone, HeartTwoTone, FullscreenOutlined } from '@ant-design/icons';

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

// For the recipe card
const { Meta } = Card;

const Homepage = () => {
  // Hooks
  const [shopping, setShopping] = useState('Pre Shopping');
  const [recipes, setRecipes] = useState([]);

  // For UI testing
  // const [recipes, setRecipes] = useState([
  //   {
  //     id: 534573,
  //     title: 'Brown Butter Apple Crumble',
  //     image: 'https://spoonacular.com/recipeImages/534573-312x231.jpg',
  //     imageType: 'jpg',
  //     usedIngredientCount: 1,
  //     missedIngredientCount: 2,
  //     missedIngredients: [
  //       {
  //         id: 2010,
  //         amount: 0.5,
  //         unit: 'tsp',
  //         unitLong: 'teaspoons',
  //         unitShort: 'tsp',
  //         aisle: 'Spices and Seasonings',
  //         name: 'cinnamon',
  //         original: '1/2 tsp cinnamon',
  //         originalString: '1/2 tsp cinnamon',
  //         originalName: 'cinnamon',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
  //       },
  //       {
  //         id: 8120,
  //         amount: 0.5,
  //         unit: 'cup',
  //         unitLong: 'cups',
  //         unitShort: 'cup',
  //         aisle: 'Cereal',
  //         name: 'oats',
  //         original: '1/2 cup uncooked oats (not instant)',
  //         originalString: '1/2 cup uncooked oats (not instant)',
  //         originalName: 'uncooked oats (not instant)',
  //         metaInformation: ['uncooked', '(not instant)'],
  //         meta: ['uncooked', '(not instant)'],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg',
  //       },
  //     ],
  //     usedIngredients: [
  //       {
  //         id: 9003,
  //         amount: 4.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Produce',
  //         name: 'apples',
  //         original: '4 apples, peeled, cored and sliced',
  //         originalString: '4 apples, peeled, cored and sliced',
  //         originalName: 'apples, peeled, cored and sliced',
  //         metaInformation: ['cored', 'peeled', 'sliced'],
  //         meta: ['cored', 'peeled', 'sliced'],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
  //       },
  //     ],
  //     unusedIngredients: [],
  //     likes: 7,
  //   },
  //   {
  //     id: 556470,
  //     title: 'Apple fritters',
  //     image: 'https://spoonacular.com/recipeImages/556470-312x231.jpg',
  //     imageType: 'jpg',
  //     usedIngredientCount: 0,
  //     missedIngredientCount: 3,
  //     missedIngredients: [
  //       {
  //         id: 14003,
  //         amount: 2.0,
  //         unit: 'tablespoons',
  //         unitLong: 'tablespoons',
  //         unitShort: 'Tbsp',
  //         aisle: 'Alcoholic Beverages',
  //         name: 'beer',
  //         original: '2 tablespoons of lager beer',
  //         originalString: '2 tablespoons of lager beer',
  //         originalName: 'lager beer',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/beer.jpg',
  //       },
  //       {
  //         id: 1123,
  //         amount: 1.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Milk, Eggs, Other Dairy',
  //         name: 'egg',
  //         original: '1 egg',
  //         originalString: '1 egg',
  //         originalName: 'egg',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/egg.png',
  //       },
  //       {
  //         id: 1059003,
  //         amount: 2.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Produce',
  //         name: 'red delicious apples',
  //         original: '2 Golden Delicious apples',
  //         originalString: '2 Golden Delicious apples',
  //         originalName: 'Golden Delicious apples',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png',
  //       },
  //     ],
  //     usedIngredients: [],
  //     unusedIngredients: [
  //       {
  //         id: 9003,
  //         amount: 1.0,
  //         unit: 'serving',
  //         unitLong: 'serving',
  //         unitShort: 'serving',
  //         aisle: 'Produce',
  //         name: 'apples',
  //         original: 'apples',
  //         originalString: 'apples',
  //         originalName: 'apples',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
  //       },
  //     ],
  //     likes: 243,
  //   },
  //   {
  //     id: 534573,
  //     title: 'Brown Butter Apple Crumble',
  //     image: 'https://spoonacular.com/recipeImages/534573-312x231.jpg',
  //     imageType: 'jpg',
  //     usedIngredientCount: 1,
  //     missedIngredientCount: 2,
  //     missedIngredients: [
  //       {
  //         id: 2010,
  //         amount: 0.5,
  //         unit: 'tsp',
  //         unitLong: 'teaspoons',
  //         unitShort: 'tsp',
  //         aisle: 'Spices and Seasonings',
  //         name: 'cinnamon',
  //         original: '1/2 tsp cinnamon',
  //         originalString: '1/2 tsp cinnamon',
  //         originalName: 'cinnamon',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
  //       },
  //       {
  //         id: 8120,
  //         amount: 0.5,
  //         unit: 'cup',
  //         unitLong: 'cups',
  //         unitShort: 'cup',
  //         aisle: 'Cereal',
  //         name: 'oats',
  //         original: '1/2 cup uncooked oats (not instant)',
  //         originalString: '1/2 cup uncooked oats (not instant)',
  //         originalName: 'uncooked oats (not instant)',
  //         metaInformation: ['uncooked', '(not instant)'],
  //         meta: ['uncooked', '(not instant)'],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg',
  //       },
  //     ],
  //     usedIngredients: [
  //       {
  //         id: 9003,
  //         amount: 4.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Produce',
  //         name: 'apples',
  //         original: '4 apples, peeled, cored and sliced',
  //         originalString: '4 apples, peeled, cored and sliced',
  //         originalName: 'apples, peeled, cored and sliced',
  //         metaInformation: ['cored', 'peeled', 'sliced'],
  //         meta: ['cored', 'peeled', 'sliced'],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
  //       },
  //     ],
  //     unusedIngredients: [],
  //     likes: 7,
  //   },
  //   {
  //     id: 556470,
  //     title: 'Apple fritters',
  //     image: 'https://spoonacular.com/recipeImages/556470-312x231.jpg',
  //     imageType: 'jpg',
  //     usedIngredientCount: 0,
  //     missedIngredientCount: 3,
  //     missedIngredients: [
  //       {
  //         id: 14003,
  //         amount: 2.0,
  //         unit: 'tablespoons',
  //         unitLong: 'tablespoons',
  //         unitShort: 'Tbsp',
  //         aisle: 'Alcoholic Beverages',
  //         name: 'beer',
  //         original: '2 tablespoons of lager beer',
  //         originalString: '2 tablespoons of lager beer',
  //         originalName: 'lager beer',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/beer.jpg',
  //       },
  //       {
  //         id: 1123,
  //         amount: 1.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Milk, Eggs, Other Dairy',
  //         name: 'egg',
  //         original: '1 egg',
  //         originalString: '1 egg',
  //         originalName: 'egg',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/egg.png',
  //       },
  //       {
  //         id: 1059003,
  //         amount: 2.0,
  //         unit: '',
  //         unitLong: '',
  //         unitShort: '',
  //         aisle: 'Produce',
  //         name: 'red delicious apples',
  //         original: '2 Golden Delicious apples',
  //         originalString: '2 Golden Delicious apples',
  //         originalName: 'Golden Delicious apples',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png',
  //       },
  //     ],
  //     usedIngredients: [],
  //     unusedIngredients: [
  //       {
  //         id: 9003,
  //         amount: 1.0,
  //         unit: 'serving',
  //         unitLong: 'serving',
  //         unitShort: 'serving',
  //         aisle: 'Produce',
  //         name: 'apples',
  //         original: 'apples',
  //         originalString: 'apples',
  //         originalName: 'apples',
  //         metaInformation: [],
  //         meta: [],
  //         image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
  //       },
  //     ],
  //     likes: 243,
  //   },
  // ]);

  // Declare recipeCards so it can be used in useEffects
  let recipeCards;

  //useEffect - similar to componentDidMount and componentDidUpdate
  // useEffect(() => {
  //   // Recipe Cards
  //   console.log('in useEffect... here is the recipes:', recipes);
  //   recipeCards = <p> hi!!!!</p>;

  //   console.log('recipeCards', recipeCards);
  // });

  ///
  // Form's Functions
  ///
  const onFinish = async (values) => {
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
    // console.log('url', url);

    //fetch request to spoonacular
    await fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data in fetch', data);
        setRecipes(data);
        // recipeCards = () => <p>hi!!!!</p>;
        // console.log('recipeCards in fetch:', recipeCards);
        // recipes.map((el, i) => {
        //   console.log('el:', el);
        //   return <p>hi!!!</p>;
        // });
      })
      .catch((err) => console.log('spoonacular fetch err', err));
  };

  const onToggleChange = (checked) => {
    checked ? setShopping('Pre Shopping') : setShopping('Post Shopping');
  };

  console.log('recipeCards right before return', recipeCards);
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

        <Divider orientation="left">Recipes</Divider>

        <div className="Recipe_Container">
          {/* <Space direction="horizontal"> */}
          {recipes.map((el, i) => {
            return (
              // {startRow}
              <Card
                key={i}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${el.image}`} />}
                actions={[<HeartTwoTone key="favorite" />, <FullscreenOutlined />]}
              >
                <Meta title={`${el.title}`} description={`Missing Ingredients: ${el.missedIngredients[0].name}`} />
              </Card>
              // {endRow}
            );
          })}
          {/* </Space> */}
        </div>
      </Card>
    </div>
  );
};

export default Homepage;
