import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";
import "./WebCamera.css";
import { useRef } from "react";

function WebCamera() {
  const webcamRef = useRef(null); // create a webcam reference
  const [imgSrc, setImgSrc] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      {imgSrc ? (
        <button onClick={retake}>Retake photo</button>
      ) : (
        <button onClick={capture}>Capture photo</button>
      )}
    </div>
  );
}

export default WebCamera;
