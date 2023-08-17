import React, { useState, useEffect, useRef } from "react";
import { detectFaces, drawResults } from "../../api/faceApi";
import Webcam from "react-webcam";
import "./Camera.css";
import classnames from "classnames";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  detectResult,
  isCaptured,
  faceImage,
  needDetectStop,
} from "../../states/atoms";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useRecoilState(faceImage);
  const [results, setResults] = useRecoilState(detectResult);
  const [captured, setCaptured] = useRecoilState(isCaptured);
  const [needStop, setNeedStop] = useRecoilState(needDetectStop);
  const navigate = useNavigate();

  async function getFaces() {
    console.log("getFaces is called");

    if (camera.current !== null) {
      try {
        const faces = await detectFaces(camera.current.video);
        await drawResults(
          camera.current.video,
          cameraCanvas.current,
          faces,
          "expressions" // "boxLandmarks"
        );
        setResults(faces);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const clearOverlay = (canvas) => {
    console.log("clearOverlay called");
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (needStop) {
      return;
    }
    if (!photo && camera !== null) {
      const drawOverlay = () => {
        getFaces();
      };
      const loopCall = setInterval(drawOverlay, 200);
      return () => {
        //clearOverlay(cameraCanvas);
        clearInterval(loopCall);
      };
    } else {
      //return clearOverlay(cameraCanvas);
    }
  }, [photo, needStop]);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    setPhoto(imgSrc);
    setCaptured(true);
  };

  const reset = () => {
    setPhoto(undefined);
    setCaptured(false);
  };

  return (
    <div className="camera">
      <p className="scroll_down">Scroll down for results ↓</p>
      <div className="camera__wrapper">
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas
          className={classnames(
            "webcam-overlay",
            photo && "webcam-overlay--hidden"
          )}
          ref={cameraCanvas}
        />
        {photo ? (
          <>
            <img className="captured-photo" src={photo} alt="face expression" />
            <div className="btn-container">
              <button className="btn" onClick={reset}>
                Retake
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="btn-container">
              <button className="btn" onClick={capture}>
                Capture
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Camera;
