import React, { useState, useEffect } from 'react';
import { Card, Switch, Radio, Avatar, Space, Divider } from 'antd';
import { DeleteOutlined, MehOutlined, LinkOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = {};

const { Meta } = Card;

const Favorites = (props) => {
  const [favs, setFavs] = useState([]);

  // On mount, fetch the users favorites from the DB
  useEffect(() => {
    fetch(`/api/favorites/${props.username}`)
      .then((res) => res.json())
      .then((resData) => {
        // Store the recipes in state
        setFavs(resData.favorites);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeFav = (recipeId) => {
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

    // Once favorite has been deleted from the DB, remove it from the favs array in state
    const newFavs = favs.filter((fav) => fav.id !== recipeId);
    setFavs(newFavs);
  };

  return (
    <div className="site-layout-content">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Divider orientation="left">{`${props.username}'s saved recipes`}</Divider>
        <div className="Favorites_Container">
          {favs.map((fav, i) => {
            return (
              <Card
                key={i}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${fav.image}`} />}
                actions={[
                  <DeleteOutlined
                    onClick={() => {
                      removeFav(fav.id);
                    }}
                  />,
                  <LinkOutlined
                    onClick={() => {
                      window.open(fav.source_url, '_blank');
                    }}
                  />,
                ]}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
