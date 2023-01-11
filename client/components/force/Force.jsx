import React, { useRef, useState } from "react"

import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import * as tf from "@tensorflow/tfjs";

import ThumbsDownGesture from "./gestures/ThumbsDown.js";
import MiddleFingerGesture from "./gestures/MiddleFinger.js";
import OKSignGesture from "./gestures/OKSign.js";
import PinchedFingerGesture from "./gestures/PinchedFinger.js";
import PinchedHandGesture from "./gestures/PinchedHand.js";
import RaisedHandGesture from "./gestures/RaisedHand.js";
import LoveYouGesture from "./gestures/LoveYou.js";
import RockOnGesture from "./gestures/RockOn.js";
import CallMeGesture from "./gestures/CallMe.js";
import PointUpGesture from "./gestures/PointUp.js";
import PointDownGesture from "./gestures/PointDown.js";
import PointRightGesture from "./gestures/PointRight.js";
import PointLeftGesture from "./gestures/PointLeft.js";
import RaisedFistGesture from "./gestures/RaisedFist.js";


const Force = React.forwardRef((props,ref) => {

    const runHandpose = async () => {
        const net = await handpose.load();
        //console.log("handpose model loaded");
        // loop and detect hand
        setInterval(() => {
          detect(net)
        }, 100);
    
    }

    const detect = async (net) => {
        if (typeof ref.current !== "undefined" && ref.current != null && ref.current.video.readyState === 4) {
          // get video properties
          const video = ref.current.video;
          const videoWidth = ref.current.video.videoWidth;
          const videoHeight = ref.current.video.videoHeight;
          // set video width and height
          ref.current.video.width = videoWidth;
          ref.current.video.height = videoHeight;
          // make detection
          const hand = await net.estimateHands(video);
    
          if (hand.length > 0) {
            const GE = new fp.GestureEstimator([
              fp.Gestures.VictoryGesture,
              fp.Gestures.ThumbsUpGesture,
              ThumbsDownGesture,
              MiddleFingerGesture,
              OKSignGesture,
              PinchedFingerGesture,
              PinchedHandGesture,
              RaisedHandGesture,
              LoveYouGesture,
              RockOnGesture,
              CallMeGesture,
              PointRightGesture,
              PointUpGesture,
              PointLeftGesture,
              PointDownGesture,
              RaisedFistGesture
            ])
            const gesture = await GE.estimate(hand[0].landmarks, 8);
            if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
              const confidence = gesture.gestures.map(
                (prediction) => prediction.score
              );
              const maxConfidence = confidence.indexOf(
                Math.max.apply(null, confidence)
              );
              console.log(gesture.gestures[maxConfidence].name);
            }
          }
    
        }
      }
    
    runHandpose();

    return (
        <Webcam ref={ref} style={{visibility:"hidden", position: "absolute"}}/>
    )
});
  
export default Force;
