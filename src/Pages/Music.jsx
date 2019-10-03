import React from 'react';
import ReactHowler from 'react-howler';
//import JsMediaTags from 'jsmediatags';
import raf from 'raf';
import injectSheet from 'react-jss';

const style = {
  root: {
    clear: 'both',
  },
  wrapper: {
    //margin: '100px',
    minWidth: 600,
    //border: '2px solid white',
    minHeight: 400,
    borderRadius: 5,
    backgroundColor: 'rgb(115, 7, 102, 0.4)',
  },
  player: {
    width: '100%',
    marginBottom: 30,
  },
  album: {
    width: '20%',
    minWidth: '190px',
    margin: 0,
    float: 'left'
  },
  album_img: {
    height: 150,
    width: 150,
    margin: 20
  },
  title_wrapper: {
    float: 'left',
    width: '77%',
    color: 'white',
    marginLeft: 30,
  },
  title: {
    marginBottom: 0,
    paddingLeft: 80,
  },
  span: {
    margin: 0,
    paddingLeft: 80,
    paddingBottom: 30,
  },
  play_button: {
    float: 'left',
    paddingTop: 20,
    height: 60,
    width: 60,
  },
  slider: {
    width: '90%',
    marginTop: 15,
    marginLeft: 0,
    height: 6,
    backgroundColor: 'rgb(255,255,255, 0.4)',
    float: 'left',
  },
  slider_span: {
    marginTop: 10,
    marginLeft: 10,
    float: 'left',
  },
  bar: {
    height: 6,
    width: '0%',
    backgroundColor: 'rgb(255,255,255, 0.9)',
  },
  control_wrapper: {
    //float: 'left',
    width: '65%',
    color: 'white'
  },
  control_buttons: {
    height: 30,
    width: 30,
    marginTop: 10,
    marginRight: 10,
  },
  list: {
    clear: 'both',
    width: '100%',
    //float: 'left'
  },
  item: {
    float: 'left',
    backgroundColor: 'rgb(0,0,0,0.3)',
    width: '97%',
    //height: 50,
    margin: '0 5px 2px 10px',
    color: 'white'
  },
  item_img: {
    float: 'left',
    height: 50,
    width: 50,
    marginRight: 10,
  },
  song_name: {
    //padding: '0 60px',
  },
};


class Music extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 0.5
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
    this.handleLoopToggle = this.handleLoopToggle.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
    this.seek = React.createRef();
  }
  componentWillUnmount () {
    this.clearRAF()
  }

  componentDidMount (){
    fetch('http://localhost:3001/users')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.log());
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    });
    console.log(this.player);
  }

  handleOnPlay () {
    this.setState({
      playing: true
    });
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    });
    this.clearRAF()
  }

  handleStop () {
    this.player.stop();
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    });
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    });
  }

  renderSeekPos () {
    this.setState({
      seek: this.player.seek()
    });

    let x = (100 * this.state.seek / this.state.duration);

    this.seek.current.style.width = x + '%';
    console.log(this.seek.current.style.width);

    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }
  
  
  render(){
    const {classes} = this.props;
    return(
      <div className={classes.root}>
        <ReactHowler
          src={['./static/img/Dildora_Niyozova-Armon_buldi.mp3']}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />
        <div className={classes.wrapper}>
          <div className={classes.player}>
            <div className={classes.album}>
              <img src={"/static/img/album.jpg"} className={classes.album_img}/>
            </div>
            <div className={classes.title_wrapper}>
              {(this.state.playing)
                ? <img src={"/static/img/pause.png"} className={classes.play_button} onClick={this.handleToggle}/>
                : <img src={"/static/img/play.png"} className={classes.play_button} onClick={this.handleToggle}/> }

              <h3 className={classes.title}>Song Name</h3>
              <p className={classes.span}>Artist Name</p>
              <div className={classes.slider}>
                <div className={classes.bar} ref={this.seek}>

                </div>
              </div>
              <div className={classes.slider_span}>{(this.state.seek !== undefined) ? this.state.seek.toFixed(2) : '0.00'}</div>
              <div className={classes.control_wrapper}>
                <img src={'/static/img/previous.png'} className={classes.control_buttons}/>
                <img src={'/static/img/next.png'} className={classes.control_buttons}/>
                <img src={'/static/img/volume.png'} className={classes.control_buttons}/>
              </div>
            </div>
          </div>
          <div className={classes.list}>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>1.Artist name - Song name</p>
            </div>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>2.Artist name - Song name</p>
            </div>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>3.Artist name - Song name</p>
            </div>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>4.Artist name - Song name</p>
            </div>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>5.Artist name - Song name</p>
            </div>
            <div className={classes.item}>
              <img src={'/static/img/album.jpg'} className={classes.item_img}/>
              <p className={classes.song_name}>6.Artist name - Song title</p>
            </div>

          </div>
        </div>

      </div>
    )
  }
}


export default injectSheet(style)(Music);
