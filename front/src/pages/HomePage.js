import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera/Camera";
import "./HomePage.css";
import Results from "../components/Results/Results";
import Prompts from "../utils/Promts";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  detectResult,
  isCaptured,
  needDetectStop,
  isHome,
  autoPromt,
} from "../states/atoms";

function HomePage({ camStop }) {
  const detectResponse = useRecoilValue(detectResult);
  const captured = useRecoilValue(isCaptured);
  const [home, setHome] = useRecoilState(isHome);
  const [needStop, setNeedStop] = useRecoilState(needDetectStop);
  const [advice, setAdvice] = useRecoilState(autoPromt);

  const navigate = useNavigate();

  const goToChat = () => {
    //프롬프트 완성
    //console.log("detectresult: ", detectResponse);
    if (detectResponse && captured) {
      const completedPrompt = Prompts(
        detectResponse[0].expressions.asSortedArray()[0].expression
      );
      console.log(completedPrompt);
      setAdvice(completedPrompt);
      navigate("/chat");
    } else {
      alert("do capture first");
    }
  };

  /*
  const goBack = () => {
    setNeedStop(true);
    console.log("setNeedStop Result: ", needStop);
  };*/

  useEffect(() => {
    setHome(true);
    console.log("useEffect rendered in homepage");
  }, [captured, needStop]);

  return (
    <div className="App">
      <header>
        <div className="App__header">
          <h1>
            <span className="title">Show your Emotion</span>
          </h1>
        </div>
      </header>
      <Camera />
      <div className="results__container">
        <Results results={detectResponse} />
      </div>
      <div className="advice-btn-container">
        {captured ? (
          <button className="btn" onClick={goToChat}>
            Advice
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default HomePage;
