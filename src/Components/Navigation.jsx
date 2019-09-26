import React from 'react';
import { Link } from 'react-router-dom';

import injectSheet from 'react-jss';

const styles = {
  root: {
    marginTop: 100,
    marginLeft: 0,
    float: 'left',
    width: '50%',
    height: 280
  },
  item:{
    float: 'left',
    width: '35%',
    height: '50%',
    backgroundColor: 'White',
    margin: 10,
    borderRadius: 4,
    boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  img: {
    paddingTop: 15,
    display: 'block',
    height: 80,
    width: 80,
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(0,0,0,0.7)',
    marginTop: 10,
  }
};


function Navigation({classes}){
  return (
    <div className={classes.root}>
      <Link to={'/control'}>
        <div className={classes.item}>
          <img src={'./static/img/home.png'} className={classes.img}/>
          <p className={classes.title}>Control</p>
        </div>
      </Link>
      <Link to={'/settings'}>
        <div className={classes.item}>
          <img src={'./static/img/settings.png'} className={classes.img}/>
          <p className={classes.title}>Settings</p>
        </div>
      </Link>
      <Link to={'/music'}>
        <div className={classes.item}>
          <img src={'./static/img/turntable.png'} className={classes.img}/>
          <p className={classes.title}>Music</p>
        </div>
      </Link>
      <Link to={'/assistant'}>
        <div className={classes.item}>
          <img src={'./static/img/chat.png'} className={classes.img}/>
          <p className={classes.title}>Assistant</p>
        </div>
      </Link>
    </div>
  )
}

export default injectSheet(styles)(Navigation);