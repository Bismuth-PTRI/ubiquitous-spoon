import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Switch, Radio, Avatar, Space, Divider, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SecurityScanTwoTone, HeartTwoTone, FullscreenOutlined, ExpandAltOutlined } from '@ant-design/icons';

// Matt Digel's Trail API Key for https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
const apiKey = '7598ea483f4a4386ab7c47949df3fee4';

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
  // Search Hooks
  const [shopping, setShopping] = useState('Pre Shopping');
  const [recipes, setRecipes] = useState([]);

  // Modal Hooks
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [glutenFree, setGlutenFree] = useState('');
  const [vegan, setVegan] = useState('');
  const [vegetarian, setVegetarian] = useState('');
  const [summary, setSummary] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

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

  const getRecipeById = async (id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
    return await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('recipe details GET request', data);
        return data;
      })
      .catch((err) => {
        console.log('get recipe by id fetch error:', err);
        return err;
      });
  };

  ///
  // Modal Functions
  ///

  const handleOpenModal = async (id, title) => {
    // Update State before get with data already in the app
    setModalTitle(title);

    // Get more info from Spoonacular
    const data = await getRecipeById(id);
    console.log('data in expand details', data);

    // update state with new data from Spoonacular
    data.glutenFree ? setGlutenFree('Yes') : setGlutenFree('No');
    data.vegan ? setVegan('Yes') : setVegan('No');
    data.vegetarian ? setVegetarian('Yes') : setVegetarian('No');
    setSummary(data.summary);
    setSourceUrl(data.sourceUrl);

    setModal(true);
  };

  const handleViewWebsite = (sourceUrl) => {
    setModalLoading(true);

    setTimeout(() => {
      setModal(false);
      setModalLoading(false);
      window.open(sourceUrl, '_blank');
    }, 1000);
  };

  const handleCloseModal = () => {
    console.log('in handleCloseModal');
    setModal(false);
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

        <Divider orientation="left">Recipes</Divider>

        <div className="Recipe_Container">
          {/* <Space direction="horizontal"> */}
          {recipes.map((el, i) => {
            return (
              <Card
                key={i}
                recipe_id={`${el.id}`}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${el.image}`} />}
                actions={[
                  <HeartTwoTone key="favorite" />,
                  <FullscreenOutlined
                    onClick={() => {
                      handleOpenModal(el.id, el.title);
                    }}
                  />,
                ]}
              >
                <Meta title={`${el.title}`} description={`Missing Ingredients: ${el.missedIngredients[0].name}`} />
              </Card>
            );
          })}

          <Modal
            title={modalTitle}
            visible={modal}
            onOk={() => handleViewWebsite(sourceUrl)}
            confirmLoading={modalLoading}
            onCancel={() => handleCloseModal()}
          >
            <p dangerouslySetInnerHTML={{ __html: summary }}></p>

            <p>
              <b>Gluten Free:&nbsp;</b>
              {glutenFree}
            </p>
            <p>
              <b>Vegan:&nbsp;</b>
              {vegan}
            </p>
            <p>
              <b>Vegetarian:&nbsp;</b>
              {vegetarian}
            </p>
          </Modal>
        </div>
      </Card>
    </div>
  );
};

export default Homepage;
