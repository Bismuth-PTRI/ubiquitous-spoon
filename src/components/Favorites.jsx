import React, { useState, useEffect } from 'react';
import { Card, Switch, Radio, Avatar, Space, Divider } from 'antd';
import { MehOutlined, LinkOutlined } from '@ant-design/icons';
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
    console.log(recipeId);
    return;
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
                  <MehOutlined
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
