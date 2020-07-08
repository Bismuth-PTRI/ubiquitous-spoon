import React, { useState, useEffect } from 'react';
import { Card, Switch, Radio, Avatar, Space, Divider } from 'antd';
import {
  DeleteOutlined,
  MehOutlined,
  LinkOutlined,
  HeartTwoTone,
  HeartFilled,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const { Meta } = Card;

/**
 * @param {username}
 * Output: data.favorites
 */
const getFavsForUser = (username) => {
  return fetch(`/api/favorites/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: auth.createAuthHeader(),
    },
  })
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

const FriendFavs = (props) => {
  const [friendFavs, setFriendFavs] = useState([]);

  const fetchData = async () => {
    // get Friend's favs and update State
    const friendFavsTemp = await getFavsForUser(props.friendsname);
    setFriendFavs(friendFavsTemp);

    // get user's favorites
    const userFavs = await getFavsForUser(props.username);

    // put User's recipe id's in object fot O(n) look up
    const FavIdObj = {};
    for (let i = 0; i < userFavs.length; i++) {
      const { id } = userFavs[i];
      FavIdObj[id] = true;
    }

    // If any of the user's favorites are in the friend's Favs
    // then change the 'favorites' property for that recipe to true
    const data = friendFavsTemp.map((el) => {
      const tempId = el.id;

      if (FavIdObj[tempId]) {
        // if user's recipe id matches a friends's recipe_id
        el.favorite = true;
      }
      return el;
    });

    setFriendFavs(data);
  };

  // On mount, fetch the Friend's Favs
  useEffect(() => {
    fetchData();
  }, [props.friendsname]);

  const handleRemoveFav = (recipeId) => {
    const data = { recipeId };

    // make a fetch request to backend to delete the recipe from user's favorites
    fetch(`/api/favorites/${props.username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) console.log('successfully removed favorite');
      })
      .catch((err) => console.log(err));

    // Once favorite has been deleted from the DB,
    // remove it from the favs array in state
    const temp = friendFavs.map((el) => {
      if (el.id === recipe_id) {
        el.favorite = false;
      }
    });

    setFriendFavs(temp);
  };

  return (
    <div className="site-layout-content">
      <Card style={{ width: '100%', opacity: 0.9 }}>
        <Divider orientation="left">{`${props.friendsname}'s saved recipes`}</Divider>
        <div className="Favorites_Container">
          {friendFavs.map((fav, i) => {
            /**
             * create cardButtons for each card
             */
            //
            const cardButtons = [];

            // if the recipe is already the user's Fav - fill in heart
            if (!fav.favorite) {
              cardButtons.push(
                <HeartTwoTone
                  key="favorite"
                  onClick={() => {
                    handleAddFav(fav.id);
                  }}
                />
              );
              // if the recipe isn't already the user's fav - empty heart
            } else if (fav.favorite) {
              cardButtons.push(
                <HeartFilled
                  key="favorite"
                  style={{ color: '#a294f6' }}
                  // onClick= removeFav!!!!!!!!!!!!!!
                  onClick={() => {
                    handleRemoveFav(fav.id);
                  }}
                />
              );
            }

            /**
             * Return a Card for each recipe with the correct buttons
             */
            cardButtons.push(
              <LinkOutlined
                onClick={() => {
                  window.open(fav.source_url, '_blank');
                }}
              />
            );

            return (
              <Card
                key={i}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${fav.image}`} />}
                actions={cardButtons}
              >
                <Meta title={`${fav.title}`} />
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default FriendFavs;
