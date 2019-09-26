import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  root: {
    float: 'left',
    width: '50%',
    height: 280,
    color: 'White'
  },
  wrapper: {
    paddingLeft: '15%',
    paddingTop: '20%',
  },
  currentTemp: {
    fontSize: 100,
  },

  weather: {
    paddingTop: 30,
    width: '90%'
  },
  item: {
    float: 'left',
    width: '15%',
    height: 100,
    color: 'rgb(255,255,255,0.5)'
  },
  img: {
    height: 32,
    width: 32,
  },
  time: {
    paddingLeft: '15%',
    paddingTop: '20%',
    float: 'left',
    width: '50%',
    height: 280,
    color: 'rgb(255,255,255,0.8)',
    fontSize: 30,
  }
};



class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({
        date : new Date()
      })
    }, 1000);
  }

  render(){
    const {classes} = this.props;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const d = this.state.date;
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }

    let sec = d.getSeconds();
    if(sec < 10){
      sec = '0' + sec;
    }

    const time = hr + ":" + min + ":" + sec;

    const now = new Date();

    const date = days[now.getDay()]+ ", " + now.getDate()+" "+months[now.getMonth()] + " " + now.getFullYear();
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <span className={classes.currentTemp}>17°</span>
          <div>{date}</div>
          <div className={classes.weather}>
            <div className={classes.item}>
              <p>{days[0]}</p>
              <img  src={'./static/img/cloud.png'} className={classes.img}/>
              <p>25°</p>
            </div>
            <div className={classes.item}>
              <p>{days[1]}</p>
              <img  src={'./static/img/cloud (1).png'}  className={classes.img}/>
              <p>31°</p>
            </div>
            <div className={classes.item}>
              <p>{days[2]}</p>
              <img  src={'./static/img/rain.png'}  className={classes.img}/>
              <p>12°</p>
            </div>
            <div className={classes.item}>
              <p>{days[3]}</p>
              <img  src={'./static/img/snowy.png'}  className={classes.img}/>
              <p>-5°</p>
            </div>
            <div className={classes.item}>
              <p>{days[4]}</p>
              <img  src={'./static/img/sun.png'}  className={classes.img}/>
              <p>35°</p>
            </div>
          </div>
        </div>
        <div className={classes.time}><p>{time}</p></div>
      </div>
    )
  }
}


export default injectSheet(styles)(Weather);