import React, {
  Component
} from 'react';
import d3 from 'd3';
require('./VideoStyle.css');
import data from './data.json';

var _video_assets = "./Video" +
  "/",
  _image_assets = "./Video" +
  "/",
  _audio_assets = "http://graphics8.nytimes.com/newsgraphics/2013/10/24/south-china-sea-videos/assets/" +
  "audio/";

var mute = false,
  muteVolume = "volume",
  fixRatio = 16 / 9,
  fixHeight = innerWidth / fixRatio,
  fixTop = Math.round((
  innerHeight - fixHeight) / 2),
  fadeTop = Math.max(200, fixTop),
  fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight),
  fade = d3.interpolateRgb("#000", "#fff");

//three different caption types
//head (contains headline and summary)

//left(default)
//long
//right
//center

var mockVideoSequenceData = [
  {
    videoData: [
      {
        source: "http://climate.nasa.gov/system/gallery_images/large/flooding-South-Carolina-black-divide-1200px-80.jpg",
        dates: [
          "October 15, 2014", "October 8, 2015", "October 8, 2016"
        ],
        caption: [
          {
            type: "headline",
            headlineText: "Headline",
            summaryText: "Headline Summary"
          }
        ]
      }, {
        source: "http://climate.nasa.gov/system/gallery_images/large/Pearl-River-Delta-China-1920px-80.jpg",
        dates: [
          "October 15, 2014", "October 8, 2015"
        ],
        caption: [
          {
            type: "left",
            captionText: "Left text"
          }, {
            type: "right",
            captionText: "Sequential right text"
          }, {
            type: "center",
            captionText: "Sequential center text"
          }, {
            type: "long",
            captionText: "Sequential long text"
          }
        ]
      }
    ]
  }, {
    videoData: [
      {
        source: "./Video/EarthSlowNosun",
        caption: [
          {
            type: "headline",
            headlineText: "Headline",
            summaryText: "Headline Summary"
          }
        ]
      }, {
        source: "./Video/EarthSlowSun",
        caption: [
          {
            type: "left",
            captionText: "Left text"
          }, {
            type: "right",
            captionText: "Sequential right text"
          }, {
            type: "center",
            captionText: "Sequential center text"
          }, {
            type: "long",
            captionText: "Sequential long text"
          }
        ]
      }
    ]
  }, {
    videoData: [
      {
        source: "http://climate.nasa.gov/system/gallery_images/large/flooding-South-Carolina-black-divide-1200px-80.jpg",
        dates: [
          "October 15, 2014", "October 8, 2015"
        ],
        caption: [
          {
            type: "headline",
            headlineText: "Headline",
            summaryText: "Headline Summary"
          }
        ]
      }, {
        source: "http://climate.nasa.gov/system/gallery_images/large/Pearl-River-Delta-China-1920px-80.jpg",
        dates: [
          "October 15, 2014", "October 8, 2015"
        ],
        caption: [
          {
            type: "left",
            captionText: "Left text"
          }, {
            type: "right",
            captionText: "Sequential right text"
          }, {
            type: "center",
            captionText: "Sequential center text"
          }, {
            type: "long",
            captionText: "Sequential long text"
          }
        ]
      }
    ]
  }
];

var VideoContent = React.createClass({render: function() {
    /*for however many dates we have
    we clip the image into that many equal size rectangles
    left to right
    and we have to recenter each of those images on eachother
    and size them to the window
    and render each of those

    each could be its own component... with properties for the clips
    component takes:
    current clip number - integer between 1 and 4


    */
    var clipStyle = {
      //WebkitClipPath: 'circle()'
    };

    var last = this.props.source.length;
    var suffix = this.props.source
      .slice(last - 3, last);
    if (suffix === 'jpg') {
      return (

        <img style={clipStyle} src={this.props.source}/>

      );
    } else {
      //now also needs to take images
      return (
        <video preload="auto" loop="true" autoPlay="true">
          <source src={this.props.source.url + ".mp4"} type="video/mp4"></source>
          <source src={this.props.source.url + ".webm"} type="video/webm"></source>
        </video>
      );
    }
  }

});

var ScrollPrompt = React.createClass({render: function() {
    var scrollPromptStyle = {

      position: "absolute",
      bottom: "20px",
      lineHeight: "20px",
      textAlign: "center",
      color: "white",
      fontSize: "10px",
      opacity: "0.8",
      fontWeight: "normal",
      textTransform: "uppercase",
      zIndex: 3,
      marginLeft: "7%",
      paddingLeft: "112px"
    };

    var scrollPromptSVGStyle = {
      fill: "none",
      stroke: "white",
      strokeWidth: "2px"
    };

    return (
      <div className="scroll-prompt">
        Scroll<br/>
        <svg width="18" height="8" style={scrollPromptSVGStyle}>
          <path d="M0,0L9,7L18,0"></path>
        </svg>
      </div>
    )
  }
});

var VideoSummary = React.createClass({render: function() {

    return (
      <div className="video-summary">Summary</div>
    )
  }
})

var VideoHeadline = React.createClass({render: function() {

    return (
      <div className="video-headline headline">Headline</div>
    )
  }
})

var HeadlineCaption = React.createClass({render: function() {

    return (
      <div className="video-caption video-caption--head">
        <VideoHeadline/>
        <VideoSummary/>
        <ScrollPrompt/>
      </div>

    )

  }

});

var CaptionRight = React.createClass({render: function() {

    return <div className="video-caption video-caption--right">
      "Right"
    </div>

  }

});

var CaptionLeft = React.createClass({render: function() {

    return <div className="video-caption">
      "Left"
    </div>

  }

});

var CaptionCenter = React.createClass({render: function() {

    return <div className="video-caption video-caption--center">
      "Center"
    </div>

  }

});

var CaptionLong = React.createClass({render: function() {

    return <div className="video-caption video-caption--long">
      "Long"
    </div>

  }

});

var VideoCaption = React.createClass({render: function() {

    //looks like video caption has a couple different options
    //default, long, right, center, head
    //interesting problem... I have a hacky fix that I can test, and come back to later to refactor.

    //each video has captions associated with it
    //1. we map across the array of captions
    //2. we use the caption type to determing the styling of the caption
    //3. we use the caption type to determine... what components are used!
    var captionSequence = this.props.caption.map(function(caption, index, total) {
        if (caption.type === "left") {
          return <CaptionLeft/>
        } else if (caption.type === "right") {
          return <CaptionRight/>
        } else if (caption.type === "long") {
          return <CaptionLong/>
        } else if (caption.type === "center") {
          return <CaptionCenter/>
        } else if (caption.type === "headline") {
          return <HeadlineCaption/>
        } else {}
      });
    return <div>
      {captionSequence}
    </div>
  }
});

var VideoContainer = React.createClass({render: function() {

    var containerStyle = {
      zIndex: this.props.zIndex,
      position: this.props.position,
      opacity: this.props.opacity,
      display: this.props.display,
      height: this.props.height,
      top: this.props.top
    };



    return (
      <div className="video-container" style={containerStyle}>
        <VideoContent source= {this.props.source}/>
      </div>
    )

  }

});

var Video = React.createClass({getInitialState: function() {

    return {
      state: null, previousState: null, display: this.props.first || this.props.last
        ? null
        : "none",
      rect: null,
      videoMarginTop: fixTop + "px",

      containerPosition: this.props.first || this.props.last
        ? "absolute"
        : "fixed",
      containerZIndex: this.props.first || this.props.last
        ? 1
        : 2,
      containerHeight: fixHeight,
      containerTop: this.props.first || this.props.last
        ? null
        : fixTop + "px"
    }

  },

  //so both video and video sequences have a series of methods for chaning state

  watch_scrolled: function() {

    this.setState({rect: this.getDOMNode()
        .getBoundingClientRect()});

    var rect = this.state.rect;

    if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
      this.watch_state(0);
    } else {
      var t = rect.top / (innerHeight - rect.height);
      this.watch_state(t < 0 || t > 1
        ? 1
        : 2);
      //watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
      //not sure about this dispatch and offset stuff... maybe offset needs to part of state
      //and then why do we pass rect as well? here we have it stored locally
      //maybe we need to update it after the state change?
    }

    //     watched.forEach(function(watch) {

    //       var rect = watch.element.getBoundingClientRect();
    //       if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
    //         watch_state(watch, 0);
    //       } else {
    //         var t = rect.top / (innerHeight - rect.height);
    //         watch_state(watch, t < 0 || t > 1 ? 1 : 2);
    //         watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
    //       }
    //     });
  },

  watch_scrolledStatic: function() {

    //here we invoke watch state for all the video and video sequence elements
    //and we dispatch a scroll event? idk why

    this.watch_state(1);

    //     watched.forEach(function(watch) {
    //       watch_state(watch, 1);
    //       watch_dispatch(watch, {type: "scroll", offset: .5, rect: {top: 0}}); // XXX rect
    //     });
  },

  //here's one piece of our state changer
  //we start here, just with videos for now
  //this function takes a state
  //and compares it to the current state of the component
  //and if they're different, it updates the state of the component
  //and it sets the previous state of the component
  //and it triggers a state change so that all other components can change state if needed?
  //we don't need to trigger all state changes. react does that for us.
  //and we don't need a watch, because we aren't looping through an array of watch elements, react handles that for us

  watch_state: function(state1) {
    var state0 = this.state.state;
    if (state0 !== state1) {
      this.setState({state: state1, previousState: state0});

    }

    //     if (state0 !== state1) watch_dispatch(watch, {
    //       type: "statechange",
    //       state: watch.state = state1,
    //       previousState: state0
    //     });
  },

  fixedScroll: function() {

    //ok all video components and sequences get a state which is their bounding client rect
    //and we update it on scroll and on resize

    if (this.props.first || this.props.last) {

      var fixed = (this.props.first && this.state.rect.top < fixTop) || (this.props.last && this.state.rect.bottom >= fixTop + fixHeight);

      this.setState({
        containerZIndex: fixed
          ? 2
          : 1,
        containerPosition: fixed
          ? "fixed"
          : "absolute",
        containerTop: fixed
          ? fixTop + "px"
          : null
      });

    }

    var opacityTop = this.state.rect.top - fixHeight / 4,
      opacity = opacityTop > fixTop + fixHeight * 4 / 5
        ? 0 //previous video fully opaque
        : !this.props.last && opacityTop < fixTop - fixHeight
          ? 0 //next video fully covers this video
          : opacityTop < fixTop
            ? 1 //this video fully opaque, but may be covered by next video
            : Math.max(0, Math.min(1, 1 - (opacityTop - fixTop) / (fixHeight / 5))); //this video partiall opaque

    //opacity first
    if (this.props.first) {

      this.setState({
        opacity: opacityTop >= fixTop - fixHeight
          ? 1
          : 0
      });

    } else {

      this.setState({opacity: opacity});

    }

    //opacity last
    if (this.props.last) {}

    this.setState({
      rect: this.getDOMNode()
        .getBoundingClientRect(), display: this.state.state
        ? null
        : "none"
    });

  },

  handleResize: function(e) {
    fixHeight = innerWidth / fixRatio;
    fixTop = Math.round((
    innerHeight - fixHeight) / 2);
    fadeTop = Math.max(200, fixTop);
    fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight);

    //set the height of the video container
    this.setState({
      rect: this.getDOMNode()
        .getBoundingClientRect(), containerHeight: fixHeight + "px"
    });

    //Set the top margin of the first video
    if (this.props.id === 0) {
      this.setState({
        videoMarginTop: fixTop + "px"
      });
    }

    //their version: call resize on render
    //our version: call resize on render, except it looks like you can't set state
    //so we'll use the state if possible, but fallback to the rect

    if (this.props.first && this.state.rect.top < fixTop) {
      this.state.containerTop = fixTop + "px";
    } else if (this.props.last && this.state.rect.bottom >= fixTop + fixHeight) {
      this.state.containerTop = fixTop + "px";
    } else {
      this.state.containerTop = fixTop + "px";
    }

  },

  handleScroll: function(event) {
    this.watch_scrolled();

    this.setState({rect: this.getDOMNode()
        .getBoundingClientRect()});
    this.fixedScroll();

  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    var videoStyle = {
      marginTop: this.state.videoMarginTop
    };
    //if dates exist, its a time series image
    //we want to create a video div
    //containing a video container
    //for each date
    //START HERE
      return (
        <div className="video" style={videoStyle}>
          <VideoContainer
            source={this.props.source}
            opacity={this.state.opacity}
            display={this.state.display}
            zIndex= {this.state.containerZIndex}
            position={this.state.containerPosition}
            top={this.state.containerTop}
            height={this.state.containerHeight}/>
          <VideoCaption caption={this.props.caption}/>
        </div>
      );
    }
});

var VideoSequence = React.createClass({

  getInitialState: function() {
    return {rect: null,
            state: null,
            previousState: null,
            background: "rgb(0,0,0)"}
  },

  watch_scrolled: function() {

    //first doesn't change, it's a property of the json data, and so is length... and I'm not dealing with audio yet
    this.setState({rect: this.getDOMNode().getBoundingClientRect()})

    var rect = this.state.rect;

    if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
      this.watch_state(0);
    } else {
      var t = rect.top / (innerHeight - rect.height);
      this.watch_state(t < 0 || t > 1
        ? 1
        : 2);
      //watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
    }

    //     watched.forEach(function(watch) {

    //       var rect = watch.element.getBoundingClientRect();
    //       if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
    //         watch_state(watch, 0);
    //       } else {
    //         var t = rect.top / (innerHeight - rect.height);
    //         watch_state(watch, t < 0 || t > 1 ? 1 : 2);
    //         watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
    //       }
    //     });
  },

  watch_scrolledStatic: function() {

    this.watch_state(1);

    //     watched.forEach(function(watch) {
    //       watch_state(watch, 1);
    //       watch_dispatch(watch, {type: "scroll", offset: .5, rect: {top: 0}}); // XXX rect
    //     });
  },

  watch_state: function(state1) {
    var state0 = this.state.state;

    if (state0 !== state1) {
      this.setState({state: state1, previousState: state0});

    }

    //     if (state0 !== state1) watch_dispatch(watch, {
    //       type: "statechange",
    //       state: watch.state = state1,
    //       previousState: state0
    //     });
  },

  handleScroll: function() {
    this.setState({rect: this.getDOMNode()
        .getBoundingClientRect()});
    this.watch_scrolled();
    var opacity = Math.max(0, Math.min(1, this.state.rect.bottom < fadeBottom
      ? (fadeBottom - this.state.rect.bottom) / fadeTop
      : this.state.rect.top < fixTop + fadeTop
        ? (this.state.rect.top - fixTop) / fadeTop
        : 1));

    this.setState({background: fade(opacity)});

  },

  handleResize: function() {},

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },

  //Q when does sequence state change?
  sequencestatechanged: function(sequenceState) {
    if (sequenceState) {
      //set all videos to preload "auto"

      //set all audio to play

    } else {

      //set body background to null

      //set all audio to pause

    }

  },

  render: function() {

    var videoSequence = this.props.sequenceData.videoData.map(function(video, index, total) {

      if (video.dates){

        //dated images is an array of video elements, one for each date
        var datedImages = video.dates.map(function(date,index,allDates){
          var video = this;
          return <Video
            date={date}
            first={index === 0}
            last={index === total.length - 1}
            source={video.source}
            caption={video.caption}
            dates={video.dates}
            key={index}/>
        },video);

        //we return the dated images array to the video sequence
        return datedImages;

      }else{

      }
        return <Video
          first={index === 0}
          last={index === total.length - 1}
          source={video.source}
          caption={video.caption}
          dates={video.dates}
          key={index}/>
      });

      //video sequence is an array of video components
      //if the input is a video url, there is only one video component to add
      //if it's an image, then we need to add a video component for each image

      //if dates are provided, the array must contain as many <Video> elements as there are dates
      //if no dates are provided, the array only contains as many <Video> as there are video
      //if a combination of video and images are provided in the video data
      //then a combination of <Video> elements for both video and images must be returned


    return (
      <div className="section video-sequence"
        style ={{ background: this.state.background}}>
        {videoSequence}
      </div>
    )
  }

});

var Article = React.createClass({componentDidMount: function() {},
  render: function() {
    var allSequences = this.props.data.map(function(sequence, index, total) {
        return <VideoSequence
          sequenceData= {sequence}
          first= {index===0}
          last= {index===total.length-1}
          key= {index}/>
      });
    return (
      <div className="article">
        {allSequences}
        <div className="section column">
          <p>TextTextTextTextTextTextTextTextText</p>
        </div>

      </div>

    )

  }

});

var Main = React.createClass({render: function() {
    return (
      <div className="main">
        <Article data= {mockVideoSequenceData}/>
      </div>

    )

  }

});

export class App extends Component {
  render () {
    return (
      <Main/>
    );
  }
}
