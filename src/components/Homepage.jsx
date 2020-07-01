import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Card, Switch, Radio, Avatar, Space, Divider, Modal } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SecurityScanTwoTone,
  HeartTwoTone,
  FullscreenOutlined,
  ExpandAltOutlined,
  HeartFilled,
} from '@ant-design/icons';
import auth from '../utlis/auth';

// For the recipe card
const { Meta } = Card;

// Matt Digel's Trial API Key for https://spoonacular.com/food-api/
const apiKey = process.env.API_KEY;

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

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {};

const Homepage = (props) => {
  // Variables for conditionally rendering buttons
  const isLoggedIn = !!props.username;

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

  // /
  // Search Functions
  // /
  const getFavsForUser = (username) => {
    return fetch(`/api/favorites/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // Store the recipes in state
        // setFavs(resData.favorites);
        return data.favorites;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const getRecipesWithIngredients = (ingredientsList, ranking, apiKey) => {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&number=10&ranking=${ranking}&apiKey=${apiKey}`;

    // fetch request to spoonacular for recipes
    return fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data in fetch', data);

        // add a favorite property - used to fill in heart icon
        data.map((el) => (el.favorite = false));
        return data;
      })
      .catch((err) => {
        console.log('spoonacular fetch err', err);
        return err;
      });
  };

  const searchForRecipes = async (values) => {
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

    // Get recipes
    let data = await getRecipesWithIngredients(ingredientsList, ranking, apiKey);

    // if username is exists, then the user is loggedin
    if (props.username) {
      // fetch request to backend for user's favorites
      const userFavs = await getFavsForUser(props.username);

      // put recipe id's in object fot O(n) look up
      const FavIdObj = {};
      for (let i = 0; i < userFavs.length; i++) {
        const { id } = userFavs[i];
        FavIdObj[id] = true;
      }

      // If any of the user's favorites are in the current search
      // then change the 'favorites' property for that recipe to true
      data = data.map((el) => {
        const tempId = el.id;

        if (FavIdObj[tempId]) {
          // if recipe id matches a favorite's recipe_id
          el.favorite = true;
        }
        return el;
      });
    }

    // Update local state via a hook with the recipes;
    setRecipes(data);
  };

  const onToggleChange = (checked) => {
    checked ? setShopping('Pre Shopping') : setShopping('Post Shopping');
  };

  const getRecipeById = async (id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
    return fetch(url)
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

  // /
  // Modal Functions
  // /

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

  // //////////
  // Adding favorites to user
  // //////////
  const handleAddFav = async (recipeId) => {
    //
    // first update state for quick UI feedback
    //

    // Update recipe list's favortie property to true
    const newRecipesList = recipes.map((el) => {
      if (el.id === recipeId) {
        el.favorite = true;
      }
      return el;
    });

    setRecipes(newRecipesList);

    //
    // Get Recipe from Spoonacular to then save to DB
    //

    // Get recipe data via API request
    const recipe = await getRecipeById(recipeId);

    const data = {
      recipeId,
      title: recipe.title,
      summary: recipe.summary,
      source_url: recipe.sourceUrl,
      image: recipe.image,
    };

    // make a fetch request to backend to recipe to user's favorites AND add that recipes info to the recipe table
    fetch(`/api/favorites/${props.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth.createAuthHeader(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          console.log('successfully added favorite');
        }
      })
      .catch((err) => {
        console.log(err);

        // Set favorite back to false if error occurs
        const errorRecipesList = recipes.map((el) => {
          if (el.id === recipeId) {
            el.favorite = false;
          }
          return el;
        });

        setRecipes(errorRecipesList);
      });
  };

  return (
    <div className="site-layout-content search-background">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Form
          name="dynamic_form_item"
          // {...formItemLayoutWithOutLabel}
          onFinish={(values) => {
            searchForRecipes(values);
          }}
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
            // Conditionally render add favorite button if a user is logged in
            const cardButtons = [];

            // Construct cardButtons before favorited
            if (isLoggedIn && !el.favorite) {
              cardButtons.push(
                <HeartTwoTone
                  key="favorite"
                  onClick={() => {
                    handleAddFav(el.id);
                  }}
                />
              );
            } else if (isLoggedIn && el.favorite) {
              cardButtons.push(
                <HeartFilled
                  key="favorite"
                  style={{ color: '#a294f6' }}
                  // onClick= removeFav!!!!!!!!!!!!!!
                />
              );
            }

            cardButtons.push(
              <FullscreenOutlined
                onClick={() => {
                  handleOpenModal(el.id, el.title);
                }}
              />
            );

            //

            return (
              <Card
                key={i}
                recipe_id={`${el.id}`}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${el.image}`} />}
                actions={cardButtons}
              >
                <Meta
                  title={`${el.title}`}
                  description={`Missing Ingredients: ${el.missedIngredients[0].name}`}
                />
              </Card>
            );
          })}

          <Modal
            title={modalTitle}
            visible={modal}
            onOk={() => handleViewWebsite(sourceUrl)}
            confirmLoading={modalLoading}
            onCancel={() => handleCloseModal()}
            okText="View Website"
          >
            <p dangerouslySetInnerHTML={{ __html: summary }} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
