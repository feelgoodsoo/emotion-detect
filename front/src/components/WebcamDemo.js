import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useState, useCallback } from "react";
import "./WebcamDemo.css";

const width = 500;
const height = 500;

const WebcamDemo = () => {
  const [imgSrc, setImgSrc] = useState("");

  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });

  const capture = useCallback(() => {
    if (facesDetected !== 1) {
      alert(
        "얼굴이 감지되지 않았거나 여러 명의 얼굴이 감지되었습니다. 다시 인식해주세요"
      );
    } else {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [facesDetected, webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div>
      {imgSrc ? (
        <>
          <img src={imgSrc} alt="webcam" />
          <div>
            <button onClick={retake}>Retake photo</button>
          </div>
        </>
      ) : (
        <>
          <p>{`Loading: ${isLoading}`}</p>
          <p>{`Face Detected: ${detected}`}</p>
          <p>{`Number of faces detected: ${facesDetected}`}</p>
          <div style={{ width, height, position: "relative" }}>
            {boundingBox.map((box, index) => (
              <div
                key={`${index + 1}`}
                style={{
                  border: "4px solid red",
                  position: "absolute",
                  top: `${box.yCenter * 100}%`,
                  left: `${box.xCenter * 100}%`,
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  zIndex: 1,
                }}
              />
            ))}
            <Webcam
              ref={webcamRef}
              forceScreenshotSourceSize
              style={{
                height,
                width,
                position: "absolute",
              }}
            />
          </div>
          <button onClick={capture}>Capture photo</button>
        </>
      )}
    </div>
  );
};

export default WebcamDemo;
