import "./ChatPage.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { sendMessageToOpenAI } from "../../api/gptRequest";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { autoPromt } from "../../states/atoms";

function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const location = useLocation();
  const advice = useRecoilValue(autoPromt);
  const [alreadyTake, setAlreadyTake] = useState(false);

  const scrollRef = useRef(null);

  //console.log("env name: ", process.env.REACT_APP_OPENAI_API_KEY);

  const handleMessageSubmit = async () => {
    if (input == "") {
      return;
    }
    const response = "hello from bot"; //await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");
  };

  const detectEnter = (e) => {
    if (e.key == "Enter" && e.nativeEvent.isComposing === false) {
      handleMessageSubmit();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const parsedAccessToken = JSON.parse(
    localStorage.getItem("authTokens")
  ).access;

  // console.log(
  //   "access token: ",
  //   JSON.parse(localStorage.getItem("authTokens")).access
  // );
  const fetchMessages = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/chat/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedAccessToken}`,
      },
      body: JSON.stringify({
        user_id: "test1213",
      }),
    });

    let data = await response.json();
    console.log("res data: ", data);

    if (response.status === 200) {
      console.log("fetch success");
      setMessages(data);
    }
  };
  useEffect(() => {
    fetchMessages();
    if (advice !== null && !alreadyTake) {
      setInput(advice);
      setAlreadyTake(true);
    }
  }, []);

  return (
    <div className="page_Container">
      <div className="chat">
        {Array.isArray(messages)
          ? messages.map((message, index) => (
              <div
                key={index}
                className={message.isUser ? "user-message" : "bot-message"}
              >
                {message.text}
              </div>
            ))
          : null}
        <div ref={scrollRef}></div>
      </div>
      <footer className="input-container">
        <input
          className="input"
          type="text"
          placeholder="ask me anything..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={detectEnter}
        />
        {/* <button className="button" onClick={handleMessageSubmit}>
          Send
        </button> */}
      </footer>
    </div>
  );
}

export default ChatPage;
